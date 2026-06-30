'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, DollarSign, Building2 } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Project } from '@/types';

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState('全部');

  const categories = ['全部', '政务', '医疗', '制造'];

  const filteredProjects = activeCategory === '全部'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

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
              <SectionTitle subtitle="精选案例" title="项目作品集" />
              <p className="text-muted mt-4 max-w-2xl mx-auto">
                展示我主导和参与的代表性项目，涵盖政务、医疗、制造等多个领域
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <ScrollReveal>
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <Card className="group hover:shadow-xl transition-all overflow-hidden cursor-pointer">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <Badge className="absolute top-4 left-4">{project.category}</Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg text-ink mb-2 group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted text-sm mb-4 line-clamp-2">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {project.year}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign size={12} />
                                {project.budget}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <span>查看详情</span>
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
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg2 flex items-center justify-center">
                <Building2 size={32} className="text-muted" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">暂无项目</h3>
              <p className="text-muted">该分类下暂无项目，请选择其他分类</p>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
