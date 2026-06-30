'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import Link from 'next/link';
import type { ProjectFrontmatter } from '@/types';

interface ProjectsPageClientProps {
  projects: ProjectFrontmatter[];
}

const filterOptions = [
  { id: 'all', label: '全部' },
  { id: 'ai-gov', label: 'AI+政务' },
  { id: 'data-governance', label: '数据治理' },
  { id: 'fintech', label: '金融科技' },
  { id: 'scale', label: '规模化交付' },
];

const industryLabelMap: Record<string, string> = {
  'ai-gov': 'AI+政务',
  'fintech': '金融科技',
  'data-governance': '数据治理',
  'scale': '规模化交付',
};

function getIndustryLabel(industry: string): string {
  return industryLabelMap[industry] || industry;
}

function matchesFilter(project: ProjectFrontmatter, filterId: string): boolean {
  if (filterId === 'all') return true;
  return project.industry === filterId;
}

function ProjectCard({ project, index, isFeatured }: { project: ProjectFrontmatter; index: number; isFeatured: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="group bg-surface border border-rule rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-ink group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-bg2 text-xs text-muted">
                {getIndustryLabel(project.industry)}
              </span>
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-bg2 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-ink">
                {project.budget || `${project.teamSize}人团队`}
              </span>
              <ArrowRight size={20} className="text-accent group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter(p => matchesFilter(p, activeFilter));
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const secondaryProjects = filteredProjects.filter(p => !p.featured);

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
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-ink mb-4">项目作品集</h1>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                精选跨行业项目案例，展示从战略到执行的全链路项目管理能力
              </p>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-accent text-white'
                      : 'bg-bg2 text-muted hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {featuredProjects.length > 0 && (
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                      {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} isFeatured={true} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {secondaryProjects.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-ink mb-6">更多项目</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {secondaryProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} isFeatured={false} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bg2 flex items-center justify-center">
                    <ArrowRight size={32} className="text-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-2">暂无项目</h3>
                  <p className="text-muted">该分类下暂无项目，请选择其他分类</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
