# Navigation Structure - Sage Stories

## Primary Navigation System

### Main Navigation Bar
**Location**: Top of every page, sticky on scroll
**Behavior**: Responsive collapse to hamburger menu on mobile

```
🏠 SAGE STORIES LOGO    📚 Stories  👨‍👩‍👧‍👦 Families  🍎 Educators  ℹ️ About  📞 Contact    🔍 Search
```

#### Desktop Navigation (≥1024px)
- **Logo**: Left-aligned, clickable home link
- **Primary Menu**: Center-aligned horizontal menu
- **Search**: Right-aligned search icon/bar
- **Accessibility**: Skip to main content link

#### Tablet Navigation (768px-1023px)
- **Logo**: Left-aligned, smaller size
- **Menu**: Horizontal with condensed spacing
- **Search**: Icon-based, expands on click

#### Mobile Navigation (≤767px)
- **Logo**: Left-aligned, icon version
- **Hamburger Menu**: Right-aligned
- **Search**: Integrated in mobile menu drawer

### Mobile Menu Structure
```
📱 Mobile Menu Drawer
├── 🏠 Home
├── 📚 Stories
│   ├── All Stories
│   ├── Ages 2-4
│   ├── Ages 5-7
│   ├── Ages 8-10
│   ├── Ages 11-13
│   ├── Adventure
│   ├── Fantasy
│   └── Science
├── 👨‍👩‍👧‍👦 For Families
│   ├── Reading Tips
│   ├── Activities
│   └── FAQ
├── 🍎 For Educators
│   ├── Lesson Plans
│   ├── Classroom Tools
│   └── Professional Development
├── ℹ️ About
│   ├── Our Mission
│   ├── Our Team
│   └── Contact
└── 🔍 Search Stories
```

## Secondary Navigation Systems

### Breadcrumb Navigation
**Location**: Below main navigation, above page title
**Style**: Clean, simple arrows with hover states

```html
<!-- Breadcrumb Examples -->
Home > Stories > Adventure > The Brave Little Fox
Home > For Families > Reading Tips > Ages 5-7
Home > For Educators > Lesson Plans > Science Stories
```

**Responsive Behavior**:
- Mobile: Show only last 2 levels with ellipsis
- Tablet: Show full breadcrumb
- Desktop: Show full breadcrumb with hover previews

### Story Library Navigation
**Location**: Left sidebar (desktop) / Top filters (mobile)

```
📚 Story Library Filters
├── 🔍 Search Box
├── 👶 Age Groups
│   ├── ☐ Ages 2-4 (145 stories)
│   ├── ☐ Ages 5-7 (238 stories)
│   ├── ☐ Ages 8-10 (192 stories)
│   └── ☐ Ages 11-13 (87 stories)
├── 🎭 Categories
│   ├── ☐ Adventure (156 stories)
│   ├── ☐ Fantasy (98 stories)
│   ├── ☐ Science (76 stories)
│   ├── ☐ History (54 stories)
│   ├── ☐ Friendship (123 stories)
│   └── ☐ Nature (89 stories)
├── ⏱️ Reading Time
│   ├── ☐ 5 minutes or less
│   ├── ☐ 5-10 minutes
│   ├── ☐ 10-15 minutes
│   └── ☐ 15+ minutes
└── 📖 Reading Level
    ├── ☐ Beginner
    ├── ☐ Intermediate
    └── ☐ Advanced
```

### In-Story Navigation
**Location**: Within individual story pages

```
📖 Story Controls
├── ⏪ Previous Chapter
├── ⏯️ Play/Pause Audio
├── ⏩ Next Chapter
├── 🔊 Audio Speed (0.5x, 1x, 1.5x, 2x)
├── 🌙 Reading Mode (Day/Night)
├── 📏 Font Size (A- A A+)
├── 📄 Table of Contents
└── 🔗 Share Story
```

### Footer Navigation
**Location**: Bottom of every page

