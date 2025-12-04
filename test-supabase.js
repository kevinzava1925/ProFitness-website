// Test script to verify Supabase setup
// Run with: node test-supabase.js

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local manually
try {
  const envPath = join(__dirname, '.env.local');
  if (existsSync(envPath)) {
    const envFile = readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
} catch (error) {
  // .env.local might not exist, that's okay
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 Checking Supabase Configuration...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
console.log('  SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
  console.log('\n❌ Missing environment variables!');
  console.log('Please add them to your .env.local file:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL=your_url');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key');
  console.log('  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  process.exit(1);
}

// Test connection
async function testConnection() {
  try {
    console.log('\n🔌 Testing Supabase Connection...\n');
    
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Test 1: Check if table exists
    console.log('Test 1: Checking if "content" table exists...');
    const { data, error } = await supabase
      .from('content')
      .select('count', { count: 'exact', head: true });

    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('  ❌ Table "content" does not exist!');
        console.log('  Please run the SQL script from SUPABASE_SETUP.md in your Supabase SQL Editor');
        return;
      }
      throw error;
    }

    console.log('  ✅ Table "content" exists!');
    console.log(`  📊 Current records: ${data || 0}`);

    // Test 2: Try to insert a test record
    console.log('\nTest 2: Testing write access...');
    const testData = {
      type: 'test',
      data: { message: 'This is a test', timestamp: new Date().toISOString() }
    };

    const { data: insertData, error: insertError } = await supabase
      .from('content')
      .insert(testData)
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log('  ✅ Write access works!');
    console.log('  📝 Test record created:', insertData[0].id);

    // Test 3: Try to read it back
    console.log('\nTest 3: Testing read access...');
    const { data: readData, error: readError } = await supabase
      .from('content')
      .select('*')
      .eq('type', 'test')
      .order('created_at', { ascending: false })
      .limit(1);

    if (readError) {
      throw readError;
    }

    if (readData && readData.length > 0) {
      console.log('  ✅ Read access works!');
      console.log('  📖 Retrieved test record');

      // Clean up test record
      const { error: deleteError } = await supabase
        .from('content')
        .delete()
        .eq('id', readData[0].id);

      if (!deleteError) {
        console.log('  🧹 Test record cleaned up');
      }
    }

    console.log('\n✅ All tests passed! Supabase is configured correctly.\n');
    console.log('Next steps:');
    console.log('  1. Make sure these variables are also set in Vercel');
    console.log('  2. Restart your dev server: npm run dev');
    console.log('  3. Test the admin dashboard\n');

  } catch (error) {
    console.error('\n❌ Error testing Supabase:');
    console.error('  Message:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check that your Supabase project is active');
    console.error('  2. Verify your API keys are correct');
    console.error('  3. Make sure you ran the SQL script to create the table');
    process.exit(1);
  }
}

testConnection();

