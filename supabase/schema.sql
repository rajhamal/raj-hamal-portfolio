-- ============================================================================
-- SUPABASE DATABASE SCHEMA FOR RAJ HAMAL PROFESSIONAL PORTFOLIO (PHASE 2)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL, -- 'Tourism Analytics', 'Business Intelligence', 'Applied AI / Capstone', 'Market Analysis'
    status TEXT NOT NULL DEFAULT 'Completed', -- 'Completed', 'In Progress', 'draft', 'published'
    featured BOOLEAN NOT NULL DEFAULT false,
    priority INTEGER NOT NULL DEFAULT 1,
    date TEXT NOT NULL,
    short_description TEXT NOT NULL,
    tools TEXT[] DEFAULT '{}',
    github_url TEXT,
    tableau_url TEXT,
    tableau_embed_url TEXT,
    tableau_public_url TEXT,
    problem_statement TEXT,
    dataset_description TEXT,
    data_preparation TEXT[] DEFAULT '{}',
    methodology TEXT[] DEFAULT '{}',
    analysis_highlights TEXT[] DEFAULT '{}',
    key_findings TEXT[] DEFAULT '{}',
    business_recommendations TEXT[] DEFAULT '{}',
    tools_used TEXT[] DEFAULT '{}',
    thumbnail TEXT,
    gallery TEXT[] DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    period TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    type TEXT NOT NULL DEFAULT 'Full-Time',
    responsibilities TEXT[] DEFAULT '{}',
    analytical_skills TEXT[] DEFAULT '{}',
    operational_impact TEXT,
    achievements TEXT[] DEFAULT '{}',
    company_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    field TEXT,
    location TEXT NOT NULL,
    period TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'Completed', -- 'Completed', 'In Progress'
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    institution_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_url TEXT,
    credential_id TEXT,
    description TEXT NOT NULL,
    topics TEXT[] DEFAULT '{}',
    logo TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SKILL CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level TEXT DEFAULT 'Proficient', -- 'Proficient', 'Developing', 'Foundational'
    context TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SITE SETTINGS TABLE (SINGLETON REGISTRY)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Raj Kumar Hamal',
    display_name TEXT NOT NULL DEFAULT 'Raj Hamal',
    professional_title TEXT NOT NULL DEFAULT 'Data Analyst | Applied AI & Data Analytics',
    tagline TEXT NOT NULL DEFAULT 'Turning data into insights, dashboards, and better business decisions.',
    short_bio TEXT NOT NULL,
    domain TEXT NOT NULL DEFAULT 'rajhamal.com.np',
    location TEXT NOT NULL DEFAULT 'Bradford, West Yorkshire, UK',
    email TEXT NOT NULL DEFAULT 'hello.rajhamal@gmail.com',
    phone TEXT NOT NULL DEFAULT '+44 7344844303',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/rajhamal',
    github_url TEXT DEFAULT 'https://github.com/rajhamal',
    resume_url TEXT DEFAULT '/resume',
    profile_image TEXT DEFAULT '/images/raj-hamal-hero.png',
    og_image TEXT DEFAULT '/images/raj-hamal-hero.png',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SEO METADATA TABLE
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL UNIQUE, -- '/', '/about', '/experience', '/projects', etc.
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    canonical_url TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    noindex BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread', -- 'unread', 'read', 'archived'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON public.experience FOR SELECT USING (published = true);
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (published = true);
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (published = true);
CREATE POLICY "Public read skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read seo_metadata" ON public.seo_metadata FOR SELECT USING (true);

-- CONTACT MESSAGES: PUBLIC INSERT ONLY, NO PUBLIC READ
CREATE POLICY "Public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS (AUTHENTICATED USERS)
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access certifications" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skill_categories" ON public.skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access achievements" ON public.achievements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access seo_metadata" ON public.seo_metadata FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access contact_messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- STORAGE BUCKETS SETUP
-- ============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
('profile', 'profile', true),
('projects', 'projects', true),
('experience', 'experience', true),
('certifications', 'certifications', true),
('site', 'site', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public read storage objects" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Admin full storage management" ON storage.objects FOR ALL USING (auth.role() = 'authenticated');
