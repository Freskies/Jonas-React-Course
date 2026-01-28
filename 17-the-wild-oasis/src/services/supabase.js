import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ldllxejdkhqyioxemtfi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbGx4ZWpka2hxeWlveGVtdG" +
	"ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjk3NzYsImV4cCI6MjA4NDY0NTc3Nn0.OjeStVEk6APZYrvhI7LaxSlbGCzAPnX5hV-xJp-P_sk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase