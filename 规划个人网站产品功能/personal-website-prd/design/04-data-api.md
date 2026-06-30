# 数据模型与 API 设计文档

> 版本: v1.2 (TinaCMS 版)
> 项目: 涂奎个人网站
> 用途: Trae 编程实现的数据层与接口输入

---

## 1. 设计原则

- **Git-based CMS**: 使用 TinaCMS 管理内容，提供可视化编辑界面，内容存储为 MDX 文件并纳入 Git 版本控制
- **无数据库**: 内容不依赖外部数据库，全部存于 Git 仓库中的 `content/` 目录
- **单一 API**: 全站仅需一个 API Route (`/api/contact`) 处理联系表单提交
- **强类型**: TinaCMS 生成类型安全的查询客户端，所有数据模型在 Schema 中定义
- **静态生成**: 内容在构建时通过 TinaCMS 客户端查询并生成静态页面

---

## 2. TinaCMS Collection Schema

### 2.1 Schema 定义总览

**文件位置**: `tina/config.ts`

```typescript
import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      // 项目作品集
      {
        name: 'project',
        label: '项目',
        path: 'content/projects',
        format: 'mdx',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || '',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: '项目名称', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'URL标识', required: true },
          { type: 'string', name: 'description', label: '项目描述', required: true },
          { type: 'image', name: 'cover', label: '封面图', required: true },
          {
            type: 'string',
            name: 'industry',
            label: '所属行业',
            options: ['ai-gov', 'fintech', 'data-governance', 'scale', 'general'],
            required: true,
          },
          { type: 'string', name: 'role', label: '担任角色', required: true },
          { type: 'string', name: 'duration', label: '项目周期', required: true },
          { type: 'number', name: 'teamSize', label: '团队规模' },
          { type: 'string', name: 'budget', label: '资金规模' },
          {
            type: 'string',
            name: 'status',
            label: '项目状态',
            options: ['completed', 'in-progress', 'paused'],
            required: true,
          },
          { type: 'string', name: 'tags', label: '标签', list: true, required: true },
          { type: 'boolean', name: 'featured', label: '精选展示', default: false },
          {
            type: 'object',
            name: 'metrics',
            label: '关键指标',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: '指标名称' },
              { type: 'string', name: 'value', label: '指标值' },
            ],
          },
          { type: 'number', name: 'order', label: '排序权重', default: 999 },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      // 博客文章
      {
        name: 'post',
        label: '博客文章',
        path: 'content/blog',
        format: 'mdx',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || '',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: '文章标题', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'URL标识', required: true },
          { type: 'string', name: 'description', label: '文章摘要', required: true },
          { type: 'datetime', name: 'date', label: '发布日期', required: true, ui: { dateFormat: 'YYYY-MM-DD' } },
          { type: 'datetime', name: 'updatedAt', label: '更新日期', ui: { dateFormat: 'YYYY-MM-DD' } },
          { type: 'string', name: 'category', label: '分类', required: true },
          { type: 'string', name: 'tags', label: '标签', list: true, required: true },
          { type: 'image', name: 'cover', label: '封面图' },
          { type: 'boolean', name: 'featured', label: '推荐文章', default: false },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      // 工作经历
      {
        name: 'experience',
        label: '工作经历',
        path: 'content/experience',
        format: 'mdx',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '页面标题', isTitle: true, required: true },
          { type: 'string', name: 'summary', label: '职业生涯概述', required: true },
          {
            type: 'object',
            name: 'items',
            label: '工作经历条目',
            list: true,
            fields: [
              { type: 'string', name: 'company', label: '公司名称', required: true },
              { type: 'string', name: 'role', label: '职位', required: true },
              { type: 'string', name: 'duration', label: '时间段', required: true },
              { type: 'string', name: 'industry', label: '所属行业' },
              { type: 'string', name: 'highlights', label: '核心成果', list: true },
              { type: 'string', name: 'narrative', label: '关键转折叙事', ui: { component: 'textarea' } },
              { type: 'string', name: 'tools', label: '工具/方法论', list: true },
            ],
          },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      // 管理方法论
      {
        name: 'methodology',
        label: '管理方法论',
        path: 'content/methodology',
        format: 'mdx',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '页面标题', isTitle: true, required: true },
          { type: 'string', name: 'description', label: '页面描述', required: true },
          {
            type: 'object',
            name: 'sections',
            label: '方法论区块',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: '区块ID', required: true },
              { type: 'string', name: 'title', label: '区块标题', required: true },
              { type: 'rich-text', name: 'content', label: '区块内容' },
            ],
          },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      // 全局配置
      {
        name: 'site',
        label: '站点配置',
        path: 'content/site',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '站点标题', required: true },
          { type: 'string', name: 'description', label: '站点描述', required: true },
          { type: 'string', name: 'author', label: '作者名', required: true },
          { type: 'string', name: 'email', label: '联系邮箱' },
          {
            type: 'object',
            name: 'social',
            label: '社交链接',
            list: true,
            fields: [
              { type: 'string', name: 'platform', label: '平台' },
              { type: 'string', name: 'url', label: '链接' },
            ],
          },
        ],
      },
    ],
  },
});
```

