-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  organization TEXT,
  role TEXT,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a secure RLS policy for the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create prediction_jobs table
CREATE TABLE IF NOT EXISTS prediction_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'PENDING',
  input_type TEXT NOT NULL,
  input_data TEXT,
  progress_percentage INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create RLS policies for prediction_jobs
ALTER TABLE prediction_jobs ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own prediction jobs
CREATE POLICY "Users can view their own prediction jobs"
  ON prediction_jobs FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own prediction jobs
CREATE POLICY "Users can insert their own prediction jobs"
  ON prediction_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create prediction_results table
CREATE TABLE IF NOT EXISTS prediction_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES prediction_jobs(id) ON DELETE CASCADE,
  rank INTEGER NOT NULL,
  candidate_sequence TEXT NOT NULL,
  binding_score DECIMAL(10, 4) NOT NULL,
  toxicity_score DECIMAL(10, 4),
  confidence_score DECIMAL(10, 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies for prediction_results
ALTER TABLE prediction_results ENABLE ROW LEVEL SECURITY;

-- Allow users to view prediction results for their own jobs
CREATE POLICY "Users can view results for their own jobs"
  ON prediction_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM prediction_jobs
      WHERE prediction_jobs.id = prediction_results.job_id
      AND prediction_jobs.user_id = auth.uid()
    )
  );