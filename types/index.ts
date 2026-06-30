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
  highlights: string[];
  narrative?: string;
}

export interface Experience {
  title: string;
  summary: string;
  items: ExperienceItem[];
}

export interface MethodologySection {
  id: string;
  title: string;
  content: string;
}

export interface Methodology {
  title: string;
  description: string;
  sections: MethodologySection[];
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
