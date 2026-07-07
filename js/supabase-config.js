// Supabase Configuration
const SUPABASE_URL = 'https://ocmxpaxhcdwrfycsojyc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbXhwYXhoY2R3cmZ5Y3NvanljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzQ3NzUsImV4cCI6MjA5ODkxMDc3NX0.6Gln_SpPKHUonl70itdxn3cmyku0KIA0ss1K9UG2e1g';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
