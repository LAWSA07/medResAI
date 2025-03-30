import requests
import pandas as pd
import time
import os
from bs4 import BeautifulSoup
import json
from datetime import datetime
import re
import logging
from urllib.parse import urljoin

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Google Sheets integration
try:
    import gspread
    from google.oauth2.service_account import Credentials
    GOOGLE_SHEETS_AVAILABLE = True
except ImportError:
    GOOGLE_SHEETS_AVAILABLE = False
    logger.warning("Google Sheets integration not available. Data will be saved as CSV files.")

# ------------------- Configuration -------------------
# Set which databases to scrape
DATABASES = {
    "pdb": True,         # Protein Data Bank
    "uniprot": True,     # UniProtKB
    "ncbi_virus": True,  # NCBI Virus
    "bindingdb": True,   # BindingDB
    "sabdab": True,      # Structural Antibody Database
    "iedb": True,        # Immune Epitope Database
    "pdbe_kb": True,     # PDBe Knowledge Base
}

# Search terms - edit these based on your research focus
SEARCH_TERMS = [
    "SARS-CoV-2 spike",
    "coronavirus main protease",
    "viral protein antibody complex"
]

# Output configuration
OUTPUT_DIR = "scraped_data"
GOOGLE_SHEET_NAME = "Protein Database Data"
GOOGLE_CREDS_FILE = "google_credentials.json"  # Path to your Google API credentials

# ------------------- Utility Functions -------------------

def setup_output_dir():
    """Create output directory if it doesn't exist"""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        logger.info(f"Created output directory: {OUTPUT_DIR}")

def connect_to_google_sheets():
    """Connect to Google Sheets API"""
    if not GOOGLE_SHEETS_AVAILABLE:
        return None

    try:
        # Define the scope
        scope = ['https://spreadsheets.google.com/feeds',
                 'https://www.googleapis.com/auth/drive']

        # Load credentials from file
        if not os.path.exists(GOOGLE_CREDS_FILE):
            logger.warning(f"Google credentials file {GOOGLE_CREDS_FILE} not found. Using CSV output only.")
            return None

        creds = Credentials.from_service_account_file(GOOGLE_CREDS_FILE, scopes=scope)
        client = gspread.authorize(creds)

        # Open or create the spreadsheet
        try:
            sheet = client.open(GOOGLE_SHEET_NAME)
        except gspread.exceptions.SpreadsheetNotFound:
            sheet = client.create(GOOGLE_SHEET_NAME)
            sheet.share('your-email@example.com', perm_type='user', role='writer')

        logger.info(f"Connected to Google Sheet: {GOOGLE_SHEET_NAME}")
        return sheet

    except Exception as e:
        logger.error(f"Error connecting to Google Sheets: {str(e)}")
        return None

def make_request(url, params=None, headers=None, max_retries=3, delay=1, method="GET", json_data=None):
    """Make a request with retry logic"""
    retries = 0
    while retries < max_retries:
        try:
            if method == "GET":
                response = requests.get(url, params=params, headers=headers)
            elif method == "POST":
                if json_data:
                    response = requests.post(url, json=json_data, headers=headers)
                else:
                    response = requests.post(url, data=params, headers=headers)
            else:
                raise ValueError(f"Unsupported method: {method}")

            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            logger.warning(f"Request error: {str(e)}")
            retries += 1
            if retries < max_retries:
                logger.info(f"Retrying in {delay} seconds... (Attempt {retries+1}/{max_retries})")
                time.sleep(delay)
                delay *= 2  # Exponential backoff
            else:
                logger.error(f"Failed after {max_retries} attempts for URL: {url}")
                return None

