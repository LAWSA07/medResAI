# MedResAI Installation Guide

This guide will help you set up the MedResAI project with all necessary dependencies.

## Prerequisites

- Python 3.9+ 
- Node.js 16+
- Git

## Backend Setup

### 1. Create Virtual Environment

```bash
cd medresai-backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install Python Dependencies

**Option 1: Minimal Setup (Recommended for initial testing)**
```bash
python -m pip install --upgrade pip
pip install -r requirements-minimal.txt
```

**Option 2: Full Setup (Includes ML dependencies)**
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

**Option 3: Step-by-step (If you encounter issues)**
```bash
python -m pip install --upgrade pip
pip install fastapi==0.116.0 uvicorn==0.24.0 pydantic==2.4.2 python-dotenv==1.0.0
pip install sqlalchemy==2.0.23 aiosqlite==0.19.0
pip install httpx==0.27.0 requests==2.31.0
pip install supabase==2.11.0
```

### 4. Environment Variables

Create a `.env` file in `medresai-backend/` with:

```env
# Supabase Configuration
SUPABASE_URL=https://rxxuwnilclttlbmsiyed.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eHV3bmlsY2x0dGxibXNpeWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE1ODgsImV4cCI6MjA1ODc2NzU4OH0.jHMC7796qGmuS-oPku-B25BEvF52NLLKxY1r6hB3-bY

# Model Configuration
MODEL_PATH=model/deepseek_finetuned_full
FINETUNED_MODEL_PATH=model/deepseek_finetuned_full

# Database Configuration
DATABASE_URL=sqlite:///./medresai.db
SYNC_DATABASE_URL=sqlite:///./medresai.db
ASYNC_DATABASE_URL=sqlite+aiosqlite:///./medresai.db

# Model Settings
DEVICE=cuda
MAX_LENGTH=1024
TEMPERATURE=0.7
TOP_P=0.95

# Security
SESSION_SECRET_KEY=VbW_FbJIVJUH_GIkpOGCK-SVOF0ZI9LVsHqr7xit9rE
```

### 5. Initialize Database

```bash
python -m app.init_db
```

### 6. Start Backend Server

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend Setup

### 1. Install Node.js Dependencies

```bash
cd medresai-frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in `medresai-frontend/` with:

```env
VITE_SUPABASE_URL=https://rxxuwnilclttlbmsiyed.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eHV3bmlsY2x0dGxibXNpeWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE1ODgsImV4cCI6MjA1ODc2NzU4OH0.jHMC7796qGmuS-oPku-B25BEvF52NLLKxY1r6hB3-bY
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

## Optional: Protein Database Scraper

If you want to use the protein database scraper:

```bash
cd medresai-frontend
pip install -r requirements.txt
python protein_db_scraper.py
```

## Dependencies Overview

### Backend Dependencies

**Core FastAPI:**
- fastapi, uvicorn, pydantic, python-dotenv

**Database:**
- sqlalchemy, aiosqlite

**Authentication:**
- python-jose, passlib

**HTTP/API:**
- httpx==0.27.0, requests==2.31.0

**Supabase:**
- supabase==2.11.0

**Machine Learning:**
- torch, transformers, numpy, accelerate, bitsandbytes, safetensors, sentencepiece, protobuf

**Data Processing:**
- pandas, scipy, scikit-learn

**Web Scraping:**
- beautifulsoup4, lxml

**Google Sheets:**
- gspread, google-auth, google-auth-oauthlib

**Development:**
- pytest, black, flake8, mypy

### Frontend Dependencies

**Core React:**
- react, react-dom, react-router-dom

**UI Components:**
- @mui/material, @mui/icons-material, @emotion/react, @emotion/styled

**Forms:**
- react-hook-form, @hookform/resolvers, yup

**API & State:**
- axios, @supabase/supabase-js

**Visualization:**
- 3dmol, react-grid-layout

**Styling:**
- styled-components, framer-motion

**Development:**
- typescript, vite, eslint

## Troubleshooting

### Common Issues

1. **Package Installation Issues:**
   - **Supabase error**: Use `supabase==2.11.0` (not `supabase-py==1.0.3` - this is deprecated)
   - **httpx compatibility**: Use `httpx==0.27.0` (required by supabase==2.11.0, which needs >=0.26,<0.29)
   - **FastAPI/Pydantic compatibility**: Use FastAPI 0.116.0+ for better Pydantic 2.x support
   - **Version conflicts**: Try installing minimal requirements first: `pip install -r requirements-minimal.txt`
   - **Pip version**: Ensure pip is updated: `python -m pip install --upgrade pip`

2. **PyTorch Installation Issues:**
   - Try: `pip install torch --index-url https://download.pytorch.org/whl/cpu`
   - Or: `conda install pytorch torchvision torchaudio -c pytorch`
   - Install ML dependencies separately: `pip install -r requirements-ml.txt`

3. **Virtual Environment Issues:**
   - Delete and recreate: `rm -rf venv && python -m venv venv`
   - Windows: Use `venv\Scripts\activate` (not `venv\Scripts\activate.bat`)

4. **Port Conflicts:**
   - Backend: Change port in uvicorn command
   - Frontend: Change port in vite config

5. **Database Issues:**
   - Delete `medresai.db` and reinitialize

6. **Import Errors:**
   - Ensure you're in the correct directory: `cd medresai-backend`
   - Check Python path: `python -c "import sys; print(sys.path)"`

### Verification

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Frontend Access:**
   - Open http://localhost:5173 in browser

3. **API Documentation:**
   - Visit http://localhost:8000/docs for Swagger UI

## Next Steps

1. Set up Supabase database tables
2. Configure authentication
3. Test the prediction endpoints
4. Customize the frontend UI 