# 技术规格文档 (Technical Specification)

> 版本: v1.0
> 项目: 涂奎个人网站
> 用途: Trae 编程实现的技术输入

---

## 1. 技术栈选型

### 1.1 核心栈

| 层次 | 技术 | 版本 | 选型理由 |
|------|------|------|---------|
| 框架 | Next.js | 14+ (App Router) | SSG/SSR灵活切换、内置图片优化、API Routes、ISR、成熟生态 |
| 语言 | TypeScript | 5.x | 类型安全、IDE友好、维护成本低 |
| 样式 | Tailwind CSS | 3.4+ | 原子化CSS、暗色模式友好、设计系统易落地 |
| UI组件 | shadcn/ui | latest | 无样式依赖、基于Radix、高度可定制 |
| 动画 | Framer Motion | 11.x | React声明式动画、页面转场、手势支持 |
| 图标 | Lucide React | latest | 树摇优化、SVG、与shadcn兼容 |

### 1.2 内容管理

| 技术 | 用途 | 理由 |
|------|------|------|
| TinaCMS | Git-based CMS + 内容管理 | 提供可视化编辑界面，内容存于Git，无需数据库 |
| MDX | 博客文章、项目案例 | 支持React组件嵌入、代码高亮、数学公式 |
| tinacms/cli | Schema定义与客户端生成 | 定义Collection Schema，生成类型安全的查询客户端 |
| rehype/remark插件链 | Markdown处理 | 目录生成、代码高亮、外链处理 |

### 1.3 后端与部署

| 技术 | 用途 | 理由 |
|------|------|------|
| Next.js API Routes | 联系表单后端 | 无需独立后端，与前端同仓库 |
| Resend | 邮件发送 | 开发者友好、免费额度充足、React Email支持 |
| Vercel | 部署托管 | Next.js官方、Edge Network、ISR、Analytics |
| Umami | 访问统计 | 自托管、隐私友好、无Cookie、轻量 |

### 1.4 开发工具

| 技术 | 用途 |
|------|------|
| ESLint + Prettier | 代码规范与格式化 |
| next-sitemap | 自动生成sitemap.xml |
| sharp | 图片处理（Vercel自动使用） |

### 1.5 技术栈排除项

- **不使用 SaaS CMS (Sanity/Contentful)**：采用 TinaCMS (Git-based CMS)，内容存于Git仓库，无需外部SaaS依赖，同时提供可视化编辑界面
- **不使用数据库 (PostgreSQL/Supabase)**：联系表单数据可直接通过Resend邮件转发，无需持久化存储。若未来需要留言功能，再考虑添加
- **不使用状态管理库 (Zustand/Redux)**：站点以内容展示为主，无复杂全局状态，React Context + local state 足够
- **不使用 CSS-in-JS (Styled Components/Emotion)**：Tailwind CSS 已覆盖所有样式需求，避免运行时开销

---

## 2. 系统架构

### 2.1 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                         客户端 (Browser)                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │
│  │  首页   │ │ 关于我  │ │ 工作经历│ │   项目/博客列表  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │
│  │项目详情 │ │ 方法论  │ │ 文章详情│ │    联系方式      │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘   │
│                                                             │
│  渲染模式: SSG (静态生成) + CSR (客户端交互)                 │
│  主题状态: localStorage + CSS Variables                      │
│  动画: Framer Motion + CSS Transitions                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              App Router (app/ directory)              │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐  │   │
│  │  │  Layout│ │  Page  │ │Loading │ │   Error      │  │   │
│  │  │  (根)  │ │(各路由)│ │(加载态)│ │  (错误边界)  │  │   │
│  │  └────────┘ └────────┘ └────────┘ └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes (app/api/)                    │   │
│  │  ┌────────────┐                                     │   │
│  │  │ /api/contact│  → Resend → 邮箱                    │   │
│  │  └────────────┘                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              TinaCMS 内容层                            │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐  │   │
│  │  │ tina/  │ │content/│ │projects│ │ methodology │  │   │
│  │  │config.ts│ │  blog  │ │experience│ │   (.mdx)    │  │   │
│  │  │client  │ │ (.mdx) │ │  (.mdx) │ │             │  │   │
│  │  └────────┘ └────────┘ └────────┘ └──────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      外部服务集成                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐   │
│  │ Vercel  │  │ Resend  │  │  Umami  │  │Google Search│   │
│  │ (部署)  │  │ (邮件)  │  │(统计)   │  │  Console    │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 渲染策略矩阵

