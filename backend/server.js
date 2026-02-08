import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "./.env" });

const { supabase } = await import("./supabase.js");

const app = express();
app.use(express.json());
app.use(cors());

// Password validation
const validatePassword = (password) => {
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
};

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

  console.log("Signup request received:", { email, name, accountType });

  if (!email || !password || !name)
    return res.status(400).json({ error: "Missing fields" });

  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError });

  if (!categories || categories.length < 1 || categories.length > 5)
    return res.status(400).json({ error: "Select 1–5 categories" });

  try {
    console.log("Creating Supabase auth user...");
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user.id;
    console.log("Auth user created:", userId);

    console.log("Inserting user into database...");
    await supabase.from("users").insert({
      id: userId,
      email,
      name,
      account_type: accountType,
    });
    console.log("User inserted successfully");

    console.log("Inserting profile...");
    await supabase.from("profiles").insert({
      user_id: userId,
      categories,
      formats,
    });
    console.log("Profile inserted successfully");

    res.json({ success: true, userId });
  } catch (err) {
    console.error("Signup error:", err.message);
    console.error("Full error:", err);
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

app.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/me", async (req, res) => {
  try {
    // TEMPORARY: Using query param instead of auth header for testing
    const userId = req.query.userId || req.user?.id;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) throw userError;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileError) throw profileError;

    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/preferences/content", requireAuth, async (req, res) => {
  const { wantMore, wantLess } = req.body;

  if (!Array.isArray(wantMore) || !Array.isArray(wantLess)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const { error } = await supabase.from("content_preferences").upsert({
    user_id: req.user.id,
    want_more: wantMore,
    want_less: wantLess,
    updated_at: new Date(),
  });

  if (error) return res.status(500).json({ error: error.message });

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
