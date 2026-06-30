'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  BarChart3,
  Users,
  Zap,
  Target,
  Award,
  Lightbulb,
  MapPin,
  Mail,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { cn } from '@/lib/utils';

const philosophies = [
  {
    id: 'system',
    icon: Shield,
    title: '体系先行',
    summary: '没有流程规范的项目管理是救火，建立体系是规模化交付的前提',
    detail:
      '在瀚华融资担保期间，我从0到1搭建了完整的PMO体系，包括《项目管理规范》《研发流程规范》《绩效评价体系》《知识库与模板库规范》四大制度，支撑了20+人的产研团队高效运转。',
  },
  {
    id: 'data',
    icon: BarChart3,
    title: '数据驱动',
    summary: '用指标说话，让项目状态透明化，用数据支撑决策而非经验直觉',
    detail:
      '设计并落地数据驱动的管理工具链，整合JIRA、飞书等平台，通过自动化报表实时展示项目进度、风险、资源分布，让管理层决策有据可依。',
  },
  {
    id: 'people',
    icon: Users,
    title: '人即核心',
    summary: '流程是骨架，团队是血液。再完美的流程也需要合适的人来执行',
    detail:
      '从0到1搭建过23人的测试团队、280+人的数据标注团队，深谙团队搭建、培训、激励之道，相信优秀的团队是项目成功的根本保障。',
  },
  {
    id: 'agile',
    icon: Zap,
    title: '敏捷务实',
    summary: '不追求完美的敏捷，追求适合团队当前阶段的实践组合',
    detail:
      '主导过多个传统团队的敏捷转型，从Scrum到Kanban，从两周迭代到持续交付，始终根据团队特点和业务需求选择最合适的敏捷实践，而非盲目跟风。',
  },
  {
    id: 'value',
    icon: Target,
    title: '价值导向',
    summary: '项目管理的终极目标不是按时交付，而是交付真正的业务价值',
    detail:
      '始终以业务价值为导向，在项目启动阶段就明确成功标准，在执行过程中持续对齐业务目标，确保每个项目都能带来实实在在的价值。',
  },
];

const pyramidLayers = [
  {
    level: '战略层',
    width: 'w-1/3',
    bgClass: 'bg-accent',
    textClass: 'text-white',
    rounded: 'rounded-t-lg',
    items: ['项目组合管理', 'PMO体系搭建', '战略规划'],
  },
  {
    level: '战术层',
    width: 'w-2/3',
    bgClass: 'bg-accent/70',
    textClass: 'text-white',
    rounded: '',
    items: ['敏捷转型', '需求管理', '风险控制', '跨部门协调'],
  },
  {
    level: '执行层',
    width: 'w-full',
    bgClass: 'bg-accent/40',
    textClass: 'text-ink',
    rounded: 'rounded-b-lg',
    items: ['JIRA', '飞书', 'Confluence', '项目管理', '团队搭建', '技术培训'],
  },
];

const certifications = [
  {
    name: 'PMP',
    detail: '项目管理专业人士认证',
    icon: Award,
  },
  {
    name: 'NPDP',
    detail: '新产品开发专业人士认证',
    icon: Lightbulb,
  },
];

const toolCategories = [
  {
    title: '项目管理工具',
    tools: [
      { name: 'JIRA', desc: '敏捷项目管理' },
      { name: 'Confluence', desc: '知识管理' },
      { name: 'Microsoft Project', desc: '进度计划' },
      { name: '禅道', desc: '研发管理' },
    ],
  },
  {
    title: '数据分析工具',
    tools: [
      { name: 'Excel/Google Sheets', desc: '数据处理' },
      { name: 'Tableau/Power BI', desc: '数据可视化' },
      { name: 'SQL', desc: '数据查询' },
      { name: 'Python', desc: '脚本处理' },
    ],
  },
  {
    title: '协作沟通工具',
    tools: [
      { name: '飞书', desc: '办公协作' },
      { name: '钉钉', desc: '组织沟通' },
      { name: '企业微信', desc: '客户对接' },
      { name: 'Zoom', desc: '远程会议' },
    ],
  },
  {
    title: '文档与设计',
    tools: [
      { name: 'Markdown', desc: '技术文档' },
      { name: 'Figma', desc: 'UI设计' },
      { name: 'XMind', desc: '思维导图' },
      { name: 'Mermaid', desc: '图表绘制' },
    ],
  },
];