| 页面/路由 | 渲染模式 | 数据获取 | 更新频率 | 理由 |
|----------|---------|---------|---------|------|
| `/` (首页) | SSG | build时读取MDX | 每次构建 | 内容相对静态，构建时生成最优 |
| `/about` | SSG | 硬编码数据 | 每次构建 | 个人简介不常变 |
| `/experience` | SSG | build时读取MDX | 每次构建 | 工作经历更新频率低 |
| `/projects` | SSG | build时读取MDX | 每次构建 | 项目列表，静态生成所有slug |
| `/projects/[slug]` | SSG + `generateStaticParams` | build时读取MDX | 每次构建 | 项目详情页，静态生成所有slug |
| `/methodology` | SSG | build时读取MDX | 每次构建 | 方法论内容相对固定 |
| `/blog` | SSG | build时读取MDX | 每次构建 | 博客列表，静态生成 |
| `/blog/[slug]` | SSG + `generateStaticParams` | build时读取MDX | 每次构建 | 文章详情页，静态生成 |
| `/contact` | SSG | 无 | 每次构建 | 表单页，使用客户端fetch提交 |
| `/api/contact` | API Route | Resend API | 每次请求 | 表单提交后端 |

## 3. 项目目录结构

```
my-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根布局 (Provider, Navbar, Footer)
│   ├── template.tsx              # 页面转场动画模板
│   ├── page.tsx                  # 首页 /
│   ├── about/
│   │   └── page.tsx              # 关于我 /about
│   ├── experience/
│   │   └── page.tsx              # 工作经历 /experience
│   ├── projects/
│   │   ├── page.tsx              # 项目列表 /projects
│   │   └── [slug]/
│   │       └── page.tsx          # 项目详情 /projects/[slug]
│   ├── methodology/
│   │   └── page.tsx              # 管理方法论 /methodology
│   ├── blog/
│   │   ├── page.tsx              # 博客列表 /blog
│   │   └── [slug]/
│   │       └── page.tsx          # 文章详情 /blog/[slug]
│   ├── contact/
│   │   └── page.tsx              # 联系方式 /contact
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # POST /api/contact
│   └── sitemap.ts                # 动态sitemap
│
├── components/                   # React组件
│   ├── ui/                       # shadcn/ui 组件 (自动生成)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   └── badge.tsx
│   ├── layout/                   # 布局组件
│   │   ├── navbar.tsx            # 导航栏
│   │   ├── footer.tsx            # 页脚
│   │   ├── mobile-menu.tsx       # 移动端菜单
│   │   └── container.tsx         # 内容容器
│   ├── home/                     # 首页专用组件
│   │   ├── hero-section.tsx
│   │   ├── impact-board.tsx
│   │   ├── latest-updates.tsx
│   │   └── skill-tags.tsx
│   ├── about/                    # 关于我专用组件
│   │   ├── profile-section.tsx
│   │   ├── philosophy-section.tsx
│   │   ├── ability-pyramid.tsx
│   │   ├── certifications.tsx
│   │   └── uses-list.tsx
│   ├── experience/               # 工作经历专用组件
│   │   ├── career-path.tsx
│   │   ├── experience-timeline.tsx
│   │   └── industry-filter.tsx
│   ├── projects/                 # 项目专用组件
│   │   ├── project-gallery.tsx
│   │   ├── project-card.tsx
│   │   ├── project-filter.tsx
│   │   └── project-detail.tsx
│   ├── methodology/              # 方法论专用组件
│   │   ├── methodology-overview.tsx
│   │   ├── process-list.tsx
│   │   ├── toolchain-diagram.tsx
│   │   └── template-downloads.tsx
│   ├── blog/                     # 博客专用组件
│   │   ├── article-card.tsx
│   │   ├── article-list.tsx
│   │   ├── article-detail.tsx
│   │   ├── toc.tsx               # 目录导航
│   │   └── search-bar.tsx
│   ├── contact/                  # 联系专用组件
│   │   ├── contact-form.tsx
│   │   └── contact-info.tsx
│   └── shared/                   # 通用组件
│       ├── theme-provider.tsx    # 主题Provider
│       ├── theme-toggle.tsx      # 主题切换按钮
│       ├── scroll-reveal.tsx     # 滚动显示动画
│       ├── count-up.tsx          # 数字计数动画
│       ├── tag.tsx               # 标签组件
│       ├── section-title.tsx     # 章节标题
│       └── markdown-renderer.tsx # MDX渲染器
│
├── tina/                         # TinaCMS 配置
│   ├── config.ts                 # TinaCMS Schema 定义
│   └── __generated__/            # 生成的客户端 (自动创建)
│       ├── client.ts
│       └── types.ts
│
├── lib/                          # 工具函数和配置
│   ├── utils.ts                  # cn()等通用工具
│   ├── content.ts                # TinaCMS 内容查询函数封装
│   ├── constants.ts              # 站点常量
│   └── api.ts                    # API调用封装
│
├── hooks/                        # 自定义React Hooks
│   ├── use-theme.ts              # 主题状态管理
│   ├── use-scroll.ts             # 滚动位置监听
│   ├── use-intersection.ts       # Intersection Observer封装
│   └── use-mobile.ts             # 移动端检测
│
├── content/                      # MDX内容源文件
│   ├── projects/                 # 项目内容
│   │   ├── cdc-project-combo.mdx
│   │   ├── mzzw-general.mdx
│   │   ├── sunshine-housing.mdx
│   │   ├── financing-system.mdx
│   │   ├── guangming-data.mdx
│   │   └── data-labeling.mdx
│   ├── blog/                     # 博客文章
│   │   ├── pmo-from-zero.mdx
│   │   ├── cdc-project-management.mdx
│   │   ├── general-contractor.mdx
│   │   ├── cross-industry.mdx
│   │   └── data-driven-tools.mdx
│   ├── experience/               # 工作经历
│   │   └── experiences.mdx
│   └── methodology/              # 方法论
│       └── methodology.mdx
│
├── public/                       # 静态资源
│   ├── images/                   # 图片
│   │   ├── avatar.jpg            # 头像
│   │   ├── projects/             # 项目封面图
│   │   └── blog/                 # 博客配图
│   ├── fonts/                    # 本地字体文件
│   │   ├── InstrumentSans-*.ttf
│   │   └── GeistMono-*.ttf
│   └── resume.pdf                # 简历PDF下载
│
├── types/                        # TypeScript类型定义
│   └── index.ts
│
├── styles/                       # 全局样式
│   └── globals.css               # Tailwind指令 + CSS变量 + 全局样式
│
├── next.config.js                # Next.js配置
├── tailwind.config.ts            # Tailwind配置 (含暗色模式)
├── tsconfig.json                 # TypeScript配置
├── postcss.config.js             # PostCSS配置
├── package.json
└── README.md
```

