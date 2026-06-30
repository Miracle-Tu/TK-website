'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Users, Clock, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { CountUp } from '@/components/shared/count-up';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Project } from '@/types';

interface HomePageClientProps {
  projects: Project[];
}

export default function HomePageClient({ projects }: HomePageClientProps) {
  const stats = [
    { icon: Clock, value: 7, suffix: '+', label: '年项目管理经验' },
    { icon: Briefcase, value: 5000, suffix: '万', prefix: '', label: '管理项目资金规模' },
    { icon: Users, value: 200, suffix: '+', label: '项目团队成员' },
    { icon: Award, value: 15, suffix: '+', label: '荣誉奖项' },
  ];

  const skills = [
    '项目管理',
    'PMO体系建设',
    '敏捷方法论',
    '风险管理',
    '团队领导力',
    '战略规划',
  ];

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
              className="text-center max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="mb-6">
                资深项目管理专家
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-ink mb-6 leading-tight">
                推动项目成功的
                <br />
                <span className="text-accent">战略思维与执行力量</span>
              </h1>
              <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
                拥有7年+大型项目管理经验，专注于政府数字化转型、医疗信息化、智能制造等领域。
                擅长将复杂业务需求转化为可落地的项目计划，带领团队高效交付。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/projects">查看项目作品集</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">联系我</Link>
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-bg2">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon size={28} className="text-accent" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-ink mb-2">
                    <CountUp end={stat.value} />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle subtitle="专业技能" title="核心能力" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 rounded-full bg-bg2 text-ink font-medium hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-bg2">
        <Container>
          <SectionTitle subtitle="精选案例" title="代表项目" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-shadow overflow-hidden">
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
                      <Button variant="ghost" size="sm" className="p-0 h-auto group/btn">
                        <span>了解更多</span>
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
                准备好开启下一个成功项目了吗？
              </h2>
              <p className="text-muted mb-8">
                无论您需要项目管理咨询、PMO体系建设，还是敏捷转型支持，我都可以提供专业的帮助。
              </p>
              <Button asChild size="lg">
                <Link href="/contact">开始合作</Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
