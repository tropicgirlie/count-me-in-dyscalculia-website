# Count Me In Dyscalculia Website: Comprehensive Analysis & Recommendations

> A multi-disciplinary audit covering product design, software development, content strategy, UX, and SEO alignment with dyscalculia research trends.

---

## Executive Summary

**Count Me In** is a well-crafted, single-founder passion project targeting adults with dyscalculia—an underserved niche. The website demonstrates strong visual design, solid technical architecture, and authentic lived-experience content. However, there are opportunities to better align with emerging dyscalculia research trends, improve SEO keyword targeting, and expand content depth for higher search visibility.

**Overall Grade: B+** — Excellent foundation with clear growth opportunities.

---

## 1. Product Designer Analysis

### What Works Well

| Aspect | Assessment | Notes |
|--------|------------|-------|
| **Visual Identity** | Strong | Warm coral/teal gradient system feels approachable and non-clinical—critical for reducing stigma around learning disabilities |
| **Typography** | Good | Clean, readable sans-serif with adequate line height; appropriate for neurodivergent audiences |
| **Bento Grid Layout** | Excellent | Modern, scannable card-based navigation on homepage |
| **Accessibility Features** | Good | `prefers-reduced-motion` support, generous spacing, large touch targets |
| **Color Psychology** | Strong | Coral (warm, energetic) + Teal (calm, trustworthy) effectively balances urgency with reassurance |
| **Micro-interactions** | Polished | Subtle hover states, smooth transitions, number scramble animation in hero |

### Areas for Improvement

- **Missing**: Dark mode toggle (important for users with visual sensitivities/common with ADHD)
- **Missing**: Font size adjustment controls (accessibility best practice)
- **Improvement**: Consider dyslexia-friendly font option (OpenDyslexic) given 30-40% comorbidity with dyslexia
- **Gap**: No progress indicators for multi-step tools (Self-Check quiz could show "Step 2 of 5")

### Design System Assessment

The site uses a consistent token-based system with `globals.css` defining:
- Semantic colors: `primary`, `accent`, `muted`, `background`, `foreground`
- Spacing scale with generous defaults
- Border radius consistently at `rounded-2xl`/`rounded-3xl` for friendly aesthetic

**Recommendation**: Document the design system in a public Storybook or style guide for consistency as the site scales.

---

## 2. Software Developer Analysis

### Technical Architecture

| Component | Implementation | Grade |
|-----------|----------------|-------|
| **Framework** | React 18 + Vite 6 | A — Modern, fast build tool |
| **Routing** | React Router v7 (lazy loading) | A — Good code-splitting |
| **Styling** | Tailwind CSS 4.1 | A — Utility-first, maintainable |
| **UI Components** | Radix UI primitives | A — Accessible by default |
| **State Management** | React hooks (useState) | B — Adequate for current scale |
| **SEO** | Custom `usePageMeta` hook + JSON-LD | B+ — Good but could be enhanced |

### Code Quality Observations

**Strengths:**
- Clean component structure with clear separation of concerns
- Lazy loading for all page components (`routes.ts`)
- Proper TypeScript usage throughout
- Accessibility attributes on interactive elements (`aria-label`, `aria-expanded`)

**Areas for Improvement:**

```typescript
// @/Users/Dublin-Osx/code/Count Me In Dyscalculia Website/src/components/HomePage.tsx:13-16
function useInView(_threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, isVisible: true }; // Always returns true—animation logic disabled?
}
```

The `useInView` hook is stubbed out—animations are always visible. Either implement IntersectionObserver or remove the animation state logic.

**Performance Concerns:**
- Unsplash images load without optimization—consider using a CDN with resizing params
- No service worker for offline access (valuable for resource pages)
- Missing `loading="lazy"` on below-fold images

### SEO Technical Implementation

Current `usePageMeta` hook (`@/Users/Dublin-Osx/code/Count Me In Dyscalculia Website/src/lib/usePageMeta.ts:1-47`) handles basic title/description but lacks:
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URL management
- Hreflang for internationalization (Spanish content opportunity)

---

## 3. UI Content Audit

### Content Inventory

| Page | Content Type | Word Count Est. | Status |
|------|--------------|-----------------|--------|
| Home | Landing/Navigation | ~500 | Complete |
| About | Story/Timeline | ~800 | Complete |
| Self-Check | Interactive Quiz | ~300 + 15 questions | Complete |
| Blog | 6 Articles | ~400 avg per article | **Needs expansion** |
| Get Assessed | Informational | ~600 | Complete |
| Stories | Testimonials | ~400 | **Needs expansion** |
| Free Resources | Link Directory | ~300 | Complete |
| Ebook | Product Page | ~500 | Complete |

### Content Tone Assessment

**Strengths:**
- Warm, non-patronizing voice ("Not broken, not lazy, not stupid")
- First-person narrative creates authenticity
- Clear "Not medical advice" disclaimer in footer

**Inconsistencies Found:**
- Blog dates show "March 2026" — future dates may confuse users
- Some pages use "dyscalculia" heavily, others alternate with "number difficulties" — establish primary keyword consistency

