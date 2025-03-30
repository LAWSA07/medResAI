# MedResAI: Frontend & Backend Development Guide

A comprehensive guide for building the professional MedResAI platform, focusing on actionable prompts for AI code generation tools and necessary architecture design—with Supabase handling both database and authentication services.

## I. Design Considerations & Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: react-router-dom
- **API Calls**: axios
- **UI Components**: Material UI (MUI)
- **Styling**: Clean, modern aesthetic with clinical/scientific touches

### Backend
- **Framework**: Python with FastAPI
- **Task Queue**: Celery with Redis/RabbitMQ
- **Database & Authentication**: **Supabase**
  _Leveraging Supabase's managed PostgreSQL database, real-time capabilities, and built-in authentication (JWTs, RLS, social logins, etc.)._
- **API Documentation**: Swagger/OpenAPI

## II. Frontend Development Prompts

### A. Project Setup & Basic Layout

#### Prompt 1: Project Setup
```
Set up a new React project using Vite and TypeScript. Include react-router-dom for routing and install axios for API calls. Also, install Material UI (MUI) for UI components.
```

#### Prompt 2: Basic Routing
```
Create a main App component (App.tsx) that sets up basic routing using react-router-dom. Define routes for:
- / (Landing Page)
- /signup
- /login
- /dashboard (Protected Route)
- /dashboard/predict
- /dashboard/work
- /dashboard/sponsors

Implement a basic structure where authenticated users see a persistent navigation sidebar/header when on dashboard routes.
```

#### Prompt 3: Protected Route Component
```
Create a ProtectedRoute component in React that checks for an authentication token (e.g., in localStorage). If the token exists, render the child component; otherwise, redirect the user to the /login page.
```

### B. Landing Page

#### Prompt 4: Landing Page Component
```
Create a React functional component named LandingPage.tsx. It should include:
- A prominent header section with the text 'MedResAI' (placeholder for logo) and the tagline 'Accelerating antiviral drug discovery through AI.'
- An 'About Us' section explaining MedResAI's mission
- Clear 'Sign Up' and 'Login' buttons that navigate to respective routes
- Professional styling with good spacing and a clean look
```

### C. Authentication

#### Prompt 5: Signup Component
```
Create a SignupPage.tsx component with a centered form containing:
- Email field (with validation)
- Password field (with strength indication)
- Confirm Password field
- 'Sign Up' button calling a placeholder function handleSignup()
- Error handling display and link to login page

Note: The signup process will interface with Supabase's auth service.
```

#### Prompt 6: Login Component
```
Create a LoginPage.tsx component with:
- Email field
- Password field
- 'Login' button calling handleLogin()
- Token storage upon successful login (retrieved from Supabase)
- Redirection to dashboard
- Error handling and link to signup
```

### D. User Onboarding

#### Prompt 7: Onboarding Modal
```
Create an OnboardingModal.tsx component using MUI Modal that:
- Triggers conditionally based on profile completion
- Contains fields for: Name, Phone Number, Organization, Role
- Has a 'Save Profile' button calling handleSaveProfile()
- Closes upon successful save
```

#### Prompt 8: Dashboard Integration
```
Modify the main dashboard layout component to:
- Fetch user data after login
- Check if profile is complete
- Show OnboardingModal if profile is incomplete
```

### E. Dashboard Layout

#### Prompt 9: Dashboard Structure
```
Create a DashboardLayout.tsx component with:
- MUI AppBar for top header
- Drawer for persistent left-hand sidebar navigation
- Main content area for nested route components
- Logo/name display and user profile/logout button
```

#### Prompt 10: Navigation Menu
```
Populate the sidebar Drawer with navigation items:
- 'Predict Your Drug' (links to /dashboard/predict)
- 'Our Work' (links to /dashboard/work)
- 'Our Sponsors' (links to /dashboard/sponsors)
- Highlight active menu item based on current route
```

### F. Drug Prediction Feature

