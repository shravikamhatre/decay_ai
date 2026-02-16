import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Generate endpoint
app.post('/generate', (req, res) => {
    const { niche, trend_type = 'content', mode = 'good' } = req.body;

    if (!niche) {
        return res.status(400).json({ error: 'Niche is required' });
    }

    console.log(`Starting generation for: ${niche}, ${trend_type}, ${mode}`);

    // Call the Python pipeline
    const pythonProcess = spawn('python', ['src/pipeline.py', niche, trend_type, mode]);

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        const chunk = data.toString();
        console.log(`[Python]: ${chunk}`);
        output += chunk;
    });

    pythonProcess.stderr.on('data', (data) => {
        const chunk = data.toString();
        // Python generic logs often go to stderr, so we accumulate but don't panic yet
        // console.error(`[Python API]: ${chunk}`);
        errorOutput += chunk;
    });

    pythonProcess.on('close', (code) => {
        // If code is non-zero, it failed
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            console.error(errorOutput);
            return res.status(500).json({ error: 'Generation failed', details: errorOutput });
        }
        res.json({ message: 'Generation complete', output });
    });
});

// Explain Trend Endpoint
import { explainTrend } from './llm/explainTrend.js';

app.post('/explain-trend', async (req, res) => {
    try {
        const { trend_name, base, platform, status, signals } = req.body;

        // Map frontend "status" -> "calendar_color"
        let calendar_color = 'red';
        if (status === 'rising') calendar_color = 'green';
        if (status === 'stable') calendar_color = 'yellow';

        // Map frontend "signals" -> "current_trend"
        const current_trend = {
            score: signals.score,
            velocity_change: signals.velocity_pct, // Mapping _pct -> _change (or just value)
            engagement: signals.engagement_pct,
            saturation: signals.saturation_pct,
            decay: signals.decay_score,
            appearance: signals.appearance_pct,
            novelty: signals.novelty
        };

        const trendData = {
            trend_name,
            base,
            platform,
            calendar_color,
            current_trend,
            recommended_trends: [] // Frontend doesn't send alternatives yet
        };

        const result = await explainTrend(trendData);
        res.json({ success: true, explanation: result.explanation });

    } catch (error) {
        console.error("Explanation error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve generated data
app.get('/data/:niche', (req, res) => {
    const { niche } = req.params;
    const filePath = path.join(__dirname, `daily_${niche}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Data not found' });
    }

    res.sendFile(filePath);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
