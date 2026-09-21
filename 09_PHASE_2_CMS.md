# Phase 2 CMS Specification

This document is NOT for Phase 1 implementation.

## Goal

Add a private content management system so Raj can update portfolio content without changing frontend code.

## Proposed stack

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Next.js server actions/API where appropriate

## Entities

### profile
- id
- name
- title
- summary
- location
- email
- linkedin_url
- github_url
- phone
- updated_at

### education
- id
- institution
- degree
- location
- start_date
- end_date
- description
- sort_order

### experience
- id
- company
- role
- location
- start_date
- end_date
- description
- bullets
- sort_order

### projects
- id
- slug
- title
- summary
- category
- status
- featured
- date
- problem
- methodology
- findings
- recommendations
- repository_url
- live_url
- tableau_url
- sort_order

### skills
- id
- category
- name
- context
- sort_order

### certifications
- id
- name
- issuer
- date
- credential_url
- description
- sort_order

### media
- id
- project_id
- storage_path
- alt_text
- sort_order

## Admin

Future route:

/admin

Modules:

- Profile
- Education
- Experience
- Projects
- Skills
- Certifications
- Media
- Resume

## Security

Use Supabase Auth.

Admin access must be restricted.

Never expose service-role keys to the browser.

## Migration requirement

Phase 2 should preserve the Phase 1 URL structure and visual design.
