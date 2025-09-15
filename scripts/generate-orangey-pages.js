#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SVG generation functions for each scene
const sceneGenerators = {
  barn_intro: () => `
    <!-- Barn interior scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#barnGradient)"/>

    <!-- Barn walls and beams -->
    <rect x="0" y="0" width="800" height="400" fill="#8b4513" opacity="0.3"/>
    <line x1="0" y1="100" x2="800" y2="100" stroke="#654321" stroke-width="8"/>
    <line x1="200" y1="0" x2="200" y2="400" stroke="#654321" stroke-width="6"/>
    <line x1="400" y1="0" x2="400" y2="400" stroke="#654321" stroke-width="6"/>
    <line x1="600" y1="0" x2="600" y2="400" stroke="#654321" stroke-width="6"/>

    <!-- Hay bales -->
    <rect x="100" y="320" width="120" height="80" fill="#daa520" stroke="#b8860b" stroke-width="2" rx="5"/>
    <rect x="230" y="340" width="120" height="60" fill="#daa520" stroke="#b8860b" stroke-width="2" rx="5"/>
    <rect x="150" y="280" width="100" height="60" fill="#daa520" stroke="#b8860b" stroke-width="2" rx="5"/>

    <!-- Orangey the cat lounging -->
    <g transform="translate(400, 300)">
      <ellipse cx="0" cy="0" rx="45" ry="30" fill="#ff8c00"/>
      <ellipse cx="-20" cy="5" rx="25" ry="20" fill="#ff8c00"/> <!-- Body -->
      <!-- Head -->
      <circle cx="20" cy="-5" r="20" fill="#ff8c00"/>
      <!-- Ears -->
      <path d="M 5 -20 L 0 -10 L 10 -10 Z" fill="#ff8c00"/>
      <path d="M 30 -20 L 25 -10 L 35 -10 Z" fill="#ff8c00"/>
      <!-- Eyes (sleepy) -->
      <line x1="12" y1="-5" x2="18" y2="-5" stroke="#000" stroke-width="2"/>
      <line x1="22" y1="-5" x2="28" y2="-5" stroke="#000" stroke-width="2"/>
      <!-- Fluffy tail -->
      <ellipse cx="-45" cy="5" rx="30" ry="15" fill="#ff8c00" transform="rotate(30 -45 5)"/>
      <!-- Stripes -->
      <path d="M -10 -5 Q -5 0 0 -5" stroke="#ff6347" stroke-width="3" fill="none"/>
      <path d="M 10 0 Q 15 5 20 0" stroke="#ff6347" stroke-width="3" fill="none"/>
    </g>

    <!-- Scratching sound effect -->
    <text x="600" y="250" font-size="20" fill="#666" font-style="italic">scratch scratch...</text>

    <defs>
      <linearGradient id="barnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d2691e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b4513;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  friends_gathering: () => `
    <!-- Friends gathering around Orangey -->
    <rect x="0" y="0" width="800" height="500" fill="url(#barnGradient)"/>

    <!-- Orangey alert -->
    <g transform="translate(400, 250)">
      <ellipse cx="0" cy="0" rx="40" ry="28" fill="#ff8c00"/>
      <circle cx="15" cy="-10" r="18" fill="#ff8c00"/>
      <!-- Alert ears -->
      <path d="M 5 -25 L 0 -15 L 10 -15 Z" fill="#ff8c00"/>
      <path d="M 25 -25 L 20 -15 L 30 -15 Z" fill="#ff8c00"/>
      <!-- Wide eyes -->
      <circle cx="8" cy="-10" r="4" fill="#90ee90"/>
      <circle cx="22" cy="-10" r="4" fill="#90ee90"/>
      <circle cx="8" cy="-10" r="2" fill="#000"/>
      <circle cx="22" cy="-10" r="2" fill="#000"/>
    </g>

    <!-- Luna -->
    <g transform="translate(250, 300)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#000000"/>
      <circle cx="-10" cy="-8" r="3" fill="#8B4513"/>
      <circle cx="10" cy="-8" r="3" fill="#8B4513"/>
      <text x="-10" y="-30" font-size="20">?</text>
    </g>

    <!-- Heidi -->
    <g transform="translate(320, 310)">
      <ellipse cx="0" cy="0" rx="32" ry="26" fill="#8B4513"/>
      <ellipse cx="-10" cy="0" rx="12" ry="18" fill="#ffffff"/>
    </g>

    <!-- Randy -->
    <g transform="translate(480, 310)">
      <ellipse cx="0" cy="0" rx="38" ry="30" fill="#ffffff"/>
      <circle cx="-10" cy="-10" r="3" fill="#000000"/>
      <circle cx="10" cy="-10" r="3" fill="#000000"/>
    </g>

    <!-- Morphée -->
    <g transform="translate(550, 300)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="10" ry="8" fill="#ffffff"/>
      <ellipse cx="6" cy="3" rx="8" ry="6" fill="#000000"/>
    </g>

    <!-- Sound effects -->
    <text x="400" y="150" font-size="24" fill="#666" font-style="italic" text-anchor="middle">Scratch, scratch, nibble, nibble</text>

    <defs>
      <linearGradient id="barnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d2691e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b4513;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  orangey_excited: () => `
    <!-- Orangey excited about mice -->
    <rect x="0" y="0" width="800" height="500" fill="url(#barnGradient)"/>

    <!-- Orangey puffed up with pride -->
    <g transform="translate(400, 250)">
      <ellipse cx="0" cy="0" rx="50" ry="35" fill="#ff8c00"/>
      <circle cx="20" cy="-15" r="22" fill="#ff8c00"/>
      <!-- Proud ears -->
      <path d="M 8 -32 L 3 -20 L 13 -20 Z" fill="#ff8c00"/>
      <path d="M 32 -32 L 27 -20 L 37 -20 Z" fill="#ff8c00"/>
      <!-- Excited eyes -->
      <circle cx="12" cy="-15" r="5" fill="#90ee90"/>
      <circle cx="28" cy="-15" r="5" fill="#90ee90"/>
      <circle cx="12" cy="-15" r="3" fill="#000"/>
      <circle cx="28" cy="-15" r="3" fill="#000"/>
      <!-- Big grin -->
      <path d="M 10 -5 Q 20 0 30 -5" stroke="#000" stroke-width="2" fill="none"/>
      <!-- Puffed chest -->
      <ellipse cx="0" cy="5" rx="45" ry="30" fill="#ff8c00"/>
      <!-- Fluffy tail up -->
      <ellipse cx="-45" cy="-10" rx="25" ry="40" fill="#ff8c00" transform="rotate(-30 -45 -10)"/>
    </g>

    <!-- Morphée speaking -->
    <g transform="translate(550, 280)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="10" ry="8" fill="#ffffff"/>
      <ellipse cx="6" cy="3" rx="8" ry="6" fill="#000000"/>
      <!-- Speech bubble -->
      <ellipse cx="0" cy="-50" rx="60" ry="30" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M -10 -30 L -15 -15 L 5 -25 Z" fill="white" stroke="#333" stroke-width="2"/>
      <text x="0" y="-45" text-anchor="middle" font-size="14">That's mice!</text>
    </g>

    <!-- Pride sparkles around Orangey -->
    ${[...Array(5)].map((_, i) => {
      const angle = (i * 72) * Math.PI / 180;
      const x = 400 + Math.cos(angle) * 80;
      const y = 250 + Math.sin(angle) * 60;
      return `<text x="${x}" y="${y}" font-size="20" fill="#ffd700">✨</text>`;
    }).join('')}

    <defs>
      <linearGradient id="barnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d2691e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b4513;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  realization: () => `
    <!-- Realization scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#barnGradient)"/>

    <!-- Window showing farmhouse -->
    <rect x="250" y="100" width="300" height="200" fill="#87ceeb" stroke="#8b4513" stroke-width="8"/>
    <rect x="350" y="200" width="100" height="80" fill="#f0e68c"/>
    <rect x="370" y="220" width="25" height="25" fill="#4682b4"/>
    <rect x="405" y="220" width="25" height="25" fill="#4682b4"/>
    <polygon points="350,200 400,150 450,200" fill="#8b0000"/>

    <!-- Heidi with tilted head -->
    <g transform="translate(300, 350)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8B4513" transform="rotate(-15 0 0)"/>
      <ellipse cx="-10" cy="0" rx="15" ry="20" fill="#ffffff" transform="rotate(-15 -10 0)"/>
      <!-- Confused expression -->
      <text x="0" y="-40" font-size="24">🤔</text>
    </g>

    <!-- Randy shocked -->
    <g transform="translate(500, 350)">
      <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ffffff"/>
      <!-- Shocked eyes -->
      <circle cx="-12" cy="-10" r="6" fill="#000000"/>
      <circle cx="12" cy="-10" r="6" fill="#000000"/>
      <!-- Open mouth -->
      <ellipse cx="0" cy="5" rx="10" ry="8" fill="#ff69b4"/>
      <text x="0" y="-45" font-size="24">😱</text>
    </g>

    <!-- Speech bubble -->
    <ellipse cx="400" cy="280" rx="100" ry="40" fill="white" stroke="#333" stroke-width="2"/>
    <text x="400" y="275" text-anchor="middle" font-size="14">That's where we keep</text>
    <text x="400" y="295" text-anchor="middle" font-size="14">our treats!</text>

    <defs>
      <linearGradient id="barnGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#d2691e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b4513;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  mission_start: () => `
    <!-- Mission start - heroic pose -->
    <rect x="0" y="0" width="800" height="500" fill="url(#skyGradient)"/>

    <!-- Ground -->
    <rect x="0" y="400" width="800" height="100" fill="#90ee90"/>

    <!-- Orangey in heroic pose -->
    <g transform="translate(400, 300)">
      <!-- Sunbeam behind -->
      <ellipse cx="0" cy="0" rx="100" ry="150" fill="#ffd700" opacity="0.3"/>

      <!-- Standing tall -->
      <ellipse cx="0" cy="20" rx="35" ry="45" fill="#ff8c00"/>
      <circle cx="0" cy="-20" r="25" fill="#ff8c00"/>
      <!-- Determined ears -->
      <path d="M -12 -40 L -17 -25 L -7 -25 Z" fill="#ff8c00"/>
      <path d="M 12 -40 L 7 -25 L 17 -25 Z" fill="#ff8c00"/>
      <!-- Determined eyes -->
      <path d="M -10 -20 L -5 -23" stroke="#000" stroke-width="3"/>
      <path d="M 10 -20 L 5 -23" stroke="#000" stroke-width="3"/>
      <!-- Raised paw -->
      <ellipse cx="25" cy="0" rx="12" ry="20" fill="#ff8c00" transform="rotate(-45 25 0)"/>
      <!-- Cape-like tail -->
      <ellipse cx="-35" cy="10" rx="20" ry="50" fill="#ff8c00" transform="rotate(30 -35 10)"/>
    </g>

    <!-- Friends ready for action -->
    <g transform="translate(250, 350)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
    </g>
    <g transform="translate(320, 350)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
    </g>
    <g transform="translate(480, 350)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
    </g>
    <g transform="translate(550, 350)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
    </g>

    <!-- Speech bubble -->
    <ellipse cx="400" cy="200" rx="80" ry="35" fill="white" stroke="#333" stroke-width="2"/>
    <path d="M 380 230 L 370 250 L 390 235 Z" fill="white" stroke="#333" stroke-width="2"/>
    <text x="400" y="205" text-anchor="middle" font-size="18" font-weight="bold">To the pantry!</text>

    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#98fb98;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  sneaking_kitchen: () => `
    <!-- Sneaking through kitchen -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Kitchen counter -->
    <rect x="0" y="350" width="800" height="50" fill="#8b4513"/>
    <rect x="0" y="340" width="800" height="10" fill="#a0522d"/>

    <!-- Cabinets -->
    <rect x="100" y="150" width="150" height="180" fill="#deb887" stroke="#8b4513" stroke-width="3"/>
    <rect x="300" y="150" width="150" height="180" fill="#deb887" stroke="#8b4513" stroke-width="3"/>
    <rect x="500" y="150" width="150" height="180" fill="#deb887" stroke="#8b4513" stroke-width="3"/>

    <!-- Sneaking friends in a line -->
    <g transform="translate(200, 420)">
      <!-- Orangey leading -->
      <ellipse cx="0" cy="0" rx="35" ry="20" fill="#ff8c00"/>
      <circle cx="15" cy="-5" r="15" fill="#ff8c00"/>
      <!-- Sneaky eyes -->
      <path d="M 8 -5 L 12 -5" stroke="#000" stroke-width="2"/>
      <path d="M 18 -5 L 22 -5" stroke="#000" stroke-width="2"/>
      <!-- Paw up for silence -->
      <ellipse cx="30" cy="-10" rx="8" ry="12" fill="#ff8c00"/>
    </g>

    <!-- Luna tiptoeing -->
    <g transform="translate(280, 420)">
      <ellipse cx="0" cy="0" rx="25" ry="18" fill="#000000"/>
      <!-- Sniffing nose -->
      <circle cx="20" cy="-5" r="3" fill="#ff69b4"/>
    </g>

    <!-- Others following -->
    <g transform="translate(350, 420)">
      <ellipse cx="0" cy="0" rx="28" ry="20" fill="#8B4513"/>
    </g>
    <g transform="translate(430, 420)">
      <ellipse cx="0" cy="0" rx="30" ry="22" fill="#ffffff"/>
    </g>
    <g transform="translate(510, 420)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="6" ry="5" fill="#ffffff"/>
    </g>

    <!-- Smell lines -->
    <path d="M 600 300 Q 580 320 560 300 Q 540 320 520 300" stroke="#ffd700" stroke-width="2" fill="none" opacity="0.6"/>

    <!-- Shh gesture -->
    <text x="200" y="380" font-size="24" fill="#666">🤫</text>
  `,

  mice_feast: () => `
    <!-- Mice having a feast -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry shelves -->
    <rect x="200" y="100" width="400" height="300" fill="#8b4513" stroke="#654321" stroke-width="4"/>
    <line x1="200" y1="200" x2="600" y2="200" stroke="#654321" stroke-width="3"/>
    <line x1="200" y1="300" x2="600" y2="300" stroke="#654321" stroke-width="3"/>

    <!-- Food items -->
    <rect x="220" y="150" width="60" height="40" fill="#ff6347" stroke="#8b0000" stroke-width="2" rx="5"/>
    <text x="250" y="175" text-anchor="middle" font-size="12" fill="#fff">CAT FOOD</text>

    <circle cx="320" cy="170" r="25" fill="#ffd700"/>
    <text x="320" y="175" text-anchor="middle" font-size="10">Cheese</text>

    <rect x="380" y="160" width="40" height="30" fill="#d2691e"/>
    <text x="400" y="178" text-anchor="middle" font-size="10" fill="#fff">PB</text>

    <!-- Three mice feasting -->
    <g transform="translate(400, 250)">
      <!-- Maurice -->
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#808080"/>
      <circle cx="10" cy="-3" r="8" fill="#808080"/>
      <!-- Tiny ears -->
      <circle cx="6" cy="-10" r="4" fill="#808080"/>
      <circle cx="14" cy="-10" r="4" fill="#808080"/>
      <!-- Eyes -->
      <circle cx="8" cy="-3" r="2" fill="#000"/>
      <circle cx="12" cy="-3" r="2" fill="#000"/>
      <!-- Holding kibble -->
      <circle cx="15" cy="5" r="4" fill="#8b4513"/>
    </g>

    <!-- Mildred -->
    <g transform="translate(350, 260)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#696969"/>
      <circle cx="8" cy="-2" r="6" fill="#696969"/>
      <!-- Nibbling -->
      <circle cx="12" cy="2" r="3" fill="#8b4513"/>
    </g>

    <!-- Third mouse -->
    <g transform="translate(450, 255)">
      <ellipse cx="0" cy="0" rx="13" ry="11" fill="#778899"/>
      <circle cx="9" cy="-2" r="7" fill="#778899"/>
      <!-- Throwing kibble -->
      <circle cx="5" cy="-8" r="3" fill="#8b4513"/>
      <path d="M 5 -8 Q 0 -15 -5 -8" stroke="#8b4513" stroke-width="1" fill="none" stroke-dasharray="2,2"/>
    </g>

    <!-- Speech bubbles -->
    <ellipse cx="400" cy="200" rx="70" ry="25" fill="white" stroke="#333" stroke-width="1"/>
    <text x="400" y="195" text-anchor="middle" font-size="11">Pass me another</text>
    <text x="400" y="210" text-anchor="middle" font-size="11">kibble, Maurice!</text>

    <ellipse cx="350" cy="220" rx="50" ry="20" fill="white" stroke="#333" stroke-width="1"/>
    <text x="350" y="225" text-anchor="middle" font-size="11">Delicious!</text>
  `,

  mice_discovery: () => `
    <!-- Discovering organized mice -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry corner view -->
    <rect x="250" y="100" width="300" height="350" fill="#8b4513" stroke="#654321" stroke-width="4"/>

    <!-- Pasta box ladder -->
    <rect x="350" y="300" width="40" height="60" fill="#ffeb3b" stroke="#ffd700" stroke-width="2" transform="rotate(-10 370 330)"/>
    <text x="370" y="335" text-anchor="middle" font-size="8" fill="#000" transform="rotate(-10 370 335)">PASTA</text>

    <rect x="380" y="250" width="40" height="60" fill="#ffeb3b" stroke="#ffd700" stroke-width="2" transform="rotate(5 400 280)"/>
    <text x="400" y="285" text-anchor="middle" font-size="8" fill="#000" transform="rotate(5 400 285)">PASTA</text>

    <rect x="360" y="200" width="40" height="60" fill="#ffeb3b" stroke="#ffd700" stroke-width="2" transform="rotate(-8 380 230)"/>

    <!-- Mice bucket brigade -->
    <g transform="translate(380, 180)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#808080"/>
      <circle cx="0" cy="-8" r="3" fill="#8b4513"/>
      <path d="M 0 -8 L 0 20" stroke="#8b4513" stroke-width="1" stroke-dasharray="2,2"/>
    </g>

    <g transform="translate(390, 230)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#696969"/>
      <circle cx="5" cy="0" r="3" fill="#8b4513"/>
    </g>

    <g transform="translate(375, 280)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#778899"/>
      <circle cx="-5" cy="5" r="3" fill="#8b4513"/>
    </g>

    <!-- Orangey peeking -->
    <g transform="translate(150, 300)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#ff8c00"/>
      <circle cx="25" cy="-5" r="20" fill="#ff8c00"/>
      <!-- One eye peeking -->
      <circle cx="35" cy="-5" r="4" fill="#90ee90"/>
      <circle cx="35" cy="-5" r="2" fill="#000"/>
    </g>

    <!-- Randy amazed -->
    <g transform="translate(150, 370)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#ffffff"/>
      <text x="0" y="-40" font-size="20">😲</text>
    </g>

    <!-- Whispered text -->
    <text x="150" y="250" font-size="14" fill="#666" font-style="italic">They're so organized!</text>
  `,

  surprise_attack: () => `
    <!-- Surprise attack scene -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry explosion of action -->
    <rect x="200" y="100" width="400" height="350" fill="#8b4513" stroke="#654321" stroke-width="4"/>

    <!-- Friends bursting in -->
    <g transform="translate(400, 250)">
      <!-- Orangey leaping -->
      <ellipse cx="0" cy="0" rx="40" ry="30" fill="#ff8c00" transform="rotate(-20 0 0)"/>
      <circle cx="15" cy="-10" r="20" fill="#ff8c00"/>
      <!-- Action lines -->
      <path d="M -40 0 L -60 0 M -35 -10 L -55 -15 M -35 10 L -55 15" stroke="#ff8c00" stroke-width="3"/>
    </g>

    <!-- Luna barking -->
    <g transform="translate(300, 280)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#000000"/>
      <ellipse cx="15" cy="-5" rx="8" ry="12" fill="#ff69b4"/>
      <text x="30" y="-20" font-size="24">!</text>
    </g>

    <!-- Mice in panic -->
    <g transform="translate(400, 320)">
      <!-- Maurice shocked -->
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#808080"/>
      <circle cx="0" cy="-5" r="3" fill="#8b4513"/> <!-- Dropping kibble -->
      <path d="M 0 -5 L 0 10" stroke="#8b4513" stroke-width="1" stroke-dasharray="2,2"/>
    </g>

    <!-- Kibbles flying everywhere -->
    ${[...Array(15)].map((_, i) => {
      const x = 250 + Math.random() * 300;
      const y = 150 + Math.random() * 250;
      const rotation = Math.random() * 360;
      return `<circle cx="${x}" cy="${y}" r="3" fill="#8b4513" transform="rotate(${rotation} ${x} ${y})"/>`;
    }).join('')}

    <!-- Big SURPRISE text -->
    <text x="400" y="180" text-anchor="middle" font-size="48" fill="#ff0000" font-weight="bold">SURPRISE!</text>
  `,

  mice_panic: () => `
    <!-- Mice in chaos -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry shelves -->
    <rect x="200" y="100" width="400" height="350" fill="#8b4513" stroke="#654321" stroke-width="4"/>

    <!-- Mouse tangled in spaghetti -->
    <g transform="translate(350, 300)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#696969"/>
      <!-- Spaghetti strands -->
      <path d="M -10 -5 Q 0 10 10 -5 Q 20 10 30 -5" stroke="#ffeb3b" stroke-width="2" fill="none"/>
      <path d="M -5 0 Q 5 15 15 0 Q 25 15 35 0" stroke="#ffeb3b" stroke-width="2" fill="none"/>
      <text x="0" y="-20" font-size="16">😵</text>
    </g>

    <!-- Mouse diving into cereal box -->
    <rect x="450" y="250" width="50" height="70" fill="#ff6347" stroke="#8b0000" stroke-width="2"/>
    <text x="475" y="285" text-anchor="middle" font-size="10" fill="#fff">CEREAL</text>
    <g transform="translate(475, 250)">
      <!-- Just mouse tail sticking out -->
      <path d="M 0 0 Q -10 -10 -20 -5" stroke="#778899" stroke-width="4" fill="none"/>
    </g>

    <!-- Maurice slipping on kibble -->
    <g transform="translate(400, 350)">
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#808080" transform="rotate(45 0 0)"/>
      <!-- Slip lines -->
      <path d="M -20 10 L 20 10" stroke="#666" stroke-width="2" stroke-dasharray="3,3"/>
      <!-- Kibble under him -->
      <circle cx="0" cy="15" r="4" fill="#8b4513"/>
      <!-- Motion blur -->
      <ellipse cx="-10" cy="0" rx="10" ry="8" fill="#808080" opacity="0.3"/>
      <ellipse cx="-20" cy="0" rx="8" ry="6" fill="#808080" opacity="0.2"/>
    </g>

    <!-- Maurice's speech -->
    <ellipse cx="400" cy="280" rx="90" ry="30" fill="white" stroke="#333" stroke-width="2"/>
    <text x="400" y="275" text-anchor="middle" font-size="12">Oh dear!</text>
    <text x="400" y="290" text-anchor="middle" font-size="12">It's Orangey the Terrible!</text>

    <!-- Orangey standing tall -->
    <g transform="translate(250, 250)">
      <ellipse cx="0" cy="0" rx="35" ry="40" fill="#ff8c00"/>
      <circle cx="0" cy="-25" r="20" fill="#ff8c00"/>
      <!-- Confident expression -->
      <path d="M -8 -25 L -3 -25" stroke="#000" stroke-width="3"/>
      <path d="M 8 -25 L 3 -25" stroke="#000" stroke-width="3"/>
      <path d="M -5 -15 Q 0 -12 5 -15" stroke="#000" stroke-width="2" fill="none"/>
    </g>
  `,

  negotiation: () => `
    <!-- Negotiation scene -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry background -->
    <rect x="150" y="100" width="500" height="350" fill="#8b4513" opacity="0.3"/>

    <!-- Orangey being reasonable -->
    <g transform="translate(250, 280)">
      <ellipse cx="0" cy="0" rx="40" ry="32" fill="#ff8c00"/>
      <circle cx="15" cy="-10" r="22" fill="#ff8c00"/>
      <!-- Friendly eyes -->
      <circle cx="8" cy="-10" r="4" fill="#90ee90"/>
      <circle cx="22" cy="-10" r="4" fill="#90ee90"/>
      <circle cx="8" cy="-10" r="2" fill="#000"/>
      <circle cx="22" cy="-10" r="2" fill="#000"/>
      <!-- Slight smile -->
      <path d="M 10 0 Q 15 3 20 0" stroke="#000" stroke-width="2" fill="none"/>
      <!-- Paw out peacefully -->
      <ellipse cx="35" cy="10" rx="10" ry="15" fill="#ff8c00"/>
    </g>

    <!-- Maurice peeking from behind soup can -->
    <circle cx="450" cy="320" r="40" fill="#ff6347"/>
    <text x="450" y="325" text-anchor="middle" font-size="14" fill="#fff">SOUP</text>
    <g transform="translate(480, 310)">
      <!-- Just eyes and ears visible -->
      <circle cx="0" cy="0" r="4" fill="#808080"/>
      <circle cx="10" cy="0" r="4" fill="#808080"/>
      <circle cx="2" cy="2" r="1" fill="#000"/>
      <circle cx="8" cy="2" r="1" fill="#000"/>
    </g>

    <!-- Speech bubbles -->
    <ellipse cx="250" cy="200" rx="100" ry="40" fill="white" stroke="#333" stroke-width="2"/>
    <path d="M 280 235 L 290 255 L 270 240 Z" fill="white" stroke="#333" stroke-width="2"/>
    <text x="250" y="190" text-anchor="middle" font-size="12">We won't hurt you,</text>
    <text x="250" y="205" text-anchor="middle" font-size="12">but you can't eat</text>
    <text x="250" y="220" text-anchor="middle" font-size="12">our food!</text>

    <ellipse cx="500" cy="250" rx="80" ry="35" fill="white" stroke="#333" stroke-width="2"/>
    <text x="500" y="245" text-anchor="middle" font-size="11">But we're hungry!</text>
    <text x="500" y="260" text-anchor="middle" font-size="11">The window was open!</text>
  `,

  luna_idea: () => `
    <!-- Luna's idea scene -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Luna with lightbulb moment -->
    <g transform="translate(400, 280)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#000000"/>
      <!-- Bright eyes -->
      <circle cx="-10" cy="-8" r="5" fill="#8B4513"/>
      <circle cx="10" cy="-8" r="5" fill="#8B4513"/>
      <!-- Excited expression -->
      <path d="M -8 5 Q 0 10 8 5" stroke="#ff69b4" stroke-width="2" fill="none"/>
      <!-- Lightbulb above head -->
      <g transform="translate(0, -60)">
        <circle cx="0" cy="0" r="20" fill="#ffeb3b" stroke="#ffd700" stroke-width="2"/>
        <rect x="-8" y="15" width="16" height="10" fill="#666" stroke="#333" stroke-width="1"/>
        <line x1="-5" y1="25" x2="-5" y2="28" stroke="#333" stroke-width="1"/>
        <line x1="0" y1="25" x2="0" y2="28" stroke="#333" stroke-width="1"/>
        <line x1="5" y1="25" x2="5" y2="28" stroke="#333" stroke-width="1"/>
        <!-- Glow effect -->
        <circle cx="0" cy="0" r="30" fill="#ffeb3b" opacity="0.3"/>
      </g>
    </g>

    <!-- Mice huddled together -->
    <g transform="translate(550, 320)">
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#808080"/>
      <ellipse cx="-12" cy="2" rx="12" ry="10" fill="#696969"/>
      <ellipse cx="10" cy="3" rx="13" ry="11" fill="#778899"/>
      <!-- Whispering effect -->
      <text x="0" y="-20" font-size="14" fill="#666" font-style="italic">whisper whisper</text>
    </g>

    <!-- Speech bubble from Luna -->
    <ellipse cx="400" cy="180" rx="120" ry="50" fill="white" stroke="#333" stroke-width="2"/>
    <path d="M 380 225 L 370 250 L 390 230 Z" fill="white" stroke="#333" stroke-width="2"/>
    <text x="400" y="165" text-anchor="middle" font-size="12">What if we make a deal?</text>
    <text x="400" y="180" text-anchor="middle" font-size="12">There's grain in the barn!</text>
    <text x="400" y="195" text-anchor="middle" font-size="12">You can live there peacefully!</text>
  `,

  making_deal: () => `
    <!-- Making the deal -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Orangey and Maurice shaking paw/hand -->
    <g transform="translate(400, 300)">
      <!-- Orangey's paw -->
      <ellipse cx="-30" cy="0" rx="40" ry="35" fill="#ff8c00"/>
      <circle cx="-10" cy="-15" r="22" fill="#ff8c00"/>
      <ellipse cx="15" cy="10" rx="15" ry="12" fill="#ff8c00"/>

      <!-- Maurice -->
      <ellipse cx="40" cy="10" rx="15" ry="12" fill="#808080"/>
      <circle cx="50" cy="5" r="10" fill="#808080"/>

      <!-- Tiny paw meeting big paw -->
      <circle cx="20" cy="10" r="8" fill="#ff8c00"/>
      <circle cx="25" cy="10" r="3" fill="#808080"/>

      <!-- Handshake lines -->
      <path d="M 15 5 L 15 15 M 25 5 L 25 15" stroke="#333" stroke-width="1" stroke-dasharray="2,1"/>
    </g>

    <!-- Orangey's friendly face -->
    <g transform="translate(370, 280)">
      <circle cx="0" cy="0" r="20" fill="#ff8c00"/>
      <circle cx="-5" cy="-2" r="3" fill="#90ee90"/>
      <circle cx="5" cy="-2" r="3" fill="#90ee90"/>
      <path d="M -8 5 Q 0 10 8 5" stroke="#000" stroke-width="2" fill="none"/>
    </g>

    <!-- Maurice's relieved face -->
    <g transform="translate(440, 290)">
      <circle cx="0" cy="0" r="8" fill="#808080"/>
      <circle cx="-2" cy="-1" r="1" fill="#000"/>
      <circle cx="2" cy="-1" r="1" fill="#000"/>
      <path d="M -3 2 Q 0 4 3 2" stroke="#000" stroke-width="1" fill="none"/>
    </g>

    <!-- Speech bubbles -->
    <ellipse cx="370" cy="220" rx="90" ry="35" fill="white" stroke="#333" stroke-width="2"/>
    <text x="370" y="210" text-anchor="middle" font-size="12">I only chase mice</text>
    <text x="370" y="225" text-anchor="middle" font-size="12">who steal our food!</text>

    <ellipse cx="440" cy="240" rx="50" ry="25" fill="white" stroke="#333" stroke-width="2"/>
    <text x="440" y="245" text-anchor="middle" font-size="11">It's a deal!</text>

    <!-- Other friends watching happily -->
    <g transform="translate(200, 350)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <text x="0" y="-30" font-size="16">😊</text>
    </g>
    <g transform="translate(600, 350)">
      <ellipse cx="0" cy="0" rx="30" ry="25" fill="#ffffff"/>
      <text x="0" y="-35" font-size="16">👍</text>
    </g>
  `,

  mice_march: () => `
    <!-- Mice marching to barn -->
    <rect x="0" y="0" width="800" height="500" fill="url(#outdoorGradient)"/>

    <!-- Path to barn -->
    <path d="M 100 400 Q 400 380 700 400" stroke="#d2691e" stroke-width="40" fill="none"/>

    <!-- Barn in distance -->
    <rect x="600" y="250" width="150" height="120" fill="#8b4513"/>
    <polygon points="600,250 675,200 750,250" fill="#654321"/>
    <rect x="660" y="300" width="30" height="70" fill="#4a4a4a"/>

    <!-- Mice marching in line -->
    <g transform="translate(300, 380)">
      <!-- Maurice leading -->
      <ellipse cx="0" cy="0" rx="15" ry="12" fill="#808080"/>
      <circle cx="10" cy="-3" r="8" fill="#808080"/>
      <!-- Marching leg -->
      <line x1="5" y1="10" x2="3" y2="18" stroke="#808080" stroke-width="3"/>
      <line x1="-5" y1="10" x2="-3" y2="18" stroke="#808080" stroke-width="3"/>
    </g>

    <g transform="translate(340, 380)">
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="#696969"/>
      <line x1="4" y1="8" x2="2" y2="15" stroke="#696969" stroke-width="2"/>
      <line x1="-4" y1="8" x2="-2" y2="15" stroke="#696969" stroke-width="2"/>
    </g>

    <!-- Spaghetti mouse at the end -->
    <g transform="translate(380, 380)">
      <ellipse cx="0" cy="0" rx="13" ry="11" fill="#778899"/>
      <!-- Spaghetti cape trailing -->
      <path d="M 5 5 Q 15 10 25 5 Q 35 10 45 5" stroke="#ffeb3b" stroke-width="3" fill="none"/>
      <path d="M 10 8 Q 20 13 30 8 Q 40 13 50 8" stroke="#ffeb3b" stroke-width="3" fill="none"/>
      <!-- Proud despite pasta -->
      <circle cx="-5" cy="-3" r="1" fill="#000"/>
      <circle cx="5" cy="-3" r="1" fill="#000"/>
    </g>

    <!-- Friends waving goodbye -->
    <g transform="translate(150, 350)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#ff8c00"/>
      <!-- Waving paw -->
      <ellipse cx="30" cy="-20" rx="10" ry="15" fill="#ff8c00" transform="rotate(-30 30 -20)"/>
    </g>

    <!-- Speech from Maurice -->
    <ellipse cx="300" cy="330" rx="60" ry="25" fill="white" stroke="#333" stroke-width="2"/>
    <text x="300" y="335" text-anchor="middle" font-size="12">To the barn!</text>

    <defs>
      <linearGradient id="outdoorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
        <stop offset="60%" style="stop-color:#98fb98;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#90ee90;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  pantry_mess: () => `
    <!-- Messy pantry scene -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Pantry shelves -->
    <rect x="150" y="100" width="500" height="350" fill="#8b4513" stroke="#654321" stroke-width="4"/>

    <!-- Mess everywhere -->
    <!-- Kibbles scattered -->
    ${[...Array(30)].map((_, i) => {
      const x = 200 + Math.random() * 400;
      const y = 150 + Math.random() * 300;
      return `<circle cx="${x}" cy="${y}" r="3" fill="#8b4513"/>`;
    }).join('')}

    <!-- Flour with hole -->
    <rect x="250" y="200" width="60" height="80" fill="#ffffff" stroke="#ddd" stroke-width="2"/>
    <text x="280" y="240" text-anchor="middle" font-size="12" fill="#333">FLOUR</text>
    <ellipse cx="280" cy="260" rx="15" ry="10" fill="#333"/>
    <!-- Flour spill -->
    <ellipse cx="280" cy="290" rx="40" ry="15" fill="#ffffff" opacity="0.8"/>

    <!-- Tiny paw prints -->
    ${[...Array(20)].map((_, i) => {
      const x = 200 + Math.random() * 400;
      const y = 150 + Math.random() * 300;
      return `
        <g transform="translate(${x}, ${y}) rotate(${Math.random() * 360})">
          <circle cx="0" cy="0" r="2" fill="#666" opacity="0.5"/>
          <circle cx="-3" cy="-3" r="1" fill="#666" opacity="0.5"/>
          <circle cx="3" cy="-3" r="1" fill="#666" opacity="0.5"/>
        </g>
      `;
    }).join('')}

    <!-- Friends surveying damage -->
    <g transform="translate(250, 400)">
      <ellipse cx="0" cy="0" rx="30" ry="24" fill="#ff8c00"/>
      <text x="0" y="-35" font-size="20">😅</text>
    </g>

    <g transform="translate(350, 400)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
    </g>

    <g transform="translate(450, 400)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
    </g>

    <g transform="translate(550, 400)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
    </g>

    <!-- Morphée's comment -->
    <ellipse cx="550" cy="350" rx="80" ry="30" fill="white" stroke="#333" stroke-width="2"/>
    <text x="550" y="345" text-anchor="middle" font-size="11">We need to clean</text>
    <text x="550" y="360" text-anchor="middle" font-size="11">and close that window!</text>
  `,

  lesson_learning: () => `
    <!-- Learning the lesson -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Kitchen counter with crumbs -->
    <rect x="0" y="350" width="800" height="50" fill="#8b4513"/>
    <rect x="0" y="340" width="800" height="10" fill="#a0522d"/>

    <!-- Crumbs on counter (being pointed at) -->
    ${[...Array(15)].map((_, i) => {
      const x = 250 + Math.random() * 300;
      const y = 345 + Math.random() * 10;
      return `<circle cx="${x}" cy="${y}" r="2" fill="#d2691e"/>`;
    }).join('')}

    <!-- Open window -->
    <rect x="550" y="150" width="120" height="150" fill="#87ceeb" stroke="#8b4513" stroke-width="6"/>
    <path d="M 550 225 L 520 225" stroke="#8b4513" stroke-width="6"/>
    <!-- Window swinging open -->
    <rect x="520" y="150" width="30" height="150" fill="#87ceeb" stroke="#8b4513" stroke-width="6" opacity="0.7"/>

    <!-- Heidi pointing at crumbs -->
    <g transform="translate(350, 400)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8B4513"/>
      <ellipse cx="-10" cy="0" rx="15" ry="20" fill="#ffffff"/>
      <!-- Pointing paw -->
      <ellipse cx="30" cy="-10" rx="8" ry="15" fill="#8B4513" transform="rotate(-45 30 -10)"/>
      <line x1="35" y1="-15" x2="400" y2="340" stroke="#ff0000" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
    </g>

    <!-- Randy looking sheepish -->
    <g transform="translate(450, 400)">
      <ellipse cx="0" cy="0" rx="38" ry="30" fill="#ffffff"/>
      <!-- Embarrassed expression -->
      <circle cx="-10" cy="-10" r="3" fill="#000000"/>
      <circle cx="10" cy="-10" r="3" fill="#000000"/>
      <path d="M -5 5 Q 0 2 5 5" stroke="#000" stroke-width="2" fill="none"/>
      <ellipse cx="-20" cy="0" rx="5" ry="8" fill="#ff69b4" opacity="0.5"/>
      <ellipse cx="20" cy="0" rx="5" ry="8" fill="#ff69b4" opacity="0.5"/>
    </g>

    <!-- Speech bubbles -->
    <ellipse cx="350" cy="300" rx="100" ry="40" fill="white" stroke="#333" stroke-width="2"/>
    <text x="350" y="290" text-anchor="middle" font-size="11">If we hadn't left</text>
    <text x="350" y="305" text-anchor="middle" font-size="11">food out yesterday...</text>

    <ellipse cx="450" cy="320" rx="80" ry="30" fill="white" stroke="#333" stroke-width="2"/>
    <text x="450" y="315" text-anchor="middle" font-size="11">Someone forgot to</text>
    <text x="450" y="330" text-anchor="middle" font-size="11">close the window!</text>
  `,

  orangey_teaching: () => `
    <!-- Orangey teaching the lesson -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Orangey on stool like teacher -->
    <rect x="350" y="320" width="100" height="80" fill="#8b4513" stroke="#654321" stroke-width="3"/>
    <g transform="translate(400, 280)">
      <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ff8c00"/>
      <circle cx="0" cy="-25" r="22" fill="#ff8c00"/>
      <!-- Teacher ears -->
      <path d="M -12 -42 L -17 -30 L -7 -30 Z" fill="#ff8c00"/>
      <path d="M 12 -42 L 7 -30 L 17 -30 Z" fill="#ff8c00"/>
      <!-- Wise eyes -->
      <circle cx="-8" cy="-25" r="4" fill="#90ee90"/>
      <circle cx="8" cy="-25" r="4" fill="#90ee90"/>
      <circle cx="-8" cy="-25" r="2" fill="#000"/>
      <circle cx="8" cy="-25" r="2" fill="#000"/>
      <!-- Teaching paw raised -->
      <ellipse cx="35" cy="-10" rx="12" ry="18" fill="#ff8c00" transform="rotate(-30 35 -10)"/>
    </g>

    <!-- Chalkboard with rules -->
    <rect x="200" y="100" width="400" height="150" fill="#2f4f2f" stroke="#8b4513" stroke-width="5"/>
    <text x="400" y="140" text-anchor="middle" font-size="20" fill="#ffffff" font-family="cursive">Rules:</text>
    <text x="250" y="170" font-size="16" fill="#ffffff">✓ Seal all food</text>
    <text x="250" y="195" font-size="16" fill="#ffffff">✓ No crumbs on counters</text>
    <text x="250" y="220" font-size="16" fill="#ffffff">✓ Close windows & doors</text>

    <!-- Students (friends) sitting and nodding -->
    <g transform="translate(250, 380)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
      <circle cx="-8" cy="-5" r="3" fill="#8B4513"/>
      <circle cx="8" cy="-5" r="3" fill="#8B4513"/>
    </g>

    <g transform="translate(320, 380)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
    </g>

    <g transform="translate(480, 380)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
    </g>

    <g transform="translate(550, 380)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
    </g>

    <!-- Everyone nodding -->
    <text x="250" y="350" font-size="16">✓</text>
    <text x="320" y="350" font-size="16">✓</text>
    <text x="480" y="350" font-size="16">✓</text>
    <text x="550" y="350" font-size="16">✓</text>
  `,

  barn_peace: () => `
    <!-- Peaceful barn scene with mice -->
    <rect x="0" y="0" width="800" height="500" fill="url(#eveningGradient)"/>

    <!-- Barn interior -->
    <rect x="150" y="150" width="500" height="300" fill="#8b4513" opacity="0.8"/>
    <polygon points="150,150 400,50 650,150" fill="#654321" opacity="0.9"/>

    <!-- Hay pile -->
    <ellipse cx="500" cy="380" rx="100" ry="50" fill="#daa520"/>
    <ellipse cx="480" cy="370" rx="80" ry="40" fill="#d4a017"/>

    <!-- Mice cozy home in corner -->
    <g transform="translate(500, 350)">
      <!-- Nest made of hay -->
      <ellipse cx="0" cy="20" rx="60" ry="30" fill="#d4a017"/>

      <!-- Maurice -->
      <ellipse cx="0" cy="10" rx="15" ry="12" fill="#808080"/>
      <circle cx="10" cy="7" r="8" fill="#808080"/>

      <!-- Other mice -->
      <ellipse cx="-20" cy="12" rx="12" ry="10" fill="#696969"/>
      <ellipse cx="15" cy="15" rx="13" ry="11" fill="#778899"/>

      <!-- Grain pieces -->
      <ellipse cx="-10" cy="20" rx="3" ry="5" fill="#daa520"/>
      <ellipse cx="5" cy="22" rx="3" ry="5" fill="#daa520"/>
      <ellipse cx="12" cy="18" rx="3" ry="5" fill="#daa520"/>
    </g>

    <!-- Friends checking on mice -->
    <g transform="translate(300, 350)">
      <ellipse cx="0" cy="0" rx="35" ry="28" fill="#ff8c00"/>
      <circle cx="15" cy="-8" r="20" fill="#ff8c00"/>
      <!-- Happy expression -->
      <circle cx="8" cy="-8" r="3" fill="#90ee90"/>
      <circle cx="22" cy="-8" r="3" fill="#90ee90"/>
      <path d="M 10 2 Q 15 5 20 2" stroke="#000" stroke-width="2" fill="none"/>
    </g>

    <g transform="translate(250, 360)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
    </g>

    <!-- Speech from Maurice -->
    <ellipse cx="500" cy="300" rx="90" ry="30" fill="white" stroke="#333" stroke-width="2"/>
    <text x="500" y="295" text-anchor="middle" font-size="11">Thanks for the new home!</text>
    <text x="500" y="310" text-anchor="middle" font-size="11">No more house raids!</text>

    <defs>
      <linearGradient id="eveningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ff7f50;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ffa500;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:1" />
      </linearGradient>
    </defs>
  `,

  orangey_patrol: () => `
    <!-- Orangey on patrol -->
    <rect x="0" y="0" width="800" height="500" fill="#faf0e6"/>

    <!-- Kitchen with everything in order -->
    <rect x="0" y="350" width="800" height="50" fill="#8b4513"/>
    <rect x="0" y="340" width="800" height="10" fill="#a0522d"/>

    <!-- Sealed containers on counter -->
    <rect x="200" y="290" width="60" height="50" fill="#4682b4" stroke="#333" stroke-width="2" rx="5"/>
    <text x="230" y="320" text-anchor="middle" font-size="10" fill="#fff">SEALED</text>

    <rect x="300" y="290" width="60" height="50" fill="#4682b4" stroke="#333" stroke-width="2" rx="5"/>
    <text x="330" y="320" text-anchor="middle" font-size="10" fill="#fff">SAFE</text>

    <!-- Closed window -->
    <rect x="500" y="150" width="120" height="150" fill="#87ceeb" stroke="#8b4513" stroke-width="6"/>
    <line x1="560" y1="150" x2="560" y2="300" stroke="#8b4513" stroke-width="4"/>
    <line x1="500" y1="225" x2="620" y2="225" stroke="#8b4513" stroke-width="4"/>
    <!-- Lock symbol -->
    <circle cx="560" cy="225" r="8" fill="#ffd700"/>
    <text x="560" y="230" text-anchor="middle" font-size="12">🔒</text>

    <!-- Orangey with medal -->
    <g transform="translate(400, 300)">
      <ellipse cx="0" cy="0" rx="45" ry="38" fill="#ff8c00"/>
      <circle cx="0" cy="-25" r="23" fill="#ff8c00"/>
      <!-- Proud ears -->
      <path d="M -12 -45 L -17 -32 L -7 -32 Z" fill="#ff8c00"/>
      <path d="M 12 -45 L 7 -32 L 17 -32 Z" fill="#ff8c00"/>
      <!-- Confident eyes -->
      <path d="M -10 -25 L -5 -27" stroke="#000" stroke-width="3"/>
      <path d="M 10 -25 L 5 -27" stroke="#000" stroke-width="3"/>
      <path d="M -8 -15 Q 0 -12 8 -15" stroke="#000" stroke-width="2" fill="none"/>

      <!-- Button medal on chest -->
      <circle cx="0" cy="10" r="12" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
      <text x="0" y="15" text-anchor="middle" font-size="10">⭐</text>
      <path d="M 0 -2 L 0 -15" stroke="#ff0000" stroke-width="2"/>
    </g>

    <!-- Patrol checklist floating -->
    <rect x="50" y="200" width="120" height="100" fill="#fffacd" stroke="#333" stroke-width="2"/>
    <text x="110" y="220" text-anchor="middle" font-size="12" font-weight="bold">Daily Patrol:</text>
    <text x="60" y="240" font-size="10">✓ Windows closed</text>
    <text x="60" y="255" font-size="10">✓ Food stored</text>
    <text x="60" y="270" font-size="10">✓ No crumbs</text>
    <text x="60" y="285" font-size="10">✓ Mice happy</text>
  `,

  happy_ending: () => `
    <!-- Happy ending scene -->
    <rect x="0" y="0" width="800" height="500" fill="url(#sunsetGradient)"/>

    <!-- Farm silhouette -->
    <rect x="300" y="280" width="200" height="150" fill="#654321" opacity="0.8"/>
    <polygon points="300,280 400,200 500,280" fill="#4a3020" opacity="0.8"/>

    <!-- Barn in background -->
    <rect x="100" y="320" width="120" height="100" fill="#8b4513" opacity="0.7"/>
    <polygon points="100,320 160,270 220,320" fill="#654321" opacity="0.7"/>

    <!-- All friends together -->
    <g transform="translate(400, 380)">
      <!-- Orangey in center -->
      <ellipse cx="0" cy="0" rx="40" ry="32" fill="#ff8c00"/>
      <circle cx="0" cy="-20" r="22" fill="#ff8c00"/>
      <!-- Happy face -->
      <circle cx="-8" cy="-20" r="3" fill="#90ee90"/>
      <circle cx="8" cy="-20" r="3" fill="#90ee90"/>
      <path d="M -10 -10 Q 0 -5 10 -10" stroke="#000" stroke-width="2" fill="none"/>

      <!-- Medal proudly displayed -->
      <circle cx="0" cy="5" r="10" fill="#ffd700"/>
      <text x="0" y="9" text-anchor="middle" font-size="8">⭐</text>
    </g>

    <!-- Other friends around -->
    <g transform="translate(320, 390)">
      <ellipse cx="0" cy="0" rx="25" ry="20" fill="#000000"/>
    </g>

    <g transform="translate(480, 390)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#8B4513"/>
    </g>

    <g transform="translate(280, 395)">
      <ellipse cx="0" cy="0" rx="32" ry="25" fill="#ffffff"/>
    </g>

    <g transform="translate(520, 385)">
      <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
      <ellipse cx="-8" cy="-3" rx="8" ry="6" fill="#ffffff"/>
    </g>

    <!-- Mice waving from barn -->
    <g transform="translate(160, 340)">
      <ellipse cx="0" cy="0" rx="10" ry="8" fill="#808080"/>
      <ellipse cx="-10" cy="2" rx="8" ry="6" fill="#696969"/>
      <ellipse cx="10" cy="1" rx="9" ry="7" fill="#778899"/>
      <!-- Tiny waving paws -->
      <line x1="5" y1="-5" x2="8" y2="-10" stroke="#808080" stroke-width="2"/>
      <line x1="-5" y1="-4" x2="-8" y2="-9" stroke="#696969" stroke-width="2"/>
    </g>

    <!-- Motto banner -->
    <rect x="250" y="100" width="300" height="60" fill="#fff" stroke="#ffd700" stroke-width="4" rx="10"/>
    <text x="400" y="135" text-anchor="middle" font-size="24" fill="#ff8c00" font-weight="bold">No crumbs, no problems!</text>

    <!-- Happy sun -->
    <circle cx="700" cy="100" r="40" fill="#ffeb3b"/>
    ${[...Array(8)].map((_, i) => {
      const angle = (i * 45) * Math.PI / 180;
      const x1 = 700 + Math.cos(angle) * 50;
      const y1 = 100 + Math.sin(angle) * 50;
      const x2 = 700 + Math.cos(angle) * 70;
      const y2 = 100 + Math.sin(angle) * 70;
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffeb3b" stroke-width="4"/>`;
    }).join('')}

    <defs>
      <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffb347;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ffcc33;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#90ee90;stop-opacity:1" />
      </linearGradient>
    </defs>
  `
};

// Read configuration
const configPath = path.join(__dirname, '..', 'docs', 'stories', 'orangey-mouse-mission-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Generate SVG for each page
function generatePageSVG(pageConfig) {
  const scene = pageConfig.scene || 'barn_intro';
  const generator = sceneGenerators[scene] || sceneGenerators.barn_intro;
  return generator();
}

// Generate HTML with all pages
function generateHTML() {
  const pages = config.pages.map(page => {
    const svg = generatePageSVG(page);

    return `
            <!-- Page ${page.number} -->
            <div class="story-page${page.number === 1 ? ' active' : ''}" id="page-${page.number}">
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
  const templatePath = path.join(__dirname, '..', 'docs', 'stories', 'orangey-mouse-mission.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // Find the main section and insert pages
  const mainStart = html.indexOf('<main>');
  const mainEnd = html.indexOf('</main>');

  if (mainStart !== -1 && mainEnd !== -1) {
    html = html.substring(0, mainStart + 6) + '\n' + pages + '\n        ' + html.substring(mainEnd);
  }

  // Save the updated HTML
  fs.writeFileSync(templatePath, html);
  console.log('✅ Generated all 20 pages with SVG illustrations');
}

// Run the generation
generateHTML();
console.log('✅ Orangey\'s Great Mouse Mission pages generated successfully!');