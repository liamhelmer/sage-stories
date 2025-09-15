#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .profile
const profilePath = path.join(process.env.HOME, '.profile');
const profileContent = fs.readFileSync(profilePath, 'utf8');
const authTokenMatch = profileContent.match(/export FUELIX_AUTH_TOKEN=["']?([^"'\n]+)["']?/);

if (!authTokenMatch) {
    console.error('FUELIX_AUTH_TOKEN not found in ~/.profile');
    process.exit(1);
}

const FUELIX_AUTH_TOKEN = authTokenMatch[1];

// Remaining page texts for TTS generation
const pageTexts = {
    19: "It was time for bed. The friends were tired but happy after their wonderful Easter adventure. They each took some eggs to their beds, planning to share them with everyone on the farm tomorrow. Through the window, they could see the Easter Bunny hopping away under the stars.",
    20: "As they drifted off to sleep, each friend dreamed of their wonderful day. Luna dreamed of playing catch, Heidi dreamed of swimming, Randy dreamed of his loud happy barks, and Morphée dreamed of climbing trees. The golden egg sat safely between them, glowing softly with the magic of their friendship. And somewhere out there, the Easter Bunny smiled, knowing he had found the very best of friends. Happy Easter!"
};

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, '../docs/stories/audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Function to generate TTS for a single page
async function generateTTS(text, pageNumber) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: 'tts-1-hd',
            input: text,
            voice: 'nova',
            response_format: 'mp3',
            speed: 0.95  // Slightly slower for children's story
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

        console.log(`Generating audio for page ${pageNumber}...`);

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Error: Status ${res.statusCode} for page ${pageNumber}`);
                let errorBody = '';
                res.on('data', (chunk) => errorBody += chunk);
                res.on('end', () => {
                    console.error('Error response:', errorBody);
                    reject(new Error(`HTTP ${res.statusCode}: ${errorBody}`));
                });
                return;
            }

            const outputPath = path.join(audioDir, `page-${pageNumber}.mp3`);
            const writeStream = fs.createWriteStream(outputPath);

            res.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log(`✓ Page ${pageNumber} audio saved to ${outputPath}`);
                resolve(outputPath);
            });

            writeStream.on('error', (err) => {
                console.error(`Error writing file for page ${pageNumber}:`, err);
                reject(err);
            });
        });

        req.on('error', (err) => {
            console.error(`Request error for page ${pageNumber}:`, err);
            reject(err);
        });

        req.write(postData);
        req.end();
    });
}

// Process remaining pages
async function generateRemainingAudio() {
    console.log('Generating remaining TTS files...\n');

    for (const [pageNum, text] of Object.entries(pageTexts)) {
        const audioPath = path.join(audioDir, `page-${pageNum}.mp3`);

        // Check if file already exists
        if (fs.existsSync(audioPath)) {
            console.log(`✓ Page ${pageNum} already exists, skipping...`);
            continue;
        }

        try {
            await generateTTS(text, parseInt(pageNum));
            // Add delay between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to generate audio for page ${pageNum}:`, error.message);
        }
    }

    console.log('\n✓ Remaining audio generation complete!');
}

// Run the generation
generateRemainingAudio().catch(console.error);