---

## 4. 数据流设计

### 4.1 内容数据流 (Build Time)

```
tina/config.ts (Schema定义)
    │
    ▼
tina/__generated__/client.ts (TinaCMS生成类型安全客户端)
    │
    ▼
content/*.mdx (Git管理的内容文件)
    │
    ▼
lib/content.ts
    │  使用 TinaCMS 客户端查询内容
    │  提供查询函数: client.queries.project(),
    │             client.queries.post(), etc.
    ▼
app/**/page.tsx
    │  Server Component 在 build 时调用 TinaCMS 查询
    │  生成静态 HTML
    ▼
浏览器 (SSG HTML)

[TinaCMS编辑界面]
    │
    ▼
可视化编辑 content/*.mdx
    │
    ▼
Git提交 → 自动触发 Vercel 重新构建
```

### 4.2 主题状态流 (Client Side)

```
系统偏好 / localStorage
    │
    ▼
theme-provider.tsx (Context)
    │  初始化时读取存储的主题偏好
    │  提供 setTheme() 方法
    ▼
html[data-theme="dark|light"]
    │  CSS Variables 自动切换
    ▼
所有组件自动适配主题
```

### 4.3 表单数据流 (Runtime)

```
用户填写表单
    │
    ▼
contact-form.tsx (Client Component)
    │  前端验证 (zod schema)
    │
    ▼
POST /api/contact
    │  服务端验证
    │  调用 Resend API 发送邮件
    │
    ▼
Resend API
    │  发送邮件到 1634099882@qq.com
    ▼
邮件到达
```

---

## 5. 状态管理方案

### 5.1 无需全局状态管理库

