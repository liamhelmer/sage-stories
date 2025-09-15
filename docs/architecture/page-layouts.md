# Page Layouts - Sage Stories

## Layout System Overview

### Grid System
- **12-column responsive grid**
- **Breakpoints**: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
- **Gutters**: 16px (mobile), 24px (tablet), 32px (desktop)
- **Max-width**: 1200px for content areas

### Design Tokens
```css
:root {
  /* Colors */
  --sage-green: #7B9F7E;
  --sage-green-light: #A8C4AB;
  --sage-green-dark: #5A7A5D;
  --sage-orange: #E8A85C;
  --sage-cream: #FAF7F2;
  --sage-brown: #8B6914;
  --text-primary: #2D3748;
  --text-secondary: #4A5568;

  /* Typography */
  --font-heading: 'Nunito', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --font-story: 'Crimson Text', serif;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
}
```

## 1. Homepage Layout

### Desktop Layout (≥1024px)
```html
<main class="homepage">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Discover Magical Stories That Inspire Young Minds</h1>
        <p>Carefully crafted tales that spark imagination and teach valuable life lessons</p>
        <div class="hero-cta">
          <button class="btn-primary">Start Reading</button>
          <button class="btn-secondary">Browse Stories</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="animated-characters">
          <!-- Animated story characters -->
        </div>
      </div>
    </div>
  </section>

  <!-- Age-Based Recommendations -->
  <section class="age-recommendations">
    <h2>Perfect Stories for Every Age</h2>
    <div class="age-grid">
      <div class="age-card">
        <div class="age-icon">🧸</div>
        <h3>Ages 2-4</h3>
        <p>Simple stories with colorful illustrations</p>
        <a href="/stories/age/2-4">Explore Stories</a>
      </div>
      <!-- Repeat for other age groups -->
    </div>
  </section>

  <!-- Featured Stories Carousel -->
  <section class="featured-stories">
    <h2>Featured Stories This Week</h2>
    <div class="story-carousel">
      <div class="story-card">
        <img src="story-thumbnail.jpg" alt="Story title">
        <div class="story-info">
          <h3>Story Title</h3>
          <p class="story-meta">Ages 5-7 • 8 min read • Adventure</p>
          <p class="story-excerpt">Brief story description...</p>
        </div>
      </div>
      <!-- More story cards -->
    </div>
  </section>

  <!-- For Parents & Teachers -->
  <section class="audience-sections">
    <div class="section-grid">
      <div class="audience-card families">
        <h3>For Families</h3>
        <p>Reading tips, activities, and guidance</p>
        <a href="/families">Explore Resources</a>
      </div>
      <div class="audience-card educators">
        <h3>For Educators</h3>
        <p>Lesson plans and classroom materials</p>
        <a href="/educators">Teaching Resources</a>
      </div>
    </div>
  </section>

  <!-- Newsletter Signup -->
  <section class="newsletter">
    <div class="newsletter-content">
      <h3>Stay Updated with New Stories</h3>
      <form class="newsletter-form">
        <input type="email" placeholder="Enter your email">
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </section>
</main>
```

### Mobile Layout (≤767px)
- Single column layout
- Stacked sections with reduced spacing
- Simplified hero with centered content
- Touch-friendly buttons and cards
- Swipeable story carousel

## 2. Story Library Layout

### Desktop Layout
```html
<main class="story-library">
  <header class="page-header">
    <h1>Story Library</h1>
    <p class="page-description">Discover hundreds of carefully crafted stories</p>
  </header>

  <div class="library-container">
    <!-- Sidebar Filters -->
    <aside class="filters-sidebar">
      <div class="search-box">
        <input type="search" placeholder="Search stories...">
      </div>

      <div class="filter-group">
        <h3>Age Groups</h3>
        <div class="filter-options">
          <label><input type="checkbox"> Ages 2-4 (145)</label>
          <label><input type="checkbox"> Ages 5-7 (238)</label>
          <!-- More age options -->
        </div>
      </div>

      <div class="filter-group">
        <h3>Categories</h3>
        <div class="filter-options">
          <label><input type="checkbox"> Adventure (156)</label>
          <label><input type="checkbox"> Fantasy (98)</label>
          <!-- More categories -->
        </div>
      </div>

      <div class="filter-group">
        <h3>Reading Time</h3>
        <div class="filter-options">
          <label><input type="checkbox"> 5 minutes or less</label>
          <label><input type="checkbox"> 5-10 minutes</label>
          <!-- More time options -->
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <section class="library-main">
      <div class="library-controls">
        <div class="results-info">
          <span>Showing 1-20 of 662 stories</span>
        </div>
        <div class="sort-controls">
          <select name="sort">
            <option>Newest First</option>
            <option>Most Popular</option>
            <option>A-Z</option>
          </select>
        </div>
        <div class="view-toggle">
          <button class="view-grid active">Grid</button>
          <button class="view-list">List</button>
        </div>
      </div>

      <div class="story-grid">
        <article class="story-card">
          <div class="story-image">
            <img src="story-cover.jpg" alt="Story title">
            <div class="story-overlay">
              <button class="play-story">▶️ Read Story</button>
            </div>
          </div>
          <div class="story-content">
            <h3 class="story-title">The Brave Little Fox</h3>
            <p class="story-meta">
              <span class="age-badge">Ages 5-7</span>
              <span class="time-badge">8 min</span>
              <span class="category-badge">Adventure</span>
            </p>
            <p class="story-excerpt">A young fox learns about courage...</p>
            <div class="story-actions">
              <button class="btn-read">Read Now</button>
              <button class="btn-favorite">♥️</button>
            </div>
          </div>
        </article>
        <!-- More story cards -->
      </div>

      <div class="pagination">
        <button class="page-prev">Previous</button>
        <span class="page-numbers">1 2 3 ... 34</span>
        <button class="page-next">Next</button>
      </div>
    </section>
  </div>
</main>
```

