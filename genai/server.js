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
        console.error(`[Python API]: ${chunk}`);
        errorOutput += chunk;
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Generation failed', details: errorOutput });
        }
        res.json({ message: 'Generation complete', output });
    });
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
