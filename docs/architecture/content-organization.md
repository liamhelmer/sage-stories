# Content Organization Strategy - Sage Stories

## Overview
Sage Stories is a **static, client-side only** collection of interactive stories. Content is organized via a simple file directory structure, with no server-side database or Content Management System.

## Directory Structure

### Root Directory
The project is hosted from the `docs/` directory (compatible with GitHub Pages).

```
docs/
├── index.html              # Main Entry Point / Library Index
├── css/                    # Shared Stylesheets
│   ├── styles.css          # Global Site Styles
│   └── story-styles.css    # Shared Grid & Card Styles
├── js/                     # Shared JavaScript Libraries
│   ├── main.js             # Global logic (if any)
│   └── svg-library.js      # Shared SVG/Animation helpers
└── stories/                # Story Content
    ├── audio/              # Shared Audio Assets
    ├── [story-name].html   # Self-contained Story File
    └── [another-story].html
```

## Story File Logic
Each story is a **single, self-contained HTML file**.
- **Metadata**: Defined in `<head>` tags (Title, Meta Description).
- **Content**: All text and structure inside `<body>`.
- **Assets**: 
    - **Graphics**: Inline SVGs are preferred for single-file portability.
    - **Audio**: Referenced relatively from `stories/audio/` or embedded if small.
- **Logic**: Internal `<script>` block or reference to shared `js/` library for navigation/interactions.

## Categorization
Since there is no database, categorization is managed via:
1.  **File Naming**: Clear, descriptive filenames (e.g., `midnight-math-mystery.html`).
2.  **Index Page**: The `docs/index.html` manually (or via build script) lists links to stories, organized by category or age group using semantic HTML sections.