### Visual Content

- **Hero image**: 3D floating numbers effectively visualizes the dyscalculia experience
- **Blog thumbnails**: Unsplash images are relevant but generic—consider custom illustrations
- **Missing**: Video content (high engagement for neurodivergent audiences)
- **Missing**: Infographics for statistics (5-7% prevalence, 40-60% ADHD overlap)

---

## 4. UX Content Audit

### Information Architecture

```
Count Me In
├── Understand (anchor)
├── Books (anchor)
├── Accommodations (anchor)
├── Free Resources (page)
├── Store (page)
└── More
    ├── About
    ├── Blog
    ├── Self-Check
    ├── Get Assessed
    └── Stories
```

**Assessment:** Clean hierarchy with logical grouping. However:
- "More" dropdown hides important conversion pages (Self-Check, Get Assessed)
- Consider elevating "Self-Check" to primary nav—it's a key entry point

### User Journey Mapping

**Primary Persona: Adult Seeking Answers**
1. Discovers dyscalculia → Searches symptoms
2. Lands on Self-Check page → Takes quiz
3. Gets results → Directed to Get Assessed or Resources
4. Explores accommodations → May purchase ebook

**Friction Points:**
- Self-Check results don't directly link to "Get Assessed" page
- No email capture before quiz results (missed lead opportunity)
- Blog articles lack clear CTAs to deeper resources

### Trust Signals

Present and strong:
- "Evidence-based" chip on homepage
- Expert-reviewed badge
- Cleveland Clinic, Understood.org citations in Understand section
- Medical disclaimer in footer

**Missing:**
- No visible author credentials (Luana's expertise isn't highlighted enough)
- No testimonials with photos (anonymity limits social proof)
- No mention of partnerships with dyscalculia organizations

---

## 5. Dyscalculia Research Alignment

### Current Research Trends (2024-2025)

Based on review of recent literature, these are the hottest topics in dyscalculia:

| Trend | Website Coverage | Gap Analysis |
|-------|------------------|--------------|
| **Comorbidity with ADHD** | Strong (40-60% stat featured) | Well covered |
| **Adult/late diagnosis** | Strong (About page narrative) | Well covered |
| **Assistive technology** | Weak | **Major gap**—no mention of apps, calculators, tools |
| **Gender disparities** | Partial (one blog post) | Could expand |
| **Workplace accommodations** | Partial (blog post exists) | Needs practical templates |
| **Time blindness** | Partial (one blog post) | Could expand to tools/reviews |
| **Approximate Number System (ANS)** | None | **Major gap**—current research focus |
| **Neuroplasticity/interventions** | Weak | Emerging research area |
| **Co-occurrence with dyslexia** | Mentioned | Could expand given 30-40% overlap |

### Alignment Score: 7/10

The website aligns well with lived-experience content but under-indexes on:
1. **Technology solutions** (calculator apps, time-management tools)
2. **Cognitive science** (ANS, number sense theory)
3. **Educational policy** (IEPs, 504 plans, workplace rights)

**Content Opportunity:** Create a "Tools & Tech" section reviewing apps like:
- Time Timer (visual time management)
- Soulver (natural language calculator)
- Voice Dream Calculator (audio feedback)

---

## 6. SEO Marketing Analysis

### Current Keyword Strategy

Homepage targets: "dyscalculia resources, tools, and strategies for adults"

**What's Working:**
- Primary keyword "dyscalculia" appears in title, H1, meta description
- Long-tail: "dyscalculia support for adults"
- Related: "ADHD and dyscalculia"

**Keyword Gaps (High Search Volume, Low Competition):**

| Keyword | Monthly Volume | Competition | Opportunity |
|---------|----------------|-------------|-------------|
| "math learning disability" | High | Medium | **Not targeted** |
| "number dyslexia" | High | Low | **Not targeted** |
| "why can't I do math" | Medium | Low | **Not targeted** |
| "time blindness" | Medium | Low | One blog post only |
| "dyscalculia test online" | High | High | Self-check page misses this |
| "dyscalculia accommodations" | Medium | Medium | Under-optimized |
| "dyscalculia in adults" | High | Medium | **Primary opportunity** |
| "math anxiety vs dyscalculia" | Medium | Low | **Not targeted** |

### Technical SEO Issues

1. **No XML sitemap** submitted to search engines
2. **Missing**: Blog post structured data (`Article` schema)
3. **Missing**: Breadcrumb navigation
4. **Missing**: Internal linking strategy (orphan pages possible)
5. **Improvement**: URL structure uses dashes well (`/self-check`, `/get-assessed`)

### Content SEO Scorecard

| Page | Title Optimization | Meta Description | Header Structure | Grade |
|------|-------------------|------------------|------------------|-------|
| Home | Good | Good | H1 present | B+ |
| About | Good | Good | H1 present | B+ |
| Self-Check | Good | Good | H1 present | B |
| Blog | Good | Good | H1 present | B |
| Get Assessed | Good | Good | H1 present | B+ |

All pages need:
- Canonical tags
- Open Graph images
- Structured data for rich snippets

