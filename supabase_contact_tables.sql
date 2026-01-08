-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_recipients table for managing recipient emails
CREATE TABLE IF NOT EXISTS contact_recipients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) - adjust as needed
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_recipients ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert messages (for contact form)
CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow service role to read all messages
CREATE POLICY "Allow service role to read contact_messages"
  ON contact_messages FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow service role to manage recipients
CREATE POLICY "Allow service role to manage contact_recipients"
  ON contact_recipients FOR ALL
  TO service_role
  USING (true);

