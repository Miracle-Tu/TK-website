import { getAllProjects } from '@/lib/content';
import HomePageClient from './HomePageClient';

export default async function HomePage() {
  const projects = await getAllProjects();
  return <HomePageClient projects={projects} />;
}
