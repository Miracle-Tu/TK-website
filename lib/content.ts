import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  ProjectFrontmatter,
  PostFrontmatter,
  Experience,
  ExperienceItem,
  Methodology,
  MethodologySection,
  SiteConfig,
} from '@/types';

const contentDir = path.join(process.cwd(), 'content');

function getMDXFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => path.join(fullDir, f));
}

function parseMDXFile<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

function calculateReadingTime(content: string): number {
  const chineseCharsPerMinute = 400;
  const englishWordsPerMinute = 200;
  
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content.replace(/[\u4e00-\u9fa5]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  
  const chineseMinutes = chineseChars / chineseCharsPerMinute;
  const englishMinutes = englishWords / englishWordsPerMinute;
  
  return Math.max(1, Math.ceil(chineseMinutes + englishMinutes));
}

export function getAllProjects(): ProjectFrontmatter[] {
  const files = getMDXFiles('projects');
  const projects = files.map((file) => {
    const { frontmatter } = parseMDXFile<ProjectFrontmatter>(file);
    return { ...frontmatter };
  });
  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getFeaturedProjects(limit = 4): ProjectFrontmatter[] {
  const all = getAllProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): { frontmatter: ProjectFrontmatter; content: string } | null {
  const files = getMDXFiles('projects');
  const file = files.find((f) => f.includes(`${slug}.mdx`));
  if (!file) return null;
  const { frontmatter, content } = parseMDXFile<ProjectFrontmatter>(file);
  return { frontmatter, content };
}

export function getProjectsByIndustry(industry: string): ProjectFrontmatter[] {
  const all = getAllProjects();
  return all.filter((p) => p.industry === industry);
}

export function getAllIndustries(): string[] {
  const all = getAllProjects();
  return [...new Set(all.map((p) => p.industry))];
}

export function getAllPosts(): (PostFrontmatter & { readingTime: number })[] {
  const files = getMDXFiles('blog');
  const posts = files.map((file) => {
    const { frontmatter, content } = parseMDXFile<Record<string, unknown>>(file);
    const readingTime = calculateReadingTime(content);
    const rawDate = frontmatter.date;
    const date = rawDate instanceof Date 
      ? rawDate.toISOString().split('T')[0] 
      : String(rawDate);
    return { ...frontmatter as unknown as PostFrontmatter, date, readingTime };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): { frontmatter: PostFrontmatter; content: string; readingTime: number } | null {
  const files = getMDXFiles('blog');
  const file = files.find((f) => f.includes(`${slug}.mdx`));
  if (!file) return null;
  const { frontmatter, content } = parseMDXFile<Record<string, unknown>>(file);
  const readingTime = calculateReadingTime(content);
  const rawDate = frontmatter.date;
  const date = rawDate instanceof Date 
    ? rawDate.toISOString().split('T')[0] 
    : String(rawDate);
  return { frontmatter: { ...frontmatter as unknown as PostFrontmatter, date }, content, readingTime };
}

export function getFeaturedPosts(limit = 3): (PostFrontmatter & { readingTime: number })[] {
  const all = getAllPosts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export function getPostsByCategory(category: string): (PostFrontmatter & { readingTime: number })[] {
  const all = getAllPosts();
  return all.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  const all = getAllPosts();
  return [...new Set(all.map((p) => p.category))];
}

export function searchPosts(query: string): (PostFrontmatter & { readingTime: number })[] {
  const lowerQuery = query.toLowerCase();
  const all = getAllPosts();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

function parseExperienceItems(content: string): ExperienceItem[] {
  const items: ExperienceItem[] = [];
  const lines = content.split('\n');
  let currentItem: ExperienceItem | null = null;
  let inHighlights = false;

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (currentItem) {
        items.push(currentItem);
      }
      const header = line.replace('### ', '').trim();
      const parts = header.split('|').map((p) => p.trim());
      currentItem = {
        company: parts[0] || '',
        role: parts[1] || '',
        duration: parts[2] || '',
        highlights: [],
      };
      inHighlights = false;
    } else if (currentItem && line.startsWith('- ')) {
      currentItem.highlights.push(line.replace('- ', '').trim());
      inHighlights = true;
    } else if (currentItem && line.trim() === '') {
      inHighlights = false;
    } else if (currentItem && inHighlights === false && line.trim() !== '' && !line.startsWith('## ')) {
      currentItem.narrative = (currentItem.narrative || '') + line.trim() + '\n';
    }
  }

  if (currentItem) {
    items.push(currentItem);
  }

  return items;
}

export function getExperience(): Experience | null {
  const filePath = path.join(contentDir, 'experience', 'experiences.mdx');
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = parseMDXFile<{
    title: string;
    summary: string;
    items?: ExperienceItem[];
  }>(filePath);

  if (frontmatter.items && frontmatter.items.length > 0) {
    return {
      title: frontmatter.title,
      summary: frontmatter.summary,
      items: frontmatter.items,
      body: content,
    };
  }

  const items = parseExperienceItems(content);
  return {
    title: frontmatter.title,
    summary: frontmatter.summary,
    items,
    body: content,
  };
}

function parseMethodologySections(content: string): MethodologySection[] {
  const sections: MethodologySection[] = [];
  const lines = content.split('\n');
  let currentSection: MethodologySection | null = null;

  for (const line of lines) {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }
      const title = line.replace('## ', '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
      currentSection = {
        id,
        title,
        content: '',
      };
    } else if (currentSection) {
      currentSection.content += line + '\n';
    }
  }

  if (currentSection) {
    currentSection.content = currentSection.content.trim();
    sections.push(currentSection);
  }

  return sections;
}

export function getMethodology(): Methodology | null {
  const filePath = path.join(contentDir, 'methodology', 'methodology.mdx');
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = parseMDXFile<{
    title: string;
    description: string;
    sections?: MethodologySection[];
  }>(filePath);

  if (frontmatter.sections && frontmatter.sections.length > 0) {
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      sections: frontmatter.sections,
      body: content,
    };
  }

  const sections = parseMethodologySections(content);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    sections,
    body: content,
  };
}

export function getSiteConfig(): SiteConfig | null {
  const filePath = path.join(contentDir, 'site', 'config.json');
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as SiteConfig;
  } catch {
    return null;
  }
}
