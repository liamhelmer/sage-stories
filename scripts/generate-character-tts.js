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

// Character descriptions for TTS generation
const characterDescriptions = {
    'luna': {
        name: 'Luna',
        text: 'Hi! I\'m Luna, a playful black puppy who loves toys! I have soft, fuzzy black fur and I love to play fetch with my red ball. Want to play with me?'
    },
    'heidi': {
        name: 'Heidi',
        text: 'Hello there! I\'m Heidi, a German Shorthaired Pointer. I absolutely love swimming and, well, I have to admit, I enjoy rolling in mud too! It\'s so much fun getting all muddy!'
    },
    'randy': {
        name: 'Randy',
        text: 'WOOF WOOF! I\'m Randy! I\'m big, white, and super fluffy like a cloud! I love to bark really, really loudly to let everyone know I\'m here. Did you hear my bark? WOOF!'
    },
    'morphee': {
        name: 'Morphée',
        text: 'Meow! I\'m Morphée, a calico cat with orange, black, and white patches. I\'m quite mischievous and I love climbing trees. I can climb higher than anyone else on the farm!'
    }
};

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, '../docs/audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Function to generate TTS for a single character
async function generateTTS(characterId, description) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: 'tts-1-hd',
            input: description.text,
            voice: 'nova',
            response_format: 'mp3',
            speed: 0.95  // Slightly slower for children's content
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

        console.log(`Generating audio for ${description.name}...`);

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Error: Status ${res.statusCode} for ${description.name}`);
                let errorBody = '';
                res.on('data', (chunk) => errorBody += chunk);
                res.on('end', () => {
                    console.error('Error response:', errorBody);
                    reject(new Error(`HTTP ${res.statusCode}: ${errorBody}`));
                });
                return;
            }

            const outputPath = path.join(audioDir, `character-${characterId}.mp3`);
            const writeStream = fs.createWriteStream(outputPath);

            res.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log(`✓ ${description.name} audio saved to ${outputPath}`);
                resolve(outputPath);
            });

            writeStream.on('error', (err) => {
                console.error(`Error writing file for ${description.name}:`, err);
                reject(err);
            });
        });

        req.on('error', (err) => {
            console.error(`Request error for ${description.name}:`, err);
            reject(err);
        });

        req.write(postData);
        req.end();
    });
}

// Process all characters
async function generateAllCharacterAudio() {
    console.log('Generating TTS for character descriptions...\n');

    for (const [characterId, description] of Object.entries(characterDescriptions)) {
        const audioPath = path.join(audioDir, `character-${characterId}.mp3`);

        // Check if file already exists
        if (fs.existsSync(audioPath)) {
            console.log(`✓ ${description.name} audio already exists, skipping...`);
            continue;
        }

        try {
            await generateTTS(characterId, description);
            // Add delay between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to generate audio for ${description.name}:`, error.message);
        }
    }

    console.log('\n✓ Character audio generation complete!');
    console.log('Audio files saved to:', audioDir);
}

// Run the generation
generateAllCharacterAudio().catch(console.error);