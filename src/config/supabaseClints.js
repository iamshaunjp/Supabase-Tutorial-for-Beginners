import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_Anon_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
