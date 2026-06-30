'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import type { Experience } from '@/types';

interface ExperienceDetail {
  industry: string;
  industryLabel: string;
  responsibilities: string[];
  achievements: string[];
  turningPoints: string[];
  tools: string[];
}

const experienceDetails: Record<string, ExperienceDetail> = {
  '中国电信重庆分公司（万友）': {
    industry: 'government',
    industryLabel: '政务医疗',
    responsibilities: [
      '负责政务、公卫医疗领域项目，涵盖从商机获取到验收的全周期项目管理',
      '主导需求对接、建设方案编制、项目造价、技术评估、招投标技术方案',
      '统筹管理上下游供应商与自研团队，全流程管控项目交付',
    ],
    achievements: [
      '管理国家疾控中心项目组合，总资金规模超2000w',
      '同时管理AI+政务、数据治理、平台迁移三大子项目',
      '构建PMO体系规范，提升多项目协同效率',
    ],
    turningPoints: [
      '从纯互联网金融领域转向政务医疗领域，快速学习行业知识',
      '从单一项目管理升级为项目组合管理，管理多个子项目并行',
    ],
    tools: [
      '项目管理: 瀑布式+敏捷混合',
      '工具: 飞书、JIRA、钉钉',
      '方法论: PMBOK、项目组合管理',
    ],
  },
  '瀚华融资担保股份有限公司': {
    industry: 'finance',
    industryLabel: '金融',
    responsibilities: [
      '金融领域PMO体系搭建、敏捷转型落地与产研团队管理',
      '统筹业务组、数据中台组（20人）团队管理',
      '制定项目管理相关制度规范',
    ],
    achievements: [
      '从0到1搭建完整PMO体系，四大制度规范落地',
      '推动传统团队敏捷转型，交付效率提升40%',
      '设计并落地数据驱动的管理工具链',
    ],
    turningPoints: [
      '从执行层上升到管理层，开始搭建体系',
      '从技术背景转向纯管理岗位',
    ],
    tools: [
      '项目管理: Scrum + Kanban 混合敏捷',
      '工具: JIRA、飞书、Confluence',
      '方法论: PMO体系建设、敏捷转型',
    ],
  },
  '北京三维天地科技股份有限公司重庆分公司': {
    industry: 'manufacturing',
    industryLabel: '制造业',
    responsibilities: [
      '传统制造业主数据治理项目管理',
      '统筹主数据治理及系统实施项目管理工作',
      '管理现场实施团队、对接远程研发团队',
    ],
    achievements: [
      '项目金额480w，如期初验并延展至二期',
      '建立主数据管理体系，数据质量提升60%',
      '协调多方资源，确保项目按计划交付',
    ],
    turningPoints: [
      '从互联网行业切入传统制造业',
      '学习主数据治理领域知识，成为行业专家',
    ],
    tools: [
      '项目管理: 瀑布式',
      '工具: Microsoft Project、禅道',
      '方法论: 主数据治理、实施方法论',
    ],
  },
  '北京字节跳动科技有限公司（人瑞）': {
    industry: 'internet',
    industryLabel: '互联网',
    responsibilities: [
      '互联网行业AI数据标注项目管理及数据分析工作',
      '对接AI算法、语言专家，制定标注规则、培训方案',
      '兼任数据BP，设计业务线绩效体系',
    ],
    achievements: [
      '成功交付项目数33个，并行管理项目数6个',
      '最大执行成员800+人，峰值团队管理',
      '设计280+人业务线绩效体系，人员效率提升30%',
    ],
    turningPoints: [
      '从测试技术转向项目管理',
      '管理大规模团队，锻炼组织能力',
    ],
    tools: [
      '项目管理: 敏捷迭代',
      '工具: 飞书、自研平台、Excel',
      '方法论: 数据BP、绩效管理',
    ],
  },
  '北京湛腾世纪科技有限公司': {
    industry: 'internet',
    industryLabel: '互联网/运营商',
    responsibilities: [
      '测试团队0-1搭建、管理以及测试项目管理',
      '从0到1搭建重庆分部测试团队',
      '统筹全球性外场测试项目端到端交付',
    ],
    achievements: [
      '完成23人团队招聘及技术培训',
      '参与运营商前沿技术验证（VoLTE/NSA首轮场测）',
      '测试流程规范化，缺陷逃逸率下降50%',
    ],
    turningPoints: [
      '从纯技术岗开始带团队，迈向管理之路',
      '建立对通信行业的深入理解',
    ],
    tools: [
      '项目管理: 瀑布式测试管理',
      '工具: JIRA、TestLink、Qlik',
      '方法论: 软件测试体系、团队搭建',
    ],
  },
};

const careerPathNodes = [
  { company: '湛腾世纪', duration: '2018-2020', badge: '23人团队', isCurrent: false },
  { company: '字节跳动', duration: '2020-2021', badge: '800+人', isCurrent: false },
  { company: '三维天地', duration: '2021-2023', badge: '480w项目', isCurrent: false },
  { company: '瀚华融资', duration: '2022-2024', badge: '20人团队', isCurrent: false },
  { company: '中国电信', duration: '2024-至今', badge: '2000w+', isCurrent: true },
];

