import { Metadata } from 'next';
import { getAllProjects } from '@/lib/content';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: '项目作品集',
  description: '精选跨行业项目案例，展示从战略到执行的全链路项目管理能力',
  openGraph: {
    title: '项目作品集 | 涂奎',
    description: '精选跨行业项目案例，展示从战略到执行的全链路项目管理能力',
    type: 'website',
  },
};

export default async function ProjectsPage() {
  const projects = getAllProjects();
  return <ProjectsPageClient projects={projects} />;
}
