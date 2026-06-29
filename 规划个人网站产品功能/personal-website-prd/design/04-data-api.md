# 数据模型与 API 设计文档

> 版本: v1.1
> 项目: 涂奎个人网站
> 用途: Trae 编程实现的数据层与接口输入

---

## 1. 设计原则

- **无数据库**: 所有内容数据存储为 MDX 文件，通过 `fs` + `gray-matter` + `next-mdx-remote` 在构建时处理
- **单一 API**: 全站仅需一个 API Route (`/api/contact`) 处理联系表单提交
- **强类型**: 所有数据模型使用 TypeScript 接口定义，Zod 负责运行时验证
- **静态生成**: 内容在构建时读取并生成静态页面，运行时无数据查询开销

---

## 2. MDX Content Schema

### 2.1 项目内容 (Project)

**文件位置**: `content/projects/*.mdx`

**Frontmatter 定义**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 项目名称 |
| slug | string | 是 | URL 标识，如 `cdc-project-combo` |
| description | string | 是 | 项目一句话描述，用于列表页卡片 |
| cover | string | 是 | 封面图路径，如 `/images/projects/cdc-cover.png` |
| industry | string | 是 | 所属行业，如 `ai-gov`、`fintech`、`data-governance` |
| role | string | 是 | 担任角色，如 `项目经理`、`PMO负责人` |
| duration | string | 是 | 项目周期，如 `2024.09 - 至今` |
| teamSize | number | 否 | 团队规模，如 `50` |
| budget | string | 否 | 资金规模描述，如 `千万级` |
| status | enum | 是 | 项目状态: `completed` / `in-progress` / `paused` |
| tags | string[] | 是 | 技术/领域标签，如 `["AI", "政务", "数据治理"]` |
| featured | boolean | 否 | 是否精选展示，默认 `false` |
| metrics | object[] | 否 | 关键指标数组，见下方定义 |
| order | number | 否 | 排序权重，数字越小越靠前 |

**metrics 子结构**:

| 字段 | 类型 | 说明 |
|------|------|------|
| label | string | 指标名称，如 `管理资金` |
| value | string | 指标值，如 `5000万+` |

**示例**:

```mdx
---
title: 国家疾控中心项目组合管理
slug: cdc-project-combo
description: 同时管理AI+政务、数据治理、平台迁移三大子项目，构建PMO体系规范
industry: ai-gov
role: PMO负责人
duration: 2024.09 - 至今
teamSize: 50
budget: 千万级
status: in-progress
tags: ['AI', '政务', '数据治理', 'PMO']
featured: true
metrics:
  - label: 管理资金
    value: 5000万+
  - label: 团队规模
    value: 50人
  - label: 项目数量
    value: 3个
order: 1
---

## 项目背景

这里是项目的正文内容，使用 Markdown 格式书写...

## 关键决策

### 决策1: 技术选型

详细描述关键决策点...

## 成果数据

- 资金使用率: 98%
- 交付准时率: 100%

## 复盘思考

项目结束后的一些思考...
```

### 2.2 博客文章 (Post)

**文件位置**: `content/blog/*.mdx`

**Frontmatter 定义**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题 |
| slug | string | 是 | URL 标识 |
| description | string | 是 | 文章摘要，用于列表页和 SEO |
| date | string (ISO) | 是 | 发布日期，如 `2024-01-15` |
| updatedAt | string (ISO) | 否 | 更新日期 |
| category | string | 是 | 分类，如 `项目管理`、`技术分享`、`行业观察` |
| tags | string[] | 是 | 标签数组 |
| cover | string | 否 | 封面图路径 |
| readingTime | number | 否 | 预计阅读时长(分钟)，可自动生成 |
| featured | boolean | 否 | 是否推荐文章，默认 `false` |

**示例**:

