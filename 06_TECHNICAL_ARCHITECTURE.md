# Technical Architecture

## Phase 1

Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui where useful
Framer Motion

Deployment:
Vercel

Content:
local structured data

## Route structure

/
 /about
 /experience
 /projects
 /projects/[slug]
 /skills
 /certifications
 /resume
 /contact

## Suggested source structure

src/
  app/
    page.tsx
    about/
    experience/
    projects/
      page.tsx
      [slug]/
    skills/
    certifications/
    resume/
    contact/
  components/
    layout/
    navigation/
    hero/
    projects/
    experience/
    education/
    skills/
    certifications/
    contact/
    ui/
  data/
    profile.ts
    education.ts
    experience.ts
    skills.ts
    certifications.ts
    projects.ts
  lib/
  types/
  styles/

## Content model

Keep content separate from UI.

Use TypeScript types for:

Profile
Education
Experience
Project
SkillGroup
Certification

## Project model

Recommended fields:

- slug
- title
- shortDescription
- category
- status
- date
- featured
- tools
- repositoryUrl
- liveUrl
- tableauUrl
- problem
- dataset
- methodology
- findings
- recommendations
- media

## Rendering

Prefer Server Components.

Use Client Components only for:

- animation requiring client state
- interactive controls
- contact form interactions
- responsive interactive widgets

## Images

Use `next/image`.

Do not use external image URLs unless they are stable and intentionally selected.

## Phase 2 compatibility

Design local data objects so they map naturally to future Supabase tables.

Do not hardwire content into component markup.

## Error handling

Add:

- not-found page
- loading states where needed
- form validation
- graceful external embed failure
- broken external link handling where practical
