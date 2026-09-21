export interface Profile {
  fullName: string;
  displayName: string;
  title: string;
  tagline: string;
  domain: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  currentEducation: string;
  bio: string;
  narrative: {
    origin: string;
    transition: string;
    vision: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'Completed' | 'In Progress';
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  analyticalSkills: string[];
  operationalImpact: string;
}

export interface CaseStudyData {
  problemStatement: string;
  datasetDescription: string;
  dataPreparation: string[];
  methodology: string[];
  analysisHighlights: string[];
  keyFindings: string[];
  businessRecommendations: string[];
  toolsUsed: string[];
  tableauEmbedUrl?: string;
  tableauPublicUrl?: string;
  githubRepoUrl: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Tourism Analytics' | 'Business Intelligence' | 'Applied AI / Capstone' | 'Market Analysis';
  status: 'Completed' | 'In Progress';
  featured: boolean;
  priority: 1 | 2 | 3 | 4;
  date: string;
  shortDescription: string;
  tools: string[];
  githubUrl: string;
  tableauUrl?: string;
  caseStudy: CaseStudyData;
}

export interface SkillCategory {
  categoryName: string;
  description: string;
  skills: {
    name: string;
    level?: 'Proficient' | 'Developing' | 'Foundational';
    context: string;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  topics: string[];
  description: string;
}