### Mobile Library Layout
- Filters collapse into top drawer
- Single column story grid
- Infinite scroll instead of pagination
- Simplified story cards

## 3. Individual Story Page Layout

### Desktop Story Reader
```html
<main class="story-page">
  <header class="story-header">
    <div class="story-meta">
      <nav class="breadcrumb">Home > Stories > Adventure > The Brave Little Fox</nav>
      <div class="story-info">
        <h1>The Brave Little Fox</h1>
        <div class="story-badges">
          <span class="age-badge">Ages 5-7</span>
          <span class="time-badge">8 min read</span>
          <span class="category-badge">Adventure</span>
        </div>
      </div>
    </div>

    <div class="story-controls">
      <div class="audio-controls">
        <button class="play-pause">⏯️</button>
        <button class="speed-control">1x</button>
      </div>
      <div class="reading-controls">
        <button class="font-smaller">A-</button>
        <button class="font-larger">A+</button>
        <button class="night-mode">🌙</button>
      </div>
      <div class="utility-controls">
        <button class="bookmark">🔖</button>
        <button class="share">📤</button>
        <button class="print">🖨️</button>
      </div>
    </div>
  </header>

  <div class="story-container">
    <aside class="story-sidebar">
      <div class="table-of-contents">
        <h3>Chapters</h3>
        <ul>
          <li><a href="#chapter-1">1. The Forest Home</a></li>
          <li><a href="#chapter-2">2. A Mysterious Sound</a></li>
          <li><a href="#chapter-3">3. Finding Courage</a></li>
        </ul>
      </div>

      <div class="character-guide">
        <h3>Characters</h3>
        <div class="character">
          <img src="fox-avatar.jpg" alt="Felix the Fox">
          <div class="character-info">
            <h4>Felix</h4>
            <p>A young fox learning about bravery</p>
          </div>
        </div>
        <!-- More characters -->
      </div>
    </aside>

    <article class="story-content">
      <div class="story-progress">
        <div class="progress-bar"></div>
        <span class="progress-text">Chapter 1 of 3</span>
      </div>

      <div class="story-text">
        <div class="story-illustration">
          <img src="chapter1-illustration.jpg" alt="Felix in the forest">
        </div>

        <div class="story-paragraph">
          <p>Once upon a time, in a peaceful forest clearing, lived a young fox named Felix...</p>
        </div>

        <!-- More story content -->
      </div>

      <div class="chapter-navigation">
        <button class="prev-chapter" disabled>← Previous Chapter</button>
        <button class="next-chapter">Next Chapter →</button>
      </div>
    </article>
  </div>

  <section class="story-discussion">
    <h2>Discussion Questions</h2>
    <div class="discussion-questions">
      <div class="question">
        <h3>What made Felix feel scared at first?</h3>
        <p class="question-hint">Think about the sounds he heard in the forest...</p>
      </div>
      <!-- More questions -->
    </div>
  </section>

  <section class="related-stories">
    <h2>You Might Also Like</h2>
    <div class="related-grid">
      <!-- Related story cards -->
    </div>
  </section>
</main>
```

### Mobile Story Reader
- Simplified header with essential controls
- Full-screen reading mode option
- Swipe navigation between chapters
- Floating controls for audio/settings

## 4. About Page Layout

