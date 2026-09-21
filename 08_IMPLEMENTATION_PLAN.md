# Implementation Plan

## Stage 0: Repository and content audit

Before UI implementation:

- inspect all four GitHub repositories
- inspect README files
- inspect file structure
- identify actual tools
- identify project status
- identify available screenshots/assets
- inspect Tableau project
- resolve content discrepancies
- create structured project data

Deliverable:
verified content inventory

## Stage 1: Foundation

Build:

- Next.js application
- TypeScript
- Tailwind
- fonts
- global styles
- layout
- navigation
- footer
- metadata foundation
- 404
- responsive container

Acceptance:
No console errors and clean responsive shell.

## Stage 2: Homepage

Build:

- hero
- career snapshot
- about
- featured projects
- experience
- education
- skills
- certifications
- contact CTA
- footer

Acceptance:
Homepage clearly communicates Raj's profile within 30 seconds.

## Stage 3: Project system

Build:

- project data model
- project listing
- featured cards
- dynamic routes
- case-study layout
- GitHub links
- Tableau integration

Acceptance:
All verified projects render from structured data.

## Stage 4: Supporting pages

Build:

- About
- Experience
- Skills
- Certifications
- Resume
- Contact

Acceptance:
No duplicated content architecture and consistent design.

## Stage 5: Quality

Test:

- mobile
- tablet
- desktop
- keyboard navigation
- screen reader basics
- reduced motion
- Lighthouse
- metadata
- sitemap
- robots
- canonical URLs
- external links
- Tableau responsiveness

## Stage 6: Deployment

Deploy to Vercel.

Configure:
- domain
- production environment
- analytics only if intentionally added
- SEO verification after deployment

## Definition of done

The website:

- looks professional at all breakpoints
- has no fabricated claims
- uses verified project evidence
- has working project links
- has working navigation
- has working SEO metadata
- is accessible
- performs well
- is ready for custom CMS integration later
