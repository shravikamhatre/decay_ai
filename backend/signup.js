import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { supabase } from "./supabase.js";

const email = `test${Date.now()}@mail.com`;
const password = "password123";

const { data, error } = await supabase.auth.signUp({ email, password });
if (error) throw error;

await supabase.from("users").insert({
  id: data.user.id,
  email,
  name: "Test User",
  account_type: "personal",
});

await supabase.from("profiles").insert({
  user_id: data.user.id,
  categories: ["Tech & Gadgets"],
  formats: ["reels", "carousels"],
});

console.log("USER + PROFILE CREATED");