def save_data(data, source, search_term=None):
    """Save data to CSV and/or Google Sheets"""
    # Skip if no data
    if not data or len(data) == 0:
        logger.warning(f"No data to save for {source}")
        return

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Add metadata
    df['source'] = source
    df['search_term'] = search_term
    df['date_scraped'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Save to CSV
    filename = f"{OUTPUT_DIR}/{source}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    df.to_csv(filename, index=False)
    logger.info(f"Saved {len(df)} records to {filename}")

    # Save to Google Sheets if available
    if google_sheet:
        try:
            worksheet_name = f"{source}_{datetime.now().strftime('%Y%m%d')}"
            try:
                worksheet = google_sheet.worksheet(worksheet_name)
            except:
                worksheet = google_sheet.add_worksheet(title=worksheet_name, rows=len(df)+1, cols=len(df.columns))

            # Convert DataFrame to list of lists (including headers)
            data_to_insert = [df.columns.tolist()] + df.values.tolist()
            worksheet.clear()
            worksheet.update(data_to_insert)
            logger.info(f"Updated Google Sheet worksheet: {worksheet_name}")
        except Exception as e:
            logger.error(f"Error updating Google Sheet: {str(e)}")

# ------------------- Database Scrapers -------------------

def scrape_pdb(search_term, max_results=100):
    """Scrape data from PDB using their API"""
    logger.info(f"Scraping PDB for '{search_term}'...")
    base_url = "https://search.rcsb.org/rcsbsearch/v2/query"

    # Construct the search query
    query = {
        "query": {
            "type": "terminal",
            "service": "text",
            "parameters": {
                "attribute": "rcsb_entity_info.description",
                "operator": "contains_words",
                "value": search_term
            }
        },
        "return_type": "entry",
        "request_options": {
            "pager": {
                "start": 0,
                "rows": max_results
            },
            "scoring_strategy": "combined",
            "sort": [
                {
                    "sort_by": "score",
                    "direction": "desc"
                }
            ]
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = make_request(
        base_url,
        headers=headers,
        method="POST",
        json_data=query
    )

    if not response:
        return []

    try:
        data = response.json()
        results = []

        if 'result_set' in data:
            for item in data['result_set']:
                # Get detailed info for each entry
                pdb_id = item['identifier']
                detail_url = f"https://data.rcsb.org/rest/v1/core/entry/{pdb_id}"
                detail_resp = make_request(detail_url)

                if detail_resp:
                    detail_data = detail_resp.json()

                    # Extract relevant information
                    entry = {
                        'pdb_id': pdb_id,
                        'title': detail_data.get('struct', {}).get('title', ''),
                        'deposition_date': detail_data.get('rcsb_accession_info', {}).get('deposit_date', ''),
                        'resolution': detail_data.get('rcsb_entry_info', {}).get('resolution_combined', [0])[0],
                        'experimental_method': detail_data.get('exptl', {})[0].get('method', '') if detail_data.get('exptl') else '',
                        'url': f"https://www.rcsb.org/structure/{pdb_id}"
                    }

                    results.append(entry)
                    logger.info(f"Processed PDB entry: {pdb_id}")

                # Add delay to avoid overloading the server
                time.sleep(0.5)

        return results

    except Exception as e:
        logger.error(f"Error processing PDB data: {str(e)}")
        return []

def scrape_uniprot(search_term, max_results=50):
    """Scrape data from UniProtKB using their API"""
    logger.info(f"Scraping UniProtKB for '{search_term}'...")
    base_url = "https://rest.uniprot.org/uniprotkb/search"

    params = {
        "query": search_term,
        "format": "json",
        "size": max_results
    }

    response = make_request(base_url, params=params)
    if not response:
        return []

    try:
        data = response.json()
        results = []

        if 'results' in data:
            for item in data['results']:
                # Extract protein name with fallbacks
                protein_name = ""
                if 'proteinDescription' in item:
                    if 'recommendedName' in item['proteinDescription'] and 'fullName' in item['proteinDescription']['recommendedName']:
                        protein_name = item['proteinDescription']['recommendedName']['fullName'].get('value', '')
                    elif 'submissionNames' in item['proteinDescription'] and len(item['proteinDescription']['submissionNames']) > 0:
                        protein_name = item['proteinDescription']['submissionNames'][0].get('fullName', {}).get('value', '')
                    elif 'alternativeNames' in item['proteinDescription'] and len(item['proteinDescription']['alternativeNames']) > 0:
                        protein_name = item['proteinDescription']['alternativeNames'][0].get('fullName', {}).get('value', '')

                # Get gene name if available
                gene_name = ""
                if 'genes' in item and len(item['genes']) > 0 and 'geneName' in item['genes'][0]:
                    gene_name = item['genes'][0]['geneName'].get('value', '')

                entry = {
                    'uniprot_id': item.get('primaryAccession', ''),
                    'protein_name': protein_name,
                    'gene_name': gene_name,
                    'organism': item.get('organism', {}).get('scientificName', '') if 'organism' in item else '',
                    'sequence_length': item.get('sequence', {}).get('length', 0) if 'sequence' in item else 0,
                    'url': f"https://www.uniprot.org/uniprotkb/{item.get('primaryAccession', '')}"
                }

                # Add cross-references if available
                if 'uniProtKBCrossReferences' in item:
                    pdb_refs = []
                    for ref in item['uniProtKBCrossReferences']:
                        if ref.get('database') == 'PDB':
                            pdb_refs.append(ref.get('id', ''))
                    if pdb_refs:
                        entry['pdb_references'] = ', '.join(pdb_refs)

                results.append(entry)
                logger.info(f"Processed UniProt entry: {entry['uniprot_id']}")

        return results

    except Exception as e:
        logger.error(f"Error processing UniProtKB data: {str(e)}")
        return []

def scrape_ncbi_virus(search_term, max_results=50):
    """Scrape data from NCBI Virus database"""
    logger.info(f"Scraping NCBI Virus for '{search_term}'...")
    base_url = "https://www.ncbi.nlm.nih.gov/labs/virus/vssi/api/search"

    # Construct search payload
    payload = {
        "query": f"{search_term}",
        "page": 1,
        "size": max_results,
        "facets": {},
        "aggs": {},
        "sort": "relevance"
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = make_request(base_url, method="POST", headers=headers, json_data=payload)
    if not response:
        return []

    try:
        data = response.json()
        results = []

        if 'hits' in data and 'hits' in data['hits']:
            for item in data['hits']['hits']:
                source = item.get('_source', {})

                entry = {
                    'accession': source.get('accession', ''),
                    'title': source.get('title', ''),
                    'virus_species': source.get('taxonomy', {}).get('species', {}).get('name', '') if 'taxonomy' in source else '',
                    'collection_date': source.get('collection_date', ''),
                    'length': source.get('length', 0),
                    'url': f"https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?SeqType_s=Nucleotide&VirusLineage_ss=&SourceDB_s=GenBank&Accession_s={source.get('accession', '')}"
                }

                results.append(entry)
                logger.info(f"Processed NCBI Virus entry: {entry['accession']}")

        return results

    except Exception as e:
        logger.error(f"Error processing NCBI Virus data: {str(e)}")
        return []

def scrape_bindingdb(search_term, max_results=50):
    """Scrape data from BindingDB"""
    logger.info(f"Scraping BindingDB for '{search_term}'...")
    search_url = "https://www.bindingdb.org/rwd/bind/searchbysearch.jsp"

    params = {
        "vchemical": "",
        "vtarget": search_term,
        "vKi_gt": "",
        "vKi_lt": "",
        "vKd_gt": "",
        "vKd_lt": "",
        "vIC50_gt": "",
        "vIC50_lt": "",
        "vEC50_gt": "",
        "vEC50_lt": "",
        "vannotation": "",
        "vArticleTitleQuery": "",
        "vauthors": "",
        "vjournals": "",
        "vpubmed": "",
        "vpatent": "",
        "submit": "Search"
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = make_request(search_url, method="POST", params=params, headers=headers)
    if not response:
        return []

    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        results = []

        # Find and process the results table
        tables = soup.find_all('table')
        if not tables:
            logger.warning("No results found in BindingDB")
            return []

        data_table = None
        for table in tables:
            if table.find('th') and 'Target Name/Synonyms/UniProt ID' in table.find('th').text:
                data_table = table
                break

        if not data_table:
            logger.warning("Results table not found in BindingDB")
            return []

        rows = data_table.find_all('tr')[1:]  # Skip header row
        count = 0

        for row in rows:
            if count >= max_results:
                break

            cells = row.find_all('td')
            if len(cells) >= 6:
                try:
                    # Extract links and text from the cells
                    target_cell = cells[0]
                    target_link = target_cell.find('a')
                    target_text = target_cell.text.strip()

                    ligand_cell = cells[1]
                    ligand_link = ligand_cell.find('a')
                    ligand_text = ligand_cell.text.strip()

                    # Extract URLs
                    target_url = f"https://www.bindingdb.org{target_link['href']}" if target_link and 'href' in target_link.attrs else ""
                    ligand_url = f"https://www.bindingdb.org{ligand_link['href']}" if ligand_link and 'href' in ligand_link.attrs else ""

                    # Extract IDs if possible
                    target_id = ""
                    if "uniprot" in target_text.lower():
                        uniprot_match = re.search(r'UniProt:\s*([A-Z0-9]+)', target_text)
                        if uniprot_match:
                            target_id = uniprot_match.group(1)

                    ligand_id = ""
                    if ligand_link and 'href' in ligand_link.attrs:
                        ligand_id_match = re.search(r'monomerid=(\d+)', ligand_link['href'])
                        if ligand_id_match:
                            ligand_id = ligand_id_match.group(1)

                    # Get affinity data
                    affinity_type = cells[2].text.strip() if len(cells) > 2 else ""
                    affinity_value = cells[3].text.strip() if len(cells) > 3 else ""
                    affinity_unit = cells[4].text.strip() if len(cells) > 4 else ""

                    entry = {
                        'target_id': target_id,
                        'target_name': target_text,
                        'ligand_id': ligand_id,
                        'ligand_name': ligand_text,
                        'affinity_type': affinity_type,
                        'affinity_value': affinity_value,
                        'affinity_unit': affinity_unit,
                        'target_url': target_url,
                        'ligand_url': ligand_url
                    }

                    results.append(entry)
                    logger.info(f"Processed BindingDB entry: {target_id or 'Unknown'}/{ligand_id or 'Unknown'}")
                    count += 1

                except Exception as e:
                    logger.error(f"Error processing BindingDB row: {str(e)}")

        return results

    except Exception as e:
        logger.error(f"Error processing BindingDB data: {str(e)}")
        return []

def scrape_sabdab(search_term, max_results=50):
    """Scrape data from Structural Antibody Database (SAbDab)"""
    logger.info(f"Scraping SAbDab for '{search_term}'...")

    # SAbDab doesn't have a direct search API, but we can use their search form
    search_url = "http://opig.stats.ox.ac.uk/webapps/sabdab/sabdab/search/"

    # First, get the CSRF token
    init_response = make_request(search_url)
    if not init_response:
        return []

    try:
        soup = BeautifulSoup(init_response.content, 'html.parser')
        csrf_token = None

        # Find the CSRF token
        for input_tag in soup.find_all('input'):
            if input_tag.get('name') == 'csrfmiddlewaretoken':
                csrf_token = input_tag.get('value')
                break

        if not csrf_token:
            logger.warning("Could not find CSRF token for SAbDab")
            return []

        # Prepare search parameters
        params = {
            'csrfmiddlewaretoken': csrf_token,
            'seq': '',
            'cdrs': '',
            'clustered': 'on',
            'resolution_min': '',
            'resolution_max': '',
            'rfactor_min': '',
            'rfactor_max': '',
            'antigen': search_term,
            'species': '',
            'model': 'all'
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': search_url
        }

        search_response = make_request(
            search_url,
            method="POST",
            params=params,
            headers=headers
        )

        if not search_response:
            return []

        # Parse results page
        result_soup = BeautifulSoup(search_response.content, 'html.parser')
        results = []

        # Find the results table
        results_table = result_soup.find('table', class_='results')
        if not results_table:
            logger.warning("No results table found in SAbDab")
            return []

        # Process table rows
        rows = results_table.find_all('tr')[1:]  # Skip header
        count = 0

        for row in rows:
            if count >= max_results:
                break

            cells = row.find_all('td')
            if len(cells) >= 6:
                try:
                    pdb_id = cells[0].text.strip()

                    entry = {
                        'pdb_id': pdb_id,
                        'antigen': cells[3].text.strip(),
                        'antibody_chain': cells[1].text.strip(),
                        'antigen_chain': cells[2].text.strip(),
                        'resolution': cells[4].text.strip(),
                        'url': f"http://opig.stats.ox.ac.uk/webapps/sabdab/sabdab/structure/{pdb_id}"
                    }

                    results.append(entry)
                    logger.info(f"Processed SAbDab entry: {pdb_id}")
                    count += 1

                except Exception as e:
                    logger.error(f"Error processing SAbDab row: {str(e)}")

        return results

    except Exception as e:
        logger.error(f"Error processing SAbDab data: {str(e)}")
        return []

def scrape_iedb(search_term, max_results=50):
    """Scrape data from Immune Epitope Database (IEDB)"""
    logger.info(f"Scraping IEDB for '{search_term}'...")

    search_url = "https://www.iedb.org/result_v3.php"

    params = {
        'epitope_name': search_term,
        'sort_by': 'desc_epitope_id',
        'page_results': max_results
    }

    response = make_request(search_url, params=params)
    if not response:
        return []

    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        results = []

        # Find the results table
        results_table = soup.find('table', id='result')
        if not results_table:
            logger.warning("No results table found in IEDB")
            return []

        # Get table rows
        rows = results_table.find_all('tr')[1:]  # Skip the header row

        for row in rows:
            cells = row.find_all('td')
            if len(cells) >= 6:
                try:
                    # Extract epitope info
                    epitope_cell = cells[0]
                    epitope_link = epitope_cell.find('a')
                    epitope_id = epitope_link.text.strip() if epitope_link else "Unknown"
                    epitope_url = f"https://www.iedb.org{epitope_link['href']}" if epitope_link and 'href' in epitope_link.attrs else ""

                    # Extract other data
                    antigen_name = cells[1].text.strip()
                    host_organism = cells[4].text.strip()

                    entry = {
                        'epitope_id': epitope_id,
                        'epitope_sequence': epitope_cell.text.strip(),
                        'antigen_name': antigen_name,
                        'host_organism': host_organism,
                        'url': epitope_url
                    }

                    results.append(entry)
                    logger.info(f"Processed IEDB entry: {epitope_id}")

                except Exception as e:
                    logger.error(f"Error processing IEDB row: {str(e)}")

        return results

    except Exception as e:
        logger.error(f"Error processing IEDB data: {str(e)}")
        return []

def scrape_pdbe_kb(search_term, max_results=50):
    """Scrape data from PDBe-KB"""
    logger.info(f"Scraping PDBe-KB for '{search_term}'...")

    # Use the main PDBe search API
    search_url = "https://www.ebi.ac.uk/pdbe/search/pdb/select"

    params = {
        'q': search_term,
        'rows': max_results,
        'sort': 'overall_quality desc',
        'wt': 'json'
    }

    response = make_request(search_url, params=params)
    if not response:
        return []

    try:
        data = response.json()
        results = []

        if 'response' in data and 'docs' in data['response']:
            for item in data['response']['docs']:
                pdb_id = item.get('pdb_id', '')

                entry = {
                    'pdb_id': pdb_id,
                    'title': item.get('title', ''),
                    'experimental_method': item.get('experimental_method', ''),
                    'resolution': item.get('resolution', ''),
                    'organism': item.get('organism_scientific_name', []),
                    'deposition_date': item.get('deposition_date', ''),
                    'url': f"https://www.ebi.ac.uk/pdbe/entry/pdb/{pdb_id}"
                }

                # Get entity details where possible
                if isinstance(entry['organism'], list):
                    entry['organism'] = ", ".join(entry['organism'])

                results.append(entry)
                logger.info(f"Processed PDBe-KB entry: {pdb_id}")

        return results

    except Exception as e:
        logger.error(f"Error processing PDBe-KB data: {str(e)}")
        return []

# ------------------- Main Function -------------------

def main():
    """Main function to run the scrapers"""
    logger.info("Starting protein database scraping process...")
    setup_output_dir()

    # Connect to Google Sheets
    global google_sheet
    google_sheet = connect_to_google_sheets()

    # Process each search term across selected databases
    for term in SEARCH_TERMS:
        logger.info(f"\nProcessing search term: '{term}'")

        # PDB
        if DATABASES["pdb"]:
            pdb_data = scrape_pdb(term)
            save_data(pdb_data, "pdb", term)

        # UniProtKB
        if DATABASES["uniprot"]:
            uniprot_data = scrape_uniprot(term)
            save_data(uniprot_data, "uniprot", term)

        # NCBI Virus
        if DATABASES["ncbi_virus"]:
            ncbi_data = scrape_ncbi_virus(term)
            save_data(ncbi_data, "ncbi_virus", term)

        # BindingDB
        if DATABASES["bindingdb"]:
            bindingdb_data = scrape_bindingdb(term)
            save_data(bindingdb_data, "bindingdb", term)

        # SAbDab
        if DATABASES["sabdab"]:
            sabdab_data = scrape_sabdab(term)
            save_data(sabdab_data, "sabdab", term)

        # IEDB
        if DATABASES["iedb"]:
            iedb_data = scrape_iedb(term)
            save_data(iedb_data, "iedb", term)

        # PDBe-KB
        if DATABASES["pdbe_kb"]:
            pdbe_data = scrape_pdbe_kb(term)
            save_data(pdbe_data, "pdbe_kb", term)

        # Add delay between search terms
        time.sleep(2)

    logger.info("\nScraping process completed!")

if __name__ == "__main__":
    main()