# URL Structure & SEO Strategy - Sage Stories

## URL Architecture Principles

### Design Philosophy
- **Semantic URLs**: Clear, descriptive paths that indicate content hierarchy
- **User-Friendly**: Easy to remember and share
- **SEO-Optimized**: Include target keywords naturally
- **Consistent**: Predictable patterns across the site
- **Scalable**: Structure supports future content growth

### URL Patterns

#### Core Site Structure
```
https://sagestories.com/
├── /                          # Homepage
├── /stories/                  # Story library main page
├── /families/                 # Resources for families
├── /educators/                # Resources for educators
├── /about/                    # Company information
└── /contact/                  # Contact page
```

## Story URLs

### Individual Stories
**Pattern**: `/story/{story-slug}`

```
✅ Good Examples:
https://sagestories.com/story/the-brave-little-fox
https://sagestories.com/story/adventures-in-space-station-alpha
https://sagestories.com/story/the-magical-garden-mystery
https://sagestories.com/story/dinosaurs-discover-friendship

🚫 Avoid:
https://sagestories.com/story/123
https://sagestories.com/story/story-id-456
https://sagestories.com/stories/the_brave_little_fox (underscore)
```

**Slug Generation Rules**:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters except hyphens
- Limit to 60 characters maximum
- Include primary keyword when possible

### Story Categories
**Pattern**: `/stories/category/{category-slug}`

```
https://sagestories.com/stories/category/adventure
https://sagestories.com/stories/category/fantasy
https://sagestories.com/stories/category/science
https://sagestories.com/stories/category/friendship
https://sagestories.com/stories/category/nature-stories
https://sagestories.com/stories/category/bedtime-stories
```

### Age-Based Collections
**Pattern**: `/stories/age/{age-range}`

```
https://sagestories.com/stories/age/2-4
https://sagestories.com/stories/age/5-7
https://sagestories.com/stories/age/8-10
https://sagestories.com/stories/age/11-13
https://sagestories.com/stories/age/toddlers
https://sagestories.com/stories/age/preschool
https://sagestories.com/stories/age/elementary
```

### Reading Time Collections
**Pattern**: `/stories/time/{duration}`

```
https://sagestories.com/stories/time/quick-reads      # 5 minutes or less
https://sagestories.com/stories/time/short-stories    # 5-10 minutes
https://sagestories.com/stories/time/medium-stories   # 10-15 minutes
https://sagestories.com/stories/time/long-stories     # 15+ minutes
```

### Seasonal & Thematic Collections
**Pattern**: `/stories/collection/{theme-slug}`

```
https://sagestories.com/stories/collection/spring-adventures
https://sagestories.com/stories/collection/back-to-school
https://sagestories.com/stories/collection/holiday-tales
https://sagestories.com/stories/collection/earth-day-stories
https://sagestories.com/stories/collection/summer-reading
```

## Family Resources URLs

### Main Sections
**Pattern**: `/families/{section-slug}`

```
https://sagestories.com/families/reading-tips
https://sagestories.com/families/activities
https://sagestories.com/families/reading-guides
https://sagestories.com/families/discussion-questions
https://sagestories.com/families/faq
```

### Detailed Resource Pages
**Pattern**: `/families/{section}/{topic-slug}`

```
https://sagestories.com/families/reading-tips/creating-reading-routines
https://sagestories.com/families/reading-tips/reluctant-readers
https://sagestories.com/families/reading-tips/reading-aloud-techniques

https://sagestories.com/families/activities/story-based-crafts
https://sagestories.com/families/activities/creative-writing-prompts
https://sagestories.com/families/activities/reading-games

https://sagestories.com/families/reading-guides/age-2-4-guide
https://sagestories.com/families/reading-guides/age-5-7-guide
https://sagestories.com/families/reading-guides/choosing-right-books
```

## Educator Resources URLs

### Main Sections
**Pattern**: `/educators/{section-slug}`

```
https://sagestories.com/educators/lesson-plans
https://sagestories.com/educators/classroom-tools
https://sagestories.com/educators/professional-development
https://sagestories.com/educators/curriculum-alignment
```

### Lesson Plans
**Pattern**: `/educators/lesson-plans/{subject-or-theme}`

```
https://sagestories.com/educators/lesson-plans/language-arts
https://sagestories.com/educators/lesson-plans/science-integration
https://sagestories.com/educators/lesson-plans/social-emotional-learning
https://sagestories.com/educators/lesson-plans/character-education
https://sagestories.com/educators/lesson-plans/reading-comprehension
```

### Specific Lesson Plan Pages
**Pattern**: `/educators/lesson-plans/{subject}/{lesson-slug}`

```
https://sagestories.com/educators/lesson-plans/science/exploring-ecosystems-through-stories
https://sagestories.com/educators/lesson-plans/language-arts/character-development-activities
https://sagestories.com/educators/lesson-plans/social-studies/community-helpers-stories
```

### Classroom Tools
**Pattern**: `/educators/tools/{tool-type}`