本站点状态简单，不使用 Zustand/Redux/Jotai：

| 状态类型 | 管理方式 | 理由 |
|---------|---------|------|
| 主题 (dark/light) | React Context + localStorage | 全局唯一，需同步到 DOM |
| 移动端菜单开关 | 组件 local state | 仅 Navbar 使用 |
| 时间线展开项 | 组件 local state | 仅 Experience 页面使用 |
| 项目筛选器 | 组件 local state | 仅 Projects 页面使用 |
| 表单状态 | 组件 local state + react-hook-form | 仅 Contact 页面使用 |
| 目录高亮 | 组件 local state + IntersectionObserver | 仅 Blog 详情页使用 |

### 5.2 ThemeProvider 设计

```typescript
// components/shared/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
      document.documentElement.dataset.theme = stored;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 避免 hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### 5.3 表单状态管理

使用 **React Hook Form** + **Zod** 进行表单验证：

```typescript
// components/contact/contact-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不超过20个字符'),
  company: z.string().max(50).optional(),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.enum(['business', 'recruit', 'consult', 'other']),
  message: z.string().min(10, '消息至少10个字符').max(2000, '消息不超过2000字'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // 显示成功状态
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 表单字段 */}
    </form>
  );
}
```

---

## 6. 性能优化策略

### 6.1 构建时优化

| 策略 | 实现方式 | 效果 |
|------|---------|------|
| 静态生成 (SSG) | Next.js App Router 默认 | 页面 served from CDN，TTFB < 50ms |
| 图片优化 | Next.js `<Image>` 组件 | 自动 WebP/AVIF、响应式尺寸、blur placeholder |
| 字体优化 | `font-display: swap` + 子集化 | 避免 FOIT，FCP 不受影响 |
| 代码分割 | Next.js 自动按路由分割 | 首包仅加载当前页面所需代码 |
| Tree Shaking | ES Modules + Tailwind | 仅打包使用的代码和样式 |

### 6.2 运行时优化

| 策略 | 实现方式 | 效果 |
|------|---------|------|
| 懒加载 | `next/dynamic` + `loading.tsx` | 非首屏组件延迟加载 |
| 图片懒加载 | `<Image>` 默认 lazy loading | 视口外图片不加载 |
| 动画优化 | `will-change: transform` + GPU加速 | 流畅的 60fps 动画 |
| 减少重绘 | CSS transform 替代 top/left | 避免 layout thrashing |
| 预加载关键资源 | `<link rel="preload">` | 字体和首屏图片优先加载 |

### 6.3 Core Web Vitals 目标

| 指标 | 目标值 | 实现策略 |
|------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.0s | 图片优化、字体预加载、SSG |
| FID/INP (Interaction to Next Paint) | < 200ms | 减少主线程 JS、事件委托 |
| CLS (Cumulative Layout Shift) | < 0.1 | 图片尺寸声明、避免动态插入内容 |
| TTFB (Time to First Byte) | < 50ms | SSG + Vercel Edge Network |
| FCP (First Contentful Paint) | < 1.0s | 关键 CSS inline、字体 swap |

### 6.4 性能预算

- 首包 JS: < 150KB (gzip)
- 首包 CSS: < 30KB (gzip)
- 总图片大小: 单页 < 2MB
- Lighthouse 评分: >= 95 (Performance)

---

## 7. SEO 策略

### 7.1 元数据配置 (Next.js Metadata API)

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-kui.dev'), // 替换为实际域名
  title: {
    default: '涂奎 · 产品项目经理 | PMO体系建设与千万级项目管理',
    template: '%s | 涂奎',
  },
  description: '7年项目管理经验，PMP & NPDP 双认证。横跨互联网、金融、政务、医疗、制造五大行业，管理过超5000w资金规模的项目组合。',
  keywords: ['项目管理', 'PMO', '产品经理', 'PMP', 'NPDP', '千万级项目', '政务项目'],
  authors: [{ name: '涂奎' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '涂奎个人网站',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 7.2 页面级 SEO

```typescript
// app/projects/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '项目作品集',
  description: '涂奎管理的重点项目案例，涵盖AI+政务、金融监管、数据治理等领域，累计管理资金超5000w。',
  openGraph: {
    images: ['/images/og-projects.png'],
  },
};
```

### 7.3 结构化数据 (JSON-LD)

```typescript
// app/layout.tsx 中注入 Person Schema
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '涂奎',
  jobTitle: '产品项目经理',
  url: 'https://tu-kui.dev',
  sameAs: [
    // LinkedIn等社交链接
  ],
  knowsAbout: ['项目管理', 'PMO体系建设', '产品管理', '数据治理'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'PMP' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'NPDP' },
  ],
};
```

### 7.4 Sitemap 与 RSS

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllProjects, getAllPosts } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const posts = await getAllPosts();

  return [
    { url: 'https://tu-kui.dev', lastModified: new Date() },
    { url: 'https://tu-kui.dev/about', lastModified: new Date() },
    { url: 'https://tu-kui.dev/experience', lastModified: new Date() },
    { url: 'https://tu-kui.dev/projects', lastModified: new Date() },
    { url: 'https://tu-kui.dev/methodology', lastModified: new Date() },
    { url: 'https://tu-kui.dev/blog', lastModified: new Date() },
    { url: 'https://tu-kui.dev/contact', lastModified: new Date() },
    ...projects.map((p) => ({
      url: `https://tu-kui.dev/projects/${p.slug}`,
      lastModified: p.lastModified,
    })),
    ...posts.map((post) => ({
      url: `https://tu-kui.dev/blog/${post.slug}`,
      lastModified: post.lastModified,
    })),
  ];
}
```

---

## 8. 安全策略

### 8.1 输入安全

| 攻击类型 | 防护措施 |
|---------|---------|
| XSS | React 自动转义、MDX 使用 rehype-sanitize |
| CSRF | 使用 SameSite cookie、验证 Origin header |
| 注入攻击 | 联系表单使用 Zod 严格验证、限制输入长度 |
| 邮件轰炸 | API Route 添加 rate limit (每IP 5次/小时) |

### 8.2 Rate Limiting

```typescript
// app/api/contact/route.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response('请求过于频繁，请稍后再试', { status: 429 });
  }
  // ... 处理表单
}
```

**简化方案** (无Redis时): 使用内存 Map 实现简单的滑动窗口限流，Vercel 无服务器环境需要注意冷启动状态丢失问题。更简单的方案是仅在前端做限流提示 + 服务端基础检查。

### 8.3 环境变量

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=1634099882@qq.com
UMAMI_WEBSITE_ID=xxxxxxxx
```