```mdx
---
title: 从0到1搭建PMO管理体系的实践路径
slug: pmo-from-zero
description: 基于7年跨行业项目管理经验，总结PMO体系搭建的5个关键阶段与避坑指南
date: 2024-03-10
category: 项目管理
tags: ['PMO', '体系搭建', '管理方法论']
featured: true
---

## 引言

正文内容...
```

### 2.3 工作经历 (Experience)

**文件位置**: `content/experience/experiences.mdx`

**Frontmatter 定义**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 页面标题 |
| summary | string | 是 | 职业生涯概述 |

**正文结构**: 使用 Markdown 定义工作经历的时间线。格式如下：

```mdx
---
title: 工作经历
summary: 7年项目管理经验，横跨互联网、金融、政务、医疗、制造五大行业
---

## 工作经历

### 中国电信重庆分公司（万友） | 产品项目经理 | 2024.10 - 至今

- 负责政务、公卫医疗领域项目，涵盖从商机获取到验收的全周期项目管理
- 主导需求对接、建设方案编制、项目造价、技术评估、招投标技术方案
- 统筹管理上下游供应商与自研团队，全流程管控项目交付
- 管理国家疾控中心项目组合，总资金规模超2000w

### 瀚华融资担保股份有限公司 | PMO | 2022.04 - 2024.10

- 金融领域PMO体系搭建、敏捷转型落地与产研团队管理
- 统筹业务组、数据中台组（20人）团队管理
- 制定《项目管理规范》《研发流程规范》《绩效评价体系》《知识库与模板库规范》
- 设计并落地数据驱动的管理工具链，整合JIRA、飞书等平台

### 北京三维天地科技股份有限公司重庆分公司 | 项目经理 | 2021.09 - 2023.02

- 传统制造业主数据治理项目管理
- 统筹主数据治理及系统实施项目管理工作
- 管理现场实施团队、对接远程研发团队
- 项目金额480w，如期初验并延展至二期

### 北京字节跳动科技有限公司（人瑞） | 项目负责人&数据BP | 2020.10 - 2021.08

- 互联网行业AI数据标注项目管理及数据分析工作
- 对接AI算法、语言专家，制定标注规则、培训方案
- 兼任数据BP，设计业务线（280+人）绩效体系
- 成功交付项目数33个，并行管理项目数6个，最大执行成员800+

### 北京湛腾世纪科技有限公司 | 技术主管 | 2018.08 - 2020.08

- 测试团队0-1搭建、管理以及测试项目管理
- 从0到1搭建重庆分部测试团队，完成23人团队招聘及技术培训
- 统筹全球性外场测试项目端到端交付
- 深度参与运营商前沿技术验证（VoLTE/NSA首轮场测）
```

**解析规则**: 通过 `###` 级别标题解析每条工作经历，格式固定为 `公司名 | 职位 | 时间段`。

### 2.4 方法论 (Methodology)

**文件位置**: `content/methodology/methodology.mdx`

**Frontmatter 定义**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 页面标题 |
| description | string | 是 | 页面描述 |

**正文结构**: 描述PMO体系、制度规范、工具链、敏捷转型等内容。

---

## 3. TypeScript 类型定义

**文件位置**: `types/index.ts`

```typescript
// ============================================
// 基础类型
// ============================================

export type Theme = 'light' | 'dark';

export type ProjectStatus = 'completed' | 'in-progress' | 'paused';

export type ContactSubject = 'business' | 'recruit' | 'consult' | 'other';

// ============================================
// 项目类型
// ============================================

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  cover: string;
  industry: string;
  role: string;
  duration: string;
  teamSize?: number;
  budget?: string;
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  metrics?: ProjectMetric[];
  order: number;
}

export interface Project extends ProjectFrontmatter {
  content: unknown; // next-mdx-remote serialize 结果 (MDXRemoteSerializeResult)
}

// ============================================
// 博客文章类型
// ============================================

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  cover?: string;
  readingTime?: number;
  featured: boolean;
}

export interface Post extends PostFrontmatter {
  content: unknown; // next-mdx-remote serialize 结果 (MDXRemoteSerializeResult)
}

// ============================================
// 工作经历类型
// ============================================

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  narrative?: string; // 关键转折叙事
}

export interface Experience {
  title: string;
  summary: string;
  items: ExperienceItem[];
}

// ============================================
// 方法论类型
// ============================================

export interface MethodologySection {
  id: string;
  title: string;
  content: string;
}

export interface Methodology {
  title: string;
  description: string;
  sections: MethodologySection[];
}

// ============================================
// 联系表单类型
// ============================================

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

// ============================================
// 通用组件类型
// ============================================

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

---

## 4. MDX 内容解析配置

### 4.1 内容查询层

**文件位置**: `lib/content.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { ProjectFrontmatter, PostFrontmatter } from '@/types';

