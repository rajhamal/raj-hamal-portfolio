import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { profileData as fallbackProfile } from '@/data/profile';
import { projectsData as fallbackProjects } from '@/data/projects';
import { experienceData as fallbackExperience } from '@/data/experience';
import { educationData as fallbackEducation } from '@/data/education';
import { certificationsData as fallbackCertifications } from '@/data/certifications';
import { skillsData as fallbackSkills } from '@/data/skills';
import { Profile, ProjectItem, ExperienceItem, EducationItem, CertificationItem, SkillCategory } from '@/types/portfolio';

// Local storage key helpers for client side live updates
const KEYS = {
  PROFILE: 'raj_cms_profile',
  PROJECTS: 'raj_cms_projects',
  EXPERIENCE: 'raj_cms_experience',
  EDUCATION: 'raj_cms_education',
  CERTIFICATIONS: 'raj_cms_certifications',
  SKILLS: 'raj_cms_skills',
  ABOUT: 'raj_cms_about',
};

// 1. PROFILE / SITE SETTINGS
export async function getProfileData(): Promise<Profile> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.PROFILE);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackProfile;

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
    if (error || !data) return fallbackProfile;

    const res: Profile = {
      fullName: data.full_name || fallbackProfile.fullName,
      displayName: data.display_name || fallbackProfile.displayName,
      title: data.professional_title || fallbackProfile.title,
      tagline: data.tagline || fallbackProfile.tagline,
      domain: data.domain || fallbackProfile.domain,
      location: data.location || fallbackProfile.location,
      email: data.email || fallbackProfile.email,
      phone: data.phone || fallbackProfile.phone,
      linkedinUrl: data.linkedin_url || fallbackProfile.linkedinUrl,
      githubUrl: data.github_url || fallbackProfile.githubUrl,
      currentEducation: fallbackProfile.currentEducation,
      bio: data.short_bio || fallbackProfile.bio,
      narrative: fallbackProfile.narrative,
      metrics: fallbackProfile.metrics,
    };
    return res;
  } catch {
    return fallbackProfile;
  }
}

export async function saveProfileData(profile: Profile): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('site_settings').upsert({
        id: '00000000-0000-0000-0000-000000000001',
        full_name: profile.fullName,
        display_name: profile.displayName,
        professional_title: profile.title,
        tagline: profile.tagline,
        domain: profile.domain,
        location: profile.location,
        email: profile.email,
        phone: profile.phone,
        linkedin_url: profile.linkedinUrl,
        github_url: profile.githubUrl,
        short_bio: profile.bio,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error('Supabase profile save error:', e);
    }
  }
}

// 2. PROJECTS
export async function getProjectsData(): Promise<ProjectItem[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.PROJECTS);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackProjects;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return fallbackProjects;

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || '',
      category: item.category,
      status: item.status,
      featured: item.featured,
      priority: item.priority || 1,
      date: item.date,
      shortDescription: item.short_description,
      tools: item.tools || [],
      githubUrl: item.github_url || '',
      tableauUrl: item.tableau_url || '',
      caseStudy: {
        problemStatement: item.problem_statement || '',
        datasetDescription: item.dataset_description || '',
        dataPreparation: item.data_preparation || [],
        methodology: item.methodology || [],
        analysisHighlights: item.analysis_highlights || [],
        keyFindings: item.key_findings || [],
        businessRecommendations: item.business_recommendations || [],
        toolsUsed: item.tools_used || [],
        tableauEmbedUrl: item.tableau_embed_url || undefined,
        tableauPublicUrl: item.tableau_public_url || undefined,
        githubRepoUrl: item.github_url || '',
      }
    }));
  } catch {
    return fallbackProjects;
  }
}

export async function saveProjectsData(projects: ProjectItem[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjectsData();
  return projects.find((p) => p.slug === slug) || null;
}

// 3. EXPERIENCE
export async function getExperienceData(): Promise<ExperienceItem[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.EXPERIENCE);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackExperience;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return fallbackExperience;

    return data.map((item: any) => ({
      id: item.id,
      role: item.role,
      company: item.company,
      location: item.location,
      period: item.period,
      type: item.type,
      responsibilities: item.responsibilities || [],
      analyticalSkills: item.analytical_skills || [],
      operationalImpact: item.operational_impact || '',
    }));
  } catch {
    return fallbackExperience;
  }
}

export async function saveExperienceData(experience: ExperienceItem[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.EXPERIENCE, JSON.stringify(experience));
  }
}

// 4. EDUCATION
export async function getEducationData(): Promise<EducationItem[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.EDUCATION);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackEducation;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return fallbackEducation;

    return data.map((item: any) => ({
      id: item.id,
      degree: item.degree,
      institution: item.institution,
      location: item.location,
      period: item.period,
      status: item.status,
      description: item.description,
      highlights: item.highlights || [],
    }));
  } catch {
    return fallbackEducation;
  }
}

export async function saveEducationData(education: EducationItem[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.EDUCATION, JSON.stringify(education));
  }
}

// 5. CERTIFICATIONS
export async function getCertificationsData(): Promise<CertificationItem[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.CERTIFICATIONS);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackCertifications;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) return fallbackCertifications;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issue_date,
      credentialUrl: item.credential_url || undefined,
      description: item.description,
      topics: item.topics || [],
    }));
  } catch {
    return fallbackCertifications;
  }
}

export async function saveCertificationsData(certs: CertificationItem[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.CERTIFICATIONS, JSON.stringify(certs));
  }
}

// 6. SKILLS
export async function getSkillsData(): Promise<SkillCategory[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.SKILLS);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }

  if (!isSupabaseConfigured()) return fallbackSkills;

  try {
    const supabase = createClient();
    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('*, skills(*)')
      .order('sort_order', { ascending: true });

    if (catError || !categories || categories.length === 0) return fallbackSkills;

    return categories.map((cat: any) => ({
      categoryName: cat.category_name,
      description: cat.description || '',
      skills: (cat.skills || []).map((s: any) => ({
        name: s.name,
        level: s.level,
        context: s.context,
      })),
    }));
  } catch {
    return fallbackSkills;
  }
}

export async function saveSkillsData(skills: SkillCategory[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.SKILLS, JSON.stringify(skills));
  }
}

// 7. ABOUT PAGE CMS
export async function getAboutData(): Promise<any> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(KEYS.ABOUT);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }
  return null;
}

export async function saveAboutData(aboutContent: any): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.ABOUT, JSON.stringify(aboutContent));
  }
}
