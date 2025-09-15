#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load auth token from profile
const homeDir = require('os').homedir();
const profilePath = path.join(homeDir, '.profile');
const profileContent = fs.readFileSync(profilePath, 'utf8');
const tokenMatch = profileContent.match(/export FUELIX_AUTH_TOKEN=["']?([^"'\n]+)["']?/);
const authToken = tokenMatch ? tokenMatch[1] : null;

if (!authToken) {
  console.error('❌ FUELIX_AUTH_TOKEN not found in ~/.profile');
  process.exit(1);
}

// Load story configuration
const configPath = path.join(__dirname, '..', 'docs', 'stories', 'midnight-math-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Audio directory
const audioDir = path.join(__dirname, '..', 'docs', 'stories', 'audio', 'midnight-math');

// TTS API configuration
const TTS_API = {
  hostname: 'api.fuelix.ai',
  path: '/v1/audio/speech',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  }
};

// Generate TTS for a single page with pauses for math
function generateTTS(pageNumber, text) {
  return new Promise((resolve, reject) => {
    const outputFile = path.join(audioDir, `page-${pageNumber}.mp3`);

    console.log(`🎙️  Generating audio for page ${pageNumber}...`);

    // Add slight pauses before answers by replacing "..." with a pause
    // The TTS should naturally pause slightly at ellipsis
    const processedText = text
      .replace(/\.\.\. That's/g, '... ... That\'s')
      .replace(/\.\.\. That/g, '... ... That')
      .replace(/equals/g, '... equals');

    const postData = JSON.stringify({
      input: processedText,
      model: 'tts-1-hd',
      voice: 'nova',
      speed: 0.95
    });

    const req = https.request(TTS_API, (res) => {
      if (res.statusCode !== 200) {
        console.error(`❌ API error for page ${pageNumber}: ${res.statusCode}`);
        reject(new Error(`API returned status ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputFile, buffer);
        const size = (buffer.length / 1024).toFixed(1);
        console.log(`✅ Page ${pageNumber} generated (${size} KB)`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for page ${pageNumber}:`, error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Process pages sequentially with delay
async function processPages() {
  console.log('🌙 Starting audio regeneration for Midnight Math Mystery...\n');
  console.log('📝 Text now includes answers after pauses\n');

  // Delete existing files first
  const existingFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  existingFiles.forEach(file => {
    fs.unlinkSync(path.join(audioDir, file));
  });
  console.log(`🗑️  Deleted ${existingFiles.length} existing audio files\n`);

  for (const page of config.pages) {
    try {
      await generateTTS(page.number, page.text);
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed to generate page ${page.number}:`, error.message);
      // Continue with next page even if one fails
    }
  }

  // Check results
  const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  console.log(`\n📊 Generated ${files.length} of ${config.pages.length} audio files`);

  if (files.length === config.pages.length) {
    const totalSize = files.reduce((sum, file) => {
      const stats = fs.statSync(path.join(audioDir, file));
      return sum + stats.size;
    }, 0);
    console.log(`✨ Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log('🎉 All audio files regenerated successfully with answers!');
  } else {
    const missing = [];
    for (let i = 1; i <= config.pages.length; i++) {
      if (!files.includes(`page-${i}.mp3`)) {
        missing.push(i);
      }
    }
    if (missing.length > 0) {
      console.log(`⚠️  Missing pages: ${missing.join(', ')}`);
      console.log('Run the script again to generate missing files.');
    }
  }
}

// Run the generation
processPages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});