const contentDir = path.join(process.cwd(), 'content');

// ============================================
// 通用工具函数
// ============================================

function getMDXFiles(dir: string): string[] {
  const fullDir = path.join(contentDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => path.join(fullDir, f));
}

function parseMDXFile<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// ============================================
// 项目查询
// ============================================

export async function getAllProjects() {
  const files = getMDXFiles('projects');
  const projects = files.map((file) => {
    const { frontmatter } = parseMDXFile<ProjectFrontmatter>(file);
    return { ...frontmatter };
  });
  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getFeaturedProjects(limit = 4) {
  const all = await getAllProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string) {
  const files = getMDXFiles('projects');
  const file = files.find((f) => f.includes(`${slug}.mdx`));
  if (!file) return null;
  const { frontmatter, content } = parseMDXFile<ProjectFrontmatter>(file);
  const mdxSource = await serialize(content);
  return { ...frontmatter, content: mdxSource };
}

export async function getProjectsByIndustry(industry: string) {
  const all = await getAllProjects();
  return all.filter((p) => p.industry === industry);
}

export async function getAllIndustries() {
  const all = await getAllProjects();
  return [...new Set(all.map((p) => p.industry))];
}

// ============================================
// 博客文章查询
// ============================================

export async function getAllPosts() {
  const files = getMDXFiles('blog');
  const posts = files.map((file) => {
    const { frontmatter, content } = parseMDXFile<PostFrontmatter>(file);
    const readingTime = calculateReadingTime(content);
    return { ...frontmatter, readingTime };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string) {
  const files = getMDXFiles('blog');
  const file = files.find((f) => f.includes(`${slug}.mdx`));
  if (!file) return null;
  const { frontmatter, content } = parseMDXFile<PostFrontmatter>(file);
  const mdxSource = await serialize(content);
  const readingTime = calculateReadingTime(content);
  return { ...frontmatter, readingTime, content: mdxSource };
}

export async function getFeaturedPosts(limit = 3) {
  const all = await getAllPosts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getPostsByCategory(category: string) {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getAllCategories() {
  const all = await getAllPosts();
  return [...new Set(all.map((p) => p.category))];
}

export async function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase();
  const all = await getAllPosts();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

// ============================================
// 工作经历查询
// ============================================

export async function getExperience() {
  const filePath = path.join(contentDir, 'experience', 'experiences.mdx');
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = parseMDXFile<{
    title: string;
    summary: string;
  }>(filePath);
  const mdxSource = await serialize(content);
  return { ...frontmatter, content: mdxSource };
}

// ============================================
// 方法论查询
// ============================================

export async function getMethodology() {
  const filePath = path.join(contentDir, 'methodology', 'methodology.mdx');
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = parseMDXFile<{
    title: string;
    description: string;
  }>(filePath);
  const mdxSource = await serialize(content);
  return { ...frontmatter, content: mdxSource };
}
```

### 4.2 MDX 序列化配置

**文件位置**: `lib/mdx.ts`

```typescript
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypePrismPlus,
      ],
    },
  });
}
```

---

## 5. API 接口定义

### 5.1 接口概览

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 联系表单 | POST | `/api/contact` | 接收表单数据，发送邮件 |

### 5.2 联系表单接口

#### 请求

```
POST /api/contact
Content-Type: application/json
```

**请求体**:

| 字段 | 类型 | 必填 | 约束 |
|------|------|------|------|
| name | string | 是 | 2-20 字符 |
| company | string | 否 | 最大 50 字符 |
| email | string | 是 | 有效邮箱格式 |
| subject | string | 是 | 枚举: `business`, `recruit`, `consult`, `other` |
| message | string | 是 | 10-2000 字符 |

**请求示例**:

```json
{
  "name": "张三",
  "company": "某某科技公司",
  "email": "zhangsan@example.com",
  "subject": "business",
  "message": "我们有项目管理咨询需求，希望能与您取得联系..."
}
```

#### 响应

**成功 (200 OK)**:

```json
{
  "success": true,
  "message": "邮件发送成功"
}
```

**客户端错误 (400 Bad Request)**:

```json
{
  "success": false,
  "error": "请求数据无效",
  "details": [
    { "field": "email", "message": "请输入有效的邮箱地址" },
    { "field": "message", "message": "消息至少10个字符" }
  ]
}
```

**限流 (429 Too Many Requests)**:

```json
{
  "success": false,
  "error": "请求过于频繁，请稍后再试"
}
```

**服务端错误 (500 Internal Server Error)**:

```json
{
  "success": false,
  "error": "邮件发送失败，请稍后重试"
}
```

### 5.3 API 实现代码

**文件位置**: `app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不超过20个字符'),
  company: z.string().max(50, '公司名称不超过50字符').optional(),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.enum(['business', 'recruit', 'consult', 'other'], {
    errorMap: () => ({ message: '请选择有效的联系主题' }),
  }),
  message: z.string().min(10, '消息至少10个字符').max(2000, '消息不超过2000字'),
});

