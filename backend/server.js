const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage (for development/testing without PostgreSQL)
const users = new Map();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from any localhost port
        if (!origin || origin.startsWith('http://localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Signup - Create new user
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { email, password, firstName, lastName, primaryGoal } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if user exists
        if (users.has(email)) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Create user
        const user = {
            id: Date.now().toString(),
            email,
            password_hash: password,
            first_name: firstName,
            last_name: lastName,
            primary_goal: primaryGoal,
            created_at: new Date().toISOString()
        };

        users.set(email, user);
        console.log(`✅ User created: ${email}`);

        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = users.get(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        if (user.password_hash !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log(`✅ User logged in: ${email}`);

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update user preferences (onboarding)
app.post("/api/user/preferences", async (req, res) => {
    try {
        const { email, name, useCase, niches, formats } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = users.get(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user preferences
        user.brand_category = useCase;
        user.niche = niches.join(", ");
        user.content_format = formats;
        users.set(email, user);

        console.log(`✅ Preferences updated for: ${email}`);

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                niche: user.niche,
                contentFormat: user.content_format,
            }
        });
    } catch (error) {
        console.error("Preferences error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Using in-memory storage (data will reset on restart)`);
});