---

## 9. 第三方服务集成

### 9.1 Resend (邮件发送)

```typescript
// lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  return resend.emails.send({
    from: 'onboarding@resend.dev', // 或自定义域名
    to: process.env.CONTACT_EMAIL!,
    subject: `[网站联系] ${data.subject} - ${data.name}`,
    text: `
姓名: ${data.name}
公司: ${data.company || '未填写'}
邮箱: ${data.email}
主题: ${data.subject}

消息内容:
${data.message}
    `,
  });
}
```

### 9.2 Umami (访问统计)

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          defer
          src="https://umami.example.com/script.js"
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 9.3 Vercel Analytics (可选)

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 10. 错误处理

### 10.1 全局错误边界

```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">页面加载出错</h2>
      <p className="text-muted mb-6">{error.message}</p>
      <button onClick={reset} className="btn-primary">重试</button>
    </div>
  );
}
```

### 10.2 404 页面

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl mb-6">页面未找到</p>
      <a href="/" className="btn-primary">返回首页</a>
    </div>
  );
}
```

### 10.3 加载状态

```typescript
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
    </div>
  );
}
```

---

## 11. 开发环境配置

### 11.1 package.json 核心依赖

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "resend": "^3.2.0",
    "tinacms": "^2.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "rehype-prism-plus": "^2.0.0",
    "remark-gfm": "^4.0.0",
    "remark-toc": "^9.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@tinacms/cli": "^1.5.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss-animate": "^1.0.7",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

### 11.2 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 默认使用 Vercel serverless 部署，保留 API Routes 支持
  images: {
    domains: [],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

**注意**: 本方案需要 API Routes (`/api/contact`) 处理联系表单，因此**不启用** `output: 'export'`。
Vercel 会自动使用 serverless 函数部署 API Routes，静态页面仍然由 CDN 缓存加速。

**如需静态导出** (如部署到非 Vercel 平台):
```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```
此时需要移除 `app/api/contact/route.ts`，改用外部表单服务（如 Formspree、Getform）。
