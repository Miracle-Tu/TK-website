'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Globe, Heart, Star, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPageClient() {
  const skills = [
    { name: '项目管理', level: 95 },
    { name: 'PMO体系建设', level: 90 },
    { name: '敏捷方法论', level: 85 },
    { name: '风险管理', level: 88 },
    { name: '团队领导力', level: 92 },
    { name: '战略规划', level: 80 },
  ];

  const certifications = [
    { name: 'PMP', issuer: 'PMI', year: '2020' },
    { name: 'ACP', issuer: 'PMI', year: '2021' },
    { name: 'PRINCE2', issuer: 'AXELOS', year: '2022' },
    { name: 'CSP', issuer: 'Scrum Alliance', year: '2023' },
  ];

  const values = [
    { icon: Target, title: '目标导向', description: '以结果为导向，确保项目交付超越预期' },
    { icon: Heart, title: '责任心', description: '对项目成功负责，勇于承担挑战' },
    { icon: Star, title: '追求卓越', description: '持续改进，精益求精' },
    { icon: Globe, title: '全局视野', description: '从战略高度思考问题' },
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
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl" />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-bg2">
                    <img
                      src="https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20asian%20project%20manager%20portrait%20business%20attire%20confident%20smile%20modern%20office%20background&image_size=square"
                      alt="头像"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <Badge className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  7年+项目管理经验
                </Badge>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                  关于我
                </h1>
                <p className="text-muted mb-6 leading-relaxed">
                  我是一名资深项目管理专家，拥有7年以上大型项目管理经验。曾在多家知名企业担任项目经理、PMO负责人等职位，
                  主导过多个千万级项目的规划、执行和交付。
                </p>
                <p className="text-muted mb-8 leading-relaxed">
                  我的核心竞争力在于能够将复杂的业务需求转化为清晰的项目计划，并带领团队高效执行。
                  同时，我也致力于推动组织级项目管理能力的提升，帮助企业建立完善的PMO体系。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">PMP认证</Badge>
                  <Badge variant="outline">敏捷专家</Badge>
                  <Badge variant="outline">PMO建设</Badge>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-bg2">
        <Container>
          <SectionTitle subtitle="专业能力" title="核心技能" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6"
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-ink">{skill.name}</span>
                    <span className="text-accent font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-bg2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionTitle subtitle="专业认证" title="资质荣誉" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center p-6">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <Award size={32} className="text-accent" />
                      </div>
                      <h3 className="font-bold text-ink text-lg mb-1">{cert.name}</h3>
                      <p className="text-sm text-muted mb-1">{cert.issuer}</p>
                      <p className="text-xs text-accent">{cert.year}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-20 bg-bg2">
        <Container>
          <SectionTitle subtitle="工作理念" title="核心价值观" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                        <value.icon size={24} className="text-accent" />
                      </div>
                      <h3 className="font-semibold text-ink mb-2">{value.title}</h3>
                      <p className="text-sm text-muted">{value.description}</p>
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
          <SectionTitle subtitle="持续学习" title="教育背景" />
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <BookOpen size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">项目管理专业硕士</h3>
                      <p className="text-sm text-muted">清华大学</p>
                    </div>
                  </div>
                  <p className="text-muted text-sm">
                    专注于项目管理理论与实践研究，系统学习了项目管理知识体系、敏捷方法论、风险管理等课程。
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Globe size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">管理学学士</h3>
                      <p className="text-sm text-muted">北京大学</p>
                    </div>
                  </div>
                  <p className="text-muted text-sm">
                    主修管理学原理、组织行为学、运筹学等课程，为项目管理实践奠定了扎实的理论基础。
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
