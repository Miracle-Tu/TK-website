import { Metadata } from 'next';
import { getFeaturedProjects, getAllPosts } from '@/lib/content';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: '首页',
  description: '7年项目管理经验，PMP & NPDP 双认证。横跨互联网、金融、政务、医疗、制造五大行业，管理过超5000w资金规模的项目组合。',
  openGraph: {
    title: '涂奎 · 产品项目经理 | PMO体系建设与千万级项目管理',
    description: '7年项目管理经验，PMP & NPDP 双认证。横跨互联网、金融、政务、医疗、制造五大行业，管理过超5000w资金规模的项目组合。',
    type: 'website',
  },
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(2);
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  
  return <HomePageClient featuredProjects={featuredProjects} latestPosts={latestPosts} />;
}
