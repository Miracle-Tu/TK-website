'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/types';

interface ExperiencePageClientProps {
  experiences: Experience[];
}

export default function ExperiencePageClient({ experiences }: ExperiencePageClientProps) {
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
            >
              <SectionTitle subtitle="职业历程" title="工作经历" />
            </motion.div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-rule hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <ScrollReveal key={exp.id}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center gap-8`}>
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge>{exp.role}</Badge>
                              <Badge variant="outline">{exp.company}</Badge>
                            </div>
                            <h3 className="font-bold text-xl text-ink mb-2">{exp.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
                              <span className="flex items-center gap-1">
                                <Building2 size={14} />
                                {exp.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {exp.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {exp.date}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {exp.highlights.map((highlight, idx) => (
                                <p key={idx} className="text-muted text-sm flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                  {highlight}
                                </p>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="hidden md:flex items-center justify-center w-16 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                          <Briefcase size={20} className="text-accent" />
                        </div>
                      </div>

                      <div className={`md:w-1/2 hidden md:block ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`} />
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