#### Prompt 11: Component Structure
```
Create a PredictDrugPage.tsx component structured to handle different states:
- idle
- loading
- results
- error

Use React's useState hook to manage state, input data, job ID, and results.
```

#### Prompt 12: Input Form
```
In PredictDrugPage.tsx (idle state):
- Display 'Predict Antiviral Candidate' title
- Include multiline TextField for genome sequence OR file upload button
- Add 'Start Prediction' button
```

#### Prompt 13: API Call & Loading State
```
When 'Start Prediction' button is clicked:
- Get input genome data
- POST to /api/predict/start with auth token (from Supabase) in headers
- Store returned job_id
- Set component state to loading
- Display loading indicator with informative text
- Begin polling /api/predict/status/{job_id} every 10 seconds
```

#### Prompt 14: Results Display
```
When job status is 'COMPLETED':
- Clear polling interval
- GET from /api/predict/results/{job_id}
- Store and display results in MUI Table showing:
  - Rank
  - Candidate Sequence
  - Predicted Binding Score
  - Toxicity Score
- Include button to start new prediction
```

#### Prompt 15: Error Handling
```
Implement error handling throughout PredictDrugPage.tsx:
- Set component state to error when API calls fail
- Display informative error message
- Provide retry/back button
```

## III. Backend Structure (FastAPI)

*Note: The backend leverages Supabase for both database management and authentication. Supabase handles user signup/login and issues JWT tokens which FastAPI will verify on protected routes.*

### A. Authentication (auth.py)

#### Endpoints:
- **POST /auth/signup**
  - Receives email/password
  - Forwards the request to Supabase Auth to create a user
  - Optionally, stores additional user metadata in your FastAPI database
  - Returns success/error

- **POST /auth/login**
  - Verifies credentials using Supabase Auth
  - Creates/validates a JWT token (as issued by Supabase)
  - Returns token

### B. User Profile (user.py)

#### Endpoints:
- **GET /api/user/me** *(Auth Required)*
  - Verifies the Supabase JWT token
  - Returns user data and profile completion status from the Supabase-managed users table

- **PUT /api/user/profile** *(Auth Required)*
  - Updates user profile information
  - Sets profile_complete_flag to true
  - Persists changes to the Supabase database

### C. Prediction Workflow (predict.py)

#### Endpoints:
- **POST /api/predict/start** *(Auth Required)*
  - Receives genome data
  - Validates input
  - Creates a prediction job entry in the Supabase-hosted database
  - Queues a Celery task
  - Returns job_id

- **GET /api/predict/status/{job_id}** *(Auth Required)*
  - Checks job status
  - Returns status information

- **GET /api/predict/results/{job_id}** *(Auth Required)*
  - Retrieves completed prediction results
  - Returns ranked candidates and scores

### D. Database Models (models.py)

#### User
- Fields: id, email, hashed_password, name, phone, organization, role, is_profile_complete
  _Note: User records are maintained in Supabase's managed PostgreSQL database._

#### PredictionJob
- Fields: job_id (UUID), user_id (FK), status (Enum), input_data_reference, timestamps

#### PredictionResult
- Fields: result_id, job_id (FK), rank, candidate_sequence, binding_score, toxicity_score, etc.

### E. Celery Tasks (tasks.py)

#### run_prediction_pipeline
- Orchestrates the prediction workflow:
  - Genome analysis → Target identification
  - Structure fetch/prediction
  - RAG query
  - Candidate Generation (LLM)
  - Validation and docking
  - Ranking
  - Result storage
  - Error handling

## IV. Implementation Roadmap

1. **Backend Development**
   - Set up the FastAPI project structure
   - Implement database models and migrations (using Supabase-managed PostgreSQL)
   - Configure Celery and message broker
   - Build the authentication system that interfaces with Supabase
   - Create API endpoints

2. **Frontend Implementation**
   - Generate React components using the provided prompts
   - Connect routes with react-router-dom
   - Implement API calls with axios
   - Manage authentication state (using Supabase's client library)

3. **Integration**
   - Connect frontend and backend
   - Test authentication flow (including Supabase JWT validation)
   - Verify prediction workflow

4. **Styling & Refinement**
   - Apply consistent UI styling
   - Implement responsive design
   - Add loading states and error handling

5. **Deployment Planning**
   - Frontend: Deploy via Vercel, Netlify, etc.
   - Backend: Host on AWS, Google Cloud, etc.
   - Database: Use Supabase's managed PostgreSQL service
   - Task Queue: Configure Redis/RabbitMQ

6. **Testing & Optimization**
   - Perform user flow testing
   - Verify API interactions
   - Optimize performance
   - Conduct security reviews

## V. Comprehensive Database Schema

*Note: The following PostgreSQL schema is intended for use with Supabase. Supabase's dashboard and CLI can be used for schema management and migrations.*

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE job_status AS ENUM (
    'PENDING',
    'PROCESSING_GENOME',
    'ANALYZING_TARGETS',
    'GENERATING_CANDIDATES',
    'EVALUATING_CANDIDATES',
    'RANKING_RESULTS',
    'COMPLETED',
    'FAILED'
);

CREATE TYPE user_role AS ENUM (
    'RESEARCHER',
    'ACADEMIC',
    'INDUSTRY_PROFESSIONAL',
    'ADMINISTRATOR'
);

-- Users table (managed by Supabase Auth with additional metadata)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    organization VARCHAR(255),
    role user_role,
    is_profile_complete BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token UUID,
    reset_password_token UUID,
    reset_password_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for handling JWT refresh (if needed)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(255) NOT NULL,
    user_agent VARCHAR(255),
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prediction jobs table
CREATE TABLE prediction_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status job_status DEFAULT 'PENDING',
    input_type VARCHAR(50) NOT NULL, -- e.g., 'GENOME_TEXT', 'GENOME_FILE', 'VIRUS_ID'
    input_data TEXT, -- Direct input or file reference path
    progress_percentage INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Prediction results table
CREATE TABLE prediction_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES prediction_jobs(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    candidate_sequence TEXT NOT NULL,
    binding_score DECIMAL(10, 4) NOT NULL,
    toxicity_score DECIMAL(10, 4),
    confidence_score DECIMAL(10, 4),
    molecular_weight DECIMAL(10, 4),
    solubility_score DECIMAL(10, 4),
    additional_properties JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Viral targets table (reference data)
CREATE TABLE viral_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    virus_name VARCHAR(255) NOT NULL,
    target_protein VARCHAR(255) NOT NULL,
    target_sequence TEXT NOT NULL,
    pdb_id VARCHAR(50),
    structure_data TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job-Target relationship table
CREATE TABLE job_targets (
    job_id UUID REFERENCES prediction_jobs(id) ON DELETE CASCADE,
    target_id UUID REFERENCES viral_targets(id) ON DELETE CASCADE,
    relevance_score DECIMAL(10, 4),
    PRIMARY KEY (job_id, target_id)
);

-- Sponsors table
CREATE TABLE sponsors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    website_url VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research publications table
CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT,
    publication_date DATE,
    journal VARCHAR(255),
    doi VARCHAR(100),
    url VARCHAR(255),
    pdf_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for optimization
CREATE INDEX idx_prediction_jobs_user_id ON prediction_jobs(user_id);
CREATE INDEX idx_prediction_jobs_status ON prediction_jobs(status);
CREATE INDEX idx_prediction_results_job_id ON prediction_results(job_id);
CREATE INDEX idx_job_targets_job_id ON job_targets(job_id);
CREATE INDEX idx_job_targets_target_id ON job_targets(target_id);

-- Update trigger function for updated_at timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at fields
CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_prediction_jobs_timestamp BEFORE UPDATE ON prediction_jobs
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_viral_targets_timestamp BEFORE UPDATE ON viral_targets
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_sponsors_timestamp BEFORE UPDATE ON sponsors
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
```

## VI. Optimal Folder Structure

### Frontend (React + TypeScript with Vite)

```
medresai-frontend/
│
├── .env                    # Environment variables (with .env.example)
├── .gitignore              # Git ignore file
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
│
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/
│       └── fonts/
│
├── src/
│   ├── main.tsx            # App entry point
│   ├── App.tsx             # Main App component with routing
│   ├── vite-env.d.ts       # Vite environment types
│   │
│   ├── components/         # Reusable components
│   │   ├── common/         # General-purpose components (Button, Input, Modal, Alert, etc.)
│   │   ├── layout/         # Layout components (Header, Footer, Sidebar, DashboardLayout)
│   │   └── features/       # Feature-specific components (auth, onboarding, prediction, etc.)
│   │
│   ├── pages/              # Page components (LandingPage, SignupPage, LoginPage, dashboard sub-pages)
│   │
│   ├── hooks/              # Custom React hooks (useAuth, useForm, usePrediction, etc.)
│   │
│   ├── services/           # API services (api.ts, auth.service.ts, user.service.ts, prediction.service.ts)
│   │
│   ├── utils/              # Utility functions (validation, formatting, storage, etc.)
│   │
│   ├── context/            # React Context (AuthContext.tsx, etc.)
│   │
│   ├── types/              # TypeScript type definitions (auth.types.ts, user.types.ts, prediction.types.ts, etc.)
│   │
│   └── styles/             # Global styles (theme.ts for MUI theme, global.css, etc.)
│
└── tests/                  # Unit and integration tests (components, hooks, services, etc.)
```

### Backend (Python with FastAPI)

```
medresai-backend/
│
├── .env                     # Environment variables (with .env.example) including Supabase keys
├── .gitignore               # Git ignore file
├── pyproject.toml           # Dependencies and build info (or requirements.txt)
├── README.md                # Documentation
├── alembic.ini              # Alembic configuration (for migrations)
│
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   │
│   ├── api/                 # API routes (auth.py, users.py, prediction.py, etc.)
│   │   ├── __init__.py
│   │   ├── deps.py          # Dependency injection
│   │   ├── auth.py          # Authentication routes (integrating with Supabase Auth)
│   │   ├── users.py         # User routes
│   │   ├── prediction.py    # Prediction routes
│   │   └── ...
│   │
│   ├── core/                # Core functionality (security.py, configuration models, etc.)
│   │
│   ├── db/                  # Database connections (session.py, base.py)
│   │
│   ├── models/              # SQLAlchemy models (user, prediction, viral_target, etc.)
│   │
│   ├── schemas/             # Pydantic schemas (user, prediction, token, etc.)
│   │
│   ├── crud/                # CRUD operations (base, user, prediction, etc.)
│   │
│   ├── services/            # Business logic services (auth, prediction, etc.)
│   │
│   ├── utils/               # Utility functions (validation, file handling, etc.)
│   │
│   ├── tasks/               # Celery tasks (worker setup, prediction tasks, etc.)
│   │
│   └── ml/                  # Machine learning modules (genome_analysis, candidate_generation, docking, scoring, etc.)
│
├── migrations/              # Alembic migrations
│
├── tests/                   # Unit and integration tests (api, services, etc.)
│
└── scripts/                 # Utility scripts (seed_db.py, start_dev.sh, etc.)
```

---

### Final Remarks

- **Supabase Integration:**
  Supabase is used for both database management and authentication. The frontend leverages Supabase's client SDK for authentication and data operations, while the FastAPI backend validates JWT tokens issued by Supabase and interacts with the same PostgreSQL database.

- **Scalability & Maintainability:**
  This structure ensures a clear separation of concerns, ease of onboarding, and efficient integration between custom API endpoints (FastAPI) and managed backend services (Supabase).

This updated guide should now serve as a comprehensive blueprint for developing the MedResAI platform using a modern frontend stack with React and a FastAPI backend seamlessly integrated with Supabase.