'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, DollarSign, Building2, Tag } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { MarkdownRenderer } from '@/components/shared/markdown-renderer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Project } from '@/types';

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft size={20} className="mr-2" />
              返回项目列表
            </Link>
          </Button>

          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge>{project.category}</Badge>
                <Badge variant="outline">{project.client}</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-muted mb-8 max-w-3xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Calendar size={16} />
                      <span className="text-sm">年份</span>
                    </div>
                    <div className="font-semibold text-ink">{project.year}</div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <DollarSign size={16} />
                      <span className="text-sm">预算</span>
                    </div>
                    <div className="font-semibold text-ink">{project.budget}</div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Building2 size={16} />
                      <span className="text-sm">客户</span>
                    </div>
                    <div className="font-semibold text-ink">{project.client}</div>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Tag size={16} />
                      <span className="text-sm">标签</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none text-ink">
                <MarkdownRenderer content={project.body} />
              </div>

              {relatedProjects.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-ink mb-8">相关项目</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {relatedProjects.map((related) => (
                      <Link key={related.id} href={`/projects/${related.id}`} className="block">
                        <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <h3 className="font-semibold text-ink group-hover:text-accent transition-colors mb-2">
                              {related.title}
                            </h3>
                            <p className="text-muted text-sm">{related.description}</p>
                          </CardContent>
                        </Card>
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
