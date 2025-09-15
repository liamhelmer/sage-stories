# Sage Stories - Site Map & Information Architecture

## Site Hierarchy

### Primary Navigation (Level 1)
```
📖 Sage Stories (Home)
├── 📚 Story Library
├── 👨‍👩‍👧‍👦 For Families
├── 🍎 For Educators
├── ℹ️ About
└── 📞 Contact
```

### Detailed Page Structure

#### 1. Homepage (`/`)
**Purpose**: Welcome visitors, showcase featured stories, establish brand identity
- Hero Section with animated story characters
- Featured Stories carousel
- Age-based story recommendations
- Recent additions showcase
- Parent/Teacher quick access portal
- Newsletter signup
- Social proof testimonials

#### 2. Story Library (`/stories`)
**Purpose**: Browse and discover stories with advanced filtering
- **Main Library Page** (`/stories`)
  - Search functionality
  - Filter by age group (2-4, 5-7, 8-10, 11-13)
  - Filter by category (Adventure, Fantasy, Science, History, etc.)
  - Filter by reading level
  - Filter by story length (5min, 10min, 15min+)
  - Sort options (newest, popular, alphabetical)
  - Grid/List view toggle

- **Category Pages** (`/stories/category/{category-name}`)
  - `/stories/category/adventure`
  - `/stories/category/fantasy`
  - `/stories/category/science`
  - `/stories/category/history`
  - `/stories/category/friendship`
  - `/stories/category/nature`

- **Age Group Pages** (`/stories/age/{age-range}`)
  - `/stories/age/2-4`
  - `/stories/age/5-7`
  - `/stories/age/8-10`
  - `/stories/age/11-13`

#### 3. Individual Story Pages (`/story/{story-slug}`)
**Purpose**: Immersive story reading experience
- Story title and metadata
- Interactive story reader with:
  - Text-to-speech functionality
  - Adjustable reading speed
  - Font size controls
  - Night/day mode toggle
- Illustrated story panels
- Character glossary sidebar
- Reading progress indicator
- Discussion questions
- Related stories recommendations
- Parent/Teacher notes section
- Print-friendly version
- Share functionality

**URL Examples**:
- `/story/the-brave-little-fox`
- `/story/adventures-in-space-station-alpha`
- `/story/the-magical-garden-mystery`

#### 4. For Families (`/families`)
**Purpose**: Resources and guidance for parents
- **Main Families Page** (`/families`)
  - Reading tips for different ages
  - How to discuss stories with children
  - Creating reading routines
  - Family reading challenges

- **Reading Guides** (`/families/reading-guides`)
  - Age-appropriate recommendations
  - Developmental reading milestones
  - Supporting reluctant readers

- **Activities** (`/families/activities`)
  - Story-based crafts and games
  - Discussion prompts
  - Creative writing exercises

- **FAQ** (`/families/faq`)
  - Common parenting questions about reading
  - Technical support
  - Account management

#### 5. For Educators (`/educators`)
**Purpose**: Teaching resources and classroom integration
- **Main Educators Page** (`/educators`)
  - Curriculum alignment information
  - Classroom integration strategies
  - Student engagement techniques

- **Lesson Plans** (`/educators/lesson-plans`)
  - Pre-reading activities
  - During-reading strategies
  - Post-reading assessments
  - Cross-curricular connections

- **Classroom Tools** (`/educators/tools`)
  - Reading comprehension worksheets
  - Character analysis templates
  - Story sequencing activities
  - Vocabulary builders

- **Professional Development** (`/educators/professional-development`)
  - Webinar recordings
  - Research articles
  - Best practices guides

#### 6. About (`/about`)
**Purpose**: Company mission, story, and team
- **Main About Page** (`/about`)
  - Mission statement
  - Company story and values
  - Impact statistics

- **Our Team** (`/about/team`)
  - Founder profiles
  - Author spotlights
  - Illustrator features

- **Our Story** (`/about/our-story`)
  - Company founding story
  - Timeline of milestones
  - Awards and recognition

- **Press** (`/about/press`)
  - Media kit
  - Press releases
  - Media coverage

#### 7. Contact (`/contact`)
**Purpose**: Multiple contact methods and support
- Contact form
- Support ticketing system
- FAQ section
- Office locations
- Social media links
- Partnership inquiries

### Secondary Navigation (Footer & Utility)

#### Footer Navigation
```
Company
├── About Us
├── Our Team
├── Careers
├── Press
└── Contact

Resources
├── For Families
├── For Educators
├── Reading Tips
├── FAQ
└── Support

Stories
├── New Releases
├── Popular Stories
├── By Age Group
├── By Category
└── All Stories

Legal
├── Privacy Policy
├── Terms of Service
├── Cookie Policy
└── Accessibility
```

#### Utility Pages
- **Search Results** (`/search?q={query}`)
- **User Account** (`/account`) *if user system implemented*
- **404 Error** (`/404`)
- **500 Error** (`/500`)
- **Maintenance** (`/maintenance`)

### Breadcrumb Navigation Examples
```
Home > Stories > Adventure > The Brave Little Fox
Home > For Families > Reading Guides > Ages 5-7
Home > For Educators > Lesson Plans > Science Stories
Home > About > Our Team > Authors
```

## Information Architecture Principles

### 1. Age-First Organization
- Primary categorization by age groups
- Secondary categorization by themes/topics
- Clear visual indicators for age appropriateness

### 2. Multi-Path Navigation
- Multiple ways to discover the same content
- Support for both browsing and searching
- Progressive disclosure of information

### 3. Educational Focus
- Separate parent and educator resources
- Integration of learning objectives
- Support materials for every story

### 4. Accessibility Priority
- Clear navigation hierarchy
- Keyboard navigation support
- Screen reader compatibility
- High contrast options

### 5. Mobile-First Structure
- Simplified navigation for mobile
- Touch-friendly interface elements
- Progressive enhancement for desktop