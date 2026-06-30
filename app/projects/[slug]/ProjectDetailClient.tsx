'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Briefcase, Users, DollarSign } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import Link from 'next/link';
import type { ProjectFrontmatter } from '@/types';
import { ReactNode } from 'react';

interface ProjectDetailClientProps {
  project: ProjectFrontmatter;
  children: ReactNode;
  prevProject: ProjectFrontmatter | null;
  nextProject: ProjectFrontmatter | null;
}

const industryLabelMap: Record<string, string> = {
  'ai-gov': 'AI+政务',
  'fintech': '金融科技',
  'data-governance': '数据治理',
  'scale': '规模化交付',
  'integration': '总集管理',
  'pmo': 'PMO体系',
};

function getIndustryLabel(industry: string): string {
  return industryLabelMap[industry] || industry;
}

export default function ProjectDetailClient({ project, children, prevProject, nextProject }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12">
        <Container>
          <div className="mb-8">
            <Link href="/projects" className="inline-flex items-center text-muted hover:text-accent transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              返回项目列表
            </Link>
          </div>

          <div className="text-sm text-muted mb-4">
            <Link href="/" className="hover:text-accent transition-colors">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-accent transition-colors">项目作品集</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{project.title}</span>
          </div>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {getIndustryLabel(project.industry)}
                </span>
                <span className="px-3 py-1 rounded-full bg-bg2 text-muted text-sm font-medium">
                  {project.role}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-muted mb-8 max-w-3xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface border border-rule rounded-xl p-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">项目周期</span>
                  </div>
                  <div className="font-semibold text-ink">{project.duration}</div>
                </div>
                <div className="bg-surface border border-rule rounded-xl p-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Briefcase size={16} />
                    <span className="text-sm">担任角色</span>
                  </div>
                  <div className="font-semibold text-ink">{project.role}</div>
                </div>
                <div className="bg-surface border border-rule rounded-xl p-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Users size={16} />
                    <span className="text-sm">团队规模</span>
                  </div>
                  <div className="font-semibold text-ink">{project.teamSize}人</div>
                </div>
                <div className="bg-surface border border-rule rounded-xl p-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <DollarSign size={16} />
                    <span className="text-sm">项目预算</span>
                  </div>
                  <div className="font-semibold text-ink">{project.budget}</div>
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {project.metrics.map((metric, index) => (
                    <div key={index} className="bg-bg2 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-accent mb-2">{metric.value}</div>
                      <div className="text-sm text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-2xl overflow-hidden mb-12">
                <img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                {children}
              </div>

              <div className="flex justify-between mt-16 pt-8 border-t border-rule">
                {prevProject ? (
                  <Link href={`/projects/${prevProject.slug}`} className="group">
                    <div className="flex items-center text-muted mb-2">
                      <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm">上一项目</span>
                    </div>
                    <div className="font-semibold text-ink group-hover:text-accent transition-colors">
                      {prevProject.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextProject ? (
                  <Link href={`/projects/${nextProject.slug}`} className="group text-right">
                    <div className="flex items-center justify-end text-muted mb-2">
                      <span className="text-sm">下一项目</span>
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-semibold text-ink group-hover:text-accent transition-colors">
                      {nextProject.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
