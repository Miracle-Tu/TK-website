'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CountUp } from '@/components/shared/count-up';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { SectionTitle } from '@/components/shared/section-title';
import Link from 'next/link';
import type { ProjectFrontmatter, PostFrontmatter } from '@/types';

interface HomePageClientProps {
  featuredProjects: ProjectFrontmatter[];
  latestPosts: (PostFrontmatter & { readingTime: number })[];
}

export default function HomePageClient({ featuredProjects, latestPosts }: HomePageClientProps) {
  const metrics = [
    { value: 5000, suffix: '万+', label: '累计管理资金' },
    { value: 33, suffix: '+', label: '交付项目数' },
    { value: 800, suffix: '+', label: '峰值团队规模' },
    { value: 5, suffix: '', label: '跨行业数' },
    { value: 2, suffix: '', label: '专业认证' },
  ];

  const strategicSkills = ['PMO体系搭建', '项目组合管理', '战略规划', '组织架构设计'];
  const tacticalSkills = ['敏捷转型', '需求管理', '风险控制', '跨部门协调', '数据驱动决策'];
  const executionSkills = ['JIRA', '飞书', 'Confluence', '项目管理', '团队搭建', '技术培训'];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}.${month}.${day}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden"
        style={{
          backgroundColor: 'var(--ink)',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,119,46,0.15), transparent)',
        }}
      >
        <div className="section-container relative z-10 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent/30 text-accent font-mono text-xs mb-6">
              资深项目管理专家
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight text-balance">
              7年跨行业项目管理经验
              <br />
              从战略到执行的全链路赋能
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              专注于政府数字化转型、金融科技、智能制造等领域的大型项目管理。
              擅长从0到1搭建PMO体系，用数据驱动决策，带领团队高效交付有价值的成果。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium transition-all hover:bg-accent/90 hover:-translate-y-0.5"
              >
                查看项目集
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                联系我
                <Mail size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 底部社交链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
        >
          <a
            href="mailto:1634099882@qq.com"
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </motion.div>
      </section>

      {/* ImpactBoard Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg">
        <div className="section-container">
          <SectionTitle title="影响力数据" subtitle="7年跨行业项目管理的量化成果" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {metrics.map((metric, index) => (
              <ScrollReveal key={metric.label} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="bg-surface border border-rule rounded-xl p-6 text-center h-full cursor-default hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl font-bold text-accent mb-2">
                    <CountUp end={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-sm text-muted">{metric.label}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LatestUpdates Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg2">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* 精选项目 */}
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-bold text-ink mb-6">精选项目</h2>
                <div className="space-y-6">
                  {featuredProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="block group"
                    >
                      <div className="bg-surface border border-rule rounded-xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 rounded bg-white/90 text-ink text-xs font-medium">
                              {project.industry}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-lg text-ink mb-2 group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted line-clamp-2 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded bg-bg2 text-xs text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 最新文章 */}
            <ScrollReveal delay={0.15}>
              <div>
                <h2 className="text-2xl font-bold text-ink mb-6">最新文章</h2>
                <div className="bg-surface border border-rule rounded-xl p-6">
                  <div className="divide-y divide-rule">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block py-4 first:pt-0 last:pb-0 group"
                      >
                        <div className="flex gap-4">
                          <div className="text-xs text-muted font-mono w-16 flex-shrink-0 pt-0.5">
                            {formatDate(post.date)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-ink group-hover:text-accent transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted mt-1 line-clamp-1">
                              {post.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SkillTags Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg">
        <div className="section-container">
          <SectionTitle
            title="核心能力"
            subtitle="战略层 · 战术层 · 执行层的项目管理能力体系"
          />

          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {/* 战略层 - 较深色 */}
              {strategicSkills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-ink/10 border border-ink/20 text-ink cursor-default transition-colors hover:bg-accent/10 hover:border-accent/30 hover:text-accent"
                >
                  {skill}
                </motion.span>
              ))}

              {/* 战术层 - 中色 */}
              {tacticalSkills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-bg2 border border-rule text-ink cursor-default transition-colors hover:bg-accent/10 hover:border-accent/30 hover:text-accent"
                >
                  {skill}
                </motion.span>
              ))}

              {/* 执行层 - 浅色 */}
              {executionSkills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-surface border border-rule text-muted cursor-default transition-colors hover:bg-accent/10 hover:border-accent/30 hover:text-accent"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-bg2">
        <div className="section-container">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-6">
                准备好开启下一个成功项目了吗？
              </h2>
              <p className="text-lg text-muted mb-8">
                无论您需要项目管理咨询、PMO体系建设，还是敏捷转型支持，我都可以提供专业的帮助。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-white font-medium transition-all hover:bg-accent/90 hover:-translate-y-0.5"
              >
                开始合作
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
