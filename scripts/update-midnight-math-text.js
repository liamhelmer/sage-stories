#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read configuration
const configPath = path.join(__dirname, '..', 'docs', 'stories', 'midnight-math-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Read HTML file
const htmlPath = path.join(__dirname, '..', 'docs', 'stories', 'midnight-math-mystery.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Update each page's text
config.pages.forEach(page => {
    // Create regex to find the specific page's text
    const pageRegex = new RegExp(
        `(<div class="story-page[^"]*" id="page-${page.number}"[^>]*>.*?<div class="page-text">\\s*<p>)[^<]*(</p>)`,
        's'
    );

    // Replace the text
    html = html.replace(pageRegex, `$1${page.text}$2`);
    console.log(`✅ Updated page ${page.number}`);
});

// Save the updated HTML
fs.writeFileSync(htmlPath, html);
console.log('\n✨ All pages updated successfully!');