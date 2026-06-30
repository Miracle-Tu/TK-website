'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag, User } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Post } from '@/types';

interface BlogPageClientProps {
  posts: Post[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [activeTag, setActiveTag] = useState('全部');

  const allTags = ['全部', '敏捷', '转型', '项目管理', 'PMO', '组织管理', '体系建设', '风险管理', '大型项目', '风险控制'];

  const filteredPosts = activeTag === '全部'
    ? posts
    : posts.filter((post) => post.tags.includes(activeTag));

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <SectionTitle subtitle="行业洞察" title="博客文章" />
              <p className="text-muted mt-4 max-w-2xl mx-auto">
                分享项目管理领域的思考、经验和最佳实践
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? 'default' : 'outline'}
                  onClick={() => setActiveTag(tag)}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <Card className="group hover:shadow-xl transition-all cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-lg text-ink mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {post.date}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            <span>阅读全文</span>
                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg2 flex items-center justify-center">
                <Tag size={32} className="text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">暂无文章</h3>
              <p className="text-muted">该标签下暂无文章，请选择其他标签</p>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
