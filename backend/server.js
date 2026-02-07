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

// Get trending content for a niche
const fs = require("fs");
const path = require("path");

app.get("/api/trends/:niche", (req, res) => {
    try {
        const { niche } = req.params;

        // Capitalize first letter for filename
        const nicheCapitalized = niche.charAt(0).toUpperCase() + niche.slice(1).toLowerCase();
        const filePath = path.join(__dirname, "..", "genai", `daily_${nicheCapitalized}.json`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: `No trends found for niche: ${niche}` });
        }

        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        // Calculate content schedule - distribute top trends across 7 days
        const today = new Date();
        const schedule = [];

        // Add top trending content (good category)
        data.top_trends_good.slice(0, 7).forEach((trend, index) => {
            const date = new Date(today);
            date.setDate(date.getDate() + index);

            schedule.push({
                id: `trend-${index}`,
                title: trend.name,
                category: trend.score > 10 ? "good" : trend.score > 2 ? "okay" : "bad",
                date: date.toISOString().split("T")[0],
                score: trend.score,
                signals: trend.signals,
                type: "trend"
            });
        });

        // Add top music recommendations
        data.top_music_good.slice(0, 5).forEach((music, index) => {
            const date = new Date(today);
            date.setDate(date.getDate() + index);

            schedule.push({
                id: `music-${index}`,
                title: `🎵 ${music.name}`,
                category: music.score > 5 ? "good" : "okay",
                date: date.toISOString().split("T")[0],
                score: music.score,
                signals: music.signals,
                type: "music"
            });
        });

        // Add declining trends as warnings
        data.top_trends_declining.slice(0, 3).forEach((trend, index) => {
            const date = new Date(today);
            date.setDate(date.getDate() + index + 2);

            schedule.push({
                id: `decline-${index}`,
                title: `⚠️ Avoid: ${trend.name}`,
                category: "bad",
                date: date.toISOString().split("T")[0],
                score: trend.score,
                signals: trend.signals,
                type: "declining"
            });
        });

        console.log(`📊 Trends loaded for: ${niche} (${schedule.length} items)`);

        res.json({
            success: true,
            niche: data.niche,
            schedule,
            raw: {
                trendsGood: data.top_trends_good,
                trendsDeclining: data.top_trends_declining,
                musicGood: data.top_music_good,
                musicDeclining: data.top_music_declining
            }
        });
    } catch (error) {
        console.error("Trends error:", error);
        res.status(500).json({ error: "Failed to load trends" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Using in-memory storage (data will reset on restart)`);
});
