import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: '关于我',
  description: '了解涂奎的背景经历、专业技能和职业理念。7年项目管理经验，PMP & NPDP 双认证，专注于PMO体系建设与千万级项目管理。',
  openGraph: {
    title: '关于我 | 涂奎',
    description: '了解涂奎的背景经历、专业技能和职业理念。7年项目管理经验，PMP & NPDP 双认证，专注于PMO体系建设与千万级项目管理。',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
