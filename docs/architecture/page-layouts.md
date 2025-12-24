# Page Layouts - Sage Stories

## 1. Main Library (Index)
**File**: `docs/index.html`

### Layout
*   **Hero Section**: Welcome message and featured graphic.
*   **Story Grid**: A responsive grid of cards.
    *   **Card Structure**:
        *   Thumbnail Key Art (SVG or Img)
        *   Title
        *   Brief Description
        *   "Read Story" Button (Link to `.html` file)

### CSS
Uses `docs/css/styles.css` for grid layout and typography.

## 2. Educational / Static Info Pages
**Files**: `docs/about.html`, `docs/parents.html`, etc.

*   **Standard Web Layout**: Header, Main Content Column, Footer.
*   **Content**: Static text and images.

## 3. Immersive Story Layout
**Files**: `docs/stories/*.html`

### Layout
*   **Viewport**: Fixed 100vh/100vw container. No scroll.
*   **Background**: Full screen thematic background.
*   **Stage**: Central area for illustration (SVG) and text.
*   **UI Overlay**:
    *   **Top Left**: Home Button (Link to `../index.html`).
    *   **Top Right**: Audio/Volume Toggle.
    *   **Bottom Center**: Text Container.
    *   **Sides/Bottom**: Prev/Next Arrows.

### Responsiveness
*   **Desktop**: Landscape layout, text side-by-side or below art.
*   **Mobile**: Portrait layout, art on top, text below, large touch targets for navigation.