function PhilosophyCard({ item, index }: { item: (typeof philosophies)[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-surface rounded-xl p-6 border border-rule hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
        <Icon size={24} className="text-accent" />
      </div>
      <h3 className="text-lg font-semibold text-ink mt-4">{item.title}</h3>
      <p className="text-sm text-muted mt-2 leading-relaxed">{item.summary}</p>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-4 text-sm text-muted leading-relaxed border-t border-rule mt-4">
          {item.detail}
        </div>
      </motion.div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-accent mt-4 hover:gap-2 transition-all"
      >
        {isExpanded ? (
          <>
            收起 <ChevronUp size={16} />
          </>
        ) : (
          <>
            了解更多 <ChevronDown size={16} />
          </>
        )}
      </button>
    </motion.div>
  );
}

function PyramidLayer({
  layer,
  index,
  hoveredLayer,
  setHoveredLayer,
}: {
  layer: (typeof pyramidLayers)[0];
  index: number;
  hoveredLayer: number | null;
  setHoveredLayer: (i: number | null) => void;
}) {
  const isHovered = hoveredLayer === index;
  const otherHovered = hoveredLayer !== null && hoveredLayer !== index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={cn(
        layer.width,
        layer.bgClass,
        layer.textClass,
        layer.rounded,
        'py-4 px-6 cursor-pointer transition-opacity duration-300',
        isHovered && 'opacity-100',
        otherHovered && 'opacity-60'
      )}
      onMouseEnter={() => setHoveredLayer(index)}
      onMouseLeave={() => setHoveredLayer(null)}
    >
      <div className="text-center">
        <div className="font-bold mb-1">{layer.level}</div>
        <div className="text-sm flex flex-wrap justify-center gap-x-3 gap-y-1">
          {layer.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPageClient() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 1. PageHeader */}
      <section className="pt-32 pb-16 bg-bg">
        <Container>
          <ScrollReveal>
            <h1 className="text-4xl font-bold text-center mb-4 text-ink">关于我</h1>
            <p className="text-lg text-muted text-center max-w-2xl mx-auto">
              7年跨行业项目管理经验，从技术到管理的成长之路
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* 2. ProfileSection */}
      <section className="py-16 bg-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ScrollReveal className="lg:col-span-1">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-48 h-48 rounded-full border-4 border-accent/20 overflow-hidden bg-bg2 flex items-center justify-center">
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20male%20project%20manager%20portrait%20business%20suit%20confident%20friendly%20smile%20studio%20headshot&image_size=square_hd"
                    alt="涂奎头像"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mt-6 text-ink">涂奎</h2>
                <p className="text-muted mt-1">产品项目经理 / PMO负责人</p>
                <div className="text-sm text-muted mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>重庆</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>1634099882@qq.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>7年+ 项目管理经验</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-2" delay={0.1}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-ink">个人简介</h3>
                <div className="leading-relaxed space-y-4 text-ink">
                  <p>
                    拥有<span className="font-bold text-accent">7年项目管理经验</span>，横跨互联网、金融、政务、医疗、制造五大行业，
                    具备丰富的跨行业项目管理能力和全局视野。
                  </p>
                  <p>
                    擅长<span className="font-bold">从0到1搭建PMO体系</span>，推动敏捷转型，打造数据驱动的管理文化。
                    在瀚华融资担保、中国电信等企业主导过PMO体系建设与组织级项目管理能力提升。
                  </p>
                  <p>
                    累计<span className="font-bold text-accent">管理资金规模超5000万</span>，
                    <span className="font-bold text-accent">峰值团队800+人</span>，
                    <span className="font-bold text-accent">交付项目33+</span>。
                    从技术团队到管理岗位，深知产研团队的痛点与需求。
                  </p>
                  <p>
                    持有<span className="font-bold">PMP、NPDP双认证</span>，持续深耕项目管理领域，
                    致力于帮助更多企业提升组织级项目管理能力，实现业务价值最大化。
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 3. PhilosophySection */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-ink">管理理念</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophies.map((item, index) => (
              <PhilosophyCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. AbilityPyramid */}
      <section className="py-16 bg-bg">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-4 text-ink">能力金字塔</h2>
            <p className="text-muted text-center mb-12">战略层 → 战术层 → 执行层</p>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-0.5">
            {pyramidLayers.map((layer, index) => (
              <PyramidLayer
                key={layer.level}
                layer={layer}
                index={index}
                hoveredLayer={hoveredLayer}
                setHoveredLayer={setHoveredLayer}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Certifications */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-ink">专业认证</h2>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-40 h-52 bg-surface border-2 border-rule rounded-2xl p-6 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon size={32} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mt-4 text-ink">{cert.name}</h3>
                  <p className="text-xs text-muted font-mono mt-2">{cert.detail}</p>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs mt-3">
                    已认证
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6. UsesList */}
      <section className="py-16 bg-bg">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 text-ink">常用工具</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {toolCategories.map((category, catIndex) => (
              <ScrollReveal key={category.title} delay={catIndex * 0.1}>
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-l-4 border-accent pl-3 text-ink">
                    {category.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {category.tools.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        <div>
                          <span className="text-base text-ink font-medium">{tool.name}</span>
                          <span className="text-sm text-muted ml-2">{tool.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
