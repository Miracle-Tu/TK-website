import { getAllExperiences } from '@/lib/content';
import ExperiencePageClient from './ExperiencePageClient';

export default async function ExperiencePage() {
  const experiences = await getAllExperiences();
  return <ExperiencePageClient experiences={experiences} />;
}
