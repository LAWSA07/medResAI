// Simple Node.js script to initialize Supabase tables
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
require('dotenv').config({ path: path.resolve(__dirname, 'medresai-frontend/.env') });

// Supabase credentials (from .env)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials. Check your .env file.');
  process.exit(1);
}

console.log('Connecting to Supabase:', SUPABASE_URL);

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createTables() {
  try {
    // First, check if the prediction_jobs table exists
    const { data, error } = await supabase
      .from('prediction_jobs')
      .select('id')
      .limit(1);

    if (error && error.code === '42P01') {
      console.log('The prediction_jobs table does not exist, creating tables...');

      // Since we can't execute arbitrary SQL through the public API,
      // we'll use the Supabase UI or REST API to manually create tables.
      console.log(`
To create the required tables, please follow these steps:

1. Go to the Supabase dashboard: https://supabase.com/dashboard/project/rxxuwnilclttlbmsiyed
2. Navigate to the SQL Editor
3. Create a new query and paste the following SQL:

-- Create a table for prediction jobs
CREATE TABLE IF NOT EXISTS prediction_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  input_type TEXT NOT NULL,
  input_data TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  progress_percentage INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Set up RLS for prediction jobs
ALTER TABLE prediction_jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own prediction jobs
CREATE POLICY "Users can view their own prediction jobs" ON prediction_jobs
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to create prediction jobs
CREATE POLICY "Users can create prediction jobs" ON prediction_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own prediction jobs
CREATE POLICY "Users can update their own prediction jobs" ON prediction_jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create a table for prediction results
CREATE TABLE IF NOT EXISTS prediction_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES prediction_jobs ON DELETE CASCADE NOT NULL,
  rank INTEGER NOT NULL,
  candidate_sequence TEXT NOT NULL,
  binding_score FLOAT NOT NULL,
  toxicity_score FLOAT,
  confidence_score FLOAT,
  molecular_weight FLOAT,
  solubility_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Set up RLS for prediction results
ALTER TABLE prediction_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own prediction results
CREATE POLICY "Users can view their own prediction results" ON prediction_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM prediction_jobs
      WHERE prediction_jobs.id = prediction_results.job_id
      AND prediction_jobs.user_id = auth.uid()
    )
  );

-- Create policy to allow users to insert their own prediction results
CREATE POLICY "Users can insert their own prediction results" ON prediction_results
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM prediction_jobs
      WHERE prediction_jobs.id = prediction_results.job_id
      AND prediction_jobs.user_id = auth.uid()
    )
  );

4. Execute the SQL script
5. Refresh the Tables list in the Table Editor to confirm the tables were created
      `);

    } else if (error) {
      console.error('Error checking table existence:', error);
    } else {
      console.log('The prediction_jobs table already exists.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the initialization
createTables();