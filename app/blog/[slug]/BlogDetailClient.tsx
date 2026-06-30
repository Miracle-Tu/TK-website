'use client';

import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import Link from 'next/link';
import type { PostFrontmatter } from '@/types';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogDetailClientProps {
  frontmatter: PostFrontmatter;
  readingTime: number;
  children: ReactNode;
  toc: TocItem[];
  prevPost: (PostFrontmatter & { readingTime: number }) | null;
  nextPost: (PostFrontmatter & { readingTime: number }) | null;
}

export default function BlogDetailClient({
  frontmatter,
  readingTime,
  children,
  toc,
  prevPost,
  nextPost,
}: BlogDetailClientProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0,
      }
    );

    const headings = document.querySelectorAll('h2[id], h3[id], h4[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  const scrollToToc = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft size={18} />
                <span>返回博客列表</span>
              </Link>

              <div className="flex items-center gap-2 text-sm text-muted mt-4">
                <Link href="/" className="hover:text-accent transition-colors">
                  首页
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  博客
                </Link>
                <span>/</span>
                <span className="text-ink truncate max-w-xs">{frontmatter.title}</span>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
                {frontmatter.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {frontmatter.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {frontmatter.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {readingTime} 分钟阅读
                </span>
                <span className="flex items-center gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-bg2 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          {toc.length > 0 && (
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-rule rounded-lg"
              >
                <span className="text-sm font-semibold uppercase tracking-wider">
                  目录
                </span>
                {tocOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {tocOpen && (
                <div className="mt-2 p-4 bg-surface border border-rule rounded-lg">
                  <nav className="border-l-2 border-rule pl-4 flex flex-col gap-2">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToToc(item.id);
                          setTocOpen(false);
                        }}
                        className={`text-sm text-left transition-colors ${
                          item.level === 2
                            ? 'ml-0'
                            : item.level === 3
                            ? 'ml-3'
                            : 'ml-6'
                        } ${
                          activeId === item.id
                            ? 'text-accent font-medium'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {children}
                </motion.div>
              </ScrollReveal>
            </div>

            {toc.length > 0 && (
              <div className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    目录
                  </h3>
                  <nav className="border-l-2 border-rule pl-4 flex flex-col gap-2">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToToc(item.id)}
                        className={`text-sm text-left transition-colors ${
                          item.level === 2
                            ? 'ml-0'
                            : item.level === 3
                            ? 'ml-3'
                            : 'ml-6'
                        } ${
                          activeId === item.id
                            ? 'text-accent font-medium'
                            : 'text-muted hover:text-ink'
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>

          <ScrollReveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between mt-16 pt-8 border-t border-rule"
            >
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col items-start p-4 rounded-xl hover:bg-bg2 transition-colors max-w-[45%]"
                >
                  <span className="text-sm text-muted flex items-center gap-1 mb-1">
                    <ArrowLeft size={14} />
                    上一篇
                  </span>
                  <span className="text-ink font-medium group-hover:text-accent transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col items-end p-4 rounded-xl hover:bg-bg2 transition-colors max-w-[45%] text-right"
                >
                  <span className="text-sm text-muted flex items-center gap-1 mb-1">
                    下一篇
                    <ArrowRight size={14} />
                  </span>
                  <span className="text-ink font-medium group-hover:text-accent transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
