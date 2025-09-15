#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate complete HTML with all pages and SVG illustrations
function generatePages() {
    const pages = [];

    // Page data with SVG scenes
    const pageData = [
        {
            num: 1,
            text: "It was midnight at the farm, and everyone was fast asleep. But suddenly, a soft tapping came from the window. Tap, tap, tap! Luna's ears perked up first. Who could it be at this late hour?",
            svg: 'bedroom_night'
        },
        {
            num: 2,
            text: "It was the Easter Bunny! He was glowing softly in the moonlight. 'Shh,' he whispered, 'I need your help with a special midnight mission. There are magical math eggs hidden around the farm!'",
            svg: 'window_bunny'
        },
        {
            num: 3,
            text: "Luna quietly woke her friends. 'The Easter Bunny needs our help!' she whispered. One by one, Heidi, Randy, and Morphée opened their sleepy eyes. How many friends are awake now? Let's count: 1 + 1 + 1 + 1 = ?",
            svg: 'waking_friends',
            hasMath: true
        },
        {
            num: 4,
            text: "Perfect! All 4 friends were ready for the adventure. The Easter Bunny smiled. 'Each magical egg has a number on it. We need to collect them in the right order to unlock a special surprise!'",
            svg: 'friends_ready'
        },
        {
            num: 5,
            text: "They tiptoed outside under the starry sky. 'Look!' said the Easter Bunny, 'I see 2 glowing eggs by the barn and 3 more by the pond. How many eggs is that altogether?' Can you add 2 + 3?",
            svg: 'outside_night',
            hasMath: true
        },
        {
            num: 6,
            text: "Wonderful! 5 eggs in total! Heidi, being the fastest swimmer, ran to collect the 3 eggs by the pond. But oh no! One rolled into the water. How many eggs does Heidi have now? 3 - 1 = ?",
            svg: 'pond_eggs',
            hasMath: true
        },
        {
            num: 7,
            text: "That's right, 2 eggs! But don't worry - Heidi loves water! She jumped in with a splash and rescued the third egg. 'Got it!' she barked happily, shaking water everywhere in the moonlight.",
            svg: 'heidi_swimming'
        },
        {
            num: 8,
            text: "Meanwhile, Randy found something interesting. 'WOOF! There are 4 eggs in the garden!' he barked (quietly for once). Luna already had 1 egg. If Luna takes 2 more from Randy, how many will she have? 1 + 2 = ?",
            svg: 'garden_discovery',
            hasMath: true
        },
        {
            num: 9,
            text: "Excellent! Luna now has 3 eggs. Morphée, being the best climber, spotted something special. 'There are eggs in the tree!' she meowed. She saw 6 eggs but could only carry 4 down. How many are still in the tree? 6 - 4 = ?",
            svg: 'tree_eggs',
            hasMath: true
        },
        {
            num: 10,
            text: "Yes, 2 eggs remained! The Easter Bunny hopped up the tree in one big bounce and brought them down. 'Teamwork!' he said with a giggle. The eggs glowed brighter when they were all together.",
            svg: 'bunny_climbing'
        },
        {
            num: 11,
            text: "The Easter Bunny gathered all the friends. 'Now for the magical part! Luna has 3 eggs, Heidi has 3 eggs. How many do they have together?' Can you add 3 + 3?",
            svg: 'counting_eggs',
            hasMath: true
        },
        {
            num: 12,
            text: "Super! 6 eggs! 'Now,' said the Easter Bunny, 'Randy has 2 eggs and Morphée has 4 eggs. What's 2 + 4?' The eggs started glowing even brighter as they counted.",
            svg: 'more_counting',
            hasMath: true
        },
        {
            num: 13,
            text: "Amazing! Another 6 eggs! 'So we have 6 eggs from Luna and Heidi, and 6 eggs from Randy and Morphée. That's 6 + 6!' The Easter Bunny's eyes twinkled. Can you solve it?",
            svg: 'final_count',
            hasMath: true
        },
        {
            num: 14,
            text: "Brilliant! 12 magical eggs! As soon as they counted to 12, the eggs began to float and dance in the air, creating beautiful patterns of light against the night sky. 'You did it!' cheered the Easter Bunny.",
            svg: 'floating_eggs'
        },
        {
            num: 15,
            text: "The magical eggs transformed into shooting stars! 'Make a wish!' said the Easter Bunny. If each friend makes 2 wishes, how many wishes total? 4 friends × 2 wishes = 4 + 4 = ?",
            svg: 'shooting_stars',
            hasMath: true
        },
        {
            num: 16,
            text: "Wonderful! 8 wishes flew into the night sky! The Easter Bunny pulled out a special golden egg. 'This is for you to share. If you divide it into 4 equal pieces, each friend gets one piece. 4 - 3 = ? piece left after giving 3 away!'",
            svg: 'golden_egg',
            hasMath: true
        },
        {
            num: 17,
            text: "Perfect! 1 piece left for the last friend! The Easter Bunny gave each friend their piece of the golden egg. When they held them up together, they formed a beautiful star that lit up the whole farm for a moment.",
            svg: 'golden_star'
        },
        {
            num: 18,
            text: "The Easter Bunny had one last surprise. 'I brought 10 special treats, but I ate 3 on the way here!' He giggled. 'How many are left for you?' Can you solve 10 - 3?",
            svg: 'bunny_treats',
            hasMath: true
        },
        {
            num: 19,
            text: "Excellent! 7 treats! But the kind friends decided to save 3 treats for tomorrow to share with other farm animals. 'You are so thoughtful!' said the Easter Bunny, his heart full of joy. The sky was starting to lighten - dawn was coming!",
            svg: 'dawn_approaching'
        },
        {
            num: 20,
            text: "As the first rays of sun appeared, the Easter Bunny gave each friend a warm hug. 'Thank you for helping with the midnight math mission! Remember, math is everywhere - even in magical midnight adventures!' And with a hop and a wave, he disappeared into the morning mist. The friends went back to bed with happy hearts, ready to dream about their mathematical midnight adventure!",
            svg: 'sunrise_farewell'
        }
    ];

    // Generate HTML for each page
    pageData.forEach((page, index) => {
        const isActive = index === 0 ? ' active' : '';
        const pageHTML = `
            <!-- Page ${page.num} -->
            <div class="story-page${isActive}" id="page-${page.num}">
                <svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                    ${generateSVG(page.svg, page.num)}
                </svg>
                <div class="page-text">
                    <p>${page.text}</p>
                    <span class="page-counter">Page ${page.num} of 20</span>
                </div>
            </div>`;
        pages.push(pageHTML);
    });

    return pages.join('\n');
}

