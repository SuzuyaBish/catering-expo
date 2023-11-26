import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://rzqslwrkxnifdgwlulxv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6cXNsd3JreG5pZmRnd2x1bHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NjEwOTgsImV4cCI6MjAxNjEzNzA5OH0.s8BpHTLZtkRF-PqNLydv4ISON-B2eUMs2QHeRih2SK0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
