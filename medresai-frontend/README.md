# MedResAI Frontend

A React application for the MedResAI platform, which accelerates antiviral drug discovery through AI.

## Tech Stack

- React with TypeScript
- Vite
- React Router DOM
- Material UI
- Supabase for authentication and database

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=https://rxxuwnilclttlbmsiyed.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eHV3bmlsY2x0dGxibXNpeWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE1ODgsImV4cCI6MjA1ODc2NzU4OH0.jHMC7796qGmuS-oPku-B25BEvF52NLLKxY1r6hB3-bY
```

## Development

Start the development server:

```bash
npm run dev
```

## Supabase Setup

1. Log into the [Supabase Dashboard](https://app.supabase.com/)
2. Go to your project
3. Go to SQL Editor
4. Execute the SQL script from the `supabase/schema.sql` file to create the necessary tables and policies

## Authentication Flow

The application uses Supabase Authentication with email/password. The auth flow includes:

1. User signup (with email verification)
2. User login
3. Profile completion process
4. Protected routes for authenticated users

## Features

- Landing page with platform introduction
- User authentication (signup, login, logout)
- Protected dashboard with sidebar navigation
- User profile management
- Onboarding flow for new users
- Prediction workflow (to be implemented)

## Project Structure

- `/src`
  - `/components`: Reusable components
    - `/common`: Common components
    - `/layout`: Layout components
    - `/features`: Feature-specific components
  - `/pages`: Page components
    - `/dashboard`: Dashboard sections
  - `/services`: API services
  - `/context`: React context providers
  - `/hooks`: Custom hooks
  - `/types`: TypeScript type definitions
  - `/styles`: Global styles and theme

## Build for Production

```bash
npm run build
```

This will create a `dist` directory with the production-ready files.
