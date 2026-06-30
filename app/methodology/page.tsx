import { Metadata } from 'next';
import { getMethodology } from '@/lib/content';
import MethodologyPageClient from './MethodologyPageClient';

export const metadata: Metadata = {
  title: '管理方法论',
  description: '涂奎的项目管理方法论体系，包括PMO建设、敏捷转型、风险管理、数据驱动决策等核心管理框架与实践经验。',
  openGraph: {
    title: '管理方法论 | 涂奎',
    description: '涂奎的项目管理方法论体系，包括PMO建设、敏捷转型、风险管理、数据驱动决策等核心管理框架与实践经验。',
    type: 'website',
  },
};

export default async function MethodologyPage() {
  const methodology = await getMethodology();
  return <MethodologyPageClient methodology={methodology} />;
}
