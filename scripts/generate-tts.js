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

// Page texts for TTS generation
const pageTexts = [
    // Page 1
    "On a beautiful Easter morning, the sun was shining bright over the farm. Luna the black puppy was the first to wake up. She stretched, yawned, and looked out the window. Oh my! she barked excitedly, her tail wagging so fast it looked like a blur.",

    // Page 2
    "Wake up, everyone! Wake up! Luna barked, jumping on each of her friends' beds. The Easter Bunny is here! I saw him in our garden! Heidi opened one sleepy eye, then both eyes went wide. Randy's fluffy tail started wagging even before he fully woke up.",

    // Page 3
    "Morphee the calico cat was already sitting on the window sill, her tail swishing back and forth. I've been watching him for a while, she purred. He's leaving colorful eggs all around our farm! Look at that trail of eggs!",

    // Page 4
    "Come on, everyone! Let's go meet the Easter Bunny! shouted Randy in his big, booming voice. All four friends rushed through the door, tumbling over each other in their excitement. The morning air was fresh and sweet with the smell of spring flowers.",

    // Page 5
    "The Easter Bunny saw them coming and laughed playfully. Catch me if you can! he called out in a sweet, tinkling voice. He hopped through the flower garden, his white fur sparkling in the morning sunshine, leaving a trail of beautiful eggs behind him.",

    // Page 6
    "The chase led them through the vegetable garden. The Easter Bunny stopped to nibble on a carrot. These are delicious! he said with a giggle. Luna used her excellent nose to follow his scent. He went this way! she barked, her nose to the ground.",

    // Page 7
    "Randy tried to help by barking very loudly. WOOF! WOOF! MR. EASTER BUNNY, PLEASE STOP! His bark was so loud that birds flew out of the trees and the Easter Bunny's ears stood straight up in surprise. But instead of stopping, he just hopped faster!",

    // Page 8
    "They came to a big mud puddle. Oh boy! My favorite! exclaimed Heidi, and she jumped right in, rolling around happily. She got completely covered in mud from her spots to her floppy ears. Morphee carefully walked around the puddle, keeping her paws clean.",

    // Page 9
    "I have an idea! meowed Morphee. With her sharp claws, she quickly climbed up the tallest tree. From the top, she could see the whole farm. There he is! He's heading toward the pond! she called down to her friends, her calico fur shining in the sunlight.",

    // Page 10
    "At the pond, Heidi didn't hesitate. SPLASH! She jumped right in, swimming with powerful strokes. I love water! she barked happily, shaking water everywhere. The Easter Bunny had hopped onto a lily pad, giggling as he watched Heidi swim in circles trying to reach him.",

    // Page 11
    "Luna had a clever idea. She ran back to get her favorite red ball. Mr. Easter Bunny! she called. Do you want to play? The Easter Bunny's eyes lit up with curiosity. He loved games! He hopped closer to see the shiny red ball.",

    // Page 12
    "Soon they were all playing together! Luna threw the ball, and everyone tried to catch it - even the Easter Bunny! They ran back and forth across the farm, laughing and barking and meowing. The Easter Bunny's giggle was like tinkling bells.",

    // Page 13
    "After playing, the Easter Bunny said, Thank you for being such good friends! I've hidden special Easter eggs all around your farm. Can you find them? The friends' eyes grew wide with excitement. They started searching everywhere!",

    // Page 14
    "Luna used her excellent nose to sniff out eggs hidden in the dirt. Heidi found eggs near the pond (and got even muddier!). Morphee climbed trees to find eggs in bird nests. Randy used his loud bark to call out whenever anyone found an egg. They were a great team!",

    // Page 15
    "As the sun began to set, painting the sky in beautiful orange and pink colors, they all sat together on a soft blanket. Each friend had found special eggs, and they decided to share them equally. The Easter Bunny was so happy to see such good friends sharing.",

    // Page 16
    "The Easter Bunny told them wonderful stories about his travels. You four are the best friends I've met this year, he said warmly. You play together, help each other, and share everything. That's what Easter is really about - friendship and kindness!",

    // Page 17
    "I have one more surprise, said the Easter Bunny with a twinkle in his eye. He pulled out a beautiful golden egg that sparkled in the moonlight. This is a special friendship egg. As long as you stay friends and share it, it will bring you good luck and happiness!",

    // Page 18
    "All five friends put their paws together over the golden egg. We promise to always be the best of friends! they said together. The golden egg glowed warmly, sealing their promise. The Easter Bunny's heart was full of joy seeing such wonderful friendship.",

    // Page 19
    "It was time for bed. The friends were tired but happy after their wonderful Easter adventure. They each took some eggs to their beds, planning to share them with everyone on the farm tomorrow. Through the window, they could see the Easter Bunny hopping away under the stars.",

    // Page 20
    "As they drifted off to sleep, each friend dreamed of their wonderful day. Luna dreamed of playing catch, Heidi dreamed of swimming, Randy dreamed of his loud happy barks, and Morphee dreamed of climbing trees. The golden egg sat safely between them, glowing softly with the magic of their friendship. And somewhere out there, the Easter Bunny smiled, knowing he had found the very best of friends. Happy Easter!"
];

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

// Process all pages with rate limiting
async function generateAllAudio() {
    console.log('Starting TTS generation for Easter Bunny story...');
    console.log(`Found ${pageTexts.length} pages to process`);
    console.log('Using Fuelix API with tts-1-hd model and nova voice\n');

    const results = [];

    for (let i = 0; i < pageTexts.length; i++) {
        try {
            const result = await generateTTS(pageTexts[i], i + 1);
            results.push({ page: i + 1, success: true, path: result });

            // Add delay between requests to avoid rate limiting
            if (i < pageTexts.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error(`Failed to generate audio for page ${i + 1}:`, error.message);
            results.push({ page: i + 1, success: false, error: error.message });
        }
    }

    // Summary
    console.log('\n=== Generation Complete ===');
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✓ Successfully generated: ${successful} audio files`);
    if (failed > 0) {
        console.log(`✗ Failed: ${failed} audio files`);
        console.log('\nFailed pages:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`  - Page ${r.page}: ${r.error}`);
        });
    }

    console.log(`\nAudio files saved to: ${audioDir}`);
}

// Run the generation
generateAllAudio().catch(console.error);