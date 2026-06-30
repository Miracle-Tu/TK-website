'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import Link from 'next/link';
import type { PostFrontmatter } from '@/types';

interface BlogPageClientProps {
  posts: (PostFrontmatter & { readingTime: number })[];
}

const categories = ['全部', '项目管理', '敏捷实践', '风险管理', '行业观察'];

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== '全部') {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [posts, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-ink mb-4">博客文章</h1>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                项目管理实践思考、行业观察与技术分享
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 border border-rule rounded-lg bg-surface text-ink placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-bg2 text-muted hover:bg-bg2/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <article className="bg-surface border border-rule rounded-xl overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {post.cover ? (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
                          <span className="text-5xl font-bold text-accent/40">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col">
                        <span className="inline-block w-fit px-2 py-0.5 rounded bg-accent/10 text-accent text-xs mb-3">
                          {post.category}
                        </span>
                        <h2 className="text-lg font-semibold text-ink line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">
                          {post.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted font-mono">
                            {post.date}
                          </span>
                          <span className="text-xs text-muted flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} 分钟
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg2 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">未找到相关文章</h3>
              <p className="text-muted">试试其他关键词或分类吧</p>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
