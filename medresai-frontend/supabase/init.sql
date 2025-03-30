-- Drop existing tables to ensure a clean state
DROP TABLE IF EXISTS prediction_results;
DROP TABLE IF EXISTS prediction_jobs;
DROP TABLE IF EXISTS profiles;

-- Create a table for user profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  organization TEXT,
  role TEXT,
  is_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_profile_complete BOOLEAN DEFAULT false,
  is_email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

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

-- Make sure storage bucket for genome files exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('genome-files', 'genome-files', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Users can upload genome files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'genome-files' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view genome files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'genome-files' AND
    auth.role() = 'authenticated'
  );

-- Function to handle user creation automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, is_admin, is_active, is_profile_complete, is_email_verified)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    false,
    true,
    false,
    new.email_confirmed_at IS NOT NULL
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();