```
https://sagestories.com/educators/tools/worksheets
https://sagestories.com/educators/tools/discussion-guides
https://sagestories.com/educators/tools/assessment-rubrics
https://sagestories.com/educators/tools/vocabulary-builders
```

## About Section URLs

### Company Information
**Pattern**: `/about/{page-slug}`

```
https://sagestories.com/about/our-mission
https://sagestories.com/about/our-team
https://sagestories.com/about/our-story
https://sagestories.com/about/careers
https://sagestories.com/about/press
https://sagestories.com/about/contact
```

### Team Pages
**Pattern**: `/about/team/{role-or-person}`

```
https://sagestories.com/about/team/founders
https://sagestories.com/about/team/authors
https://sagestories.com/about/team/illustrators
https://sagestories.com/about/team/educators
```

## Search & Filter URLs

### Search Results
**Pattern**: `/search?q={query}&filters`

```
https://sagestories.com/search?q=adventure+stories
https://sagestories.com/search?q=space&age=5-7&category=science
https://sagestories.com/search?q=friendship&time=short&sort=popular
```

### Advanced Filtering
**URL Parameters**:
- `q` - Search query
- `age` - Age group (2-4, 5-7, 8-10, 11-13)
- `category` - Story category
- `time` - Reading time (quick, short, medium, long)
- `level` - Reading level (beginner, intermediate, advanced)
- `sort` - Sort order (newest, popular, alphabetical, rating)
- `page` - Pagination

```
https://sagestories.com/stories?age=5-7&category=adventure&time=short&sort=popular&page=2
```

## SEO-Optimized URL Examples

### High-Value Landing Pages
```
# Target: "bedtime stories for kids"
https://sagestories.com/stories/collection/bedtime-stories

# Target: "educational stories for children"
https://sagestories.com/stories/category/educational-stories

# Target: "reading activities for kids"
https://sagestories.com/families/activities/reading-activities

# Target: "classroom reading resources"
https://sagestories.com/educators/classroom-reading-resources

# Target: "stories for 5 year olds"
https://sagestories.com/stories/age/5-7

# Target: "short stories for children"
https://sagestories.com/stories/time/short-stories
```

## Technical Implementation

### URL Rewriting Rules
```apache
# Apache .htaccess example
RewriteEngine On

# Redirect old URLs to new structure
RewriteRule ^old-stories/(.*)$ /stories/$1 [R=301,L]

# Handle story URLs
RewriteRule ^story/([a-z0-9\-]+)/?$ /story.php?slug=$1 [L,QSA]

# Handle category URLs
RewriteRule ^stories/category/([a-z0-9\-]+)/?$ /category.php?slug=$1 [L,QSA]

# Handle age group URLs
RewriteRule ^stories/age/([0-9\-]+)/?$ /age-group.php?age=$1 [L,QSA]
```

### Canonical URLs
```html
<!-- Prevent duplicate content issues -->
<link rel="canonical" href="https://sagestories.com/story/the-brave-little-fox">

<!-- Category pages -->
<link rel="canonical" href="https://sagestories.com/stories/category/adventure">

<!-- Paginated content -->
<link rel="canonical" href="https://sagestories.com/stories?page=1">
<link rel="prev" href="https://sagestories.com/stories">
<link rel="next" href="https://sagestories.com/stories?page=2">
```

## Mobile & AMP URLs

### Mobile Optimization
- All URLs automatically responsive
- No separate mobile URLs (m.sagestories.com not needed)
- Progressive Web App (PWA) support

### AMP Pages (if implemented)
**Pattern**: `/amp/{content-type}/{slug}`

```
https://sagestories.com/amp/story/the-brave-little-fox
https://sagestories.com/amp/families/reading-tips/creating-routines
```

## URL Validation & Testing

### URL Quality Checklist
- [ ] URLs are under 255 characters
- [ ] No more than 5 path segments deep
- [ ] Hyphens used instead of underscores
- [ ] No unnecessary parameters
- [ ] Consistent capitalization (lowercase)
- [ ] Keywords included naturally
- [ ] Breadcrumb-friendly structure
- [ ] Social sharing friendly

### 301 Redirect Strategy
```
# Handle URL changes and maintain SEO value
/stories/adventure → /stories/category/adventure
/story/123 → /story/the-brave-little-fox
/about-us → /about
/family-resources → /families
```

## International Considerations

### Multi-language URL Structure (Future)
**Pattern**: `/{language-code}/{content-path}`

```
https://sagestories.com/en/story/the-brave-little-fox
https://sagestories.com/es/story/el-pequeno-zorro-valiente
https://sagestories.com/fr/story/le-brave-petit-renard
```

### Localized Content URLs
```
https://sagestories.com/en-us/families/reading-tips
https://sagestories.com/en-ca/families/reading-tips
https://sagestories.com/en-uk/families/reading-tips
```

This URL structure provides a solid foundation for SEO success while maintaining user-friendly navigation and supporting the site's educational mission.