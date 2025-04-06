import axios from 'axios';

// API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface VirusQueryResponse {
  predictedSequences: string[];
  explanation: string;
  disclaimer: string;
}

/**
 * Service for handling virus data querying and sequence prediction
 */
export class VirusDataService {
  /**
   * Query for virus information and get predicted therapeutic sequences
   * @param query Detailed information about the virus
   * @returns Predicted sequences and explanation
   */
  static async queryVirusData(query: string): Promise<VirusQueryResponse> {
    try {
      // Make AI prediction by calling our backend
      const response = await axios.post(`${API_URL}/predict/virus`, { query });
      return response.data;
    } catch (error) {
      console.error('Error in virus data query:', error);
      throw new Error('Failed to get virus prediction. Please try again later.');
    }
  }

  /**
   * Get example virus data for demonstration purposes
   */
  static getExampleVirusData(): { query: string[], response: string[] } {
    return {
      "query": [
        "SARS-CoV-2 is a positive-sense single-stranded RNA virus with a genome size of approximately 30kb. Its spike protein has a receptor-binding domain (RBD) that binds to the ACE2 receptor on human cells. The spike protein undergoes conformational changes after binding, facilitating viral entry. The virus primarily attacks respiratory epithelial cells, leading to symptoms like fever, cough, and shortness of breath. Its genome sequence starts with 5'-ATTAAAGGTTTATACCTTCCCAGGTAACAAACCAACCAACTTTCGATCTCTTGTAGATCTGTTCT-3' and contains regions encoding for structural proteins (S, E, M, N) and non-structural proteins (NSPs).",

        "Hepatitis B virus (HBV) is a partially double-stranded DNA virus with a genome size of approximately 3.2kb. It has a unique replication mechanism involving reverse transcription. The virus contains surface antigen (HBsAg), core antigen (HBcAg), and e-antigen (HBeAg). HBV primarily infects hepatocytes through the sodium taurocholate co-transporting polypeptide (NTCP) receptor. The viral DNA is converted to covalently closed circular DNA (cccDNA) in the nucleus, which serves as a template for viral RNA synthesis. The HBV genome contains four overlapping open reading frames (ORFs) that encode seven proteins.",

        "Influenza A virus is a negative-sense, single-stranded, segmented RNA virus with 8 genome segments. Its surface contains two main glycoproteins: hemagglutinin (HA) and neuraminidase (NA). HA binds to sialic acid receptors on host cells, facilitating viral entry, while NA cleaves sialic acid to release new viral particles. The virus replicates in the respiratory epithelium, causing symptoms like fever, cough, and myalgia. The H1N1 strain has the following partial sequence in its HA gene: 5'-ATGAAGGCAATACTAGTAGTTCTGCTATATACATTTGCAACCGCAAATGCAGACACATTATGTATAGGTTATCATGCGAACAATTCAACAGACACTGTAGACACAGTACTAGAAAAGAATGTAACAGTAACACACTCTGTTAACCTTCTAGAAGACAAGCATAACGGGAAACTATGCAAACTAAGAGGGGTAGCCCCATTGCATTTGGGTAAATGTAACATTGCTGGCTGGATCCTGGGAAATCCAGAGTGTGAATCACTCTCCACAGCAAGCTCATGGTCCTACATTGTGGAAACATCTAGTTCAGACAATGGAACGTGTTACCCAGGAGATTTCATCGATTATGAGGAGCTAAGAGAGCAATTGAGCTCAGTGTCATCATTTGAAAGGTTTGAGATATTCCCCAAGACAAGTTCATGGCCCAATCATGACTCGAACAAAGGTGTAACGGCAGCATGTCCTCATGCTGGAGCAAAAAGCTTCTACAAAAATTTAATATGGCTAGTTAAAAAAGGAAATTCATACCCAAAGCTCAGCAAATCCTACATTAATGATAAAGGGAAAGAAGTCCTCGTGCTATGGGGCATTCACCATCCATCTACTAGTGCTGACCAACAAAGTCTCTATCAGAATGCAGATGCATATGTTTTTGTGGGGTCATCAAGATACAGCAGGAAGTTCGGGCCGACC-3'."
      ],
      "response": [
        "Based on the provided information about SARS-CoV-2, I've predicted potential genome sequences that might be useful targets for drug development:\n\nPredicted modified RBD sequence: 5'-GCTGGATCAGGACAATACTTGTATCATATGCGCATGACTCAACTGCACCTGATGTACTTAAAGATTGTAGTAAGGTCAATGAGACCATGA-3'\n\nThis modified sequence targets the receptor-binding domain with potential mutations at key residues that could serve as binding sites for antiviral compounds. Specifically, modifications at positions 417, 452, 486, 493, and 501 might affect ACE2 binding while creating potential binding pockets for therapeutic molecules.\n\nPotential protease inhibitor target sequence: 5'-TCTGCTGCTGTAGGTAACAGCGCTTCTTGCGCAACTAGTGGTAGTTCTGATAACAATGGTACTTCACCAGACACA-3'\n\nThis sequence is designed to target the main protease (Mpro) with structures that could accommodate small molecule inhibitors at the active site.\n\n**DISCLAIMER: These are predicted sequences based on computational analysis of SARS-CoV-2 genomic data. These predictions are theoretical and would require extensive laboratory validation, including in vitro and in vivo testing, before any conclusions about their utility in drug development could be drawn. This information is provided solely for research purposes and should not be used for clinical applications without proper experimental validation.**",

        "Based on the provided information about Hepatitis B virus (HBV), I've predicted potential genome sequences that might be useful targets for drug development:\n\nPredicted modified surface antigen sequence: 5'-ATGGAGAACATCGCATCAGGACTCCTAAGTCCTTCTGCGACACCGGTATAAAGGGATTCGCACTCCTCCTGCCTCCACCAATCGG-3'\n\nThis modified sequence targets the surface antigen with alterations that could potentially create binding sites for therapeutic antibodies or small molecules, while maintaining essential structural features for recognition by the immune system.\n\nPredicted reverse transcriptase inhibitor target sequence: 5'-CTCTGCCGATCCATACTGCGGAACTCCTAGCAGCCATCTTCGAGAACCACCGTGAGATCTTCTTCGACGACGGGGATAACCCCTACTG-3'\n\nThis sequence focuses on the reverse transcriptase domain with modifications that could make it susceptible to novel nucleoside/nucleotide analogs or non-nucleoside inhibitors, potentially interfering with the unique replication mechanism of HBV.\n\n**DISCLAIMER: These are predicted sequences based on computational analysis of HBV genomic data. These predictions are theoretical and would require extensive laboratory validation, including in vitro and in vivo testing, before any conclusions about their utility in drug development could be drawn. This information is provided solely for research purposes and should not be used for clinical applications without proper experimental validation.**",

        "Based on the provided information about Influenza A virus (H1N1), I've predicted potential genome sequences that might be useful targets for drug development:\n\nPredicted modified hemagglutinin sequence: 5'-TCTAGAGGTACTTCAGCTGCAGATTACAACTTCGGTGACCCACTTGTAGGAGCTACTGACCAAGGCCCTGAGTACTACTTGAACAGG-3'\n\nThis modified sequence targets the hemagglutinin protein with alterations at the receptor-binding site that could potentially interfere with viral attachment while creating binding pockets for small molecule inhibitors.\n\nPredicted neuraminidase inhibitor target sequence: 5'-GAGTGTCAGCTCAACTCTGATCCAGGCAACGACTGGACCAGTACCAATGCTATACAAGAGCTGCTGACTAACCCTAGAGGCATT-3'\n\nThis sequence is designed to target neuraminidase with modifications that could enhance binding of neuraminidase inhibitors while potentially addressing common resistance mutations.\n\n**DISCLAIMER: These are predicted sequences based on computational analysis of Influenza A genomic data. These predictions are theoretical and would require extensive laboratory validation, including in vitro and in vivo testing, before any conclusions about their utility in drug development could be drawn. This information is provided solely for research purposes and should not be used for clinical applications without proper experimental validation.**"
      ]
    };
  }
}