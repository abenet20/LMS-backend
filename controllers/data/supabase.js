const { createClient } = require("@supabase/supabase-js");


const supabaseUrl = 'https://eylccwoheaitkqbvriqk.supabase.co'
const supabaseKey = 'sb_secret_uS1XUA4BYlrUWyV4oB6vxw_bCjEjabs'; 

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
