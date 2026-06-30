import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPostById, getAllPosts } from '@/lib/content';
import BlogDetailClient from './BlogDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  if (!post) {
    return {
      title: '文章不存在',
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen pt-32">
        <Navbar />
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-ink mb-4">文章不存在</h1>
            <Button asChild>
              <Link href="/blog">返回博客列表</Link>
            </Button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
