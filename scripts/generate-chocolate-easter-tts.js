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

const FUELIX_AUTH_TOKEN = process.env.FUELIX_AUTH_TOKEN;

if (!FUELIX_AUTH_TOKEN) {
    console.error('Error: FUELIX_AUTH_TOKEN environment variable is not set');
    console.error('Please set it in your .env file or environment');
    process.exit(1);
}

// Define the text content for each page
const pageTexts = [
    // Page 1
    "The morning sun rose over Sage Family Farm, painting the sky in beautiful shades of pink and gold. Spring had arrived, and with it came the sweet scent of blooming flowers and fresh grass. In different corners of the farm, four best friends were just beginning to wake up...",

    // Page 2
    "Luna, the playful black puppy, bounced out of her cozy bed with endless energy. Her tail wagged so fast it looked like a little black blur! 'Good morning, world! What adventures await today?' she barked joyfully. She raced to the garden for breakfast, chasing butterflies between bites of her morning kibble. Everything was a game to Luna, even eating!",

    // Page 3
    "Heidi, the adventurous German Shorthaired Pointer, stretched her spotted brown and white coat by the sparkling pond. The morning dew made the grass feel cool under her paws. 'Perfect morning for a swim!' she thought, watching the fish jump in the crystal-clear water. She enjoyed her breakfast of special fish-shaped treats by the water's edge, planning all the muddy adventures she'd have today.",

    // Page 4
    "Randy, the big fluffy white Samoyed, woke up with his usual gentle smile. Despite his loud bark, he was the sweetest giant on the farm. 'GOOD MORNING, FRIENDS!' he boomed softly, trying not to scare the little birds perched on his fluffy back. He carefully ate his breakfast, making sure not to knock over his water bowl or step on any of the beautiful Easter flowers blooming nearby.",

    // Page 5
    "Morphée, the wise calico cat with patches of orange, white, and black, observed the morning from her favorite branch in the old oak tree. 'Hmm, what's that shimmering path I see?' she mused, her green eyes catching something unusual in the distance. She elegantly ate her breakfast while keeping watch over the farm, her detective instincts already tingling with curiosity about the mysterious golden trail.",

    // Page 6
    "After breakfast, the four friends met at their favorite spot under the big oak tree, just as they did every morning. 'Look what I found!' Morphée announced. 'A shimmering path that wasn't here yesterday!' 'It looks like it's made of... chocolate wrappers?' Heidi sniffed curiously. 'An adventure!' Luna barked, bouncing with excitement. Randy smiled his gentle smile: 'Let's explore together!'",

    // Page 7
    "The friends followed the chocolate wrapper trail into the Whispering Woods. The path sparkled and shimmered, leading them deeper into the magical forest. 'Stay close, everyone,' Morphée advised, using her cat eyes to see in the dimmer light. The forest seemed to welcome them, with golden sparkles dancing in the air and a sweet chocolate scent growing stronger with each step.",

    // Page 8
    "The path opened into a beautiful clearing, where stood the most amazing sight - a chocolate workshop made entirely of candy! And there, wearing a purple bow tie, was... 'Welcome, friends! I'm Augustus, the Easter Bunny!' he said with a warm smile. 'I've been hoping you'd follow my trail!' The friends gasped in wonder. A real Easter Bunny! And he wanted to show them something special!",

    // Page 9
    "'First,' Augustus began, 'let me show you where chocolate comes from! Cacao trees grow in warm places near the equator.' He showed them pictures of cacao pods. 'Inside each pod are about 40 beans. We need 400 beans to make just one pound of chocolate!' 'Wow! That's a lot of beans!' Luna barked in amazement.",

    // Page 10
    "'Next, we roast the beans at 300 degrees,' Augustus explained, showing them the big roasting drum. 'This is where the chocolate flavor develops!' 'It smells amazing!' Heidi sniffed the air, her tail wagging. The friends watched as the beans tumbled and turned darker, filling the workshop with the most delicious chocolate aroma.",

    // Page 11
    "'Now we grind the roasted beans between heavy stones,' Augustus demonstrated. 'This makes chocolate liquor - it's not alcohol, just pure liquid chocolate!' 'Then we add sugar and milk powder, mixing everything together for hours until it's perfectly smooth.' 'Can we help stir?' Luna asked eagerly, already bouncing toward the mixing bowl.",

    // Page 12
    "'This is the trickiest part,' Augustus said seriously. 'We must temper the chocolate by carefully controlling its temperature.' 'We heat it to 88 degrees Fahrenheit, cool it to 82 degrees, then warm it back to 88 degrees. This makes the chocolate shiny and gives it that perfect snap when you break it!' 'It's like chocolate science!' Morphée observed wisely.",

    // Page 13
    "'Now for the fun part - molding!' Augustus poured the tempered chocolate into egg-shaped molds. 'Each egg can be decorated differently!' The friends each got to decorate their own egg: Luna added colorful sprinkles, Heidi chose crunchy nuts, Randy picked fluffy marshmallows, and Morphée created artistic patterns. 'These are the most beautiful eggs ever!' Randy boomed gently.",

    // Page 14
    "'Now that you know how to make chocolate,' Augustus said with a twinkle in his eye, 'let's play a game! Can you catch the Easter Bunny?' With a playful hop, Augustus bounded out of the workshop, leaving a trail of small chocolate eggs behind him! 'It's a chase!' Luna barked excitedly, already racing after him.",

    // Page 15
    "The chase led them to a river of flowing chocolate! There were stepping stones, but they were slippery. 'I've got this!' Heidi called out, diving in. 'I love swimming!' Heidi swam across easily, helping guide her friends to the safest stones. Her water skills saved the day!",

    // Page 16
    "Next came Marshmallow Mountain - soft, fluffy, and impossible to climb! Everyone kept sinking into the squishy sweetness. 'Let me help!' Randy barked in his gentle booming voice. Using his strength and size, Randy pushed through the marshmallows, creating a path for his smaller friends to follow. Together, they made it to the top!",

    // Page 17
    "The Licorice Maze was tall and twisting! The black licorice walls were too high to see over. 'I'll climb up and guide you through!' Morphée announced, using her cat skills. From the top of the maze walls, Morphée could see the whole path. She called out directions, leading everyone safely through the sweet-smelling maze.",

    // Page 18
    "The Giggling Gumdrop Grove was full of bouncing, giggling gumdrops! They tickled everyone who passed through! 'This is the BEST!' Luna laughed, bouncing as high as the gumdrops. Luna's endless energy matched the bouncing gumdrops perfectly. She led her friends through the grove, all of them laughing and bouncing together!",

    // Page 19
    "'You caught me!' Augustus laughed. 'And you worked together so wonderfully! Each of you used your special talents to help your friends.' He presented each friend with a special chocolate egg: Luna got one decorated with playful patterns, Heidi received one with swimming fish designs, Randy's had beautiful flowers, and Morphée's sparkled with golden stars. 'Thank you for teaching us about chocolate!' they all said together.",

    // Page 20
    "As the sun set over Sage Family Farm, the four friends walked home together, each carrying their special chocolate egg. They had started the day with a simple morning routine, but ended it with an amazing adventure, new knowledge about chocolate, and memories they would treasure forever. 'Same time tomorrow?' Luna asked hopefully. Her friends all smiled and nodded. Every day was an adventure when you had best friends to share it with! The End."
];

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
    const audioDir = path.join(__dirname, '..', 'docs', 'stories', 'audio', 'chocolate-easter');

    // Create directory if it doesn't exist
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
        console.log(`Created directory: ${audioDir}`);
    }

    console.log('Starting TTS generation for Chocolate Easter Adventure...');
    console.log(`Generating ${pageTexts.length} audio files...`);

    for (let i = 0; i < pageTexts.length; i++) {
        const pageNum = i + 1;
        const outputPath = path.join(audioDir, `page-${pageNum}.mp3`);

        // Check if file already exists
        if (fs.existsSync(outputPath)) {
            console.log(`Page ${pageNum}: Audio already exists, skipping...`);
            continue;
        }

        console.log(`Page ${pageNum}: Generating audio...`);

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