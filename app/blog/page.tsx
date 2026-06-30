import { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: '博客',
  description: '项目管理实践思考、行业观察与技术分享',
  openGraph: {
    title: '博客 | 涂奎',
    description: '项目管理实践思考、行业观察与技术分享',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
