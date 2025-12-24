# Sage Stories Development Guidelines

This document outlines the standards, style, and technical requirements for creating stories in the `docs/stories` directory.

## Core Architecture Rules

> [!IMPORTANT]
> **100% Self-Contained**: Every story MUST be a single, self-contained HTML file.
> - **Audio-Driven**: The story should be narrated via TTS.
> - **Touch Screen First**: Design for touch interactions.
>     - Avoid reliance on `mouseover` or `:hover` states for core mechanics (e.g., finding hidden items), as these don't translate well to tablets/phones.
>     - Ensure interactive targets have sufficient hit areas.
> - **No Server**: The project is a static site. No backend logic or server dependencies.
> - **Single Page Logic**: All story logic (state, interaction, navigation) should be contained within the story's HTML file or shared client-side libraries.

### Audio Files
*   **Characters**: Located in `docs/audio/`.
    *   Pattern: `character-[name].mp3` (e.g., `character-sage.mp3`)
*   **Story Narration**: Located in `docs/stories/audio/[story-name]/`.
    *   Pattern: `page-[n].mp3` (e.g., `page-1.mp3`)
    *   This ensures the static site structure remains clean and organized.

## Accessibility
*   **High Contrast**: All text must have high contrast against backgrounds.
*   **Touch Targets**: Interactive elements must be at least 44x44px.

## Directory Structure

Stories are located in `docs/stories`.
Shared resources are located in:
- `docs/css/`: Common stylesheets (e.g., `styles.css`, `story-styles.css`)
- `docs/js/`: Shared JavaScript libraries (e.g., `svg-library.js`)
- `docs/stories/audio/`: Audio files for narration (if applicable)

## Implementation Standards

### 1. File Structure
- **Format**: Single HTML file per story.
- **Location**: `docs/stories/[story-name].html`.
- **Assets**: 
    - Use inline SVGs for graphics where possible to keep the file self-contained.
    - Audio files should be placed in `docs/stories/audio/` and referenced via relative paths (e.g., `audio/[story-name]/page-1.mp3`).

### 2. Shared Libraries
Leverage the existing shared libraries to maintain consistency and reduce code duplication:
- **CSS**: Link to `../css/styles.css` or `../css/story-styles.css` for common typography, layout, and animations.
- **JS**: Use `../js/svg-library.js` or other shared scripts in `docs/js/` for common functionality like audio control or SVG manipulation if needed.
- **Do not** write duplicate CSS/JS in the story file if it already exists in the shared libraries.

### 3. Graphics & Visuals
> [!NOTE]
> **New Story Graphics**: Future stories should use **much more refined and recognizable graphics** than earlier iterations.
- **Quality**: Aim for high-quality, polished visuals. Avoid "programmer art".
- **Format**: Inline SVG is preferred for responsiveness and self-containment.
- **Style**: Bright, vibrant, and appealing to children.
- **Animations**: Use CSS animations (wiggle, float, bounce) to bring characters and elements to life.

### 4. Navigation & Interaction
- **Navigation**:
    - Include **Previous** and **Next** buttons for page turning.
    - Include a **Home/Back** button to return to the main index.
    - Support **Keyboard Navigation** (Arrow keys for prev/next, Space for audio toggle).
- **Audio**: Include an audio player for narration, with a toggle button (Speaker icon).
- **Interactivity**: Elements should be interactive (e.g., clickable items for "finding" games, hover effects on characters).

### 5. Audio Production
- **Text-to-Speech (TTS)**: Use a batching script to generate audio for all story pages to ensure consistency and efficiency.
- **Tools**: Reference `scripts/generate-tts.js` (or similar story-specific scripts) as a template for batch generation.
- **Workflow**: 
    1.  Define text content in a structured format (JSON or within the script).
    2.  Run the batch script to generate MP3 files for each page.
    3.  Output files should be saved to `docs/stories/audio/[story-name]/`.

## Target Audience & Themes
- **Audience**: Kids.
- **Themes**: Fun, educational, adventurous, friendly.
- **Tone**: Positive, encouraging, and simple language.
- **Characters**: 
    - **Luna**: A playful black puppy who loves toys (especially her red ball) and has soft, fuzzy black fur.
    - **Heidi**: A German Shorthaired Pointer who loves swimming and rolling in the mud.
    - **Randy**: A big, white, super fluffy dog (like a cloud) who acts as the loud protector.
    - **Morphée**: A mischievous calico cat (orange, black, white patches) who loves climbing trees.
    - **Others**: Establish new friendly characters as needed (e.g., Easter Bunny, Orangey).

## Code Style
- **HTML5**: Use semantic HTML5.
- **Clean Code**: Keep the internal script clean and organized.
- **Responsive**: Designs must work on various screen sizes (desktop, tablet, mobile).
- **Comments**: Comment complex logic or SVG groups for clarity.

## Example Template Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Story Title - Sage Stories</title>
    <link rel="stylesheet" href="../css/styles.css">
    <style>
        /* Story-specific overrides */
    </style>
</head>
<body>
    <div class="story-container">
        <!-- Controls -->
        <button id="audio-btn">🔊</button>
        <a href="../index.html" class="home-button">← Back</a>

        <!-- Content -->
        <main>
            <div class="story-page active" id="page-1">
                <!-- Inline SVG Illustration -->
                <svg>...</svg>
                <div class="page-text">
                    <p>Story text...</p>
                </div>
            </div>
            <!-- More pages... -->
        </main>

        <!-- Navigation -->
        <button id="prev-btn">←</button>
        <button id="next-btn">→</button>
    </div>

    <!-- Logic -->
    <script>
        // Page state, audio logic, interaction handlers
    </script>
</body>
</html>
```
