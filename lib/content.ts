import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, Project, Experience, Methodology } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(CONTENT_DIR, 'posts');
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      return {
        id: file.replace('.mdx', ''),
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: String(data.date || ''),
        tags: data.tags || [],
        author: data.author || '',
        body,
      } as Post;
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostById(id: string): Promise<Post | null> {
  const postsDir = path.join(CONTENT_DIR, 'posts');
  const filePath = path.join(postsDir, `${id}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    id,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: String(data.date || ''),
    tags: data.tags || [],
    author: data.author || '',
    body,
  } as Post;
}

export async function getAllProjects(): Promise<Project[]> {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith('.mdx'));

  const projects = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      return {
        id: file.replace('.mdx', ''),
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        client: data.client || '',
        year: data.year || '',
        budget: data.budget || '',
        image: data.image || '',
        tags: data.tags || [],
        body,
      } as Project;
    })
  );

  return projects.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  const filePath = path.join(projectsDir, `${id}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    id,
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
    client: data.client || '',
    year: data.year || '',
    budget: data.budget || '',
    image: data.image || '',
    tags: data.tags || [],
    body,
  } as Project;
}

export async function getAllExperiences(): Promise<Experience[]> {
  const experiencesDir = path.join(CONTENT_DIR, 'experiences');
  if (!fs.existsSync(experiencesDir)) return [];

  const files = fs.readdirSync(experiencesDir).filter((file) => file.endsWith('.mdx'));

  const experiences = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(experiencesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      return {
        id: file.replace('.mdx', ''),
        title: data.title || '',
        company: data.company || '',
        role: data.role || '',
        date: data.date || '',
        location: data.location || '',
        highlights: data.highlights || [],
        body,
      } as Experience;
    })
  );

  return experiences.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllMethodologies(): Promise<Methodology[]> {
  const methodologiesDir = path.join(CONTENT_DIR, 'methodologies');
  if (!fs.existsSync(methodologiesDir)) return [];

  const files = fs.readdirSync(methodologiesDir).filter((file) => file.endsWith('.mdx'));

  const methodologies = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(methodologiesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: body } = matter(content);

      return {
        id: file.replace('.mdx', ''),
        title: data.title || '',
        excerpt: data.excerpt || '',
        category: data.category || '',
        icon: data.icon || '',
        body,
      } as Methodology;
    })
  );

  return methodologies;
}