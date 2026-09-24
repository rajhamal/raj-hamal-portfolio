import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { profileData as fallbackProfile } from '@/data/profile';
import { projectsData as fallbackProjects } from '@/data/projects';
import { experienceData as fallbackExperience } from '@/data/experience';
import { educationData as fallbackEducation } from '@/data/education';
import { certificationsData as fallbackCertifications } from '@/data/certifications';
import { skillsData as fallbackSkills } from '@/data/skills';
import { Profile, ProjectItem, ExperienceItem, EducationItem, CertificationItem, SkillCategory } from '@/types/portfolio';

export async function getProfileData(): Promise<Profile> {
  if (!isSupabaseConfigured()) return fallbackProfile;

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();

    if (error || !data) return fallbackProfile;

    return {
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
  } catch {
    return fallbackProfile;
  }
}

export async function getProjectsData(): Promise<ProjectItem[]> {
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

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjectsData();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getExperienceData(): Promise<ExperienceItem[]> {
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

export async function getEducationData(): Promise<EducationItem[]> {
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

export async function getCertificationsData(): Promise<CertificationItem[]> {
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

export async function getSkillsData(): Promise<SkillCategory[]> {
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
