# 涂奎个人网站 - 产品需求文档 (PRD)

## Overview
- **Summary**: 本项目旨在依照设计文档规范，完成涂奎个人网站的剩余开发工作。网站是一个展示个人专业形象、项目经验、管理方法论和博客文章的静态站点，使用 Next.js 14 + TypeScript + Tailwind CSS + MDX 技术栈构建。
- **Purpose**: 通过完善网站的功能和视觉设计，准确传达涂奎作为产品项目经理的专业形象，展示其7年跨行业项目管理经验和PMO体系建设能力，为潜在客户和合作伙伴提供了解渠道。
- **Target Users**: 潜在商务合作伙伴、招聘方、行业同行、对项目管理感兴趣的读者。

## Goals
- 完成所有页面功能开发，符合设计文档的视觉和交互规范
- 重构内容数据结构，与设计文档定义的 MDX Schema 保持一致
- 完善核心交互功能：时间线展开、筛选器、目录导航、搜索等
- 完善 SEO 配置：sitemap、robots、JSON-LD 结构化数据
- 确保暗色模式和响应式设计在所有页面正常工作
- 确保代码质量和类型安全

## Non-Goals (Out of Scope)
- 不引入 CMS 系统（继续使用 MDX + Git 管理内容）
- 不添加用户系统或评论功能
- 不添加后端数据库
- 不重构为其他技术栈
- 不添加 Umami / Vercel Analytics 统计（可选后续添加）

## Background & Context
当前项目已搭建基础框架，实现了所有页面路由和基础 UI，但与设计文档相比存在以下主要差距：

1. **首页**: Hero 区域样式与设计不符（应为深色背景），影响力看板为4个指标而非5个，缺少最新动态区块
2. **关于我**: 缺少管理理念可展开卡片、能力金字塔可视化、工具清单
3. **工作经历**: 缺少成长路径横向时间线、缺少可展开的详细时间线、缺少行业筛选器
4. **项目作品集**: 筛选分类与设计不符，项目详情页缺少 MDX 渲染和正确的内容结构
5. **管理方法论**: 页面结构与设计差异大，缺少制度规范可展开列表、工具链架构图等
6. **博客**: 缺少搜索功能，文章详情页缺少 MDX 渲染、目录导航(TOC)
7. **联系方式**: 主题字段应为下拉选择而非输入框
8. **内容层**: 数据结构与设计文档定义的 Schema 不匹配
9. **SEO**: 缺少 sitemap、robots.txt、JSON-LD 结构化数据
10. **错误处理**: 缺少 loading.tsx、error.tsx、not-found.tsx

## Functional Requirements

### FR-1: 首页完善
- Hero 区域改为深色背景（var(--ink)），含渐变装饰和正确文案
- 影响力看板改为5个指标卡片（累计管理资金、交付项目数、峰值团队规模、跨行业数、专业认证）
- 添加"最新动态"区块：精选项目 + 最新文章混合展示
- 核心能力标签按战略层/战术层/执行层分组

### FR-2: 关于我页面完善
- 个人简介区域：头像 + 基本信息 + 个人简介文案
- 管理理念：5条可展开卡片（体系先行、数据驱动、人即核心、敏捷务实、价值导向）
- 能力金字塔：三层可视化（战略层、战术层、执行层），悬停交互
- 资质认证：PMP + NPDP 双认证徽章展示
- 工具清单：按项目管理、数据分析、协作沟通分类

### FR-3: 工作经历页面完善
- 成长路径横向时间线：5个节点（湛腾世纪→字节跳动→三维天地→瀚华融资→中国电信）
- 详细纵向时间线：每条经历可展开，展示职责描述、核心成果、关键转折、工具方法论
- 行业筛选器：全部、互联网、金融、政务医疗、制造业
- 手风琴效果：同一时间仅一条展开

### FR-4: 项目作品集页面完善
- 筛选器分类与设计一致：全部、AI+政务、PMO体系建设、数据治理、金融创新、规模化交付、总集管理
- 重点项目（大卡片）+ 补充项目（小卡片）分层展示
- 项目详情页使用 MDX 渲染正文
- 项目详情页结构：问题背景、约束条件、关键决策、成果与数据、复盘思考
- 上一项目/下一项目导航

### FR-5: 管理方法论页面完善
- 体系概览：3列卡片（PMO体系、敏捷实践、数据驱动）
- 制度规范列表：4项可展开（项目管理规范、研发流程规范、绩效评价体系、知识库与模板库规范）
- 工具链架构图：JIRA ↔ 中间层 ↔ 飞书 的数据流转
- 模板下载区：4个模板卡片（内容钩子）

### FR-6: 博客页面完善
- 分类筛选器 + 搜索框
- 文章卡片网格布局
- 文章详情页使用 MDX 渲染（支持标题、段落、列表、表格、引用、代码块、图片）
- 目录导航（TOC）：桌面端右侧固定，移动端顶部可折叠
- 滚动时高亮当前章节
- 上一篇/下一篇导航

### FR-7: 联系方式页面完善
- 联系表单字段：姓名、公司/机构、邮箱、主题（下拉选择）、消息内容
- 主题下拉选项：商务合作、招聘咨询、管理咨询、其他
- 直接联系信息：邮箱、电话、地点、当前职位
- 表单验证使用 react-hook-form + zod
- 提交状态：加载中、成功、失败

### FR-8: 内容层重构
- 重构 Project 类型以匹配设计文档 Schema（slug, industry, role, duration, status, featured, metrics, order 等）
- 重构 Post 类型（slug, description, category, readingTime, featured 等）
- 重构 Experience 内容解析逻辑（从 experiences.mdx 的 ### 标题解析）
- 重构 Methodology 内容结构
- 实现 next-mdx-remote MDX 渲染
- 配置 rehype/remark 插件链

