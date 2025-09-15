#!/usr/bin/env node

/**
 * Story Generator Script
 * Generates a new story from a JSON configuration file
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Usage: node generate-story.js <config-file.json>');
    console.log('Example: node generate-story.js templates/story-config-example.json');
    process.exit(1);
}

const configFile = args[0];
if (!fs.existsSync(configFile)) {
    console.error(`Configuration file not found: ${configFile}`);
    process.exit(1);
}

// Load configuration
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
console.log(`\n📚 Generating story: ${config.title}\n`);

// Load template
const templatePath = path.join(__dirname, '../docs/templates/story-template.html');
let template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
template = template.replace(/\[STORY_TITLE\]/g, config.title);

// Update configuration in the template
const configScript = `
        // Configure your story
        const storyConfig = {
            title: '${config.title}',
            totalPages: ${config.totalPages},
            audioEnabled: ${config.features.audioEnabled},
            audioPath: 'audio/',
            eggHuntEnabled: ${config.features.eggHuntEnabled},
            totalEggs: ${config.features.totalEggs || 0},
            pageTransitionSound: ${config.features.pageTransitionSound}
        };`;

template = template.replace(
    /const storyConfig = \{[^}]+\};/s,
    configScript
);

// Generate pages HTML
let pagesHTML = '';

// Helper function to create SVG scene
function createSVGScene(pageConfig) {
    const defaults = config.svgDefaults;
    let svg = `
                <svg class="page-illustration" viewBox="${defaults.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                    <!-- Sky -->
                    <rect width="800" height="${defaults.skyHeight}" fill="${defaults.skyColor}"/>

                    <!-- Ground -->
                    <rect y="${defaults.skyHeight}" width="800" height="${defaults.groundHeight}" fill="${defaults.groundColor}"/>`;

    // Add sun if morning/day scene
    if (pageConfig.scene && (pageConfig.scene.time === 'morning' || pageConfig.scene.time === 'day')) {
        svg += `

                    <!-- Sun -->
                    <circle cx="${defaults.sunPosition.x}" cy="${defaults.sunPosition.y}" r="${defaults.sunRadius}" fill="${defaults.sunColor}"/>`;
    }

    // Add moon if night scene
    if (pageConfig.scene && pageConfig.scene.time === 'night') {
        svg += `

                    <!-- Moon -->
                    <circle cx="650" cy="80" r="30" fill="#F0E68C"/>

                    <!-- Stars -->
                    <circle cx="100" cy="50" r="2" fill="white"/>
                    <circle cx="200" cy="80" r="2" fill="white"/>
                    <circle cx="300" cy="40" r="2" fill="white"/>
                    <circle cx="500" cy="60" r="2" fill="white"/>
                    <circle cx="700" cy="90" r="2" fill="white"/>`;
    }

    // Add eggs if configured
    if (pageConfig.eggs && config.features.eggHuntEnabled) {
        pageConfig.eggs.forEach(egg => {
            svg += `

                    <!-- Easter Egg -->
                    <ellipse class="egg" cx="${egg.x}" cy="${egg.y}" rx="15" ry="20"
                             fill="${egg.color}" onclick="storyEngine.collectEgg(this)"/>`;
        });
    }

    // Add placeholder for characters
    svg += `

                    <!-- Characters placeholder -->
                    <text x="400" y="250" text-anchor="middle" font-size="20" fill="#666">
                        [Add character illustrations here]
                    </text>`;

    svg += `
                </svg>`;

    return svg;
}

// Generate pages from configuration
if (config.pages && config.pages.length > 0) {
    config.pages.forEach((page, index) => {
        const isActive = index === 0 ? ' active' : '';
        const svgScene = createSVGScene(page);

        pagesHTML += `
            <!-- Page ${page.number} -->
            <div class="story-page${isActive}" id="page-${page.number}">
${svgScene}
                <div class="page-text">
                    <p>${page.text}</p>
                    <span class="page-counter">Page ${page.number} of ${config.totalPages}</span>
                </div>
            </div>
`;
    });
} else {
    // Generate placeholder pages
    for (let i = 1; i <= config.totalPages; i++) {
        const isActive = i === 1 ? ' active' : '';
        pagesHTML += `
            <!-- Page ${i} -->
            <div class="story-page${isActive}" id="page-${i}">
                <svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                    <rect width="800" height="350" fill="${config.svgDefaults.skyColor}"/>
                    <rect y="350" width="800" height="150" fill="${config.svgDefaults.groundColor}"/>
                    <text x="400" y="250" text-anchor="middle" font-size="30" fill="#333">Page ${i}</text>
                </svg>
                <div class="page-text">
                    <p>[Page ${i} text goes here]</p>
                    <span class="page-counter">Page ${i} of ${config.totalPages}</span>
                </div>
            </div>
`;
    }
}

// Find the pages section and replace it
const startMarker = '<!-- Page 1 -->';
const endMarker = '<!-- Navigation Controls -->';
const startIndex = template.indexOf(startMarker);
const endIndex = template.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    template = template.substring(0, startIndex) +
               pagesHTML + '\n        </main>\n\n        ' +
               template.substring(endIndex);
}

// Update egg counter visibility
if (config.features.eggHuntEnabled) {
    template = template.replace(
        '<div id="egg-counter" style="display: none;">',
        '<div id="egg-counter">'
    );
    template = template.replace(
        'Eggs Found: <span id="egg-count">0</span>/0',
        `Eggs Found: <span id="egg-count">0</span>/${config.features.totalEggs}`
    );
}

// Apply theme colors if specified
if (config.themes) {
    const customStyles = `
        /* Custom theme styles */
        .story-body {
            background: linear-gradient(135deg, ${config.themes.backgroundColor.start} 0%, ${config.themes.backgroundColor.end} 100%);
        }

        .page-text {
            background: ${config.themes.textBackground};
        }

        .nav-button {
            color: ${config.themes.accentColor};
            border-color: ${config.themes.accentColor};
        }

        .nav-button:hover:not(:disabled) {
            background: ${config.themes.accentColor};
        }`;

    template = template.replace(
        '/* Add any story-specific styles here */',
        customStyles
    );
}

// Write the generated story file
const outputPath = config.generation.outputPath || `docs/stories/${config.title.toLowerCase().replace(/\s+/g, '-')}.html`;
const outputDir = path.dirname(outputPath);

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the file
fs.writeFileSync(outputPath, template);
console.log(`✅ Story generated: ${outputPath}`);

// Generate TTS configuration file if requested
if (config.generation.generateTTS && config.pages) {
    const ttsScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .profile
const profilePath = path.join(process.env.HOME, '.profile');
const profileContent = fs.readFileSync(profilePath, 'utf8');
const authTokenMatch = profileContent.match(/export FUELIX_AUTH_TOKEN=["']?([^"'\\n]+)["']?/);

if (!authTokenMatch) {
    console.error('FUELIX_AUTH_TOKEN not found in ~/.profile');
    process.exit(1);
}

const FUELIX_AUTH_TOKEN = authTokenMatch[1];

// Page texts for TTS generation
const pageTexts = ${JSON.stringify(config.pages.map(p => p.text), null, 4)};

// Audio settings
const audioSettings = ${JSON.stringify(config.audioSettings, null, 4)};

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, '${config.generation.audioOutputPath || 'docs/stories/audio'}');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Function to generate TTS for a single page
async function generateTTS(text, pageNumber) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: audioSettings.model,
            input: text,
            voice: audioSettings.voice,
            response_format: audioSettings.format,
            speed: audioSettings.speed
        });

        const options = {
            hostname: audioSettings.apiEndpoint.replace('https://', '').replace('http://', ''),
            port: 443,
            path: '/v1/audio/speech',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': \`Bearer \${FUELIX_AUTH_TOKEN}\`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        console.log(\`Generating audio for page \${pageNumber}...\`);

        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                console.error(\`Error: Status \${res.statusCode} for page \${pageNumber}\`);
                reject(new Error(\`HTTP \${res.statusCode}\`));
                return;
            }

            const outputPath = path.join(audioDir, \`page-\${pageNumber}.mp3\`);
            const writeStream = fs.createWriteStream(outputPath);

            res.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log(\`✓ Page \${pageNumber} audio saved\`);
                resolve(outputPath);
            });

            writeStream.on('error', reject);
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

// Generate all audio files
async function generateAllAudio() {
    console.log('Generating TTS for ${config.title}...');

    for (let i = 0; i < pageTexts.length; i++) {
        try {
            await generateTTS(pageTexts[i], i + 1);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(\`Failed to generate audio for page \${i + 1}:\`, error.message);
        }
    }

    console.log('\\n✓ Audio generation complete!');
}

generateAllAudio().catch(console.error);
`;

    const ttsScriptPath = outputPath.replace('.html', '-tts.js');
    fs.writeFileSync(ttsScriptPath, ttsScript);
    console.log(`✅ TTS script generated: ${ttsScriptPath}`);
    console.log(`   Run it with: node ${ttsScriptPath}`);
}

console.log('\n📖 Story generation complete!');
console.log(`\nNext steps:
1. Edit the generated file to add character illustrations
2. Update the story text for each page
3. Generate audio files (if using TTS)
4. Test the story in a browser
5. Link it from the main index.html when ready\n`);