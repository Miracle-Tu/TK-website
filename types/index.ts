export type Theme = 'light' | 'dark';

export type ProjectStatus = 'completed' | 'in-progress' | 'paused';

export type ContactSubject = 'business' | 'recruit' | 'consult' | 'other';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  cover: string;
  industry: string;
  role: string;
  duration: string;
  teamSize?: number;
  budget?: string;
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  metrics?: ProjectMetric[];
  order: number;
}

export interface Project extends ProjectFrontmatter {
  content: unknown;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  cover?: string;
  readingTime?: number;
  featured: boolean;
}

export interface Post extends PostFrontmatter {
  content: unknown;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  industry?: string;
  highlights: string[];
  narrative?: string;
  tools?: string[];
}

export interface Experience {
  id?: string;
  title: string;
  summary: string;
  items: ExperienceItem[];
  body?: string | unknown;
}

export interface MethodologySection {
  id: string;
  title: string;
  content: string | unknown;
}

export interface Methodology {
  id?: string;
  title: string;
  description: string;
  sections: MethodologySection[];
  body?: string | unknown;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email?: string;
  social?: { platform: string; url: string }[];
}

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  summary: string;
  detail: string;
  iconName: string;
}

export interface PyramidLayer {
  level: string;
  items: string[];
}

export interface Certification {
  name: string;
  detail: string;
  iconName: string;
  status: string;
}

export interface ToolItem {
  name: string;
  desc: string;
}

export interface ToolCategory {
  title: string;
  tools: ToolItem[];
}