### Desktop About Layout
```html
<main class="about-page">
  <section class="about-hero">
    <div class="hero-content">
      <h1>Our Mission: Inspiring Young Minds Through Stories</h1>
      <p class="hero-subtitle">At Sage Stories, we believe every child deserves access to magical, educational stories that spark imagination and teach valuable life lessons.</p>
    </div>
  </section>

  <section class="mission-values">
    <div class="content-grid">
      <div class="mission">
        <h2>Our Mission</h2>
        <p>To create and curate high-quality children's stories that educate, inspire, and entertain young readers while supporting parents and educators in their journey to foster a love of reading.</p>
      </div>
      <div class="values">
        <h2>Our Values</h2>
        <ul class="values-list">
          <li>Educational Excellence</li>
          <li>Inclusive Storytelling</li>
          <li>Child-Centered Design</li>
          <li>Family Support</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="team-section">
    <h2>Meet Our Team</h2>
    <div class="team-grid">
      <div class="team-member">
        <img src="founder-photo.jpg" alt="Founder name">
        <div class="member-info">
          <h3>Jane Smith</h3>
          <p class="title">Founder & CEO</p>
          <p class="bio">Former elementary school teacher with 15 years of experience...</p>
        </div>
      </div>
      <!-- More team members -->
    </div>
  </section>

  <section class="impact-stats">
    <h2>Our Impact</h2>
    <div class="stats-grid">
      <div class="stat">
        <div class="stat-number">10,000+</div>
        <div class="stat-label">Children Reading Daily</div>
      </div>
      <div class="stat">
        <div class="stat-number">500+</div>
        <div class="stat-label">Stories Published</div>
      </div>
      <div class="stat">
        <div class="stat-number">1,200+</div>
        <div class="stat-label">Teachers Using Our Resources</div>
      </div>
      <div class="stat">
        <div class="stat-number">95%</div>
        <div class="stat-label">Parent Satisfaction Rate</div>
      </div>
    </div>
  </section>
</main>
```

## 5. For Families Page Layout

### Resource Hub Layout
```html
<main class="families-page">
  <header class="page-hero">
    <h1>Resources for Families</h1>
    <p>Everything you need to support your child's reading journey</p>
  </header>

  <div class="resources-container">
    <nav class="resources-nav">
      <ul class="nav-tabs">
        <li><a href="#reading-tips" class="active">Reading Tips</a></li>
        <li><a href="#activities">Activities</a></li>
        <li><a href="#guides">Age Guides</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </nav>

    <section id="reading-tips" class="resource-section active">
      <div class="resource-grid">
        <article class="resource-card">
          <div class="card-icon">📖</div>
          <h3>Creating Reading Routines</h3>
          <p>Establish consistent, enjoyable reading habits that stick...</p>
          <a href="/families/reading-tips/routines">Read More</a>
        </article>
        <!-- More resource cards -->
      </div>
    </section>

    <section id="activities" class="resource-section">
      <div class="activities-grid">
        <div class="activity-card">
          <img src="craft-activity.jpg" alt="Story-based craft">
          <div class="activity-content">
            <h3>Story-Based Crafts</h3>
            <p class="difficulty">Easy • 15-30 minutes</p>
            <p>Create characters and scenes from your favorite stories...</p>
            <button class="btn-primary">View Instructions</button>
          </div>
        </div>
        <!-- More activities -->
      </div>
    </section>
  </div>
</main>
```

## 6. For Educators Page Layout

### Educational Resource Layout
```html
<main class="educators-page">
  <header class="educator-hero">
    <h1>Teaching Resources</h1>
    <p>Comprehensive materials to integrate stories into your curriculum</p>
    <div class="quick-access">
      <a href="/educators/lesson-plans" class="quick-link">Lesson Plans</a>
      <a href="/educators/tools" class="quick-link">Classroom Tools</a>
      <a href="/educators/professional-development" class="quick-link">Professional Development</a>
    </div>
  </header>

  <section class="curriculum-alignment">
    <h2>Curriculum Standards</h2>
    <div class="standards-grid">
      <div class="standard-card">
        <h3>Common Core</h3>
        <p>Our stories align with reading comprehension and language arts standards...</p>
      </div>
      <div class="standard-card">
        <h3>STEM Integration</h3>
        <p>Science and nature stories support STEM learning objectives...</p>
      </div>
      <!-- More standards -->
    </div>
  </section>

  <section class="lesson-plans-preview">
    <h2>Featured Lesson Plans</h2>
    <div class="lesson-grid">
      <div class="lesson-card">
        <div class="lesson-header">
          <h3>Exploring Ecosystems Through Stories</h3>
          <span class="grade-level">Grades 3-5</span>
        </div>
        <div class="lesson-content">
          <p class="duration">Duration: 45 minutes</p>
          <p class="objectives">Students will identify different ecosystem components...</p>
          <div class="lesson-materials">
            <span class="material-tag">Story: "The Forest Community"</span>
            <span class="material-tag">Worksheet Included</span>
          </div>
        </div>
        <div class="lesson-actions">
          <button class="btn-download">Download PDF</button>
          <button class="btn-preview">Preview</button>
        </div>
      </div>
      <!-- More lesson plans -->
    </div>
  </section>
</main>
```

## Responsive Layout Patterns

### Mobile-First Approach
```css
/* Base mobile styles */
.story-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet breakpoint */
@media (min-width: 768px) {
  .story-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .story-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .story-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Component Flexibility
- **Cards**: Flexible sizing with consistent aspect ratios
- **Text**: Fluid typography with optimal line lengths
- **Images**: Responsive with lazy loading
- **Interactive Elements**: Touch-friendly sizing (44px minimum)