const industryFilters = [
  { id: 'all', label: '全部' },
  { id: 'internet', label: '互联网' },
  { id: 'finance', label: '金融' },
  { id: 'government', label: '政务医疗' },
  { id: 'manufacturing', label: '制造业' },
];

interface ExperiencePageClientProps {
  experience: Experience | null;
}

export default function ExperiencePageClient({ experience }: ExperiencePageClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const items = experience?.items || [];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    const detail = experienceDetails[item.company];
    return detail?.industry === activeFilter;
  });

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setExpandedIndex(null);
  };

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-center mb-4">工作经历</h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto">
            7年跨行业项目管理经验，从技术到管理的成长之路
          </p>
        </ScrollReveal>
      </section>

      <section className="py-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12">成长路径</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-x-auto pb-4">
              <div className="relative min-w-[600px] max-w-5xl mx-auto">
                <div
                  className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] z-0"
                  style={{ backgroundColor: 'var(--rule)' }}
                />

                <div className="relative flex justify-between items-center z-10">
                  {careerPathNodes.map((node, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[120px]">
                      <div
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          node.isCurrent ? 'ring-4' : ''
                        }`}
                        style={{
                          backgroundColor: node.isCurrent ? 'var(--accent)' : 'var(--muted)',
                          boxShadow: node.isCurrent ? '0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)' : 'none',
                        }}
                      />
                      <p className="mt-3 text-sm font-medium text-center max-w-[100px]">
                        {node.company}
                      </p>
                      <p className="mt-1 text-xs text-muted font-mono">{node.duration}</p>
                      <span
                        className="mt-2 px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                          color: 'var(--accent)',
                        }}
                      >
                        {node.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2">
              {industryFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'text-white'
                      : 'hover:text-accent'
                  }`}
                  style={{
                    backgroundColor:
                      activeFilter === filter.id
                        ? 'var(--accent)'
                        : 'var(--bg2)',
                    color:
                      activeFilter === filter.id
                        ? 'white'
                        : 'var(--muted)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== filter.id) {
                      e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 10%, transparent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== filter.id) {
                      e.currentTarget.style.backgroundColor = 'var(--bg2)';
                      e.currentTarget.style.color = 'var(--muted)';
                    }
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="absolute left-4 md:left-6 top-0 bottom-0 w-[2px]"
              style={{ backgroundColor: 'var(--rule)' }}
            />

            <div className="space-y-8">
              {filteredItems.map((item, index) => {
                const detail = experienceDetails[item.company];
                const isExpanded = expandedIndex === index;

                return (
                  <ScrollReveal key={item.company} delay={index * 0.1}>
                    <div className="relative pl-12 md:pl-16">
                      <div
                        className="absolute left-4 md:left-6 top-1 -translate-x-1/2 w-4 h-4 rounded-full ring-4 z-10"
                        style={{
                          backgroundColor: 'var(--accent)',
                          boxShadow: '0 0 0 4px var(--bg)',
                        }}
                      />

                      <div
                        className="p-6 rounded-xl border transition-all"
                        style={{
                          backgroundColor: 'var(--surface)',
                          borderColor: 'var(--rule)',
                        }}
                      >
                        <h3 className="text-xl font-bold">{item.company}</h3>
                        <p className="text-sm text-muted mt-1">
                          {item.role} · {item.duration}
                        </p>
                        {detail && (
                          <span
                            className="mt-2 inline-flex px-2 py-0.5 rounded text-xs"
                            style={{ backgroundColor: 'var(--bg2)' }}
                          >
                            {detail.industryLabel}
                          </span>
                        )}

                        <button
                          onClick={() => handleToggleExpand(index)}
                          className="mt-3 text-sm flex items-center gap-1 transition-colors"
                          style={{ color: 'var(--accent)' }}
                        >
                          <span>{isExpanded ? '收起详情' : '查看详情'}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && detail && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div
                                className="mt-4 pt-4"
                                style={{ borderTop: '1px solid var(--rule)' }}
                              >
                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2">
                                    职责描述
                                  </h4>
                                  <ul className="space-y-2">
                                    {detail.responsibilities.map((resp, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        />
                                        <span className="text-sm">{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2 mt-4">
                                    核心成果
                                  </h4>
                                  <ul className="space-y-2">
                                    {detail.achievements.map((ach, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        />
                                        <span className="text-sm">{ach}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2 mt-4">
                                    关键转折
                                  </h4>
                                  <ul className="space-y-2">
                                    {detail.turningPoints.map((tp, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        />
                                        <span className="text-sm">{tp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-2 mt-4">
                                    工具方法论
                                  </h4>
                                  <ul className="space-y-2">
                                    {detail.tools.map((tool, idx) => (
                                      <li key={idx} className="flex gap-2">
                                        <span
                                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                          style={{ backgroundColor: 'var(--accent)' }}
                                        />
                                        <span className="text-sm">{tool}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
