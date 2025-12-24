# URL Structure - Sage Stories

## Principle
Sage Stories uses **direct file paths**. There is no server-side routing or URL rewriting.

## Patterns

### Home
`https://[domain]/docs/index.html` (or `https://[domain]/` if served from root)

### Stories
`https://[domain]/docs/stories/[story-filename].html`

**Examples:**
*   `.../stories/easter-bunny.html`
*   `.../stories/midnight-math-mystery.html`

### Assets
`https://[domain]/docs/stories/audio/[story-name]/[clip].mp3`

## SEO
*   **Filenames**: Use descriptive kebab-case filenames (e.g., `the-brave-little-fox.html`) for better readability and SEO.
*   **Titles**: Each HTML file has a unique `<title>` tag.