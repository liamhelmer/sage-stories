# Sage Stories - Story Template Guide

## 📚 Overview

This guide explains how to create new interactive stories using the Sage Stories template system. The template provides a complete framework for creating engaging, multimedia children's stories with:

- 📖 Page-by-page navigation
- 🔊 Audio narration support
- 🎨 SVG illustrations
- 🥚 Optional interactive elements (egg hunts)
- 📱 Responsive design for all devices
- ⌨️ Keyboard navigation support

## 🚀 Quick Start

### 1. Copy the Template

Copy the story template to create your new story:

```bash
cp docs/templates/story-template.html docs/stories/your-story-name.html
```

### 2. Update Basic Information

Replace the following placeholders in your new file:

- `[STORY_TITLE]` - Your story's title (appears in 3 places)
- Update the `storyConfig` object with your story details

### 3. Create Your Pages

Each story page follows this structure:

```html
<div class="story-page" id="page-1">
    <svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
        <!-- Your SVG illustration here -->
    </svg>
    <div class="page-text">
        <p>Your story text here...</p>
        <span class="page-counter">Page 1 of 20</span>
    </div>
</div>
```

## 📁 File Structure

```
docs/
├── stories/
│   ├── your-story-name.html       # Your story file
│   └── audio/                      # Audio files directory
│       ├── page-1.mp3
│       ├── page-2.mp3
│       └── ...
├── css/
│   └── story-styles.css           # Shared styles (don't modify)
├── js/
│   └── story-engine.js            # Story engine (don't modify)
└── templates/
    ├── story-template.html         # Base template
    └── STORY_TEMPLATE_GUIDE.md     # This guide
```

## 🎨 Creating SVG Illustrations

### Basic SVG Structure

```svg
<svg class="page-illustration" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
    <!-- Sky -->
    <rect width="800" height="350" fill="#87CEEB"/>

    <!-- Ground -->
    <rect y="350" width="800" height="150" fill="#90EE90"/>

    <!-- Your elements here -->
</svg>
```

### Common SVG Elements

#### Simple Shapes
```svg
<!-- Circle -->
<circle cx="400" cy="250" r="50" fill="#FFD700"/>

<!-- Rectangle -->
<rect x="100" y="200" width="100" height="80" fill="#8B4513"/>

<!-- Ellipse -->
<ellipse cx="400" cy="300" rx="60" ry="40" fill="#FF6347"/>
```

#### Gradients
```svg
<defs>
    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB"/>
        <stop offset="100%" style="stop-color:#98D8E8"/>
    </linearGradient>
</defs>
<rect width="800" height="350" fill="url(#skyGradient)"/>
```

#### Groups and Transforms
```svg
<g transform="translate(400, 300)">
    <!-- Elements positioned relative to group -->
    <circle cx="0" cy="0" r="30" fill="#FFD700"/>
    <ellipse cx="0" cy="40" rx="20" ry="10" fill="#8B4513"/>
</g>
```

## 🔊 Adding Audio Narration

### Audio File Requirements

- Format: MP3
- Naming: `page-1.mp3`, `page-2.mp3`, etc.
- Location: `docs/stories/audio/` directory
- Recommended: Use consistent voice and speed

### Generating Audio with Fuelix API

Create a script based on `scripts/generate-tts.js`:

```javascript
const pageTexts = [
    "Your page 1 text...",
    "Your page 2 text...",
    // ...
];

// Use the existing TTS generation script as a template
```

### Disabling Audio

To create a story without audio:

```javascript
const storyConfig = {
    audioEnabled: false,
    // ... other config
};
```

## 🥚 Adding Interactive Elements

### Egg Hunt Feature

1. Enable in configuration:
```javascript
const storyConfig = {
    eggHuntEnabled: true,
    totalEggs: 12,
    // ... other config
};
```

2. Add eggs to your SVG illustrations:
```svg
<ellipse class="egg" cx="200" cy="380" rx="15" ry="20"
         fill="#FFB6C1" onclick="storyEngine.collectEgg(this)"/>
```

3. Style variations:
```svg
<!-- Different colored eggs -->
<ellipse class="egg" fill="#FFD700"/> <!-- Gold -->
<ellipse class="egg" fill="#98FB98"/> <!-- Pale Green -->
<ellipse class="egg" fill="#DDA0DD"/> <!-- Plum -->
```

