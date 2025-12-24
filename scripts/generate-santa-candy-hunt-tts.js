#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Try to load dotenv if available
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not available, continue without it
}

// Load environment variables from .profile if not in env
if (!process.env.FUELIX_AUTH_TOKEN) {
    try {
        const profilePath = path.join(process.env.HOME, '.profile');
        if (fs.existsSync(profilePath)) {
            const profileContent = fs.readFileSync(profilePath, 'utf8');
            const authTokenMatch = profileContent.match(/export FUELIX_AUTH_TOKEN=["']?([^"'\n]+)["']?/);
            if (authTokenMatch) {
                process.env.FUELIX_AUTH_TOKEN = authTokenMatch[1];
            }
        }
    } catch (e) {
        console.warn('Could not read .profile');
    }
}

const FUELIX_AUTH_TOKEN = process.env.FUELIX_AUTH_TOKEN;

if (!FUELIX_AUTH_TOKEN) {
    console.error('Error: FUELIX_AUTH_TOKEN environment variable is not set');
    console.error('Please set it in your .env file or environment, or ensure it is in ~/.profile');
    process.exit(1);
}

// Path to the story HTML file
const STORY_PATH = path.join(__dirname, '../docs/stories/santa-candy-hunt.html');

// Function to extract text from HTML
function extractPageTexts(htmlPath) {
    if (!fs.existsSync(htmlPath)) {
        throw new Error(`Story file not found at ${htmlPath}`);
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const pageTexts = [];

    // Regex to capture content inside <div class="page-text"><p>...</p>...</div>
    // This is a simplified regex and assumes a specific structure.
    const pageTextRegex = /<div class="page-text">\s*<p>([\s\S]*?)<\/p>/g;

    let match;
    while ((match = pageTextRegex.exec(htmlContent)) !== null) {
        // Clean up the text: remove newlines, extra spaces, and decode HTML entities if needed
        let text = match[1]
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        pageTexts.push(text);
    }

    return pageTexts;
}

// Function to generate TTS for a single text
async function generateTTS(text, outputPath) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: "tts-1-hd",
            input: text,
            voice: "nova",
            speed: 0.95
        });

        const options = {
            hostname: 'api.fuelix.ai',
            port: 443,
            path: '/v1/audio/speech',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${FUELIX_AUTH_TOKEN}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                return;
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                fs.writeFileSync(outputPath, buffer);
                resolve();
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Main function to generate all audio files
async function generateAllAudio() {
    const audioDir = path.join(__dirname, '..', 'docs', 'stories', 'audio', 'santa-candy-hunt');

    // Create directory if it doesn't exist
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
        console.log(`Created directory: ${audioDir}`);
    }

    console.log('Extracting text from story file...');
    let pageTexts = [];
    try {
        pageTexts = extractPageTexts(STORY_PATH);
        console.log(`Found ${pageTexts.length} pages of text.`);
    } catch (e) {
        console.error('Error extracting text:', e.message);
        process.exit(1);
    }

    console.log('Starting TTS generation for Santa\'s Candy Hunt...');

    for (let i = 0; i < pageTexts.length; i++) {
        const pageNum = i + 1;
        const outputPath = path.join(audioDir, `page-${pageNum}.mp3`);

        // Check if file already exists
        if (fs.existsSync(outputPath)) {
            console.log(`Page ${pageNum}: Audio already exists, skipping...`);
            continue;
        }

        console.log(`Page ${pageNum}: Generating audio for text: "${pageTexts[i].substring(0, 30)}..."`);

        try {
            await generateTTS(pageTexts[i], outputPath);
            console.log(`Page ${pageNum}: ✓ Audio generated successfully`);

            // Add a small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Page ${pageNum}: ✗ Error generating audio:`, error.message);
        }
    }

    console.log('\nTTS generation complete!');
    console.log(`Audio files saved to: ${audioDir}`);
}

// Run the script
generateAllAudio().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
