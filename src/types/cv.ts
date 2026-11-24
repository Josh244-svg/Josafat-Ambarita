export type Language = 'id' | 'en';

export type TemplateStyle = 'ats' | 'editorial';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface ExperienceItem {
  id: string;
  period: LocalizedText;
  role: LocalizedText;
  company: string;
  location: string;
  highlights: {
    id: string[];
    en: string[];
  };
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: LocalizedText;
  status: LocalizedText;
  users: LocalizedText;
  role: LocalizedText;
  solution: LocalizedText;
  features: {
    id: string[];
    en: string[];
  };
  tech: string[];
}

export interface EducationItem {
  id: string;
  period: LocalizedText;
  degree: LocalizedText;
  institution: string;
  gpa: string;
  notes: LocalizedText;
}

export interface SkillGroup {
  id: string;
  label: LocalizedText;
  items: string[];
}

export interface CertificationItem {
  id: string;
  name: LocalizedText;
  issuer: string;
  year: string;
  type: 'cert' | 'training';
  staticFileUrl?: string;
}

export interface CVData {
  sourceUrl: string;
  fullName: string;
  headline: LocalizedText;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolioUrl: string;
  summary: LocalizedText;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skillGroups: SkillGroup[];
  certifications: CertificationItem[];
}
