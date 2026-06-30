'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  Zap,
  BarChart3,
  ChevronDown,
  FileText,
  AlertTriangle,
  RotateCcw,
  Calendar,
  ArrowLeftRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import type { Methodology } from '@/types';

interface MethodologyPageClientProps {
  methodology: Methodology | null;
}

const overviewCards = [
  {
    icon: Layers,
    title: 'PMO体系',
    description: '从0到1搭建PMO管理体系的完整框架',
    items: ['组织架构', '角色定义', '流程规范', '度量体系'],
  },
  {
    icon: Zap,
    title: '敏捷实践',
    description: '适合中国团队的务实敏捷转型路径',
    items: ['Scrum/Kanban混合', '迭代节奏', '回顾机制', '持续改进'],
  },
  {
    icon: BarChart3,
    title: '数据驱动',
    description: '用数据替代直觉的管理决策方法',
    items: ['指标体系', '仪表板', '预警机制', '复盘分析'],
  },
];

const processItems = [
  {
    id: '01',
    title: '项目管理规范',
    content:
      '项目全生命周期流程定义，从立项到结项的标准化操作。包含项目启动会标准议程、阶段评审机制、变更控制流程、风险登记册模板、结项复盘流程等，确保每个项目都有章可循。',
  },
  {
    id: '02',
    title: '研发流程规范',
    content:
      '需求评审、技术方案、代码审查、测试验收的协作标准。建立需求→设计→开发→测试→上线的完整流水线，定义各阶段的准入准出标准，以及跨团队协作的接口规范。',
  },
  {
    id: '03',
    title: '绩效评价体系',
    content:
      '基于OKR+KPI的混合绩效评估，量化团队产出质量。OKR对齐战略目标，KPI衡量日常产出，360度反馈补充行为评估，季度评审与年度评估结合，确保公平公正。',
  },
  {
    id: '04',
    title: '知识库与模板库',
    content:
      '项目文档标准化模板、复盘模板、交接清单的可复用沉淀。建立组织级知识库，分类管理项目文档、技术方案、管理模板，减少重复造轮子，提升新人上手速度。',
  },
];

const toolchain = {
  left: {
    title: 'JIRA',
    description: '敏捷项目管理',
    features: ['需求管理', '任务跟踪', '迭代规划', '缺陷管理'],
  },
  middle: {
    title: '数据中间层',
    description: 'API 集成 & 数据处理',
    features: ['数据同步', '指标计算', '报表生成', '预警通知'],
  },
  right: {
    title: '飞书',
    description: '办公协作平台',
    features: ['即时沟通', '文档协作', '多维表格', '审批流程'],
  },
};

const templates = [
  {
    icon: FileText,
    title: '项目启动会模板',
    description: '标准项目启动会议程与资料清单',
  },
  {
    icon: AlertTriangle,
    title: '风险登记册模板',
    description: '项目风险识别、评估、跟踪模板',
  },
  {
    icon: RotateCcw,
    title: '项目复盘模板',
    description: '敏捷回顾与项目结项复盘模板',
  },
  {
    icon: Calendar,
    title: '周报月报模板',
    description: '项目进度周报、月报标准化模板',
  },
];

function ProcessItem({
  item,
  isExpanded,
  onToggle,
}: {
  item: (typeof processItems)[0];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="bg-surface border border-rule rounded-lg px-6 py-4"
    >
      <motion.button
        layout
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-accent/30 w-12">
            {item.id}
          </span>
          <span className="text-lg font-semibold text-ink">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-4 mt-4 border-t border-rule text-muted leading-relaxed">
          {item.content}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ToolchainCard({
  data,
  variant = 'default',
  index,
}: {
  data: {
    title: string;
    description: string;
    features: string[];
  };
  variant?: 'default' | 'highlight';
  index: number;
}) {
  const isHighlight = variant === 'highlight';

  return (
    <ScrollReveal delay={index * 0.15}>
      <div
        className={`rounded-xl p-6 text-center ${
          isHighlight
            ? 'bg-accent/10 border-2 border-accent/30'
            : 'bg-surface border border-rule'
        }`}
      >
        <h3 className="text-xl font-bold text-ink mb-2">{data.title}</h3>
        <p className="text-sm text-muted mb-4">{data.description}</p>
        <div className="flex flex-col gap-2">
          {data.features.map((feature) => (
            <div key={feature} className="text-sm text-ink">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

function TemplateCard({
  template,
  index,
}: {
  template: (typeof templates)[0];
  index: number;
}) {
  const Icon = template.icon;

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.3 }}
        className="bg-surface border border-rule rounded-xl p-6 h-full flex flex-col"
      >
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
          <Icon size={20} className="text-accent" />
        </div>
        <h3 className="text-base font-semibold text-ink mb-2">
          {template.title}
        </h3>
        <p className="text-sm text-muted mb-4 flex-1">{template.description}</p>
        <button className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
          查看详情 <span>→</span>
        </button>
      </motion.div>
    </ScrollReveal>
  );
}

export default function MethodologyPageClient({
  methodology,
}: MethodologyPageClientProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['01']);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 1. PageHeader */}
      <section className="pt-32 pb-16 bg-bg">
        <Container>
          <ScrollReveal>
            <h1 className="text-4xl font-bold text-center mb-4 text-ink">
              管理方法论
            </h1>
            <p className="text-lg text-muted text-center max-w-2xl mx-auto">
              经过7年跨行业实践打磨的管理体系与工具方法论
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2. MethodologyOverview */}
      <section className="py-16 bg-bg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {overviewCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.title} delay={index * 0.1}>
                  <div className="bg-surface border border-rule rounded-xl p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-3">
                      {card.title}
                    </h3>
                    <p className="text-muted mb-4">{card.description}</p>
                    <div className="flex flex-col gap-2">
                      {card.items.map((item) => (
                        <div
                          key={item}
                          className="flex gap-2 text-sm text-ink"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. ProcessList */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-ink">
              制度规范
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {processItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.05}>
                <ProcessItem
                  item={item}
                  isExpanded={expandedItems.includes(item.id)}
                  onToggle={() => toggleItem(item.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. ToolchainDiagram */}
      <section className="py-16 bg-bg">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4 text-ink">
              工具链架构
            </h2>
            <p className="text-muted text-center mb-12">
              数据驱动的管理工具栈，打通项目全链路数据
            </p>
          </ScrollReveal>

          {/* Desktop: 横向布局 */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <div className="flex-1 max-w-xs">
              <ToolchainCard data={toolchain.left} index={0} />
            </div>

            <div className="flex-shrink-0">
              <ArrowLeftRight
                size={48}
                className="text-accent"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex-1 max-w-xs">
              <ToolchainCard data={toolchain.middle} variant="highlight" index={1} />
            </div>

            <div className="flex-shrink-0">
              <ArrowLeftRight
                size={48}
                className="text-accent"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex-1 max-w-xs">
              <ToolchainCard data={toolchain.right} index={2} />
            </div>
          </div>

          {/* Mobile: 纵向布局 */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <div className="w-full max-w-xs">
              <ToolchainCard data={toolchain.left} index={0} />
            </div>

            <div className="text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>

            <div className="w-full max-w-xs">
              <ToolchainCard data={toolchain.middle} variant="highlight" index={1} />
            </div>

            <div className="text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>

            <div className="w-full max-w-xs">
              <ToolchainCard data={toolchain.right} index={2} />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. TemplateDownloads */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4 text-ink">
              管理模板
            </h2>
            <p className="text-muted text-center mb-12">
              精选项目管理模板，开箱即用
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <TemplateCard
                key={template.title}
                template={template}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
