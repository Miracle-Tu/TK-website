'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { MarkdownRenderer } from '@/components/shared/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Post } from '@/types';

interface BlogDetailClientProps {
  post: Post;
  relatedPosts: Post[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft size={20} className="mr-2" />
              返回博客列表
            </Link>
          </Button>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-muted mb-8 pb-6 border-b border-rule">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </span>
              </div>

              <div className="prose prose-lg max-w-none text-ink">
                <MarkdownRenderer content={post.body} />
              </div>

              {relatedPosts.length > 0 && (
                <div className="mt-16 pt-8 border-t border-rule">
                  <h2 className="text-xl font-bold text-ink mb-6">相关文章</h2>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.id} href={`/blog/${related.id}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-bg2 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <Tag size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-ink hover:text-accent transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted mt-1">{related.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