## ⚙️ Configuration Options

```javascript
const storyConfig = {
    // Basic Settings
    title: '📖 Your Story Title 📖',
    totalPages: 20,

    // Audio Settings
    audioEnabled: true,
    audioPath: 'audio/',

    // Interactive Features
    eggHuntEnabled: false,
    totalEggs: 0,

    // Sound Effects
    pageTransitionSound: true
};
```

## 📱 Responsive Design

The template automatically handles:

- **Desktop**: Full-size display with side navigation
- **Tablets**: Optimized layout for landscape/portrait
- **Mobile**: Touch-friendly navigation
- **Keyboard**: Arrow keys for navigation, Space for audio

## ⌨️ Keyboard Shortcuts

- `←` / `→` - Navigate pages
- `Space` - Play/pause audio
- `Home` - Go to first page
- `End` - Go to last page

## 🎯 Custom Events

Listen for story events in your custom JavaScript:

```javascript
// Page changed
document.addEventListener('story:pagechange', (e) => {
    console.log('Now on page:', e.detail.page);
});

// Egg collected (if enabled)
document.addEventListener('story:eggCollected', (e) => {
    console.log('Total eggs:', e.detail.count);
});

// All eggs collected
document.addEventListener('story:allEggsCollected', (e) => {
    console.log('Celebration time!');
});
```

## 🎨 Custom Styling

Add story-specific styles in the `<style>` section:

```css
/* Custom background for your story */
.story-body {
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
}

/* Custom text color */
.page-text p {
    color: #2C3E50;
}

/* Custom header style */
.story-header h1 {
    font-family: 'Your Custom Font', sans-serif;
}
```

## 📝 Story Writing Tips

### Text Guidelines

- **Length**: 2-3 sentences per page for young readers
- **Language**: Simple, engaging vocabulary
- **Font Size**: Automatically scales based on device
- **Formatting**: Use `<strong>` for emphasis

### Page Progression

- **Opening**: Set the scene, introduce characters
- **Middle**: Build the adventure/conflict
- **Climax**: Exciting moment or discovery
- **Resolution**: Happy ending, lesson learned

### Character Consistency

When using recurring characters, maintain consistent:
- Colors and sizes
- Positions (use transforms)
- Visual characteristics

## 🐛 Troubleshooting

### Common Issues

1. **Pages not showing**: Check that only first page has `active` class
2. **Audio not playing**: Verify file paths and names match
3. **Navigation not working**: Ensure all page IDs are sequential
4. **Eggs not clickable**: Add onclick handler and `egg` class

### Testing Checklist

- [ ] All pages display correctly
- [ ] Navigation works (buttons and keyboard)
- [ ] Audio plays for each page (if enabled)
- [ ] Page counter shows correct numbers
- [ ] Home button returns to main page
- [ ] Responsive on different screen sizes
- [ ] Interactive elements work (if any)

## 🚀 Advanced Features

### Custom Animations

Add CSS animations to your elements:

```css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.bouncing-character {
    animation: bounce 2s infinite;
}
```

### Dynamic Elements

Use JavaScript to add dynamic behavior:

```javascript
// Make an element follow mouse
document.addEventListener('mousemove', (e) => {
    const element = document.querySelector('.follow-mouse');
    if (element) {
        element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
});
```

## 📚 Example Stories

### Converting Existing Stories

To convert the Easter Bunny story to use the template:

1. Copy the SVG illustrations from each page
2. Extract the text content
3. Update to use `story-engine.js` instead of inline JavaScript
4. Replace custom CSS with `story-styles.css`

### Story Ideas

- **Adventure**: Journey through magical lands
- **Educational**: Learn about animals, nature, numbers
- **Seasonal**: Holiday-themed stories
- **Character-based**: Focus on the farm friends

## 🤝 Contributing

When creating new stories:

1. Follow the template structure
2. Use consistent styling
3. Test on multiple devices
4. Provide audio narration when possible
5. Keep content age-appropriate

## 📄 License

Stories created with this template are part of the Sage Stories collection.
Feel free to create and share new stories for young readers!

---

*Happy storytelling! 📚✨*