### 2.2 内容文件路径映射

| Collection | 文件路径 | 说明 |
|-----------|---------|------|
| `project` | `content/projects/*.mdx` | 每个项目一个 MDX 文件 |
| `post` | `content/blog/*.mdx` | 每篇文章一个 MDX 文件 |
| `experience` | `content/experience/experiences.mdx` | 单文件，包含所有经历 |
| `methodology` | `content/methodology/methodology.mdx` | 单文件，包含所有方法论 |
| `site` | `content/site/config.json` | 站点全局配置 |

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

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover: string;
  industry: string;
  role: string;
  duration: string;
  teamSize?: number | null;
  budget?: string | null;
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  metrics?: ProjectMetric[] | null;
  order: number;
  body: unknown; // TinaCMS rich-text 渲染结果
}

// ============================================
// 博客文章类型
// ============================================

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string | null;
  category: string;
  tags: string[];
  cover?: string | null;
  featured: boolean;
  body: unknown; // TinaCMS rich-text 渲染结果
}

// ============================================
// 工作经历类型
// ============================================

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  industry?: string | null;
  highlights?: string[] | null;
  narrative?: string | null;
  tools?: string[] | null;
}

export interface Experience {
  id: string;
  title: string;
  summary: string;
  items: ExperienceItem[];
  body: unknown;
}

// ============================================
// 方法论类型
// ============================================

export interface MethodologySection {
  id: string;
  title: string;
  content: unknown;
}

export interface Methodology {
  id: string;
  title: string;
  description: string;
  sections: MethodologySection[];
  body: unknown;
}

// ============================================
// 站点配置类型
// ============================================

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  email?: string | null;
  social?: { platform: string; url: string }[] | null;
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

## 4. TinaCMS 内容查询层

### 4.1 客户端配置

**文件位置**: 使用 TinaCMS CLI 自动生成的客户端

TinaCMS CLI (`npx @tinacms/cli init`) 会自动在 `tina/__generated__/` 目录下生成类型安全的客户端：

```
tina/__generated__/
  ├── client.ts       # 预配置的客户端实例
  ├── types.ts        # TypeScript 类型定义
  └── queries.ts      # GraphQL 查询
```

**使用方式** — 直接导入自动生成的客户端：

```typescript
// lib/content.ts
import { client } from '../tina/__generated__/client';
import type { Project, Post, Experience, Methodology, SiteConfig } from '@/types';
```

**不需要**手动创建 `lib/tina-client.ts` 文件。

### 4.2 内容查询函数

**文件位置**: `lib/content.ts`

```typescript
import { client } from '../tina/__generated__/client';
import type { Project, Post, Experience, Methodology, SiteConfig } from '@/types';

// ============================================
// 项目查询
// ============================================

export async function getAllProjects(): Promise<Project[]> {
  const result = await client.queries.projectConnection({
    sort: 'order',
    last: 100,
  });
  return (
    result.data.projectConnection.edges?.map((edge) => ({
      ...edge.node,
      body: edge.node.body,
    })) || []
  );
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const result = await client.queries.project({
    relativePath: `${slug}.mdx`,
  });
  return result.data.project ? { ...result.data.project } : null;
}

export async function getProjectsByIndustry(industry: string): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.industry === industry);
}

export async function getAllIndustries(): Promise<string[]> {
  const all = await getAllProjects();
  return [...new Set(all.map((p) => p.industry))];
}

// ============================================
// 博客文章查询
// ============================================

export async function getAllPosts(): Promise<Post[]> {
  const result = await client.queries.postConnection({
    sort: 'date',
    last: 100,
  });
  const posts =
    result.data.postConnection.edges?.map((edge) => ({
      ...edge.node,
      body: edge.node.body,
    })) || [];
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await client.queries.post({
    relativePath: `${slug}.mdx`,
  });
  return result.data.post ? { ...result.data.post } : null;
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getAllCategories(): Promise<string[]> {
  const all = await getAllPosts();
  return [...new Set(all.map((p) => p.category))];
}

export async function searchPosts(query: string): Promise<Post[]> {
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

export async function getExperience(): Promise<Experience | null> {
  const result = await client.queries.experience({
    relativePath: 'experiences.mdx',
  });
  return result.data.experience ? { ...result.data.experience } : null;
}

// ============================================
// 方法论查询
// ============================================

export async function getMethodology(): Promise<Methodology | null> {
  const result = await client.queries.methodology({
    relativePath: 'methodology.mdx',
  });
  return result.data.methodology ? { ...result.data.methodology } : null;
}

// ============================================
// 站点配置查询
// ============================================

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const result = await client.queries.site({
    relativePath: 'config.json',
  });
  return result.data.site ? { ...result.data.site } : null;
}
```