### Competitive Analysis

**Top competitors in SERP:**
1. Understood.org (high authority, clinical tone)
2. ADDitude Magazine (ADHD overlap focus)
3. Churchill Centre (assessment focus)
4. Wikipedia (definition queries)

**Differentiation opportunity:** Count Me In has a unique voice—lived experience + practical strategies. Lean into this with content that competitors can't easily replicate (personal stories, specific tool reviews).

---

## 7. Strategic Recommendations

### Priority 1: Content Expansion (Immediate - 0-3 months)

| Action | Impact | Effort |
|--------|--------|--------|
| Create "Tools & Apps" resource page | High traffic potential | Medium |
| Add 4 more blog posts targeting missing keywords | SEO boost | Medium |
| Add email capture to Self-Check results | Lead generation | Low |
| Fix blog post dates (2026 → current) | User trust | Low |

**Blog Post Ideas (SEO-driven):**
1. "Math Learning Disability vs Math Anxiety: What's the Difference?"
2. "Number Dyslexia Explained: Is Dyscalculia the Same Thing?"
3. "Best Calculator Apps for Dyscalculia (2025 Review)"
4. "Dyscalculia Accommodations: A Template for Requesting Workplace Support"

### Priority 2: UX Improvements (3-6 months)

| Action | Impact | Effort |
|--------|--------|--------|
| Elevate "Self-Check" to primary navigation | Conversion increase | Low |
| Add progress indicator to quiz | User completion rate | Low |
| Implement dark mode toggle | Accessibility | Medium |
| Add dyslexia-friendly font option | Accessibility | Low |
| Create video content for key pages | Engagement | High |

### Priority 3: SEO Technical (3-6 months)

| Action | Impact | Effort |
|--------|--------|--------|
| Generate XML sitemap | Indexing | Low |
| Add Open Graph / Twitter Card tags | Social sharing | Low |
| Implement Article schema for blog posts | Rich snippets | Medium |
| Add canonical URLs | Duplicate content prevention | Low |
| Create internal linking strategy | Page authority flow | Medium |

### Priority 4: Community Building (6-12 months)

| Action | Impact | Effort |
|--------|--------|--------|
| Add testimonial submission form | Social proof | Medium |
| Create newsletter signup | Repeat traffic | Low |
| Partner with dyscalculia organizations | Backlinks/authority | High |
| Consider forum/community feature | Engagement | High |

---

## 8. Content Calendar Suggestion

**Month 1-2:**
- Publish "Math Learning Disability vs Math Anxiety" (target: 1,500 words)
- Publish "Best Apps for Dyscalculia" roundup (target: 2,000 words)
- Fix technical SEO issues

**Month 3-4:**
- Create downloadable "Workplace Accommodation Request Template"
- Publish "Understanding the Approximate Number System" (research alignment)
- Add email capture to Self-Check

**Month 5-6:**
- Publish "Dyscalculia and Relationships" (untapped angle)
- Create video walkthrough of Self-Check
- Implement dark mode

---

## 9. Success Metrics to Track

| Metric | Current Baseline | 6-Month Target |
|--------|------------------|----------------|
| Organic traffic | Unknown | +50% |
| Self-Check completions | Unknown | 500/month |
| Email subscribers | 0 | 200 |
| Average session duration | Unknown | 3+ minutes |
| Pages per session | Unknown | 2.5+ |

---

## Summary: What Aligns Well vs. What Needs Modification

### Aligns Well ✅

| Aspect | Why It Works |
|--------|--------------|
| **Authentic voice** | Lived experience differentiates from clinical competitors |
| **Visual design** | Warm, non-stigmatizing aesthetic appropriate for audience |
| **Self-Check tool** | Interactive content drives engagement and shares |
| **ADHD comorbidity focus** | Aligns with trending research and search demand |
| **Mobile responsiveness** | Clean, accessible design on all devices |
| **Evidence-based positioning** | Builds trust through citations |

### Needs Modification ⚠️

| Aspect | Recommended Change |
|--------|-------------------|
| **Assistive technology coverage** | Add dedicated Tools/Apps section |
| **SEO keyword targeting** | Expand to "math learning disability," "number dyslexia" |
| **Email list building** | Add opt-in before quiz results |
| **Content depth** | Long-form articles (1,500+ words) for competitive keywords |
| **Video content** | Add explainer videos (high engagement for neurodivergent users) |
| **Social proof** | Add testimonials with photos, expert endorsements |
| **Dark mode** | Implement for visual sensitivity needs |

---

## Final Assessment

**Count Me In** is positioned to become a leading resource for adults with dyscalculia. The foundation—design, technical implementation, and authentic voice—is solid. The primary growth levers are:

1. **Content expansion** into underserved keyword territories
2. **Tool/app reviews** (high search intent, low competition)
3. **Community building** through email and testimonials
4. **Technical SEO** enhancements for discoverability

With focused execution on the Priority 1 recommendations, the site can significantly increase organic traffic and establish itself as the go-to resource for the 5-7% of adults navigating life with dyscalculia.

---

*Analysis completed: April 7, 2026*
