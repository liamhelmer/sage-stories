#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

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

// Create audio directory
const audioDir = path.join(__dirname, '..', 'docs', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

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

// Orangey's character introduction text
const orangeyText = "Hi! I'm Orangey! I'm an orange barn cat who loves adventures. I live on a farm where I keep watch for mice and protect our food. I'm brave, funny, and always ready to help my friends. Want to hear about my great mouse mission?";

// Generate TTS
function generateTTS() {
  return new Promise((resolve, reject) => {
    const outputFile = path.join(audioDir, 'orangey-intro.mp3');

    console.log('🎙️  Generating audio for Orangey character introduction...');

    const postData = JSON.stringify({
      input: orangeyText,
      model: 'tts-1-hd',
      voice: 'nova',
      speed: 0.95
    });

    const req = https.request(TTS_API, (res) => {
      if (res.statusCode !== 200) {
        console.error(`❌ API error: ${res.statusCode}`);
        reject(new Error(`API returned status ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputFile, buffer);
        const size = (buffer.length / 1024).toFixed(1);
        console.log(`✅ Orangey intro generated (${size} KB)`);
        console.log(`📁 Saved to: ${outputFile}`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Run the generation
console.log('🐱 Starting TTS generation for Orangey character...\n');

generateTTS()
  .then(() => {
    console.log('\n🎉 Orangey character audio generated successfully!');
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });