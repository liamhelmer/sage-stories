# Navigation Structure - Sage Stories

## Navigation Philosophy
Navigation is simple, linear, and browser-native. There are two distinct navigation contexts: the **Library (Index)** and the **Story Reader**.

## 1. Library Layout (Index Page)
Hosted at `docs/index.html`.
Serves as the central hub.

*   **Global Header**: Logo and simple links (About, Contact).
*   **Story Grid**: Thumbnails/Cards linking directly to `stories/[filename].html`.
*   **Footer**: Simple copyright and static links.

## 2. Story Reader Navigation
Inside individual story files (e.g., `docs/stories/bunny.html`).
Stories are immersive and take over the full viewport.

### Story Controls
*   **Back to Home**: Prominent button (top-left or corner) linking back to `../index.html`.
*   **Page Navigation**:
    *   **Previous**: Go to previous story page/slide.
    *   **Next**: Advance to next story page/slide.
    *   **Keyboard Support**: Left/Right arrows.
*   **Audio Controls**: Play/Pause toggle for narration.

### Flows
*   **Entry**: User clicks a card on `index.html` -> Opens `stories/my-story.html`.
*   **Reading**: User navigates internally within the single HTML file (JavaScript visuals).
*   **Exit**: User clicks "Back" -> Returns to `index.html`.