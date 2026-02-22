import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { supabase } from "./supabase.js";

const app = express();
app.use(express.json());

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error) return res.status(401).json({ error: "Invalid or expired token" });

  req.user = data.user;
  next();
};

app.post("/signup", async (req, res) => {
  const { email, password, name, accountType, categories, formats } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ error: "Missing fields" });

  if (!categories || categories.length < 1 || categories.length > 5)
    return res.status(400).json({ error: "Select 1–5 categories" });

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user.id;

    await supabase.from("users").insert({
      id: userId,
      email,
      name,
      account_type: accountType,
    });

    await supabase.from("profiles").insert({
      user_id: userId,
      categories,
      formats,
    });

    res.json({ success: true, userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/ping-db", async (req, res) => {
  try {
    const { error } = await supabase.from("users").select("id").limit(1);

    if (error) throw error;

    res.status(200).send("DB Alive");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
