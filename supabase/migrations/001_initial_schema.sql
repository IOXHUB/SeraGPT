-- SeraGPT Database Schema
-- This file contains the initial database schema for SeraGPT application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user metadata
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  tokens_remaining INTEGER DEFAULT 5,
  tokens_purchased INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analyses table for storing user analysis data
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  analysis_type TEXT NOT NULL CHECK (analysis_type IN ('roi', 'climate', 'equipment', 'market', 'layout')),
  title TEXT NOT NULL,
  location_province TEXT,
  location_district TEXT,
  plant_type TEXT,
  greenhouse_type TEXT,
  production_area DECIMAL,
  investment_budget DECIMAL,
  energy_source TEXT,
  market_target TEXT,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  results JSONB,
  tokens_used INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table for generated PDF reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  report_type TEXT NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create token_purchases table for tracking token purchases
CREATE TABLE IF NOT EXISTS token_purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  package_name TEXT NOT NULL,
  tokens_amount INTEGER NOT NULL,
  price_paid DECIMAL NOT NULL,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultations table for engineering consulting requests
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  consultation_type TEXT NOT NULL,
  project_description TEXT,
  contact_phone TEXT,
  preferred_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  engineer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_settings table for admin configuration
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_usage table for tracking external API usage
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  api_name TEXT NOT NULL,
  endpoint TEXT,
  request_count INTEGER DEFAULT 1,
  response_time INTEGER,
  status_code INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS (Row Level Security) policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Analyses policies
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analyses" ON analyses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own analyses" ON analyses
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own analyses" ON analyses
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all analyses" ON analyses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reports policies
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reports" ON reports
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own reports" ON reports
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all reports" ON reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Token purchases policies
ALTER TABLE token_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own token purchases" ON token_purchases
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own token purchases" ON token_purchases
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all token purchases" ON token_purchases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Consultations policies
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consultations" ON consultations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own consultations" ON consultations
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own consultations" ON consultations
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all consultations" ON consultations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- System settings - admin only
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access system settings" ON system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- API usage - admin only
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access API usage" ON api_usage
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_type ON analyses(analysis_type);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_analysis_id ON reports(analysis_id);

CREATE INDEX IF NOT EXISTS idx_token_purchases_user_id ON token_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_token_purchases_status ON token_purchases(payment_status);

CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);

CREATE INDEX IF NOT EXISTS idx_api_usage_api_name ON api_usage(api_name);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON analyses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
  ('token_prices', '{"starter": {"tokens": 25, "price": 49}, "pro": {"tokens": 100, "price": 149}, "enterprise": {"tokens": 500, "price": 599}}', 'Token package pricing'),
  ('api_limits', '{"openweather": 1000, "fao": 500, "tuik": 300}', 'Daily API call limits'),
  ('analysis_settings', '{"max_processing_time": 300, "pdf_generation_timeout": 60}', 'Analysis processing settings')
ON CONFLICT (setting_key) DO NOTHING;
