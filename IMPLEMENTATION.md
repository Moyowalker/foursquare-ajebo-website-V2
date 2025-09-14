# FGCA Ajebo Website Implementation Guide

## Quick Developer Checklist

### ✅ 1. Core Infrastructure
- [x] Design tokens system (`src/design-tokens.json`)
- [x] Tailwind configuration with Ajebo brand colors
- [x] Custom animations for vibe-first experience
- [x] TypeScript types and interfaces

### ✅ 2. Production Components
- [x] GoldenHourHero with progressive image loading
- [x] Header with responsive navigation
- [x] StickyDonateBar with quick donation options
- [x] EventCard with booking integration
- [x] MemberPortalLogin with authentication
- [x] MediaCard with video/audio playback
- [x] TestimonialCarousel with accessibility
- [x] Footer with comprehensive links
- [x] ToastDonateSuccess with vibe sweep animation
- [x] WhatsAppFAB with contextual messaging

### ✅ 3. Vibe-Coding Features
- [x] Ambient morning sound toggle (user-controlled)
- [x] Donation success "vibe sweep" animation
- [x] "Moment of Welcome" first-visit ritual
- [x] Cookie-based visitor tracking
- [x] Reduced motion fallbacks

### ✅ 4. Analytics & Tracking
- [x] Google Tag Manager integration
- [x] 8 key event tracking functions
- [x] Donation, sermon, prayer, event tracking
- [x] Performance monitoring hooks

### 🔄 5. Performance & Accessibility
- [ ] Image optimization and WebP conversion
- [ ] Font loading strategy (swap)
- [ ] Service worker for offline functionality
- [ ] Lighthouse audit and optimizations

### 🔄 6. A/B Testing & Documentation
- [ ] Hero variant testing framework
- [ ] Conversion optimization tests
- [ ] Developer documentation
- [ ] Deployment pipeline

---

## A/B Testing Specifications

### Test 1: Hero Engagement
- **Hypothesis**: Golden hour imagery increases retreat bookings
- **Variant A**: Current golden hour hero with ambient sound
- **Variant B**: Traditional church interior with organ music
- **Primary Metric**: Retreat booking conversion rate
- **Implementation**: Use feature flags to serve different hero components

### Test 2: Donation CTA Placement
- **Hypothesis**: Sticky donation bar increases giving frequency
- **Variant A**: Sticky bar appears after 80% scroll
- **Variant B**: Sticky bar appears after 50% scroll + hero interaction
- **Primary Metric**: Donation completion rate
- **Implementation**: Modify scroll trigger in StickyDonateBar component

### Test 3: Welcome Experience
- **Hypothesis**: First-visit welcome ritual increases return visits
- **Variant A**: 3-second moment of welcome animation
- **Variant B**: Immediate experience without welcome ritual
- **Primary Metric**: 7-day return visitor rate
- **Implementation**: Toggle useVibeFeatures hook based on test variant

---

## Asset Requirements

### Images Needed (with alt text & target sizes)
```
hero_outdoor_golden_hour_ajebo_01.webp
- Alt: "Worship at Ajebo grounds during golden hour"
- Size: 120KB WebP, 1200×800
- Use case: Hero background

retreat_gardens_peaceful_01.webp  
- Alt: "Peaceful gardens at FGCA Ajebo retreat center"
- Size: 80KB WebP, 800×600
- Use case: Event cards

pastor_emmanuel_portrait.webp
- Alt: "Pastor Emmanuel Adebayo, Senior Pastor"
- Size: 25KB WebP, 300×300
- Use case: Media cards, about section

worship_hands_raised_sunset.webp
- Alt: "Congregation worshipping with raised hands at sunset"
- Size: 95KB WebP, 1000×667
- Use case: Testimonial backgrounds

ajebo_church_exterior_day.webp
- Alt: "FGCA Ajebo church building exterior view"
- Size: 70KB WebP, 900×600
- Use case: Contact page, footer

youth_conference_action.webp
- Alt: "Youth conference participants engaged in worship"
- Size: 85KB WebP, 800×533
- Use case: Event cards, ministry pages
```

### Audio Files
```
morning_ambient_10s.mp3
- Description: Gentle morning sounds (birds, light wind)
- Duration: 10 seconds (looped)
- Size: 45KB
- Volume: Pre-normalized to 30%
```

---

## Microcopy Bank

### Donation Messages
```
Success: "Your generosity plants seeds of hope! ₦{amount} received with grateful hearts."
Empty state: "Every gift matters - from ₦100 to ₦100,000, God multiplies your faithful giving."
```

### Event Messages  
```
Sold out: "This powerful gathering is full! Join our waiting list for future events."
Confirmation: "Praise God! Your spot is secured. Check your email for event details and what to bring."
```

### Prayer Requests
```
Submitted: "Your prayer is lifted up! Our intercession team will pray over your request this week."
Empty sermons: "New messages coming soon! Subscribe to never miss a word from Pastor Emmanuel."
```

---

## SEO & Meta Tags

### Homepage Meta
```html
<title>Foursquare Gospel Church Ajebo | Spiritual Retreat Center Ogun State</title>
<meta name="description" content="Experience divine transformation at FGCA Ajebo - a peaceful retreat center in Ogun State offering worship services, spiritual retreats, and community fellowship." />

<!-- Open Graph -->
<meta property="og:title" content="Foursquare Gospel Church Ajebo - God's Sanctuary in Ogun State" />
<meta property="og:description" content="Join us for transformative worship, peaceful retreats, and powerful community fellowship in the heart of Ajebo, Ogun State." />
<meta property="og:image" content="https://fgcajebo.org/images/og-hero-worship-sunset.jpg" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="FGCA Ajebo - Where Faith Meets Community" />
<meta name="twitter:description" content="Discover spiritual growth through worship, retreats, and fellowship at our sanctuary in Ogun State." />
```

### Event Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "New Year Spiritual Retreat",
  "startDate": "2025-01-03T18:00:00+01:00",
  "endDate": "2025-01-05T22:00:00+01:00",
  "location": {
    "@type": "Place",
    "name": "Foursquare Gospel Church Ajebo",
    "address": "Ajebo, Ogun State, Nigeria"
  },
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "NGN",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## Implementation Milestones

### Phase 1: Core Setup ✅
1. Install dependencies and configure TypeScript
2. Set up Tailwind with custom design tokens
3. Create component architecture
4. Implement basic routing structure

### Phase 2: UI Components ✅  
1. Build all 10 production components
2. Integrate animations and micro-interactions
3. Add accessibility attributes (ARIA, focus management)
4. Test responsive behavior on all devices

### Phase 3: Vibe Features ✅
1. Implement ambient audio with user controls
2. Add first-visit welcome experience
3. Create donation success animations
4. Set up analytics tracking

### Phase 4: Performance & SEO 🔄
1. Optimize images and implement WebP
2. Add service worker for caching
3. Configure font loading strategy
4. Run Lighthouse audits and fix issues

### Phase 5: Testing & Launch 📋
1. Set up A/B testing framework
2. Configure error monitoring
3. Performance monitoring dashboard
4. Deploy to production environment

---

## Performance Targets

- **Lighthouse Performance**: 95+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s
- **Hero Image Load**: <150KB WebP
- **Main JS Bundle**: <150KB gzipped

---

## Developer Quick-Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Run accessibility audit
npm run audit:a11y

# 5. Test performance
npm run lighthouse

# 6. Deploy to staging
npm run deploy:staging
```

**Need help?** Contact the development team or check the detailed README in the repository root.