```html
<!-- Footer Structure -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-section company">
      <h3>Sage Stories</h3>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/about/team">Our Team</a></li>
        <li><a href="/about/careers">Careers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    <div class="footer-section resources">
      <h3>Resources</h3>
      <ul>
        <li><a href="/families">For Families</a></li>
        <li><a href="/educators">For Educators</a></li>
        <li><a href="/families/faq">FAQ</a></li>
        <li><a href="/support">Support</a></li>
      </ul>
    </div>

    <div class="footer-section stories">
      <h3>Stories</h3>
      <ul>
        <li><a href="/stories">All Stories</a></li>
        <li><a href="/stories/new">New Releases</a></li>
        <li><a href="/stories/popular">Popular</a></li>
        <li><a href="/stories/categories">Categories</a></li>
      </ul>
    </div>

    <div class="footer-section legal">
      <h3>Legal</h3>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="social-links">
      <a href="#" aria-label="Facebook">📘</a>
      <a href="#" aria-label="Twitter">🐦</a>
      <a href="#" aria-label="Instagram">📷</a>
      <a href="#" aria-label="YouTube">📺</a>
    </div>
    <div class="copyright">
      <p>&copy; 2024 Sage Stories. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## Navigation States and Interactions

### Active/Current Page Indicators
- **Primary Navigation**: Bold text, underline, or background color change
- **Breadcrumbs**: Last item not linked, different color
- **Sidebar Navigation**: Highlighted background, left border accent

### Hover States
```css
/* Navigation Hover Effects */
.nav-item:hover {
  background-color: var(--sage-green-light);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.nav-item:focus {
  outline: 2px solid var(--sage-orange);
  outline-offset: 2px;
}
```

### Loading States
- **Page Transitions**: Subtle loading animation
- **Search**: Loading spinner in search bar
- **Filter Application**: Skeleton screens for results

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical, left-to-right, top-to-bottom
- **Skip Links**: "Skip to main content", "Skip to navigation"
- **Focus Indicators**: Clear visual focus states
- **Arrow Key Navigation**: For dropdown menus and carousels

### Screen Reader Support
```html
<!-- ARIA Labels and Roles -->
<nav role="main" aria-label="Main navigation">
<nav role="breadcrumb" aria-label="You are here:">
<button aria-expanded="false" aria-controls="mobile-menu">Menu</button>
<ul role="list" aria-label="Story categories">
```

### Voice Control
- **Voice Commands**: "Navigate to stories", "Go to about page"
- **Speech Recognition**: Search functionality
- **Audio Feedback**: Confirmation of navigation actions

## Search Functionality

### Global Search
**Location**: Header, always accessible
**Features**:
- Autocomplete with story suggestions
- Recent searches
- Search filters (age, category, reading time)
- Voice search capability
- Typo tolerance and suggestions

### Advanced Search
**Location**: Dedicated search page (`/search`)
**Features**:
- Boolean search operators
- Exact phrase matching
- Exclude terms functionality
- Save search preferences
- Search history

### Search Results Navigation
```
🔍 Search Results for "adventure"
├── 📊 Filters (left sidebar)
├── 📈 Sort Options (dropdown)
├── 🔢 Results Per Page (20, 40, 60)
├── 📄 Pagination
└── 🔖 Save Search
```

## Responsive Breakpoints

### Mobile First Approach
```css
/* Navigation Breakpoints */
.navigation {
  /* Mobile: Base styles */
}

@media (min-width: 768px) {
  /* Tablet adjustments */
}

@media (min-width: 1024px) {
  /* Desktop full navigation */
}

@media (min-width: 1440px) {
  /* Large desktop optimizations */
}
```

### Navigation Patterns by Device
- **Mobile**: Hamburger menu, bottom navigation for key actions
- **Tablet**: Horizontal tabs, collapsible sections
- **Desktop**: Full navigation bar, sidebar filters, hover states