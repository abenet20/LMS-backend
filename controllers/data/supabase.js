const { createClient } = require("@supabase/supabase-js");


const supabaseUrl = 'https://eylccwoheaitkqbvriqk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bGNjd29oZWFpdGtxYnZyaXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDM2OTEsImV4cCI6MjA4MDU3OTY5MX0.2UamHsAZOUYk93z60aTTy6EhXM4k8ul3-dIFzXhBFzk'; 

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
