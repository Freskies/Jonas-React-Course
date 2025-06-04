import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zxicifhxourcbmpxwokk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4aWNpZmh4b3VyY2JtcHh3b2" +
	"trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjU2ODAsImV4cCI6MjA2NDYwMTY4MH0.-BmAs9J0wPXoKKXymsqXRHWISGzdzzychwiJZ-FNMzg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;