### 4.3 正文渲染（关键）

TinaCMS 的 `rich-text` 字段返回的是 JSON 结构化数据，**不能直接用 dangerouslySetInnerHTML**。需要使用 TinaCMS 提供的 `<TinaMarkdown>` 组件渲染：

```typescript
// components/shared/tina-markdown.tsx
'use client';

import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface TinaMarkdownRendererProps {
  content: any; // TinaCMS rich-text JSON
}

export function TinaMarkdownRenderer({ content }: TinaMarkdownRendererProps) {
  if (!content) return null;
  return <TinaMarkdown content={content} />;
}
```

**在页面中使用**：

```tsx
// app/projects/[slug]/page.tsx
import { TinaMarkdownRenderer } from '@/components/shared/tina-markdown';
import { getProjectBySlug } from '@/lib/content';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <article>
      <h1>{project.title}</h1>
      <TinaMarkdownRenderer content={project.body} />
    </article>
  );
}
```

---

## 5. TinaCMS 编辑界面集成

### 5.1 编辑路由

**文件位置**: `app/admin/[[...tina]]/page.tsx`

TinaCMS CLI (`npx @tinacms/cli init`) 会自动生成 admin 路由文件，无需手动编写。

如果手动创建，最小实现如下：

```typescript
import TinaPage from 'tinacms';

export default TinaPage;
```

### 5.2 本地编辑模式

```bash
# 方式一：同时启动 TinaCMS GraphQL 服务器和 Next.js 开发服务器
npx tinacms dev -c "next dev"

# 方式二：先启动 TinaCMS 服务器，再启动 Next.js（两个终端）
# 终端1: npx tinacms dev
# 终端2: next dev
```

访问 `http://localhost:3000/admin` 进入 TinaCMS 编辑界面。

---

## 6. API 接口定义

### 6.1 接口概览

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 联系表单 | POST | `/api/contact` | 接收表单数据，发送邮件 |
| TinaCMS GraphQL | POST | `/api/tina/graphql` | TinaCMS 内容查询 API |

### 6.2 联系表单接口

与 v1.1 版本一致，详见原文档第5节。

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

## 7. 数据验证规则汇总

### 7.1 前端验证 (Zod Schema)

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(20),
  company: z.string().max(50).optional(),
  email: z.string().email(),
  subject: z.enum(['business', 'recruit', 'consult', 'other']),
  message: z.string().min(10).max(2000),
});
```

### 7.2 TinaCMS Schema 验证

- TinaCMS 在编辑界面自动验证字段类型和必填规则
- 枚举字段提供下拉选择，防止无效值
- 构建时通过 TypeScript 类型保证查询安全

---

## 8. 环境变量清单

| 变量名 | 说明 | 必填 | 示例 |
|--------|------|------|------|
| `RESEND_API_KEY` | Resend API 密钥 | 是 | `re_xxxxxxxx` |
| `CONTACT_EMAIL` | 接收联系邮件的邮箱 | 是 | `1634099882@qq.com` |
| `NEXT_PUBLIC_SITE_URL` | 站点URL (用于 SEO) | 否 | `https://tu-kui.dev` |
| `UMAMI_WEBSITE_ID` | Umami 统计站点 ID | 否 | `xxxxxxxx` |
| `TINA_CLIENT_ID` | TinaCMS Client ID (生产环境) | 否 | `xxxxxxxx` |
| `TINA_TOKEN` | TinaCMS 只读 Token (生产环境) | 否 | `xxxxxxxx` |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | TinaCMS Client ID (前端) | 否 | `xxxxxxxx` |
| `NEXT_PUBLIC_TINA_TOKEN` | TinaCMS Token (前端) | 否 | `xxxxxxxx` |
| `VERCEL_GIT_COMMIT_REF` | Vercel 自动注入的分支名 | 否 | `main` |

**注意**: 
- 本地开发时不需要 `TINA_CLIENT_ID` 和 `TINA_TOKEN`，TinaCMS 以本地模式运行
- 生产部署到 Vercel 时，需在 TinaCloud 注册项目并获取 Client ID 和 Token
- 站点配置（标题、描述、作者等）从 TinaCMS 的 `site` Collection 读取，不再硬编码