function generateSVG(scene, pageNum) {
    const svgs = {
        bedroom_night: `
                    <!-- Night bedroom scene -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#2a2f4a"/>

                    <!-- Moon through window -->
                    <rect x="100" y="50" width="150" height="150" fill="#1a2049" stroke="#3a4069" stroke-width="3"/>
                    <circle cx="175" cy="125" r="30" fill="#F0E68C"/>

                    <!-- Stars -->
                    <circle cx="120" cy="80" r="2" fill="white"/>
                    <circle cx="200" cy="100" r="2" fill="white"/>
                    <circle cx="150" cy="60" r="2" fill="white"/>

                    <!-- Beds with sleeping friends -->
                    <rect x="300" y="280" width="120" height="80" fill="#8B4513" rx="5"/>
                    <ellipse cx="360" cy="320" rx="40" ry="20" fill="#654321"/>

                    <!-- Luna waking up -->
                    <g transform="translate(360, 300)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                        <circle cx="-8" cy="-5" r="3" fill="#ffffff"/>
                        <circle cx="8" cy="-5" r="3" fill="#ffffff"/>
                        <path d="M-15 -10 Q-10 -15 -5 -10" stroke="#2a2a2a" stroke-width="2" fill="none"/>
                        <path d="M5 -10 Q10 -15 15 -10" stroke="#2a2a2a" stroke-width="2" fill="none"/>
                    </g>

                    <!-- Other beds -->
                    <rect x="450" y="280" width="120" height="80" fill="#8B4513" rx="5"/>
                    <rect x="300" y="180" width="120" height="80" fill="#8B4513" rx="5"/>
                    <rect x="450" y="180" width="120" height="80" fill="#8B4513" rx="5"/>`,

        window_bunny: `
                    <!-- Night scene with bunny at window -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#2a2f4a"/>

                    <!-- Window -->
                    <rect x="250" y="50" width="200" height="200" fill="#1a2049" stroke="#3a4069" stroke-width="3"/>
                    <line x1="350" y1="50" x2="350" y2="250" stroke="#3a4069" stroke-width="3"/>
                    <line x1="250" y1="150" x2="450" y2="150" stroke="#3a4069" stroke-width="3"/>

                    <!-- Moon -->
                    <circle cx="350" cy="120" r="40" fill="#F0E68C"/>

                    <!-- Easter Bunny glowing -->
                    <g transform="translate(350, 180)">
                        <circle cx="0" cy="0" r="50" fill="#FFD700" opacity="0.3"/>
                        <ellipse cx="0" cy="10" rx="25" ry="30" fill="white"/>
                        <ellipse cx="0" cy="-20" rx="20" ry="25" fill="white"/>
                        <ellipse cx="-12" cy="-35" rx="8" ry="15" fill="white"/>
                        <ellipse cx="12" cy="-35" rx="8" ry="15" fill="white"/>
                        <circle cx="-8" cy="-20" r="3" fill="black"/>
                        <circle cx="8" cy="-20" r="3" fill="black"/>
                        <ellipse cx="0" cy="-10" rx="4" ry="3" fill="pink"/>
                    </g>

                    <!-- Luna looking -->
                    <g transform="translate(500, 320)">
                        <ellipse cx="0" cy="0" rx="30" ry="25" fill="#2a2a2a"/>
                        <circle cx="-10" cy="-5" r="4" fill="#ffffff"/>
                        <circle cx="10" cy="-5" r="4" fill="#ffffff"/>
                        <circle cx="-10" cy="-5" r="2" fill="#000000"/>
                        <circle cx="10" cy="-5" r="2" fill="#000000"/>
                    </g>`,

        waking_friends: `
                    <!-- Bedroom with all friends waking -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#2a2f4a"/>

                    <!-- Window with moon -->
                    <rect x="50" y="50" width="120" height="120" fill="#1a2049" stroke="#3a4069" stroke-width="3"/>
                    <circle cx="110" cy="110" r="25" fill="#F0E68C"/>

                    <!-- Luna (awake) -->
                    <g transform="translate(200, 300)">
                        <ellipse cx="0" cy="0" rx="30" ry="25" fill="#2a2a2a"/>
                        <circle cx="-10" cy="-5" r="4" fill="#ffffff"/>
                        <circle cx="10" cy="-5" r="4" fill="#ffffff"/>
                        <ellipse cx="0" cy="35" rx="8" ry="12" fill="#2a2a2a"/>
                    </g>

                    <!-- Heidi (waking) -->
                    <g transform="translate(350, 300)">
                        <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8b4513"/>
                        <ellipse cx="-15" cy="-10" rx="5" ry="3" fill="#000000"/>
                        <ellipse cx="15" cy="-10" rx="5" ry="1" fill="#000000"/>
                        <ellipse cx="-25" cy="0" rx="10" ry="15" fill="#4a2c17"/>
                        <ellipse cx="25" cy="0" rx="10" ry="15" fill="#4a2c17"/>
                    </g>

                    <!-- Randy (stretching) -->
                    <g transform="translate(500, 300)">
                        <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ffffff"/>
                        <circle cx="-12" cy="-10" r="3" fill="#000000"/>
                        <circle cx="12" cy="-10" r="3" fill="#000000"/>
                        <path d="M-30 20 Q-35 15 -30 10" stroke="#ffffff" stroke-width="8" fill="none"/>
                    </g>

                    <!-- Morphée (yawning) -->
                    <g transform="translate(650, 300)">
                        <ellipse cx="0" cy="0" rx="28" ry="22" fill="#ff8c00"/>
                        <ellipse cx="-10" cy="-5" rx="8" ry="6" fill="#000000" opacity="0.8"/>
                        <ellipse cx="10" cy="0" rx="6" ry="8" fill="#ffffff" opacity="0.8"/>
                        <ellipse cx="-8" cy="-8" rx="4" ry="2" fill="#000000"/>
                        <ellipse cx="8" cy="-8" rx="4" ry="2" fill="#000000"/>
                        <ellipse cx="0" cy="0" rx="3" ry="5" fill="#ff69b4"/>
                    </g>

                    <!-- Number "4" floating -->
                    <text x="400" y="200" font-size="60" fill="#FFD700" opacity="0.6" text-anchor="middle">?</text>`,

        friends_ready: `
                    <!-- All friends ready with Easter Bunny -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#2a2f4a"/>

                    <!-- Stars -->
                    ${[...Array(15)].map((_, i) =>
                        `<circle cx="${Math.random() * 800}" cy="${Math.random() * 300}" r="2" fill="white"/>`
                    ).join('')}

                    <!-- Easter Bunny in center -->
                    <g transform="translate(400, 250)">
                        <circle cx="0" cy="0" r="40" fill="#FFD700" opacity="0.2"/>
                        <ellipse cx="0" cy="20" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-15" rx="25" ry="30" fill="white"/>
                        <ellipse cx="-15" cy="-40" rx="10" ry="20" fill="white"/>
                        <ellipse cx="15" cy="-40" rx="10" ry="20" fill="white"/>
                        <circle cx="-10" cy="-15" r="4" fill="black"/>
                        <circle cx="10" cy="-15" r="4" fill="black"/>
                        <ellipse cx="0" cy="-5" rx="5" ry="4" fill="pink"/>
                        <path d="M-5 0 Q0 5 5 0" stroke="black" stroke-width="1" fill="none"/>
                    </g>

                    <!-- Friends in semicircle -->
                    <!-- Luna -->
                    <g transform="translate(250, 320)">
                        <ellipse cx="0" cy="0" rx="28" ry="23" fill="#2a2a2a"/>
                        <circle cx="-8" cy="-5" r="3" fill="#ffffff"/>
                        <circle cx="8" cy="-5" r="3" fill="#ffffff"/>
                    </g>

                    <!-- Heidi -->
                    <g transform="translate(350, 330)">
                        <ellipse cx="0" cy="0" rx="32" ry="26" fill="#8b4513"/>
                        <ellipse cx="-10" cy="-5" rx="6" ry="4" fill="#6b3410" opacity="0.6"/>
                    </g>

                    <!-- Randy -->
                    <g transform="translate(450, 330)">
                        <ellipse cx="0" cy="0" rx="35" ry="30" fill="#ffffff"/>
                        <circle cx="-10" cy="-8" r="2" fill="#000000"/>
                        <circle cx="10" cy="-8" r="2" fill="#000000"/>
                    </g>

                    <!-- Morphée -->
                    <g transform="translate(550, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ff8c00"/>
                        <ellipse cx="-8" cy="-5" rx="6" ry="5" fill="#000000" opacity="0.8"/>
                    </g>`,

        outside_night: `
                    <!-- Outside farm at night -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="650" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Stars -->
                    ${[...Array(20)].map((_, i) =>
                        `<circle cx="${Math.random() * 800}" cy="${Math.random() * 300}" r="${1 + Math.random()}" fill="white"/>`
                    ).join('')}

                    <!-- Barn silhouette -->
                    <rect x="100" y="200" width="150" height="150" fill="#2a1506"/>
                    <polygon points="100,200 175,150 250,200" fill="#1a0f03"/>

                    <!-- Pond -->
                    <ellipse cx="600" cy="380" rx="120" ry="40" fill="#1e3a5f" opacity="0.8"/>

                    <!-- Glowing eggs by barn -->
                    <ellipse cx="130" cy="340" rx="12" ry="15" fill="#FFD700" opacity="0.8"/>
                    <ellipse cx="200" cy="340" rx="12" ry="15" fill="#FF69B4" opacity="0.8"/>

                    <!-- Glowing eggs by pond -->
                    <ellipse cx="550" cy="370" rx="12" ry="15" fill="#98FB98" opacity="0.8"/>
                    <ellipse cx="600" cy="375" rx="12" ry="15" fill="#DDA0DD" opacity="0.8"/>
                    <ellipse cx="650" cy="370" rx="12" ry="15" fill="#87CEEB" opacity="0.8"/>

                    <!-- Characters -->
                    <g transform="translate(400, 320)">
                        <!-- Easter Bunny pointing -->
                        <ellipse cx="0" cy="0" rx="25" ry="30" fill="white"/>
                        <path d="M20 -10 L40 -15" stroke="white" stroke-width="8" stroke-linecap="round"/>
                    </g>`,

        pond_eggs: `
                    <!-- Pond scene with Heidi -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon reflection -->
                    <circle cx="650" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Pond -->
                    <ellipse cx="400" cy="380" rx="200" ry="60" fill="#1e3a5f"/>
                    <ellipse cx="400" cy="380" rx="180" ry="50" fill="#2e4a7f" opacity="0.5"/>

                    <!-- Heidi by pond -->
                    <g transform="translate(300, 340)">
                        <ellipse cx="0" cy="0" rx="35" ry="28" fill="#8b4513"/>
                        <ellipse cx="-10" cy="-5" rx="8" ry="6" fill="#6b3410" opacity="0.6"/>
                        <circle cx="-10" cy="-8" r="3" fill="#000000"/>
                        <circle cx="10" cy="-8" r="3" fill="#000000"/>
                    </g>

                    <!-- Eggs (2 on shore, 1 rolling into water) -->
                    <ellipse cx="250" cy="360" rx="12" ry="15" fill="#FFD700"/>
                    <ellipse cx="280" cy="365" rx="12" ry="15" fill="#FF69B4"/>

                    <!-- Egg in water -->
                    <g transform="translate(400, 380)">
                        <ellipse cx="0" cy="10" rx="12" ry="15" fill="#98FB98" opacity="0.7"/>
                        <circle cx="-5" cy="5" r="3" fill="white" opacity="0.3"/>
                        <circle cx="5" cy="15" r="2" fill="white" opacity="0.3"/>
                    </g>

                    <!-- Splash effect -->
                    <circle cx="400" cy="390" r="20" fill="none" stroke="#4682B4" stroke-width="2" opacity="0.5"/>
                    <circle cx="400" cy="390" r="30" fill="none" stroke="#4682B4" stroke-width="1" opacity="0.3"/>`,

        heidi_swimming: `
                    <!-- Heidi swimming in pond -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="650" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Pond -->
                    <ellipse cx="400" cy="380" rx="220" ry="70" fill="#1e3a5f"/>

                    <!-- Heidi in water -->
                    <g transform="translate(400, 380)">
                        <ellipse cx="0" cy="0" rx="35" ry="15" fill="#8b4513"/>
                        <ellipse cx="-15" cy="-5" rx="20" ry="20" fill="#8b4513"/>
                        <circle cx="-20" cy="-8" r="3" fill="#000000"/>
                        <circle cx="-10" cy="-8" r="3" fill="#000000"/>

                        <!-- Egg in mouth -->
                        <ellipse cx="5" cy="-5" rx="10" ry="12" fill="#98FB98"/>

                        <!-- Water splashes -->
                        <circle cx="-30" cy="5" r="5" fill="#4682B4" opacity="0.6"/>
                        <circle cx="30" cy="0" r="8" fill="#4682B4" opacity="0.5"/>
                        <circle cx="20" cy="10" r="4" fill="#4682B4" opacity="0.7"/>
                    </g>

                    <!-- Ripples -->
                    <ellipse cx="400" cy="380" rx="60" ry="20" fill="none" stroke="#4682B4" stroke-width="2" opacity="0.4"/>
                    <ellipse cx="400" cy="380" rx="90" ry="30" fill="none" stroke="#4682B4" stroke-width="1" opacity="0.3"/>

                    <!-- Other friends watching -->
                    <g transform="translate(200, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                    </g>
                    <g transform="translate(600, 320)">
                        <ellipse cx="0" cy="0" rx="30" ry="25" fill="#ffffff"/>
                    </g>`,

        garden_discovery: `
                    <!-- Garden scene with Randy -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon and stars -->
                    <circle cx="650" cy="80" r="35" fill="#F0E68C"/>
                    ${[...Array(15)].map((_, i) =>
                        `<circle cx="${Math.random() * 800}" cy="${Math.random() * 300}" r="1.5" fill="white"/>`
                    ).join('')}

                    <!-- Garden rows -->
                    <rect x="200" y="360" width="400" height="5" fill="#2a5a2a"/>
                    <rect x="200" y="380" width="400" height="5" fill="#2a5a2a"/>
                    <rect x="200" y="400" width="400" height="5" fill="#2a5a2a"/>

                    <!-- Vegetables -->
                    <circle cx="250" cy="355" r="8" fill="#ff6347"/>
                    <circle cx="350" cy="355" r="8" fill="#ff6347"/>
                    <circle cx="450" cy="355" r="8" fill="#ff6347"/>

                    <!-- Randy (excited) -->
                    <g transform="translate(400, 320)">
                        <ellipse cx="0" cy="0" rx="40" ry="35" fill="#ffffff"/>
                        <circle cx="-12" cy="-10" r="3" fill="#000000"/>
                        <circle cx="12" cy="-10" r="3" fill="#000000"/>
                        <ellipse cx="0" cy="0" rx="5" ry="3" fill="#000000"/>
                        <path d="M-10 5 Q0 10 10 5" stroke="#333333" stroke-width="2" fill="none"/>

                        <!-- Tail wagging -->
                        <ellipse cx="35" cy="-10" rx="15" ry="20" fill="#ffffff" transform="rotate(30 35 -10)"/>
                    </g>

                    <!-- 4 eggs in garden -->
                    <ellipse cx="300" cy="375" rx="12" ry="15" fill="#FFD700"/>
                    <ellipse cx="330" cy="375" rx="12" ry="15" fill="#FF69B4"/>
                    <ellipse cx="470" cy="375" rx="12" ry="15" fill="#98FB98"/>
                    <ellipse cx="500" cy="375" rx="12" ry="15" fill="#DDA0DD"/>

                    <!-- Luna with 1 egg -->
                    <g transform="translate(250, 330)">
                        <ellipse cx="0" cy="0" rx="28" ry="23" fill="#2a2a2a"/>
                        <ellipse cx="15" cy="5" rx="10" ry="12" fill="#87CEEB"/>
                    </g>`,

        tree_eggs: `
                    <!-- Tree scene with Morphée climbing -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="100" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Large tree -->
                    <rect x="380" y="250" width="40" height="100" fill="#4a2c17"/>
                    <circle cx="400" cy="200" r="80" fill="#2a5a2a"/>
                    <circle cx="360" cy="180" r="60" fill="#2a5a2a"/>
                    <circle cx="440" cy="180" r="60" fill="#2a5a2a"/>

                    <!-- Morphée in tree -->
                    <g transform="translate(400, 200)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ff8c00"/>
                        <ellipse cx="-8" cy="-5" rx="6" ry="5" fill="#000000" opacity="0.8"/>
                        <ellipse cx="8" cy="0" rx="5" ry="6" fill="#ffffff" opacity="0.8"/>
                        <path d="M-15 -10 L-20 -25 L-10 -15 Z" fill="#ff8c00"/>
                        <path d="M15 -10 L20 -25 L10 -15 Z" fill="#ff8c00"/>
                    </g>

                    <!-- 6 eggs in tree (4 being carried, 2 remaining) -->
                    <ellipse cx="380" cy="180" rx="10" ry="12" fill="#FFD700" opacity="0.5"/>
                    <ellipse cx="420" cy="180" rx="10" ry="12" fill="#FF69B4" opacity="0.5"/>

                    <!-- Eggs being carried down -->
                    <g transform="translate(400, 250)">
                        <ellipse cx="-15" cy="0" rx="10" ry="12" fill="#98FB98"/>
                        <ellipse cx="0" cy="0" rx="10" ry="12" fill="#DDA0DD"/>
                        <ellipse cx="15" cy="0" rx="10" ry="12" fill="#87CEEB"/>
                        <ellipse cx="0" cy="15" rx="10" ry="12" fill="#FFB6C1"/>
                    </g>

                    <!-- Friends watching below -->
                    <g transform="translate(300, 340)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                    </g>
                    <g transform="translate(500, 340)">
                        <ellipse cx="0" cy="0" rx="32" ry="26" fill="#8b4513"/>
                    </g>`,

        bunny_climbing: `
                    <!-- Easter Bunny climbing tree -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon and stars -->
                    <circle cx="100" cy="80" r="35" fill="#F0E68C"/>
                    ${[...Array(10)].map((_, i) =>
                        `<circle cx="${Math.random() * 800}" cy="${Math.random() * 300}" r="1.5" fill="white"/>`
                    ).join('')}

                    <!-- Tree -->
                    <rect x="380" y="250" width="40" height="100" fill="#4a2c17"/>
                    <circle cx="400" cy="200" r="80" fill="#2a5a2a"/>

                    <!-- Easter Bunny hopping up -->
                    <g transform="translate(400, 180)">
                        <circle cx="0" cy="0" r="30" fill="#FFD700" opacity="0.3"/>
                        <ellipse cx="0" cy="10" rx="20" ry="25" fill="white"/>
                        <ellipse cx="0" cy="-15" rx="18" ry="20" fill="white"/>
                        <ellipse cx="-10" cy="-30" rx="7" ry="15" fill="white"/>
                        <ellipse cx="10" cy="-30" rx="7" ry="15" fill="white"/>

                        <!-- Eggs in paws -->
                        <ellipse cx="-15" cy="10" rx="8" ry="10" fill="#FFD700"/>
                        <ellipse cx="15" cy="10" rx="8" ry="10" fill="#FF69B4"/>
                    </g>

                    <!-- All friends below with eggs -->
                    <g transform="translate(300, 340)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                        <circle cx="0" cy="20" r="8" fill="#98FB98" opacity="0.8"/>
                    </g>
                    <g transform="translate(400, 340)">
                        <ellipse cx="0" cy="0" rx="32" ry="26" fill="#8b4513"/>
                        <circle cx="0" cy="20" r="8" fill="#DDA0DD" opacity="0.8"/>
                    </g>
                    <g transform="translate(500, 340)">
                        <ellipse cx="0" cy="0" rx="35" ry="30" fill="#ffffff"/>
                        <circle cx="0" cy="25" r="8" fill="#87CEEB" opacity="0.8"/>
                    </g>`,

        counting_eggs: `
                    <!-- Friends counting eggs -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon centered -->
                    <circle cx="400" cy="60" r="35" fill="#F0E68C"/>

                    <!-- Easter Bunny in center -->
                    <g transform="translate(400, 200)">
                        <ellipse cx="0" cy="0" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-25" rx="25" ry="28" fill="white"/>
                        <circle cx="-8" cy="-25" r="3" fill="black"/>
                        <circle cx="8" cy="-25" r="3" fill="black"/>
                    </g>

                    <!-- Luna with 3 eggs -->
                    <g transform="translate(250, 300)">
                        <ellipse cx="0" cy="0" rx="28" ry="23" fill="#2a2a2a"/>
                        <ellipse cx="-20" cy="20" rx="8" ry="10" fill="#FFD700"/>
                        <ellipse cx="0" cy="20" rx="8" ry="10" fill="#FF69B4"/>
                        <ellipse cx="20" cy="20" rx="8" ry="10" fill="#98FB98"/>
                    </g>

                    <!-- Heidi with 3 eggs -->
                    <g transform="translate(550, 300)">
                        <ellipse cx="0" cy="0" rx="32" ry="26" fill="#8b4513"/>
                        <ellipse cx="-20" cy="20" rx="8" ry="10" fill="#DDA0DD"/>
                        <ellipse cx="0" cy="20" rx="8" ry="10" fill="#87CEEB"/>
                        <ellipse cx="20" cy="20" rx="8" ry="10" fill="#FFB6C1"/>
                    </g>

                    <!-- Floating numbers -->
                    <text x="250" y="250" font-size="40" fill="#FFD700" text-anchor="middle">3</text>
                    <text x="400" y="150" font-size="50" fill="#FFD700" text-anchor="middle">+</text>
                    <text x="550" y="250" font-size="40" fill="#FFD700" text-anchor="middle">3</text>`,

        more_counting: `
                    <!-- Randy and Morphée with eggs -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="400" cy="60" r="35" fill="#F0E68C"/>

                    <!-- Easter Bunny watching -->
                    <g transform="translate(400, 180)">
                        <ellipse cx="0" cy="0" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-25" rx="25" ry="28" fill="white"/>
                        <circle cx="-8" cy="-25" r="3" fill="black"/>
                        <circle cx="8" cy="-25" r="3" fill="black"/>
                        <path d="M-10 -15 Q0 -10 10 -15" stroke="black" stroke-width="1" fill="none"/>
                    </g>

                    <!-- Randy with 2 eggs -->
                    <g transform="translate(250, 300)">
                        <ellipse cx="0" cy="0" rx="35" ry="30" fill="#ffffff"/>
                        <ellipse cx="-15" cy="20" rx="8" ry="10" fill="#FFD700"/>
                        <ellipse cx="15" cy="20" rx="8" ry="10" fill="#FF69B4"/>
                    </g>

                    <!-- Morphée with 4 eggs -->
                    <g transform="translate(550, 300)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ff8c00"/>
                        <ellipse cx="-25" cy="20" rx="8" ry="10" fill="#98FB98"/>
                        <ellipse cx="-8" cy="20" rx="8" ry="10" fill="#DDA0DD"/>
                        <ellipse cx="8" cy="20" rx="8" ry="10" fill="#87CEEB"/>
                        <ellipse cx="25" cy="20" rx="8" ry="10" fill="#FFB6C1"/>
                    </g>

                    <!-- Numbers -->
                    <text x="250" y="250" font-size="40" fill="#FFD700" text-anchor="middle">2</text>
                    <text x="400" y="250" font-size="50" fill="#FFD700" text-anchor="middle">+</text>
                    <text x="550" y="250" font-size="40" fill="#FFD700" text-anchor="middle">4</text>`,

        final_count: `
                    <!-- All eggs together -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon glowing brighter -->
                    <circle cx="400" cy="60" r="40" fill="#F0E68C"/>
                    <circle cx="400" cy="60" r="50" fill="#FFD700" opacity="0.3"/>

                    <!-- Two groups of 6 eggs each -->
                    <g transform="translate(250, 250)">
                        ${[0, 1, 2, 3, 4, 5].map((i) =>
                            `<ellipse cx="${(i % 3) * 30 - 30}" cy="${Math.floor(i / 3) * 30}" rx="10" ry="12" fill="${['#FFD700', '#FF69B4', '#98FB98', '#DDA0DD', '#87CEEB', '#FFB6C1'][i]}"/>`
                        ).join('')}
                    </g>

                    <g transform="translate(550, 250)">
                        ${[0, 1, 2, 3, 4, 5].map((i) =>
                            `<ellipse cx="${(i % 3) * 30 - 30}" cy="${Math.floor(i / 3) * 30}" rx="10" ry="12" fill="${['#FFB6C1', '#87CEEB', '#DDA0DD', '#98FB98', '#FF69B4', '#FFD700'][i]}"/>`
                        ).join('')}
                    </g>

                    <!-- Big plus and equals -->
                    <text x="400" y="270" font-size="60" fill="#FFD700" text-anchor="middle">+</text>
                    <text x="400" y="350" font-size="50" fill="#FFD700" text-anchor="middle">=</text>
                    <text x="400" y="420" font-size="70" fill="#FFD700" text-anchor="middle">?</text>`,

        floating_eggs: `
                    <!-- Magical floating eggs -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon extra bright -->
                    <circle cx="400" cy="60" r="40" fill="#F0E68C"/>
                    <circle cx="400" cy="60" r="60" fill="#FFD700" opacity="0.4"/>
                    <circle cx="400" cy="60" r="80" fill="#FFD700" opacity="0.2"/>

                    <!-- 12 eggs floating in circle -->
                    ${[...Array(12)].map((i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const x = 400 + Math.cos(angle) * 100;
                        const y = 200 + Math.sin(angle) * 100;
                        const colors = ['#FFD700', '#FF69B4', '#98FB98', '#DDA0DD', '#87CEEB', '#FFB6C1'];
                        return `
                        <g transform="translate(${x}, ${y})">
                            <circle cx="0" cy="0" r="15" fill="${colors[i % 6]}" opacity="0.3"/>
                            <ellipse cx="0" cy="0" rx="10" ry="12" fill="${colors[i % 6]}"/>
                            <circle cx="-3" cy="-3" r="3" fill="white" opacity="0.6"/>
                        </g>`;
                    }).join('')}

                    <!-- Light beams -->
                    <path d="M400 200 L300 350" stroke="#FFD700" stroke-width="2" opacity="0.3"/>
                    <path d="M400 200 L500 350" stroke="#FFD700" stroke-width="2" opacity="0.3"/>
                    <path d="M400 200 L400 350" stroke="#FFD700" stroke-width="2" opacity="0.3"/>

                    <!-- Friends watching in awe -->
                    <g transform="translate(200, 350)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#2a2a2a"/>
                    </g>
                    <g transform="translate(600, 350)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#ffffff"/>
                    </g>`,

        shooting_stars: `
                    <!-- Shooting stars scene -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="400" cy="60" r="35" fill="#F0E68C"/>

                    <!-- Shooting stars -->
                    ${[...Array(8)].map((i) => {
                        const x = 100 + i * 80;
                        const y = 50 + (i % 3) * 50;
                        return `
                        <g>
                            <line x1="${x}" y1="${y}" x2="${x + 40}" y2="${y + 20}" stroke="#FFD700" stroke-width="3" opacity="0.8"/>
                            <circle cx="${x}" cy="${y}" r="5" fill="#FFD700"/>
                            <circle cx="${x}" cy="${y}" r="8" fill="#FFD700" opacity="0.4"/>
                        </g>`;
                    }).join('')}

                    <!-- Easter Bunny -->
                    <g transform="translate(400, 250)">
                        <ellipse cx="0" cy="0" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-25" rx="25" ry="28" fill="white"/>
                    </g>

                    <!-- Friends making wishes -->
                    <g transform="translate(250, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                        <text x="0" y="-30" font-size="20" fill="#FFD700" text-anchor="middle">✨✨</text>
                    </g>
                    <g transform="translate(350, 320)">
                        <ellipse cx="0" cy="0" rx="28" ry="23" fill="#8b4513"/>
                        <text x="0" y="-30" font-size="20" fill="#FFD700" text-anchor="middle">✨✨</text>
                    </g>
                    <g transform="translate(450, 320)">
                        <ellipse cx="0" cy="0" rx="30" ry="25" fill="#ffffff"/>
                        <text x="0" y="-30" font-size="20" fill="#FFD700" text-anchor="middle">✨✨</text>
                    </g>
                    <g transform="translate(550, 320)">
                        <ellipse cx="0" cy="0" rx="22" ry="18" fill="#ff8c00"/>
                        <text x="0" y="-30" font-size="20" fill="#FFD700" text-anchor="middle">✨✨</text>
                    </g>`,

        golden_egg: `
                    <!-- Golden egg scene -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="650" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Easter Bunny holding golden egg -->
                    <g transform="translate(400, 200)">
                        <ellipse cx="0" cy="0" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-25" rx="25" ry="28" fill="white"/>

                        <!-- Golden egg -->
                        <ellipse cx="0" cy="20" rx="20" ry="25" fill="#FFD700"/>
                        <ellipse cx="0" cy="20" rx="25" ry="30" fill="#FFD700" opacity="0.5"/>
                        <ellipse cx="0" cy="20" rx="30" ry="35" fill="#FFD700" opacity="0.3"/>
                        <ellipse cx="-5" cy="15" rx="8" ry="10" fill="#FFFF00" opacity="0.6"/>
                    </g>

                    <!-- Division visualization -->
                    <g transform="translate(400, 320)">
                        <!-- 4 pieces -->
                        <path d="M-40 0 L-20 0 L-20 20 L-40 20 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                        <path d="M-15 0 L5 0 L5 20 L-15 20 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                        <path d="M10 0 L30 0 L30 20 L10 20 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
                        <path d="M35 0 L55 0 L55 20 L35 20 Z" fill="#FFD700" stroke="#FFA500" stroke-width="2" opacity="0.5"/>
                    </g>`,

        golden_star: `
                    <!-- Golden star formation -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Bright moon -->
                    <circle cx="400" cy="60" r="35" fill="#F0E68C"/>

                    <!-- Giant golden star -->
                    <g transform="translate(400, 200)">
                        <polygon points="0,-50 15,-15 50,-10 20,15 30,50 0,25 -30,50 -20,15 -50,-10 -15,-15"
                                fill="#FFD700" opacity="0.8"/>
                        <polygon points="0,-40 12,-12 40,-8 16,12 24,40 0,20 -24,40 -16,12 -40,-8 -12,-12"
                                fill="#FFFF00"/>
                        <circle cx="0" cy="0" r="15" fill="#FFFFFF" opacity="0.6"/>
                    </g>

                    <!-- Light rays -->
                    ${[...Array(8)].map((i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const x1 = 400 + Math.cos(angle) * 60;
                        const y1 = 200 + Math.sin(angle) * 60;
                        const x2 = 400 + Math.cos(angle) * 200;
                        const y2 = 200 + Math.sin(angle) * 200;
                        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="2" opacity="0.3"/>`;
                    }).join('')}

                    <!-- Friends holding pieces -->
                    <g transform="translate(300, 320)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#2a2a2a"/>
                        <rect x="-5" y="-20" width="10" height="15" fill="#FFD700"/>
                    </g>
                    <g transform="translate(380, 320)">
                        <ellipse cx="0" cy="0" rx="23" ry="19" fill="#8b4513"/>
                        <rect x="-5" y="-20" width="10" height="15" fill="#FFD700"/>
                    </g>
                    <g transform="translate(460, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ffffff"/>
                        <rect x="-5" y="-20" width="10" height="15" fill="#FFD700"/>
                    </g>
                    <g transform="translate(540, 320)">
                        <ellipse cx="0" cy="0" rx="18" ry="15" fill="#ff8c00"/>
                        <rect x="-5" y="-20" width="10" height="15" fill="#FFD700"/>
                    </g>`,

        bunny_treats: `
                    <!-- Easter Bunny with treats -->
                    <rect width="800" height="350" fill="#0f1538"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Moon -->
                    <circle cx="100" cy="80" r="35" fill="#F0E68C"/>

                    <!-- Easter Bunny with basket -->
                    <g transform="translate(400, 250)">
                        <ellipse cx="0" cy="0" rx="30" ry="35" fill="white"/>
                        <ellipse cx="0" cy="-25" rx="25" ry="28" fill="white"/>
                        <circle cx="-8" cy="-25" r="3" fill="black"/>
                        <circle cx="8" cy="-25" r="3" fill="black"/>

                        <!-- Basket -->
                        <path d="M-30 10 L-25 30 L25 30 L30 10 Z" fill="#8B4513"/>
                        <path d="M-35 10 Q0 5 35 10" stroke="#8B4513" stroke-width="3" fill="none"/>

                        <!-- 7 treats visible -->
                        <circle cx="-15" cy="15" r="5" fill="#FF69B4"/>
                        <circle cx="-5" cy="12" r="5" fill="#98FB98"/>
                        <circle cx="5" cy="15" r="5" fill="#FFD700"/>
                        <circle cx="15" cy="12" r="5" fill="#DDA0DD"/>
                        <circle cx="-10" cy="20" r="5" fill="#87CEEB"/>
                        <circle cx="0" cy="22" r="5" fill="#FFB6C1"/>
                        <circle cx="10" cy="20" r="5" fill="#FFA500"/>
                    </g>

                    <!-- Math visualization -->
                    <text x="400" y="350" font-size="40" fill="#FFD700" text-anchor="middle">10 - 3 = ?</text>

                    <!-- Friends excited -->
                    <g transform="translate(250, 340)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#2a2a2a"/>
                    </g>
                    <g transform="translate(550, 340)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#ffffff"/>
                    </g>`,

        dawn_approaching: `
                    <!-- Dawn sky starting to lighten -->
                    <defs>
                        <linearGradient id="dawnSky" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#0f1538;stop-opacity:1" />
                            <stop offset="70%" style="stop-color:#2a3f5f;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:0.5" />
                        </linearGradient>
                    </defs>
                    <rect width="800" height="350" fill="url(#dawnSky)"/>
                    <rect y="350" width="800" height="150" fill="#1a4d1a"/>

                    <!-- Fading moon -->
                    <circle cx="100" cy="80" r="30" fill="#F0E68C" opacity="0.6"/>

                    <!-- Few remaining stars -->
                    <circle cx="200" cy="50" r="1.5" fill="white" opacity="0.5"/>
                    <circle cx="600" cy="100" r="1.5" fill="white" opacity="0.5"/>

                    <!-- Horizon glow -->
                    <ellipse cx="400" cy="350" rx="400" ry="50" fill="#ff6b6b" opacity="0.3"/>

                    <!-- Friends with saved treats -->
                    <g transform="translate(400, 300)">
                        <!-- Small basket with 3 treats -->
                        <path d="M-20 0 L-15 15 L15 15 L20 0 Z" fill="#8B4513"/>
                        <circle cx="-5" cy="5" r="4" fill="#FF69B4"/>
                        <circle cx="0" cy="7" r="4" fill="#98FB98"/>
                        <circle cx="5" cy="5" r="4" fill="#FFD700"/>
                    </g>

                    <!-- Happy friends -->
                    <g transform="translate(300, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#2a2a2a"/>
                        <path d="M-5 5 Q0 8 5 5" stroke="white" stroke-width="1" fill="none"/>
                    </g>
                    <g transform="translate(500, 320)">
                        <ellipse cx="0" cy="0" rx="28" ry="23" fill="#8b4513"/>
                        <path d="M-5 5 Q0 8 5 5" stroke="black" stroke-width="1" fill="none"/>
                    </g>

                    <!-- Easter Bunny -->
                    <g transform="translate(400, 250)">
                        <ellipse cx="0" cy="0" rx="25" ry="30" fill="white"/>
                        <ellipse cx="0" cy="-20" rx="20" ry="23" fill="white"/>
                    </g>`,

        sunrise_farewell: `
                    <!-- Sunrise scene -->
                    <defs>
                        <linearGradient id="sunriseSky" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#ff9a56;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ffd93d;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="800" height="350" fill="url(#sunriseSky)"/>
                    <rect y="350" width="800" height="150" fill="#2a5a2a"/>

                    <!-- Rising sun -->
                    <circle cx="400" cy="320" r="40" fill="#FFD700"/>
                    <circle cx="400" cy="320" r="50" fill="#FFA500" opacity="0.5"/>
                    <circle cx="400" cy="320" r="60" fill="#FF6347" opacity="0.3"/>

                    <!-- Sun rays -->
                    ${[...Array(12)].map((i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const x1 = 400 + Math.cos(angle) * 70;
                        const y1 = 320 + Math.sin(angle) * 70;
                        const x2 = 400 + Math.cos(angle) * 150;
                        const y2 = 320 + Math.sin(angle) * 150;
                        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="2" opacity="0.4"/>`;
                    }).join('')}

                    <!-- Morning mist -->
                    <ellipse cx="200" cy="380" rx="150" ry="30" fill="white" opacity="0.3"/>
                    <ellipse cx="600" cy="380" rx="150" ry="30" fill="white" opacity="0.3"/>

                    <!-- Easter Bunny waving goodbye -->
                    <g transform="translate(600, 250)">
                        <ellipse cx="0" cy="0" rx="25" ry="30" fill="white" opacity="0.8"/>
                        <ellipse cx="0" cy="-20" rx="20" ry="23" fill="white" opacity="0.8"/>
                        <path d="M15 -10 Q25 -15 30 -5" stroke="white" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
                    </g>

                    <!-- Friends waving -->
                    <g transform="translate(200, 320)">
                        <ellipse cx="0" cy="0" rx="20" ry="16" fill="#2a2a2a"/>
                        <path d="M-15 -5 Q-20 -10 -15 -15" stroke="#2a2a2a" stroke-width="4" stroke-linecap="round"/>
                    </g>
                    <g transform="translate(280, 320)">
                        <ellipse cx="0" cy="0" rx="23" ry="19" fill="#8b4513"/>
                        <path d="M-15 -5 Q-20 -10 -15 -15" stroke="#8b4513" stroke-width="4" stroke-linecap="round"/>
                    </g>
                    <g transform="translate(360, 320)">
                        <ellipse cx="0" cy="0" rx="25" ry="20" fill="#ffffff"/>
                        <path d="M-15 -5 Q-20 -10 -15 -15" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
                    </g>
                    <g transform="translate(440, 320)">
                        <ellipse cx="0" cy="0" rx="18" ry="15" fill="#ff8c00"/>
                        <path d="M-15 -5 Q-20 -10 -15 -15" stroke="#ff8c00" stroke-width="4" stroke-linecap="round"/>
                    </g>

                    <!-- Hearts floating -->
                    <text x="300" y="200" font-size="30" fill="#FF69B4" opacity="0.6">❤</text>
                    <text x="500" y="180" font-size="25" fill="#FF69B4" opacity="0.5">❤</text>
                    <text x="400" y="220" font-size="35" fill="#FF69B4" opacity="0.7">❤</text>`
    };

    return svgs[scene] || `<text x="400" y="250" text-anchor="middle" font-size="30" fill="#666">Scene: ${scene}</text>`;
}

// Run the generation
const pages = generatePages();
console.log('Generated', pages.split('<!-- Page').length - 1, 'pages');

// Output to file
fs.writeFileSync(
    path.join(__dirname, '../docs/stories/midnight-math-pages.html'),
    pages
);

console.log('Pages saved to midnight-math-pages.html');

module.exports = { generatePages, generateSVG };