import { Metadata } from 'next';
import { getExperience } from '@/lib/content';
import ExperiencePageClient from './ExperiencePageClient';

export const metadata: Metadata = {
  title: '工作经历',
  description: '涂奎的职业发展历程，从一线项目管理到PMO负责人的成长轨迹，涵盖互联网、金融、政务、医疗、制造五大行业。',
  openGraph: {
    title: '工作经历 | 涂奎',
    description: '涂奎的职业发展历程，从一线项目管理到PMO负责人的成长轨迹，涵盖互联网、金融、政务、医疗、制造五大行业。',
    type: 'website',
  },
};

export default async function ExperiencePage() {
  const experience = await getExperience();
  return <ExperiencePageClient experience={experience} />;
}
