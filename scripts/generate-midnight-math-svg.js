#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SVG generation functions for each scene type
const sceneGenerators = {
  night_bedroom: () => `
    <!-- Night bedroom scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightGradient)"/>

    <!-- Window with moonlight -->
    <rect x="100" y="80" width="150" height="180" fill="#2a4a7f" stroke="#8b7355" stroke-width="8"/>
    <rect x="108" y="88" width="134" height="164" fill="url(#windowGradient)"/>
    <!-- Window panes -->
    <line x1="175" y1="88" x2="175" y2="252" stroke="#8b7355" stroke-width="4"/>
    <line x1="108" y1="170" x2="242" y2="170" stroke="#8b7355" stroke-width="4"/>
    <!-- Moon -->
    <circle cx="175" cy="130" r="25" fill="#fffacd" opacity="0.9"/>
    <!-- Stars -->
    ${[...Array(5)].map((_, i) => {
      const x = 120 + i * 20 + Math.random() * 10;
      const y = 100 + Math.random() * 50;
      return `<text x="${x}" y="${y}" font-size="20" fill="#fffacd">✨</text>`;
    }).join('')}

    <!-- Beds -->
    ${['#200', '#400', '#600'].map((x, i) => `
      <rect x="${x}" y="350" width="120" height="80" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <rect x="${parseInt(x.slice(1)) + 5}" y="340" width="110" height="50" fill="#4a90e2" opacity="0.8"/>
      <rect x="${parseInt(x.slice(1)) + 10}" y="320" width="100" height="30" fill="#ffffff" opacity="0.9"/>
    `).join('')}

    <!-- Luna waking up -->
    <g transform="translate(250, 300)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <circle cx="-8" cy="-5" r="3" fill="#8B4513"/>
      <circle cx="8" cy="-5" r="3" fill="#8B4513"/>
      <ellipse cx="-15" cy="-10" rx="8" ry="12" fill="#000000" transform="rotate(-20 -15 -10)"/>
      <ellipse cx="15" cy="-10" rx="8" ry="12" fill="#000000" transform="rotate(20 15 -10)"/>
      <text x="30" y="-20" font-size="24" fill="#ffeb3b">!</text>
    </g>

    <!-- Other sleeping friends -->
    <g transform="translate(450, 320)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#8B4513"/>
      <text x="-40" y="-30" font-size="18" fill="#4a90e2">💤</text>
    </g>

    <g transform="translate(650, 320)">
      <ellipse cx="0" cy="0" rx="35" ry="30" fill="#ffffff"/>
      <text x="-40" y="-30" font-size="18" fill="#4a90e2">💤</text>
    </g>

    <defs>
      <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a1929;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#2a5298;stop-opacity:0.8" />
      </linearGradient>
    </defs>
  `,

  window_bunny: () => `
    <!-- Easter Bunny at window -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightGradient)"/>

    <!-- Window frame -->
    <rect x="250" y="100" width="300" height="250" fill="#8b7355" stroke="#654321" stroke-width="4"/>
    <rect x="260" y="110" width="280" height="230" fill="url(#windowGradient)"/>

    <!-- Easter Bunny silhouette glowing -->
    <g transform="translate(400, 230)">
      <!-- Glow effect -->
      <ellipse cx="0" cy="0" rx="60" ry="80" fill="#fffacd" opacity="0.3"/>
      <ellipse cx="0" cy="0" rx="45" ry="65" fill="#fffacd" opacity="0.5"/>

      <!-- Bunny body -->
      <ellipse cx="0" cy="0" rx="35" ry="50" fill="#ffffff"/>
      <!-- Head -->
      <circle cx="0" cy="-40" r="25" fill="#ffffff"/>
      <!-- Ears -->
      <ellipse cx="-12" cy="-60" rx="8" ry="25" fill="#ffffff" transform="rotate(-10 -12 -60)"/>
      <ellipse cx="12" cy="-60" rx="8" ry="25" fill="#ffffff" transform="rotate(10 12 -60)"/>
      <!-- Eyes -->
      <circle cx="-8" cy="-40" r="3" fill="#ff69b4"/>
      <circle cx="8" cy="-40" r="3" fill="#ff69b4"/>
      <!-- Basket -->
      <path d="M -20 10 L -15 30 L 15 30 L 20 10 Z" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <ellipse cx="0" cy="10" rx="20" ry="5" fill="#a0522d"/>
      <!-- Eggs in basket -->
      <ellipse cx="-8" cy="8" rx="5" ry="7" fill="#ff69b4"/>
      <ellipse cx="0" cy="6" rx="5" ry="7" fill="#87ceeb"/>
      <ellipse cx="8" cy="8" rx="5" ry="7" fill="#98fb98"/>
    </g>

    <!-- Speech bubble -->
    <g transform="translate(550, 150)">
      <ellipse cx="0" cy="0" rx="80" ry="40" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M -20 30 L -30 50 L 0 35 Z" fill="white" stroke="#333" stroke-width="2"/>
      <text x="0" y="5" text-anchor="middle" font-size="18" fill="#333">Shh...</text>
    </g>

    <defs>
      <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a1929;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#2a5298;stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:#4a72b8;stop-opacity:0.9" />
      </linearGradient>
    </defs>
  `,

  waking_friends: () => `
    <!-- Friends waking up -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightGradient)"/>

    <!-- Luna (black puppy) awake -->
    <g transform="translate(200, 250)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#000000"/>
      <circle cx="-10" cy="-8" r="4" fill="#8B4513"/>
      <circle cx="10" cy="-8" r="4" fill="#8B4513"/>
      <ellipse cx="-18" cy="-15" rx="10" ry="15" fill="#000000" transform="rotate(-20 -18 -15)"/>
      <ellipse cx="18" cy="-15" rx="10" ry="15" fill="#000000" transform="rotate(20 18 -15)"/>
      <path d="M -5 0 Q 0 5 5 0" stroke="#ff69b4" stroke-width="2" fill="none"/>
      <text x="0" y="-40" text-anchor="middle" font-size="20" fill="#ffeb3b">1</text>
    </g>

    <!-- Heidi (German Shorthaired Pointer) waking -->
    <g transform="translate(350, 250)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8B4513"/>
      <ellipse cx="-10" cy="0" rx="15" ry="20" fill="#ffffff"/>
      <ellipse cx="10" cy="0" rx="15" ry="20" fill="#8B4513"/>
      <circle cx="-10" cy="-8" r="4" fill="#5C4033"/>
      <circle cx="10" cy="-8" r="4" fill="#5C4033"/>
      <ellipse cx="-20" cy="-18" rx="12" ry="18" fill="#8B4513" transform="rotate(-25 -20 -18)"/>
      <ellipse cx="20" cy="-18" rx="12" ry="18" fill="#8B4513" transform="rotate(25 20 -18)"/>
      <text x="0" y="-45" text-anchor="middle" font-size="20" fill="#ffeb3b">+1</text>
    </g>

    <!-- Randy (white Samoyed) stretching -->
    <g transform="translate(500, 250)">
      <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ffffff"/>
      <circle cx="-12" cy="-10" r="4" fill="#000000"/>
      <circle cx="12" cy="-10" r="4" fill="#000000"/>
      <path d="M -8 0 Q 0 8 8 0" stroke="#000000" stroke-width="2" fill="none"/>
      <ellipse cx="-25" cy="-20" rx="12" ry="18" fill="#ffffff" transform="rotate(-20 -25 -20)"/>
      <ellipse cx="25" cy="-20" rx="12" ry="18" fill="#ffffff" transform="rotate(20 25 -20)"/>
      <!-- Stretching lines -->
      <path d="M -35 20 L -45 35" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
      <path d="M 35 20 L 45 35" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
      <text x="0" y="-50" text-anchor="middle" font-size="20" fill="#ffeb3b">+1</text>
    </g>

    <!-- Morphée (calico cat) yawning -->
    <g transform="translate(650, 250)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#ff8c00"/>
      <ellipse cx="-10" cy="-5" rx="12" ry="10" fill="#ffffff"/>
      <ellipse cx="8" cy="5" rx="10" ry="8" fill="#000000"/>
      <circle cx="-8" cy="-8" r="3" fill="#228b22"/>
      <circle cx="8" cy="-8" r="3" fill="#228b22"/>
      <!-- Yawning mouth -->
      <ellipse cx="0" cy="2" rx="8" ry="5" fill="#ff69b4"/>
      <ellipse cx="-15" cy="-18" rx="6" ry="10" fill="#ff8c00" transform="rotate(-30 -15 -18)"/>
      <ellipse cx="15" cy="-18" rx="6" ry="10" fill="#000000" transform="rotate(30 15 -18)"/>
      <text x="0" y="-40" text-anchor="middle" font-size="20" fill="#ffeb3b">+1</text>
    </g>

    <!-- Equals sign and question -->
    <text x="400" y="350" text-anchor="middle" font-size="48" fill="#ffffff" font-weight="bold">= ?</text>

    <defs>
      <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a1929;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  friends_ready: () => `
    <!-- All friends ready with Easter Bunny -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightGradient)"/>

    <!-- Easter Bunny in center -->
    <g transform="translate(400, 200)">
      <ellipse cx="0" cy="0" rx="40" ry="55" fill="#ffffff"/>
      <circle cx="0" cy="-45" r="28" fill="#ffffff"/>
      <ellipse cx="-15" cy="-70" rx="10" ry="30" fill="#ffffff" transform="rotate(-10 -15 -70)"/>
      <ellipse cx="15" cy="-70" rx="10" ry="30" fill="#ffffff" transform="rotate(10 15 -70)"/>
      <circle cx="-10" cy="-45" r="4" fill="#ff69b4"/>
      <circle cx="10" cy="-45" r="4" fill="#ff69b4"/>
      <path d="M -8 -35 Q 0 -30 8 -35" stroke="#ff69b4" stroke-width="2" fill="none"/>
    </g>

    <!-- Four friends around bunny -->
    <!-- Luna -->
    <g transform="translate(250, 300)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <text x="0" y="-30" text-anchor="middle" font-size="24" fill="#4CAF50">✓</text>
    </g>

    <!-- Heidi -->
    <g transform="translate(350, 300)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
      <ellipse cx="-8" cy="0" rx="10" ry="15" fill="#ffffff"/>
      <text x="0" y="-30" text-anchor="middle" font-size="24" fill="#4CAF50">✓</text>
    </g>

    <!-- Randy -->
    <g transform="translate(450, 300)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
      <text x="0" y="-35" text-anchor="middle" font-size="24" fill="#4CAF50">✓</text>
    </g>

    <!-- Morphée -->
    <g transform="translate(550, 300)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
      <ellipse cx="6" cy="3" rx="6" ry="5" fill="#000000"/>
      <text x="0" y="-28" text-anchor="middle" font-size="24" fill="#4CAF50">✓</text>
    </g>

    <!-- Number 4 celebration -->
    <text x="400" y="400" text-anchor="middle" font-size="72" fill="#ffeb3b" font-weight="bold">4</text>
    <text x="400" y="440" text-anchor="middle" font-size="24" fill="#ffffff">Perfect!</text>

    <defs>
      <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a1929;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  outside_night: () => `
    <!-- Outside under stars -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Stars -->
    ${[...Array(20)].map((_, i) => {
      const x = Math.random() * 800;
      const y = Math.random() * 200;
      return `<circle cx="${x}" cy="${y}" r="2" fill="#fffacd" opacity="${0.5 + Math.random() * 0.5}"/>`;
    }).join('')}

    <!-- Moon -->
    <circle cx="700" cy="80" r="40" fill="#fffacd" opacity="0.9"/>

    <!-- Barn silhouette -->
    <g transform="translate(150, 250)">
      <rect x="0" y="0" width="150" height="120" fill="#2a2a2a"/>
      <polygon points="0,0 75,-60 150,0" fill="#1a1a1a"/>
      <!-- Glowing eggs -->
      <circle cx="30" cy="100" r="8" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="60" cy="95" r="8" fill="#87ceeb" opacity="0.8"/>
      <text x="75" y="60" text-anchor="middle" font-size="32" fill="#ffffff">2</text>
    </g>

    <!-- Pond -->
    <ellipse cx="550" cy="350" rx="120" ry="50" fill="#4a90e2" opacity="0.7"/>
    <!-- Glowing eggs by pond -->
    <circle cx="480" cy="340" r="8" fill="#ff69b4" opacity="0.8"/>
    <circle cx="510" cy="345" r="8" fill="#98fb98" opacity="0.8"/>
    <circle cx="540" cy="338" r="8" fill="#ffeb3b" opacity="0.8"/>
    <text x="550" y="300" text-anchor="middle" font-size="32" fill="#ffffff">3</text>

    <!-- Math equation -->
    <text x="400" y="450" text-anchor="middle" font-size="48" fill="#ffffff" font-weight="bold">2 + 3 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  pond_eggs: () => `
    <!-- Heidi at the pond -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Pond -->
    <ellipse cx="400" cy="350" rx="200" ry="80" fill="#4a90e2" opacity="0.8"/>

    <!-- Heidi reaching for eggs -->
    <g transform="translate(300, 280)">
      <ellipse cx="0" cy="0" rx="40" ry="32" fill="#8B4513"/>
      <ellipse cx="-12" cy="0" rx="18" ry="22" fill="#ffffff"/>
      <ellipse cx="12" cy="0" rx="18" ry="22" fill="#8B4513"/>
      <!-- Extended paw reaching -->
      <ellipse cx="40" cy="20" rx="15" ry="10" fill="#8B4513" transform="rotate(30 40 20)"/>
    </g>

    <!-- Three eggs by pond -->
    <g transform="translate(380, 310)">
      <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ff69b4"/>
      <ellipse cx="30" cy="5" rx="10" ry="14" fill="#87ceeb"/>
      <ellipse cx="60" cy="-2" rx="10" ry="14" fill="#98fb98"/>
    </g>

    <!-- One egg rolling into water -->
    <g transform="translate(450, 340)">
      <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ffeb3b" transform="rotate(45 0 0)"/>
      <!-- Splash effect -->
      <ellipse cx="0" cy="10" rx="20" ry="5" fill="#ffffff" opacity="0.6"/>
      <path d="M -10 5 L -8 -5 M 0 5 L 0 -8 M 10 5 L 8 -5" stroke="#4a90e2" stroke-width="3" stroke-linecap="round"/>
    </g>

    <!-- Math visual -->
    <text x="200" y="100" font-size="48" fill="#ffffff" font-weight="bold">3</text>
    <text x="300" y="100" font-size="48" fill="#ffffff">-</text>
    <text x="400" y="100" font-size="48" fill="#ffeb3b" font-weight="bold">1</text>
    <text x="500" y="100" font-size="48" fill="#ffffff">=</text>
    <text x="600" y="100" font-size="48" fill="#ffffff">?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  heidi_swimming: () => `
    <!-- Heidi rescuing the egg -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Pond with ripples -->
    <ellipse cx="400" cy="350" rx="200" ry="80" fill="#4a90e2" opacity="0.8"/>
    <ellipse cx="400" cy="350" rx="180" ry="70" fill="none" stroke="#6ab0e2" stroke-width="2" opacity="0.5"/>
    <ellipse cx="400" cy="350" rx="160" ry="60" fill="none" stroke="#6ab0e2" stroke-width="2" opacity="0.4"/>

    <!-- Heidi swimming -->
    <g transform="translate(400, 340)">
      <ellipse cx="0" cy="0" rx="45" ry="30" fill="#8B4513"/>
      <ellipse cx="-15" cy="0" rx="20" ry="18" fill="#ffffff"/>
      <!-- Swimming motion -->
      <ellipse cx="-30" cy="15" rx="12" ry="8" fill="#8B4513" transform="rotate(-30 -30 15)"/>
      <ellipse cx="30" cy="15" rx="12" ry="8" fill="#8B4513" transform="rotate(30 30 15)"/>
      <!-- Egg in mouth -->
      <ellipse cx="25" cy="-10" rx="8" ry="12" fill="#ffeb3b"/>
    </g>

    <!-- Water droplets -->
    ${[...Array(8)].map((_, i) => {
      const angle = (i * 45) * Math.PI / 180;
      const x = 400 + Math.cos(angle) * 60;
      const y = 340 + Math.sin(angle) * 40;
      return `<circle cx="${x}" cy="${y}" r="3" fill="#4a90e2" opacity="0.7"/>`;
    }).join('')}

    <!-- Success message -->
    <text x="400" y="100" text-anchor="middle" font-size="36" fill="#4CAF50" font-weight="bold">Got it!</text>
    <text x="400" y="150" text-anchor="middle" font-size="24" fill="#ffffff">2 + 1 = 3 eggs saved!</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  garden_discovery: () => `
    <!-- Randy in the garden -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Garden rows -->
    ${[...Array(4)].map((_, i) => {
      const y = 300 + i * 40;
      return `<rect x="100" y="${y}" width="600" height="25" fill="#2d1810" opacity="0.8"/>`;
    }).join('')}

    <!-- Randy discovering eggs -->
    <g transform="translate(250, 250)">
      <ellipse cx="0" cy="0" rx="50" ry="40" fill="#ffffff"/>
      <circle cx="-15" cy="-12" r="5" fill="#000000"/>
      <circle cx="15" cy="-12" r="5" fill="#000000"/>
      <path d="M -10 0 Q 0 10 10 0" stroke="#000000" stroke-width="3" fill="none"/>
      <!-- Tail wagging -->
      <ellipse cx="-45" cy="-20" rx="20" ry="15" fill="#ffffff" transform="rotate(-30 -45 -20)"/>
      <!-- Speech bubble -->
      <ellipse cx="80" cy="-40" rx="60" ry="30" fill="white"/>
      <path d="M 30 -30 L 20 -15 L 40 -25 Z" fill="white"/>
      <text x="80" y="-35" text-anchor="middle" font-size="16" fill="#333">WOOF!</text>
    </g>

    <!-- Four eggs in garden -->
    <ellipse cx="400" cy="320" rx="10" ry="14" fill="#ff69b4"/>
    <ellipse cx="440" cy="315" rx="10" ry="14" fill="#87ceeb"/>
    <ellipse cx="480" cy="322" rx="10" ry="14" fill="#98fb98"/>
    <ellipse cx="520" cy="318" rx="10" ry="14" fill="#ffeb3b"/>
    <text x="460" y="280" text-anchor="middle" font-size="32" fill="#ffffff">4</text>

    <!-- Luna with 1 egg -->
    <g transform="translate(600, 250)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <ellipse cx="25" cy="10" rx="8" ry="12" fill="#9370db"/>
      <text x="0" y="-35" text-anchor="middle" font-size="24" fill="#ffffff">1</text>
    </g>

    <!-- Math equation -->
    <text x="400" y="450" text-anchor="middle" font-size="36" fill="#ffffff">Luna: 1 + 2 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  tree_eggs: () => `
    <!-- Morphée in the tree -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Tree -->
    <rect x="350" y="250" width="100" height="200" fill="#4a3020"/>
    <!-- Branches -->
    <ellipse cx="400" cy="200" rx="150" ry="100" fill="#2d5016" opacity="0.9"/>
    <ellipse cx="350" cy="180" rx="80" ry="60" fill="#3d6020" opacity="0.8"/>
    <ellipse cx="450" cy="180" rx="80" ry="60" fill="#3d6020" opacity="0.8"/>

    <!-- Morphée climbing -->
    <g transform="translate(400, 150)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#ff8c00"/>
      <ellipse cx="-10" cy="-5" rx="12" ry="10" fill="#ffffff"/>
      <ellipse cx="8" cy="5" rx="10" ry="8" fill="#000000"/>
      <!-- Paws gripping branch -->
      <ellipse cx="-20" cy="15" rx="8" ry="5" fill="#ff8c00" transform="rotate(-45 -20 15)"/>
      <ellipse cx="20" cy="15" rx="8" ry="5" fill="#000000" transform="rotate(45 20 15)"/>
    </g>

    <!-- Six eggs in tree -->
    <g transform="translate(320, 140)">
      <ellipse cx="0" cy="0" rx="8" ry="11" fill="#ff69b4"/>
      <ellipse cx="25" cy="-10" rx="8" ry="11" fill="#87ceeb"/>
      <ellipse cx="50" cy="5" rx="8" ry="11" fill="#98fb98"/>
      <ellipse cx="75" cy="-8" rx="8" ry="11" fill="#ffeb3b"/>
      <ellipse cx="100" cy="10" rx="8" ry="11" fill="#9370db"/>
      <ellipse cx="125" cy="-5" rx="8" ry="11" fill="#ff6347"/>
    </g>

    <!-- Morphée carrying 4 -->
    <g transform="translate(500, 250)">
      <rect x="-20" y="-15" width="40" height="30" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <ellipse cx="-10" cy="-10" rx="6" ry="9" fill="#ff69b4"/>
      <ellipse cx="0" cy="-8" rx="6" ry="9" fill="#87ceeb"/>
      <ellipse cx="10" cy="-10" rx="6" ry="9" fill="#98fb98"/>
      <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ffeb3b"/>
      <text x="0" y="-35" text-anchor="middle" font-size="24" fill="#ffffff">4</text>
    </g>

    <!-- Math equation -->
    <text x="400" y="450" text-anchor="middle" font-size="36" fill="#ffffff" font-weight="bold">6 - 4 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  bunny_climbing: () => `
    <!-- Easter Bunny getting remaining eggs -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Tree -->
    <rect x="350" y="250" width="100" height="200" fill="#4a3020"/>
    <ellipse cx="400" cy="200" rx="150" ry="100" fill="#2d5016" opacity="0.9"/>

    <!-- Easter Bunny hopping up -->
    <g transform="translate(400, 160)">
      <!-- Motion lines -->
      <path d="M 0 40 L 0 60 M -10 45 L -10 65 M 10 45 L 10 65" stroke="#ffffff" stroke-width="3" opacity="0.5"/>

      <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ffffff"/>
      <circle cx="0" cy="-35" r="25" fill="#ffffff"/>
      <ellipse cx="-12" cy="-55" rx="8" ry="25" fill="#ffffff" transform="rotate(-10 -12 -55)"/>
      <ellipse cx="12" cy="-55" rx="8" ry="25" fill="#ffffff" transform="rotate(10 12 -55)"/>

      <!-- Basket with 2 eggs -->
      <path d="M -20 10 L -15 25 L 15 25 L 20 10 Z" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <ellipse cx="-5" cy="15" rx="6" ry="9" fill="#9370db"/>
      <ellipse cx="5" cy="15" rx="6" ry="9" fill="#ff6347"/>
    </g>

    <!-- Success sparkles -->
    ${[...Array(10)].map((_, i) => {
      const angle = (i * 36) * Math.PI / 180;
      const x = 400 + Math.cos(angle) * 80;
      const y = 160 + Math.sin(angle) * 80;
      return `<text x="${x}" y="${y}" font-size="20" fill="#ffeb3b">✨</text>`;
    }).join('')}

    <!-- Answer reveal -->
    <text x="400" y="400" text-anchor="middle" font-size="48" fill="#4CAF50" font-weight="bold">2</text>
    <text x="400" y="450" text-anchor="middle" font-size="24" fill="#ffffff">Teamwork!</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  counting_eggs: () => `
    <!-- Counting Luna and Heidi's eggs -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Luna with her eggs -->
    <g transform="translate(250, 250)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#000000"/>
      <circle cx="-10" cy="-8" r="4" fill="#8B4513"/>
      <circle cx="10" cy="-8" r="4" fill="#8B4513"/>

      <!-- Luna's 3 eggs -->
      <g transform="translate(-30, 40)">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#ff69b4"/>
        <ellipse cx="20" cy="0" rx="8" ry="12" fill="#87ceeb"/>
        <ellipse cx="40" cy="0" rx="8" ry="12" fill="#98fb98"/>
        <text x="20" y="-25" text-anchor="middle" font-size="28" fill="#ffffff">3</text>
      </g>
    </g>

    <!-- Plus sign -->
    <text x="400" y="270" text-anchor="middle" font-size="48" fill="#ffffff">+</text>

    <!-- Heidi with her eggs -->
    <g transform="translate(550, 250)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8B4513"/>
      <ellipse cx="-10" cy="0" rx="15" ry="20" fill="#ffffff"/>

      <!-- Heidi's 3 eggs -->
      <g transform="translate(-30, 40)">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#ffeb3b"/>
        <ellipse cx="20" cy="0" rx="8" ry="12" fill="#9370db"/>
        <ellipse cx="40" cy="0" rx="8" ry="12" fill="#ff6347"/>
        <text x="20" y="-25" text-anchor="middle" font-size="28" fill="#ffffff">3</text>
      </g>
    </g>

    <!-- Equation -->
    <text x="400" y="400" text-anchor="middle" font-size="48" fill="#ffffff" font-weight="bold">3 + 3 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  more_counting: () => `
    <!-- Counting Randy and Morphée's eggs -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Randy with his eggs -->
    <g transform="translate(250, 250)">
      <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ffffff"/>
      <circle cx="-12" cy="-10" r="4" fill="#000000"/>
      <circle cx="12" cy="-10" r="4" fill="#000000"/>

      <!-- Randy's 2 eggs -->
      <g transform="translate(-15, 45)">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#87ceeb"/>
        <ellipse cx="20" cy="0" rx="8" ry="12" fill="#98fb98"/>
        <text x="10" y="-25" text-anchor="middle" font-size="28" fill="#ffffff">2</text>
      </g>
    </g>

    <!-- Plus sign -->
    <text x="400" y="270" text-anchor="middle" font-size="48" fill="#ffffff">+</text>

    <!-- Morphée with her eggs -->
    <g transform="translate(550, 250)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#ff8c00"/>
      <ellipse cx="-10" cy="-5" rx="12" ry="10" fill="#ffffff"/>
      <ellipse cx="8" cy="5" rx="10" ry="8" fill="#000000"/>

      <!-- Morphée's 4 eggs -->
      <g transform="translate(-35, 40)">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#ff69b4"/>
        <ellipse cx="18" cy="0" rx="8" ry="12" fill="#ffeb3b"/>
        <ellipse cx="36" cy="0" rx="8" ry="12" fill="#9370db"/>
        <ellipse cx="54" cy="0" rx="8" ry="12" fill="#ff6347"/>
        <text x="27" y="-25" text-anchor="middle" font-size="28" fill="#ffffff">4</text>
      </g>
    </g>

    <!-- Equation -->
    <text x="400" y="400" text-anchor="middle" font-size="48" fill="#ffffff" font-weight="bold">2 + 4 = ?</text>

    <!-- Glowing effect around eggs -->
    ${[...Array(6)].map((_, i) => {
      const x = 250 + (i < 2 ? i * 20 : (i-2) * 18 + 300);
      const y = 295;
      return `<circle cx="${x}" cy="${y}" r="15" fill="#ffeb3b" opacity="0.2"/>`;
    }).join('')}

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  final_count: () => `
    <!-- Final counting scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Easter Bunny in center -->
    <g transform="translate(400, 150)">
      <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ffffff"/>
      <circle cx="0" cy="-35" r="25" fill="#ffffff"/>
      <ellipse cx="-12" cy="-55" rx="8" ry="25" fill="#ffffff"/>
      <ellipse cx="12" cy="-55" rx="8" ry="25" fill="#ffffff"/>
      <!-- Sparkly eyes -->
      <circle cx="-8" cy="-35" r="4" fill="#ff69b4"/>
      <circle cx="8" cy="-35" r="4" fill="#ff69b4"/>
      <text x="-6" y="-33" font-size="8" fill="#ffffff">✨</text>
      <text x="6" y="-33" font-size="8" fill="#ffffff">✨</text>
    </g>

    <!-- Group 1: 6 eggs -->
    <g transform="translate(200, 280)">
      <rect x="-40" y="-20" width="80" height="40" fill="#4a90e2" opacity="0.3" rx="10"/>
      ${[0, 1, 2, 3, 4, 5].map(i => {
        const x = -30 + (i % 3) * 25;
        const y = -10 + Math.floor(i / 3) * 20;
        const colors = ['#ff69b4', '#87ceeb', '#98fb98', '#ffeb3b', '#9370db', '#ff6347'];
        return `<ellipse cx="${x}" cy="${y}" rx="7" ry="10" fill="${colors[i]}"/>`;
      }).join('')}
      <text x="0" y="-40" text-anchor="middle" font-size="32" fill="#ffffff">6</text>
    </g>

    <!-- Plus sign -->
    <text x="400" y="280" text-anchor="middle" font-size="48" fill="#ffffff">+</text>

    <!-- Group 2: 6 eggs -->
    <g transform="translate(600, 280)">
      <rect x="-40" y="-20" width="80" height="40" fill="#4a90e2" opacity="0.3" rx="10"/>
      ${[0, 1, 2, 3, 4, 5].map(i => {
        const x = -30 + (i % 3) * 25;
        const y = -10 + Math.floor(i / 3) * 20;
        const colors = ['#98fb98', '#ff6347', '#ff69b4', '#9370db', '#ffeb3b', '#87ceeb'];
        return `<ellipse cx="${x}" cy="${y}" rx="7" ry="10" fill="${colors[i]}"/>`;
      }).join('')}
      <text x="0" y="-40" text-anchor="middle" font-size="32" fill="#ffffff">6</text>
    </g>

    <!-- Equation -->
    <text x="400" y="400" text-anchor="middle" font-size="48" fill="#ffeb3b" font-weight="bold">6 + 6 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  floating_eggs: () => `
    <!-- Magical floating eggs -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- 12 floating eggs in a circle -->
    ${[...Array(12)].map((_, i) => {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x = 400 + Math.cos(angle) * 120;
      const y = 250 + Math.sin(angle) * 120;
      const colors = ['#ff69b4', '#87ceeb', '#98fb98', '#ffeb3b', '#9370db', '#ff6347'];
      const color = colors[i % colors.length];
      return `
        <g transform="translate(${x}, ${y})">
          <ellipse cx="0" cy="0" rx="12" ry="16" fill="${color}" opacity="0.9"/>
          <ellipse cx="0" cy="0" rx="20" ry="25" fill="${color}" opacity="0.3"/>
          <ellipse cx="0" cy="0" rx="30" ry="35" fill="${color}" opacity="0.1"/>
        </g>
      `;
    }).join('')}

    <!-- Light patterns connecting eggs -->
    <g opacity="0.5">
      ${[...Array(12)].map((_, i) => {
        const angle1 = (i * 30 - 90) * Math.PI / 180;
        const angle2 = ((i + 1) * 30 - 90) * Math.PI / 180;
        const x1 = 400 + Math.cos(angle1) * 120;
        const y1 = 250 + Math.sin(angle1) * 120;
        const x2 = 400 + Math.cos(angle2) * 120;
        const y2 = 250 + Math.sin(angle2) * 120;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffeb3b" stroke-width="2"/>`;
      }).join('')}
    </g>

    <!-- Center celebration -->
    <text x="400" y="250" text-anchor="middle" font-size="72" fill="#ffeb3b" font-weight="bold">12</text>

    <!-- Characters celebrating -->
    <g transform="translate(250, 400)">
      <ellipse cx="0" cy="0" rx="20" ry="16" fill="#000000"/>
      <text x="0" y="-25" font-size="20">🎉</text>
    </g>
    <g transform="translate(350, 400)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#8B4513"/>
      <text x="0" y="-25" font-size="20">🎊</text>
    </g>
    <g transform="translate(450, 400)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ffffff"/>
      <text x="0" y="-25" font-size="20">🌟</text>
    </g>
    <g transform="translate(550, 400)">
      <ellipse cx="0" cy="0" rx="18" ry="14" fill="#ff8c00"/>
      <text x="0" y="-25" font-size="20">✨</text>
    </g>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  shooting_stars: () => `
    <!-- Shooting stars scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Multiple shooting stars -->
    ${[...Array(8)].map((_, i) => {
      const startX = 100 + i * 80;
      const startY = 50 + (i % 2) * 30;
      const endX = startX + 60;
      const endY = startY + 60;
      return `
        <g>
          <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
                stroke="url(#starGradient${i})" stroke-width="3"/>
          <circle cx="${startX}" cy="${startY}" r="5" fill="#ffeb3b"/>
        </g>
        <defs>
          <linearGradient id="starGradient${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffeb3b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ffeb3b;stop-opacity:0" />
          </linearGradient>
        </defs>
      `;
    }).join('')}

    <!-- Four friends making wishes -->
    <g transform="translate(200, 350)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <text x="0" y="-35" font-size="24">🌟🌟</text>
    </g>

    <g transform="translate(333, 350)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
      <ellipse cx="-8" cy="0" rx="10" ry="15" fill="#ffffff"/>
      <text x="0" y="-35" font-size="24">🌟🌟</text>
    </g>

    <g transform="translate(466, 350)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
      <text x="0" y="-40" font-size="24">🌟🌟</text>
    </g>

    <g transform="translate(600, 350)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
      <ellipse cx="6" cy="3" rx="6" ry="5" fill="#000000"/>
      <text x="0" y="-35" font-size="24">🌟🌟</text>
    </g>

    <!-- Math equation -->
    <text x="400" y="200" text-anchor="middle" font-size="36" fill="#ffffff">4 friends × 2 wishes</text>
    <text x="400" y="250" text-anchor="middle" font-size="48" fill="#ffeb3b" font-weight="bold">4 + 4 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  golden_egg: () => `
    <!-- Golden egg sharing -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Easter Bunny with golden egg -->
    <g transform="translate(400, 150)">
      <ellipse cx="0" cy="0" rx="35" ry="45" fill="#ffffff"/>
      <circle cx="0" cy="-35" r="25" fill="#ffffff"/>

      <!-- Golden egg glowing -->
      <ellipse cx="0" cy="20" rx="25" ry="35" fill="#ffd700"/>
      <ellipse cx="0" cy="20" rx="30" ry="40" fill="#ffd700" opacity="0.5"/>
      <ellipse cx="0" cy="20" rx="35" ry="45" fill="#ffd700" opacity="0.3"/>
    </g>

    <!-- Four pieces visualization -->
    <g transform="translate(400, 300)">
      <!-- Whole egg divided -->
      <g transform="translate(-150, 0)">
        <path d="M 0 -30 Q -20 0 0 30 Q 20 0 0 -30" fill="#ffd700" stroke="#ffaa00" stroke-width="2"/>
        <text x="0" y="0" text-anchor="middle" font-size="16" fill="#8b4513">1</text>
      </g>
      <g transform="translate(-50, 0)">
        <path d="M 0 -30 Q -20 0 0 30 Q 20 0 0 -30" fill="#ffd700" stroke="#ffaa00" stroke-width="2"/>
        <text x="0" y="0" text-anchor="middle" font-size="16" fill="#8b4513">2</text>
      </g>
      <g transform="translate(50, 0)">
        <path d="M 0 -30 Q -20 0 0 30 Q 20 0 0 -30" fill="#ffd700" stroke="#ffaa00" stroke-width="2"/>
        <text x="0" y="0" text-anchor="middle" font-size="16" fill="#8b4513">3</text>
      </g>
      <g transform="translate(150, 0)">
        <path d="M 0 -30 Q -20 0 0 30 Q 20 0 0 -30" fill="#ffd700" stroke="#ffaa00" stroke-width="2"/>
        <text x="0" y="0" text-anchor="middle" font-size="16" fill="#8b4513">4</text>
      </g>
    </g>

    <!-- Math problem -->
    <text x="400" y="400" text-anchor="middle" font-size="36" fill="#ffffff">Give away 3 pieces:</text>
    <text x="400" y="450" text-anchor="middle" font-size="48" fill="#ffeb3b" font-weight="bold">4 - 3 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  golden_star: () => `
    <!-- Golden star formation -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Four friends holding pieces that form a star -->
    <g transform="translate(400, 250)">
      <!-- Star formation from pieces -->
      <polygon points="0,-80 20,-20 80,-10 30,20 40,80 0,40 -40,80 -30,20 -80,-10 -20,-20"
               fill="#ffd700" stroke="#ffaa00" stroke-width="3"/>
      <polygon points="0,-60 15,-15 60,-7 22,15 30,60 0,30 -30,60 -22,15 -60,-7 -15,-15"
               fill="#ffeb3b" opacity="0.8"/>
    </g>

    <!-- Light rays -->
    ${[...Array(12)].map((_, i) => {
      const angle = (i * 30) * Math.PI / 180;
      const x1 = 400;
      const y1 = 250;
      const x2 = 400 + Math.cos(angle) * 200;
      const y2 = 250 + Math.sin(angle) * 200;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffd700" stroke-width="2" opacity="0.3"/>`;
    }).join('')}

    <!-- Friends around the star -->
    <g transform="translate(300, 350)">
      <ellipse cx="0" cy="0" rx="20" ry="16" fill="#000000"/>
    </g>
    <g transform="translate(500, 350)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#8B4513"/>
    </g>
    <g transform="translate(300, 150)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ffffff"/>
    </g>
    <g transform="translate(500, 150)">
      <ellipse cx="0" cy="0" rx="18" ry="14" fill="#ff8c00"/>
    </g>

    <!-- Success message -->
    <text x="400" y="450" text-anchor="middle" font-size="32" fill="#4CAF50" font-weight="bold">Perfect! 1 piece each!</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  bunny_treats: () => `
    <!-- Easter Bunny with treats -->
    <rect x="0" y="0" width="800" height="500" fill="url(#nightSkyGradient)"/>

    <!-- Easter Bunny with treat bag -->
    <g transform="translate(400, 200)">
      <ellipse cx="0" cy="0" rx="40" ry="50" fill="#ffffff"/>
      <circle cx="0" cy="-40" r="28" fill="#ffffff"/>

      <!-- Giggling expression -->
      <circle cx="-10" cy="-40" r="4" fill="#ff69b4"/>
      <circle cx="10" cy="-40" r="4" fill="#ff69b4"/>
      <path d="M -15 -30 Q 0 -20 15 -30" stroke="#ff69b4" stroke-width="3" fill="none"/>

      <!-- Treat bag -->
      <rect x="-30" y="20" width="60" height="50" fill="#9370db" stroke="#663399" stroke-width="3" rx="5"/>
      <text x="0" y="45" text-anchor="middle" font-size="24" fill="#ffffff">10</text>
    </g>

    <!-- Three eaten treats floating away -->
    <g opacity="0.5">
      <circle cx="250" cy="150" r="12" fill="#ff69b4"/>
      <circle cx="300" cy="100" r="12" fill="#87ceeb"/>
      <circle cx="350" cy="130" r="12" fill="#98fb98"/>
      <text x="300" y="80" text-anchor="middle" font-size="20" fill="#ffffff">Yum!</text>
    </g>

    <!-- Visual math -->
    <g transform="translate(400, 350)">
      <!-- 10 treats -->
      ${[...Array(10)].map((_, i) => {
        const x = -100 + (i % 5) * 40;
        const y = Math.floor(i / 5) * 40;
        const opacity = i < 7 ? 1 : 0.3;
        return `<circle cx="${x}" cy="${y}" r="15" fill="#ffd700" opacity="${opacity}"/>`;
      }).join('')}
    </g>

    <!-- Math equation -->
    <text x="400" y="450" text-anchor="middle" font-size="48" fill="#ffffff" font-weight="bold">10 - 3 = ?</text>

    <defs>
      <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0a2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a2f4a;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  dawn_approaching: () => `
    <!-- Dawn approaching scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#dawnGradient)"/>

    <!-- Rising sun on horizon -->
    <circle cx="400" cy="500" r="150" fill="#ffaa00" opacity="0.6"/>
    <circle cx="400" cy="500" r="120" fill="#ffd700" opacity="0.8"/>

    <!-- Friends sharing treats -->
    <g transform="translate(400, 300)">
      <!-- Treat basket -->
      <rect x="-40" y="-20" width="80" height="40" fill="#8b4513" stroke="#654321" stroke-width="2" rx="5"/>
      ${[...Array(7)].map((_, i) => {
        const x = -30 + (i % 4) * 20;
        const y = -10 + Math.floor(i / 4) * 15;
        return `<circle cx="${x}" cy="${y}" r="8" fill="#ffd700"/>`;
      }).join('')}
    </g>

    <!-- Friends gathered -->
    <g transform="translate(250, 320)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
    </g>
    <g transform="translate(350, 320)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
    </g>
    <g transform="translate(450, 320)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
    </g>
    <g transform="translate(550, 320)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
    </g>

    <!-- Saving 3 treats message -->
    <g transform="translate(400, 200)">
      <rect x="-80" y="-25" width="160" height="50" fill="white" stroke="#333" stroke-width="2" rx="10" opacity="0.9"/>
      <text x="0" y="0" text-anchor="middle" font-size="16" fill="#333">Saving 3 for tomorrow!</text>
    </g>

    <!-- Answer -->
    <text x="400" y="450" text-anchor="middle" font-size="48" fill="#4CAF50" font-weight="bold">7 treats!</text>

    <defs>
      <linearGradient id="dawnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#1a2f4a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#4a5f7a;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ff9950;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  sunrise_farewell: () => `
    <!-- Sunrise farewell scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#sunriseGradient)"/>

    <!-- Full sunrise -->
    <circle cx="400" cy="400" r="200" fill="#ffcc00" opacity="0.4"/>
    <circle cx="400" cy="400" r="150" fill="#ffd700" opacity="0.6"/>
    <circle cx="400" cy="400" r="100" fill="#ffeb3b" opacity="0.8"/>

    <!-- Easter Bunny hugging friends -->
    <g transform="translate(400, 250)">
      <!-- Group hug circle -->
      <ellipse cx="0" cy="0" rx="120" ry="80" fill="#ffffff" opacity="0.3"/>

      <!-- Easter Bunny -->
      <ellipse cx="0" cy="-20" rx="35" ry="45" fill="#ffffff"/>
      <circle cx="0" cy="-50" r="25" fill="#ffffff"/>

      <!-- Friends in hug -->
      <ellipse cx="-40" cy="10" rx="20" ry="16" fill="#000000"/>
      <ellipse cx="-20" cy="15" rx="22" ry="18" fill="#8B4513"/>
      <ellipse cx="20" cy="15" rx="25" ry="20" fill="#ffffff"/>
      <ellipse cx="40" cy="10" rx="18" ry="14" fill="#ff8c00"/>

      <!-- Hearts floating up -->
      ${[...Array(5)].map((_, i) => {
        const x = -40 + i * 20;
        const y = -80 - i * 10;
        return `<text x="${x}" y="${y}" font-size="20" fill="#ff69b4">❤️</text>`;
      }).join('')}
    </g>

    <!-- Morning mist -->
    <ellipse cx="400" cy="480" rx="400" ry="40" fill="#ffffff" opacity="0.4"/>
    <ellipse cx="200" cy="470" rx="150" ry="30" fill="#ffffff" opacity="0.3"/>
    <ellipse cx="600" cy="470" rx="150" ry="30" fill="#ffffff" opacity="0.3"/>

    <!-- Final message -->
    <text x="400" y="100" text-anchor="middle" font-size="28" fill="#4a3020" font-weight="bold">Math is everywhere!</text>
    <text x="400" y="140" text-anchor="middle" font-size="20" fill="#6a4030">Even in magical midnight adventures!</text>

    <defs>
      <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ffd4a3;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ffeb3b;stop-opacity:1" />
      </linearGradient>
    </defs>
  `
};

// Read configuration
const configPath = path.join(__dirname, '..', 'docs', 'stories', 'midnight-math-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Generate SVG for each page
function generatePageSVG(pageConfig) {
  const sceneMap = {
    'night_bedroom': 'night_bedroom',
    'window_bunny': 'window_bunny',
    'waking_friends': 'waking_friends',
    'friends_ready': 'friends_ready',
    'outside_night': 'outside_night',
    'pond_eggs': 'pond_eggs',
    'heidi_swimming': 'heidi_swimming',
    'garden_discovery': 'garden_discovery',
    'tree_eggs': 'tree_eggs',
    'bunny_climbing': 'bunny_climbing',
    'counting_eggs': 'counting_eggs',
    'more_counting': 'more_counting',
    'final_count': 'final_count',
    'floating_eggs': 'floating_eggs',
    'shooting_stars': 'shooting_stars',
    'golden_egg': 'golden_egg',
    'golden_star': 'golden_star',
    'bunny_treats': 'bunny_treats',
    'dawn_approaching': 'dawn_approaching',
    'sunrise_farewell': 'sunrise_farewell'
  };

  const scene = pageConfig.scene || 'night_bedroom';
  const generator = sceneGenerators[sceneMap[scene]] || sceneGenerators.night_bedroom;

  return generator();
}

// Generate HTML with all pages
function generateHTML() {
  const pages = config.pages.map(page => {
    const svg = generatePageSVG(page);
    const mathProblem = page.mathProblem ? `data-math-problem="${page.number}"` : '';

    return `
            <!-- Page ${page.number} -->
            <div class="story-page${page.number === 1 ? ' active' : ''}" id="page-${page.number}" ${mathProblem}>
                <svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                    ${svg}
                </svg>
                <div class="page-text">
                    <p>${page.text}</p>
                    <span class="page-counter">Page ${page.number} of 20</span>
                </div>
            </div>`;
  }).join('\n');

  // Read the template HTML
  const templatePath = path.join(__dirname, '..', 'docs', 'stories', 'midnight-math-mystery.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // Replace the pages section
  const startMarker = '<!-- Page 1 -->';
  const endMarker = '<!-- Pages 2-20 will be generated -->';
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker) + endMarker.length;

  if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + pages + html.substring(endIndex);
  }

  // Save the updated HTML
  fs.writeFileSync(templatePath, html);
  console.log('✅ Generated all 20 pages with SVG illustrations');
}

// Run the generation
generateHTML();
console.log('✅ Midnight Math Mystery pages generated successfully!');