type ContactSchema = z.infer<typeof contactSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_LABELS: Record<string, string> = {
  business: '商务合作',
  recruit: '招聘咨询',
  consult: '管理咨询',
  other: '其他',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, error: '请求数据无效', details },
        { status: 400 }
      );
    }

    const data: ContactSchema = result.data;

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: data.email,
      subject: `[${SUBJECT_LABELS[data.subject]}] ${data.name} 通过网站联系您`,
      text: `
姓名: ${data.name}
公司: ${data.company || '未填写'}
邮箱: ${data.email}
主题: ${SUBJECT_LABELS[data.subject]}

消息内容:
${data.message}
      `.trim(),
    });

    return NextResponse.json(
      { success: true, message: '邮件发送成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: '邮件发送失败，请稍后重试' },
      { status: 500 }
    );
  }
}
```

---

## 6. 数据验证规则汇总

### 6.1 前端验证 (Zod Schema)

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(20),
  company: z.string().max(50).optional(),
  email: z.string().email(),
  subject: z.enum(['business', 'recruit', 'consult', 'other']),
  message: z.string().min(10).max(2000),
});
```

### 6.2 服务端验证

与前端使用同一 Zod Schema，在 API Route 中二次验证，防止绕过前端直接调用 API。

### 6.3 MDX 内容验证

- 构建时通过 TypeScript 类型断言验证 frontmatter 字段
- 必填字段缺失会导致构建失败（类型检查报错）
- 枚举字段值不在允许范围内会导致构建失败

---

## 7. 环境变量清单

| 变量名 | 说明 | 必填 | 示例 |
|--------|------|------|------|
| `RESEND_API_KEY` | Resend API 密钥 | 是 | `re_xxxxxxxx` |
| `CONTACT_EMAIL` | 接收联系邮件的邮箱 | 是 | `1634099882@qq.com` |
| `NEXT_PUBLIC_SITE_URL` | 站点URL (用于 SEO) | 否 | `https://tu-kui.dev` |
| `UMAMI_WEBSITE_ID` | Umami 统计站点 ID | 否 | `xxxxxxxx` |
