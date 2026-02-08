import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("URL =>", process.env.SUPABASE_URL);
console.log("KEY =>", process.env.SUPABASE_ANON_KEY?.slice(0, 10));

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

console.log("CLIENT CREATED");

const { data, error } = await supabase.auth.signUp({
  email: `test${Date.now()}@mail.com`,
  password: "password123",
});

console.log("DATA:", data);
console.log("ERROR:", error);