### FR-9: SEO 与优化
- 配置动态 sitemap.ts
- 配置 robots.ts
- 添加 JSON-LD 结构化数据（Person Schema）
- 实现 loading.tsx 全局加载状态
- 实现 error.tsx 全局错误边界
- 实现 not-found.tsx 404页面
- 完善各页面 metadata

### FR-10: 全局组件与样式
- 确保暗色模式在所有页面正常工作
- 完善响应式设计（移动端、平板、桌面）
- 页面转场动画效果
- 滚动触发动画（ScrollReveal）
- 数字计数动画（CountUp）

## Non-Functional Requirements

### NFR-1: 性能
- 首屏加载 LCP < 2.0s
- 使用静态生成（SSG）优化内容页面
- 图片使用 Next.js Image 组件优化
- 代码分割与 Tree Shaking

### NFR-2: 可访问性
- 色彩对比度符合 WCAG AA 标准
- 语义化 HTML 标签
- 焦点状态可见
- 支持键盘导航
- 动画可通过 prefers-reduced-motion 禁用

### NFR-3: 响应式
- 移动端（< 640px）单列布局
- 平板（640-1024px）两列/中等布局
- 桌面端（> 1024px）完整多列布局
- 导航栏在移动端切换为汉堡菜单

### NFR-4: 类型安全
- TypeScript 严格模式
- 禁止使用 any 类型
- 所有 Props 有明确类型定义

### NFR-5: 浏览器兼容性
- 支持主流现代浏览器（Chrome, Firefox, Safari, Edge 最新两个版本）
- 不支持 IE

## Constraints

### 技术约束
- 必须使用 Next.js 14 App Router
- 必须使用 TypeScript
- 必须使用 Tailwind CSS
- 必须使用 MDX 管理内容
- 不引入新的状态管理库

### 业务约束
- 内容必须与设计文档中的简历信息一致
- 设计风格必须遵循设计系统规范
- 所有页面必须支持暗色模式

### 依赖约束
- 使用已安装的依赖包（framer-motion, lucide-react, react-hook-form, zod, next-mdx-remote, gray-matter 等）
- 不添加不必要的新依赖

## Assumptions
- 设计文档中的内容为最终内容，直接使用
- 项目封面图使用占位图（text_to_image API 生成）
- 联系表单 API 已存在，仅需完善验证逻辑
- 本地字体文件暂不使用，继续使用 Google Fonts

## Acceptance Criteria

### AC-1: 首页符合设计规范
- **Given**: 用户访问首页
- **When**: 页面加载完成
- **Then**: Hero 区域为深色背景，有5个指标的影响力看板，有最新动态区块和核心能力标签
- **Verification**: `human-judgment`
- **Notes**: 对比 06-page-specs.md 第1章的精确规格

### AC-2: 关于我页面功能完整
- **Given**: 用户访问关于我页面
- **When**: 页面加载完成并交互
- **Then**: 显示个人简介、5条可展开的管理理念卡片、三层能力金字塔、PMP/NPDP认证徽章、工具清单
- **Verification**: `human-judgment`

### AC-3: 工作经历页面交互完整
- **Given**: 用户访问工作经历页面
- **When**: 浏览并点击时间线项目
- **Then**: 顶部有横向成长路径时间线，纵向时间线可展开/收起，支持行业筛选，同一时间仅一条展开
- **Verification**: `human-judgment`

### AC-4: 项目作品集筛选与详情正常
- **Given**: 用户访问项目作品集页面
- **When**: 使用筛选器并点击项目
- **Then**: 筛选动画流畅，项目详情页使用 MDX 渲染完整内容，有上一篇/下一篇导航
- **Verification**: `human-judgment`

### AC-5: 博客搜索与目录导航正常
- **Given**: 用户访问博客页面
- **When**: 搜索文章并阅读详情
- **Then**: 搜索功能可用，文章详情页有目录导航，滚动时高亮当前章节
- **Verification**: `human-judgment`

### AC-6: 管理方法论页面结构完整
- **Given**: 用户访问管理方法论页面
- **When**: 浏览页面
- **Then**: 有3列体系概览卡片、4项可展开制度规范列表、工具链架构图
- **Verification**: `human-judgment`

### AC-7: 联系表单验证与提交正常
- **Given**: 用户在联系页面填写表单
- **When**: 提交无效或有效数据
- **Then**: 无效数据显示对应错误提示，有效数据提交后显示成功状态
- **Verification**: `programmatic`
- **Notes**: 测试空值、格式错误、边界值等场景

### AC-8: 内容数据结构符合设计文档
- **Given**: 构建项目时
- **When**: 读取 MDX 内容
- **Then**: 所有内容类型的 frontmatter 和正文结构符合 04-data-api.md 定义
- **Verification**: `programmatic`
- **Notes**: TypeScript 类型检查通过，构建无错误

### AC-9: SEO 配置完整
- **Given**: 网站部署后
- **When**: 访问 sitemap.xml、robots.txt
- **Then**: 返回正确的 sitemap 和 robots 配置，页面包含正确的 meta 标签和 JSON-LD
- **Verification**: `programmatic`

### AC-10: 暗色模式与响应式正常
- **Given**: 用户在不同设备和主题下访问
- **When**: 切换主题或调整窗口大小
- **Then**: 暗色模式切换平滑无闪烁，所有页面在移动端/平板/桌面端布局正常
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要添加简历 PDF 下载功能？
- [ ] 项目封面图是否有真实图片，还是使用生成的占位图？
- [ ] 是否需要配置 Umami 或其他统计工具？
- [ ] 联系表单是否需要接入真实的 Resend API？
