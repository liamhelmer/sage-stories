/**
 * SVG Character Library
 * Reusable SVG components for Sage Stories
 */

const SvgLibrary = {
    // Character definitions
    characters: {
        luna: {
            name: 'Luna',
            description: 'Black fuzzy puppy',
            draw: function(x = 100, y = 140, scale = 1) {
                return `
                    <g transform="translate(${x}, ${y}) scale(${scale})">
                        <!-- Luna - Black Fuzzy Puppy -->
                        <!-- Body -->
                        <ellipse cx="0" cy="0" rx="38" ry="28" fill="#1a1a1a"/>
                        <ellipse cx="0" cy="-2" rx="36" ry="26" fill="#2a2a2a"/>

                        <!-- Fuzzy texture -->
                        <circle cx="-15" cy="-5" r="3" fill="#3a3a3a" opacity="0.6"/>
                        <circle cx="15" cy="0" r="3" fill="#3a3a3a" opacity="0.6"/>
                        <circle cx="-5" cy="5" r="2" fill="#3a3a3a" opacity="0.6"/>
                        <circle cx="5" cy="-8" r="2" fill="#3a3a3a" opacity="0.6"/>

                        <!-- Head -->
                        <ellipse cx="0" cy="-40" rx="32" ry="30" fill="#1a1a1a"/>
                        <ellipse cx="0" cy="-42" rx="30" ry="28" fill="#2a2a2a"/>

                        <!-- Ears -->
                        <ellipse cx="-25" cy="-55" rx="14" ry="18" fill="#1a1a1a" transform="rotate(-25 -25 -55)"/>
                        <ellipse cx="-25" cy="-55" rx="12" ry="16" fill="#2a2a2a" transform="rotate(-25 -25 -55)"/>

                        <ellipse cx="25" cy="-55" rx="14" ry="18" fill="#1a1a1a" transform="rotate(25 25 -55)"/>
                        <ellipse cx="25" cy="-55" rx="12" ry="16" fill="#2a2a2a" transform="rotate(25 25 -55)"/>

                        <!-- Eyes -->
                        <ellipse cx="-15" cy="-45" rx="8" ry="10" fill="#1a1a1a"/>
                        <ellipse cx="-15" cy="-45" rx="6" ry="8" fill="#4a4a4a"/>
                        <circle cx="-15" cy="-47" r="3" fill="#2a2a2a"/>
                        <circle cx="-14" cy="-48" r="2" fill="white"/>

                        <ellipse cx="15" cy="-45" rx="8" ry="10" fill="#1a1a1a"/>
                        <ellipse cx="15" cy="-45" rx="6" ry="8" fill="#4a4a4a"/>
                        <circle cx="15" cy="-47" r="3" fill="#2a2a2a"/>
                        <circle cx="16" cy="-48" r="2" fill="white"/>

                        <!-- Snout -->
                        <ellipse cx="0" cy="-32" rx="12" ry="8" fill="#1a1a1a"/>
                        <ellipse cx="0" cy="-34" rx="10" ry="6" fill="#2a2a2a"/>

                        <!-- Nose -->
                        <ellipse cx="0" cy="-35" rx="5" ry="3" fill="#000000"/>
                        <ellipse cx="-1" cy="-36" rx="2" ry="1" fill="#ffffff" opacity="0.3"/>

                        <!-- Tail -->
                        <path d="M30 -5 Q45 -15 50 -10 Q48 -5 45 -2" stroke="#1a1a1a" stroke-width="8" fill="none" stroke-linecap="round"/>
                        <path d="M30 -5 Q45 -15 50 -10 Q48 -5 45 -2" stroke="#2a2a2a" stroke-width="6" fill="none" stroke-linecap="round"/>

                        <!-- Front legs -->
                        <ellipse cx="-12" cy="0" rx="8" ry="25" fill="#1a1a1a"/>
                        <ellipse cx="-12" cy="0" rx="6" ry="23" fill="#2a2a2a"/>

                        <ellipse cx="12" cy="0" rx="8" ry="25" fill="#1a1a1a"/>
                        <ellipse cx="12" cy="0" rx="6" ry="23" fill="#2a2a2a"/>
                    </g>`;
            }
        },

        heidi: {
            name: 'Heidi',
            description: 'German Shorthaired Pointer',
            draw: function(x = 100, y = 140, scale = 1) {
                return `
                    <g transform="translate(${x}, ${y}) scale(${scale})">
                        <!-- Heidi - German Shorthaired Pointer -->
                        <!-- Body -->
                        <ellipse cx="0" cy="0" rx="42" ry="32" fill="#6b3410"/>
                        <ellipse cx="0" cy="-2" rx="40" ry="30" fill="#8b4513"/>

                        <!-- Spots -->
                        <ellipse cx="-15" cy="-5" rx="8" ry="6" fill="#6b3410" opacity="0.6"/>
                        <ellipse cx="10" cy="0" rx="10" ry="8" fill="#6b3410" opacity="0.6"/>
                        <ellipse cx="0" cy="10" rx="7" ry="5" fill="#6b3410" opacity="0.6"/>

                        <!-- Head -->
                        <ellipse cx="0" cy="-45" rx="28" ry="32" fill="#6b3410"/>
                        <ellipse cx="0" cy="-47" rx="26" ry="30" fill="#8b4513"/>

                        <!-- Long ears -->
                        <ellipse cx="-25" cy="-40" rx="12" ry="25" fill="#6b3410" transform="rotate(-15 -25 -40)"/>
                        <ellipse cx="-25" cy="-40" rx="10" ry="23" fill="#4a2c17" transform="rotate(-15 -25 -40)"/>

                        <ellipse cx="25" cy="-40" rx="12" ry="25" fill="#6b3410" transform="rotate(15 25 -40)"/>
                        <ellipse cx="25" cy="-40" rx="10" ry="23" fill="#4a2c17" transform="rotate(15 25 -40)"/>

                        <!-- Eyes -->
                        <ellipse cx="-10" cy="-50" rx="6" ry="8" fill="#2a1506"/>
                        <circle cx="-10" cy="-48" r="3" fill="#000000"/>
                        <circle cx="-9" cy="-49" r="1.5" fill="white"/>

                        <ellipse cx="10" cy="-50" rx="6" ry="8" fill="#2a1506"/>
                        <circle cx="10" cy="-48" r="3" fill="#000000"/>
                        <circle cx="11" cy="-49" r="1.5" fill="white"/>

                        <!-- Snout -->
                        <ellipse cx="0" cy="-35" rx="14" ry="10" fill="#6b3410"/>
                        <ellipse cx="0" cy="-37" rx="12" ry="8" fill="#8b4513"/>

                        <!-- Nose -->
                        <ellipse cx="0" cy="-38" rx="6" ry="4" fill="#000000"/>

                        <!-- Tail -->
                        <path d="M35 -5 Q50 -10 55 -5" stroke="#6b3410" stroke-width="10" fill="none" stroke-linecap="round"/>
                        <path d="M35 -5 Q50 -10 55 -5" stroke="#8b4513" stroke-width="8" fill="none" stroke-linecap="round"/>
                    </g>`;
            }
        },

        randy: {
            name: 'Randy',
            description: 'White fluffy Samoyed',
            draw: function(x = 100, y = 140, scale = 1) {
                return `
                    <g transform="translate(${x}, ${y}) scale(${scale})">
                        <!-- Randy - White Fluffy Samoyed -->
                        <!-- Body -->
                        <ellipse cx="0" cy="0" rx="50" ry="40" fill="#f8f8f8" opacity="0.95"/>
                        <ellipse cx="0" cy="-2" rx="48" ry="38" fill="#ffffff"/>

                        <!-- Fluffy texture -->
                        <circle cx="-20" cy="-10" r="8" fill="#f0f0f0" opacity="0.7"/>
                        <circle cx="20" cy="-5" r="10" fill="#f0f0f0" opacity="0.7"/>
                        <circle cx="0" cy="15" r="12" fill="#f0f0f0" opacity="0.7"/>
                        <circle cx="-15" cy="10" r="9" fill="#f0f0f0" opacity="0.7"/>
                        <circle cx="18" cy="12" r="8" fill="#f0f0f0" opacity="0.7"/>

                        <!-- Head -->
                        <ellipse cx="0" cy="-50" rx="35" ry="33" fill="#f8f8f8"/>
                        <ellipse cx="0" cy="-52" rx="33" ry="31" fill="#ffffff"/>

                        <!-- Fluffy ears -->
                        <ellipse cx="-28" cy="-60" rx="15" ry="20" fill="#f8f8f8" transform="rotate(-30 -28 -60)"/>
                        <ellipse cx="-28" cy="-60" rx="13" ry="18" fill="#ffffff" transform="rotate(-30 -28 -60)"/>

                        <ellipse cx="28" cy="-60" rx="15" ry="20" fill="#f8f8f8" transform="rotate(30 28 -60)"/>
                        <ellipse cx="28" cy="-60" rx="13" ry="18" fill="#ffffff" transform="rotate(30 28 -60)"/>

                        <!-- Eyes (small in fluffy face) -->
                        <circle cx="-12" cy="-55" r="3" fill="#000000"/>
                        <circle cx="12" cy="-55" r="3" fill="#000000"/>

                        <!-- Nose -->
                        <ellipse cx="0" cy="-42" rx="5" ry="3" fill="#000000"/>

                        <!-- Smiling mouth -->
                        <path d="M0 -40 Q-8 -35 -12 -37" stroke="#333333" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                        <path d="M0 -40 Q8 -35 12 -37" stroke="#333333" stroke-width="1.5" fill="none" stroke-linecap="round"/>

                        <!-- Fluffy tail -->
                        <ellipse cx="45" cy="-10" rx="20" ry="25" fill="#f8f8f8" transform="rotate(45 45 -10)"/>
                        <ellipse cx="45" cy="-10" rx="18" ry="23" fill="#ffffff" transform="rotate(45 45 -10)"/>
                    </g>`;
            }
        },

        morphée: {
            name: 'Morphée',
            description: 'Calico cat',
            draw: function(x = 100, y = 140, scale = 1) {
                return `
                    <g transform="translate(${x}, ${y}) scale(${scale})">
                        <!-- Morphée - Calico Cat -->
                        <!-- Body -->
                        <ellipse cx="0" cy="0" rx="35" ry="25" fill="#ffffff"/>

                        <!-- Calico patches -->
                        <ellipse cx="-15" cy="-5" rx="12" ry="8" fill="#ff8c00" opacity="0.8"/>
                        <ellipse cx="10" cy="5" rx="10" ry="12" fill="#000000" opacity="0.8"/>
                        <ellipse cx="0" cy="-10" rx="8" ry="6" fill="#ff8c00" opacity="0.6"/>

                        <!-- Head -->
                        <ellipse cx="0" cy="-40" rx="25" ry="22" fill="#ffffff"/>

                        <!-- Calico patches on head -->
                        <ellipse cx="-10" cy="-45" rx="8" ry="10" fill="#ff8c00" opacity="0.8"/>
                        <ellipse cx="8" cy="-38" rx="7" ry="8" fill="#000000" opacity="0.8"/>

                        <!-- Triangular ears -->
                        <path d="M-20 -55 L-15 -40 L-30 -45 Z" fill="#ffffff"/>
                        <path d="M-20 -55 L-18 -45 L-28 -48 Z" fill="#ff8c00" opacity="0.8"/>

                        <path d="M20 -55 L15 -40 L30 -45 Z" fill="#ffffff"/>
                        <path d="M20 -55 L18 -45 L28 -48 Z" fill="#000000" opacity="0.8"/>

                        <!-- Eyes (cat-like) -->
                        <ellipse cx="-8" cy="-40" rx="5" ry="7" fill="#4a4a4a"/>
                        <ellipse cx="-8" cy="-40" rx="2" ry="5" fill="#000000"/>
                        <circle cx="-7" cy="-42" r="1" fill="white"/>

                        <ellipse cx="8" cy="-40" rx="5" ry="7" fill="#4a4a4a"/>
                        <ellipse cx="8" cy="-40" rx="2" ry="5" fill="#000000"/>
                        <circle cx="9" cy="-42" r="1" fill="white"/>

                        <!-- Nose -->
                        <path d="M0 -32 L-3 -28 L3 -28 Z" fill="#ff69b4"/>

                        <!-- Whiskers -->
                        <line x1="-20" y1="-32" x2="-35" y2="-30" stroke="#333333" stroke-width="0.5"/>
                        <line x1="-20" y1="-30" x2="-35" y2="-28" stroke="#333333" stroke-width="0.5"/>
                        <line x1="20" y1="-32" x2="35" y2="-30" stroke="#333333" stroke-width="0.5"/>
                        <line x1="20" y1="-30" x2="35" y2="-28" stroke="#333333" stroke-width="0.5"/>

                        <!-- Tail -->
                        <path d="M30 0 Q45 -15 40 -30 Q35 -35 40 -40" stroke="#ffffff" stroke-width="12" fill="none" stroke-linecap="round"/>
                        <path d="M30 0 Q45 -15 40 -30" stroke="#ff8c00" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
                        <path d="M38 -25 Q35 -35 40 -40" stroke="#000000" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.8"/>
                    </g>`;
            }
        }
    },

    // Background elements
    backgrounds: {
        daySky: function() {
            return `
                <!-- Day Sky -->
                <defs>
                    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#98D8E8;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="800" height="350" fill="url(#skyGradient)"/>`;
        },

        nightSky: function() {
            return `
                <!-- Night Sky -->
                <rect width="800" height="350" fill="#191970"/>
                <!-- Stars -->
                <circle cx="100" cy="50" r="2" fill="white"/>
                <circle cx="200" cy="80" r="2" fill="white"/>
                <circle cx="300" cy="40" r="2" fill="white"/>
                <circle cx="400" cy="70" r="2" fill="white"/>
                <circle cx="500" cy="60" r="2" fill="white"/>
                <circle cx="600" cy="90" r="2" fill="white"/>
                <circle cx="700" cy="30" r="2" fill="white"/>`;
        },

        sunsetSky: function() {
            return `
                <!-- Sunset Sky -->
                <defs>
                    <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#FFB366;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFD93D;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="800" height="350" fill="url(#sunsetGradient)"/>`;
        },

        grassGround: function() {
            return `
                <!-- Grass Ground -->
                <rect y="350" width="800" height="150" fill="#90EE90"/>
                <rect y="350" width="800" height="5" fill="#7CB77B" opacity="0.5"/>`;
        },

        dirtGround: function() {
            return `
                <!-- Dirt Ground -->
                <rect y="350" width="800" height="150" fill="#8B4513"/>
                <rect y="350" width="800" height="5" fill="#654321" opacity="0.5"/>`;
        }
    },

    // Common objects
    objects: {
        sun: function(x = 700, y = 80, radius = 40) {
            return `
                <!-- Sun -->
                <g transform="translate(${x}, ${y})">
                    <circle r="${radius}" fill="#FFD700"/>
                    <g opacity="0.3">
                        <path d="M0 -${radius + 20} L0 -${radius + 10}" stroke="#FFD700" stroke-width="3"/>
                        <path d="M${radius * 0.7} -${radius * 0.7} L${radius * 0.5} -${radius * 0.5}" stroke="#FFD700" stroke-width="3"/>
                        <path d="M${radius + 20} 0 L${radius + 10} 0" stroke="#FFD700" stroke-width="3"/>
                        <path d="M${radius * 0.7} ${radius * 0.7} L${radius * 0.5} ${radius * 0.5}" stroke="#FFD700" stroke-width="3"/>
                        <path d="M0 ${radius + 20} L0 ${radius + 10}" stroke="#FFD700" stroke-width="3"/>
                        <path d="M-${radius * 0.7} ${radius * 0.7} L-${radius * 0.5} ${radius * 0.5}" stroke="#FFD700" stroke-width="3"/>
                        <path d="M-${radius + 20} 0 L-${radius + 10} 0" stroke="#FFD700" stroke-width="3"/>
                        <path d="M-${radius * 0.7} -${radius * 0.7} L-${radius * 0.5} -${radius * 0.5}" stroke="#FFD700" stroke-width="3"/>
                    </g>
                </g>`;
        },

        moon: function(x = 650, y = 80, radius = 30) {
            return `
                <!-- Moon -->
                <circle cx="${x}" cy="${y}" r="${radius}" fill="#F0E68C"/>
                <circle cx="${x + 5}" cy="${y - 5}" r="${radius * 0.3}" fill="#E0D68A" opacity="0.5"/>
                <circle cx="${x - 8}" cy="${y + 8}" r="${radius * 0.2}" fill="#E0D68A" opacity="0.5"/>`;
        },

        cloud: function(x = 150, y = 80) {
            return `
                <!-- Cloud -->
                <g transform="translate(${x}, ${y})">
                    <ellipse cx="-20" cy="0" rx="25" ry="15" fill="white" opacity="0.8"/>
                    <ellipse cx="0" cy="-5" rx="30" ry="20" fill="white" opacity="0.8"/>
                    <ellipse cx="20" cy="0" rx="25" ry="15" fill="white" opacity="0.8"/>
                    <ellipse cx="0" cy="5" rx="35" ry="15" fill="white" opacity="0.8"/>
                </g>`;
        },

        tree: function(x = 200, y = 350) {
            return `
                <!-- Tree -->
                <g transform="translate(${x}, ${y})">
                    <!-- Trunk -->
                    <rect x="-10" y="-60" width="20" height="60" fill="#8B4513"/>
                    <!-- Leaves -->
                    <circle cx="0" cy="-70" r="35" fill="#228B22"/>
                    <circle cx="-20" cy="-60" r="25" fill="#228B22"/>
                    <circle cx="20" cy="-60" r="25" fill="#228B22"/>
                </g>`;
        },

        flower: function(x = 100, y = 380, color = "#FF69B4") {
            return `
                <!-- Flower -->
                <g transform="translate(${x}, ${y})">
                    <!-- Stem -->
                    <line x1="0" y1="0" x2="0" y2="-20" stroke="#228B22" stroke-width="2"/>
                    <!-- Petals -->
                    <circle cx="0" cy="-25" r="5" fill="${color}"/>
                    <circle cx="-5" cy="-20" r="5" fill="${color}"/>
                    <circle cx="5" cy="-20" r="5" fill="${color}"/>
                    <circle cx="0" cy="-15" r="5" fill="${color}"/>
                    <circle cx="-5" cy="-20" r="5" fill="${color}"/>
                    <!-- Center -->
                    <circle cx="0" cy="-20" r="3" fill="#FFD700"/>
                </g>`;
        },

        easterEgg: function(x = 200, y = 380, color = "#FFB6C1") {
            return `
                <!-- Easter Egg -->
                <g transform="translate(${x}, ${y})">
                    <ellipse cx="0" cy="0" rx="15" ry="20" fill="${color}" class="egg" onclick="storyEngine.collectEgg(this)"/>
                    <!-- Decorative pattern -->
                    <ellipse cx="0" cy="-5" rx="12" ry="3" fill="white" opacity="0.3"/>
                    <ellipse cx="0" cy="0" rx="12" ry="3" fill="white" opacity="0.3"/>
                    <ellipse cx="0" cy="5" rx="12" ry="3" fill="white" opacity="0.3"/>
                </g>`;
        }
    },

    // Helper function to create a complete scene
    createScene: function(options = {}) {
        const {
            background = 'day',
            characters = [],
            objects = [],
            customElements = ''
        } = options;

        let svg = '<svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';

        // Add background
        if (background === 'day') {
            svg += this.backgrounds.daySky();
            svg += this.backgrounds.grassGround();
        } else if (background === 'night') {
            svg += this.backgrounds.nightSky();
            svg += this.backgrounds.grassGround();
        } else if (background === 'sunset') {
            svg += this.backgrounds.sunsetSky();
            svg += this.backgrounds.grassGround();
        }

        // Add objects
        objects.forEach(obj => {
            if (typeof obj === 'string') {
                svg += obj;
            } else if (obj.type && this.objects[obj.type]) {
                svg += this.objects[obj.type](obj.x, obj.y, obj.options);
            }
        });

        // Add characters
        characters.forEach(char => {
            if (char.name && this.characters[char.name]) {
                svg += this.characters[char.name].draw(char.x, char.y, char.scale || 1);
            }
        });

        // Add custom elements
        svg += customElements;

        svg += '</svg>';
        return svg;
    }
};

// Export for use in stories
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SvgLibrary;
} else {
    window.SvgLibrary = SvgLibrary;
}