# 开发指南 (Development Guide)

> 版本: v1.0
> 项目: 涂奎个人网站
> 用途: Trae 编程实现的直接输入 — 编码规范、组件清单、部署步骤

---

## 1. 编码规范

### 1.1 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 自定义组件文件 | PascalCase | `ImpactBoard.tsx`, `AbilityPyramid.tsx` |
| shadcn/ui 组件文件 | kebab-case | `button.tsx`, `card.tsx` (CLI生成，不可改) |
| 工具/Hook 文件 | camelCase | `useTheme.ts`, `content.ts` |
| 类型定义 | PascalCase + 后缀 | `ContactFormData`, `ProjectMetric` |
| CSS 类名 | kebab-case | `impact-board`, `ability-pyramid` |
| 常量 | UPPER_SNAKE_CASE | `SUBJECT_LABELS`, `NAV_ITEMS` |
| 目录名 | kebab-case | `contact-form/`, `theme-provider/` |

### 1.2 文件组织规范

```
components/
  ├── ui/           # shadcn/ui 组件 (自动生成，不手动修改)
  ├── layout/       # 布局组件 (Navbar, Footer, Container)
  ├── home/         # 首页专用组件
  ├── about/        # 关于页专用组件
  ├── experience/   # 工作经历页专用组件
  ├── projects/     # 项目页专用组件
  ├── methodology/  # 方法论页专用组件
  ├── blog/         # 博客页专用组件
  ├── contact/      # 联系页专用组件
  └── shared/       # 通用/跨页面组件
```

**规则**:
- 页面专用组件放入对应目录，不得跨页面引用
- 通用组件放入 `shared/`，多个页面复用
- shadcn/ui 组件放入 `ui/`，通过 CLI 生成

### 1.3 TypeScript 规范

- **严格模式**: `tsconfig.json` 中启用 `strict: true`
- **显式返回类型**: 导出函数声明返回类型
- **禁止 `any`**: 使用 `unknown` 或具体类型
- **接口优先**: 数据结构优先使用 `interface` 而非 `type`
- **Props 命名**: 组件 Props 接口统一命名为 `{ComponentName}Props`

```typescript
// ✅ 正确
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps): JSX.Element {
  return <button className={cn('btn', variant)}>{children}</button>;
}

// ❌ 错误
export function Button(props: any) {
  return <button>{props.children}</button>;
}
```

### 1.4 React 规范

- **Server Component 优先**: 默认使用 Server Component，需要交互再用 `'use client'`
- **Props 解构**: 函数参数直接解构
- **事件处理**: 使用 `handle` 前缀，如 `handleSubmit`, `handleClick`
- **State 命名**: 使用 `[value, setValue]` 标准命名
- **避免内联函数**: 复杂逻辑提取为独立函数

### 1.5 Import 排序

```typescript
// 1. React/Next 内置
import React from 'react';
import Link from 'next/link';

// 2. 第三方库
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. 项目内部 (alias @/)
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

// 4. 相对路径 (仅在必要时)
import { helper } from './helper';
```

---

## 2. Tailwind CSS 配置

### 2.1 配置文件

**文件位置**: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 使用 CSS 变量，不硬编码
        bg: 'var(--bg)',
        'bg-2': 'var(--bg2)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent2)',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 2.2 全局样式

**文件位置**: `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: #fafaf8;
    --bg2: #f0f0ec;
    --surface: #ffffff;
    --ink: #1a1b2e;
    --muted: #6b7280;
    --rule: #e5e5e0;
    --accent: #e8772e;
    --accent2: #2dd4bf;
    --radius: 0.5rem;
  }

  [data-theme='dark'] {
    --bg: #1a1b2e;
    --bg2: #252638;
    --surface: #2a2c42;
    --ink: #f0f0ec;
    --muted: #9ca3af;
    --rule: #3f4155;
    --accent: #f0934a;
    --accent2: #34e2cc;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-ink font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-semibold tracking-tight;
  }

  code {
    @apply font-mono text-sm;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium transition-colors hover:bg-accent/90;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface text-ink font-medium border border-rule transition-colors hover:bg-bg2;
  }

  .card {
    @apply bg-surface rounded-xl border border-rule p-6 transition-all;
  }

  .section-container {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-title {
    @apply text-3xl font-bold text-ink mb-4;
  }

  .section-subtitle {
    @apply text-lg text-muted mb-12;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 2.3 Tailwind 使用规范

- **优先使用工具类**: 简单样式直接用 Tailwind 类，避免写自定义 CSS
- **复杂样式用 `@layer components`**: 重复使用的组件样式在 globals.css 中定义
- **响应式前缀**: 移动优先，`sm:`, `md:`, `lg:` 逐级增强
- **状态变体**: `hover:`, `focus:`, `dark:` 紧跟基础类
- **不使用 arbitrary values**: 优先配置 theme.extend，避免 `w-[123px]`

```tsx
// ✅ 正确
<div className="flex flex-col md:flex-row gap-4 p-6 bg-surface rounded-xl">

// ❌ 错误
<div className="flex flex-col gap-[16px] p-[24px] bg-[#ffffff] rounded-[12px]">
```

---

## 3. shadcn/ui 使用规范

### 3.1 初始化

```bash
# 1. 初始化 shadcn/ui
npx shadcn-ui@latest init

# 2. 选择配置
# - Style: Default
# - Base color: Neutral
# - CSS variables: Yes

# 3. 安装所需组件
npx shadcn-ui@latest add button card input textarea select badge
```

### 3.2 组件覆盖规范

shadcn/ui 组件默认样式需覆盖以匹配设计系统：

```typescript
// components/ui/button.tsx 修改后
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent text-white hover:bg-accent/90',
        secondary: 'bg-surface text-ink border border-rule hover:bg-bg2',
        ghost: 'hover:bg-bg2',
      },
      size: {
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### 3.3 新增自定义组件

若需基于 Radix UI 自建组件，遵循 shadcn/ui 模式：

```typescript
// components/ui/my-component.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const myVariants = cva('base-classes', {
  variants: { /* ... */ },
});

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myVariants> {}

export function MyComponent({ className, variant, ...props }: MyComponentProps) {
  return <div className={cn(myVariants({ variant }), className)} {...props} />;
}
```

---

## 4. 暗色模式实现

### 4.1 实现架构

基于 **CSS Variables + data-theme 属性 + React Context**：

```
用户偏好 / localStorage
    │
    ▼
ThemeProvider (Context)
    │  初始化时读取存储的主题偏好
    │  切换时更新 localStorage 和 DOM
    ▼
html[data-theme="dark|light"]
    │  CSS Variables 自动切换
    ▼
所有组件自动适配主题
```

### 4.2 关键代码

**ThemeProvider** (`components/shared/theme-provider.tsx`):

```typescript
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

**ThemeToggle** (`components/shared/theme-toggle.tsx`):

```typescript
'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-bg2 transition-colors"
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
```

**layout.tsx 集成**:

```typescript
// app/layout.tsx
import { ThemeProvider } from '@/components/shared/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 4.3 暗色模式下的组件适配

- **背景**: `bg-bg` (自动跟随主题变量)
- **文字**: `text-ink` / `text-muted`
- **边框**: `border-rule`
- **强调色**: `text-accent` / `bg-accent`
- **图片处理**: 使用 `dark:opacity-90` 或 `dark:grayscale` 降低暗色下图片刺眼程度

---

## 5. 页面组件拆分清单

### 5.1 首页 `/`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| HeroSection | `components/home/hero-section.tsx` | Server | 首屏文案 + 背景 |
| ImpactBoard | `components/home/impact-board.tsx` | Client | 5指标数字计数动画 |
| LatestUpdates | `components/home/latest-updates.tsx` | Server | 最新动态/项目 |
| SkillTags | `components/home/skill-tags.tsx` | Client | 核心能力标签云 |

### 5.2 关于我 `/about`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| ProfileSection | `components/about/profile-section.tsx` | Server | 个人简介 + 头像 |
| PhilosophySection | `components/about/philosophy-section.tsx` | Client | 管理理念可展开卡片 |
| AbilityPyramid | `components/about/ability-pyramid.tsx` | Client | 能力金字塔可视化 |
| Certifications | `components/about/certifications.tsx` | Server | PMP/NPDP 资质徽章 |
| UsesList | `components/about/uses-list.tsx` | Server | 工具清单 |

### 5.3 工作经历 `/experience`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| CareerPath | `components/experience/career-path.tsx` | Client | 成长路径横向流程图 |
| ExperienceTimeline | `components/experience/experience-timeline.tsx` | Client | 详细时间线可展开 |
| IndustryFilter | `components/experience/industry-filter.tsx` | Client | 行业筛选器 |

### 5.4 项目作品集 `/projects`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| ProjectGallery | `components/projects/project-gallery.tsx` | Client | 项目列表布局 + 筛选 |
| ProjectCard | `components/projects/project-card.tsx` | Server | 单个项目卡片 |
| ProjectFilter | `components/projects/project-filter.tsx` | Client | 行业/状态筛选器 |
| ProjectDetail | `components/projects/project-detail.tsx` | Server | 项目详情页内容 |

### 5.5 管理方法论 `/methodology`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| MethodologyOverview | `components/methodology/methodology-overview.tsx` | Server | 3列体系概览卡片 |
| ProcessList | `components/methodology/process-list.tsx` | Client | 制度规范可展开列表 |
| ToolchainDiagram | `components/methodology/toolchain-diagram.tsx` | Server | 工具链架构图 |
| TemplateDownloads | `components/methodology/template-downloads.tsx` | Server | 模板下载卡片 |

### 5.6 博客 `/blog`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| ArticleList | `components/blog/article-list.tsx` | Server | 文章列表 |
| ArticleCard | `components/blog/article-card.tsx` | Server | 文章卡片 |
| ArticleDetail | `components/blog/article-detail.tsx` | Server | 文章详情 |
| Toc | `components/blog/toc.tsx` | Client | 目录导航 (IntersectionObserver) |
| SearchBar | `components/blog/search-bar.tsx` | Client | 搜索框 |

### 5.7 联系 `/contact`

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| ContactForm | `components/contact/contact-form.tsx` | Client | 表单 (react-hook-form + zod) |
| ContactInfo | `components/contact/contact-info.tsx` | Server | 直接联系信息 |

### 5.8 通用/布局组件

| 组件 | 文件 | 类型 | 说明 |
|------|------|------|------|
| Navbar | `components/layout/navbar.tsx` | Client | 导航栏 (滚动变化) |
| Footer | `components/layout/footer.tsx` | Server | 页脚 |
| MobileMenu | `components/layout/mobile-menu.tsx` | Client | 移动端菜单 |
| Container | `components/layout/container.tsx` | Server | 内容容器 |
| ThemeProvider | `components/shared/theme-provider.tsx` | Client | 主题 Context |
| ThemeToggle | `components/shared/theme-toggle.tsx` | Client | 主题切换按钮 |
| ScrollReveal | `components/shared/scroll-reveal.tsx` | Client | 滚动显示动画 |
| CountUp | `components/shared/count-up.tsx` | Client | 数字计数动画 |
| SectionTitle | `components/shared/section-title.tsx` | Server | 章节标题 |
| MarkdownRenderer | `components/shared/markdown-renderer.tsx` | Server | MDX 渲染器 |

---

## 6. 部署方案

### 6.1 部署到 Vercel

**方式一: 使用 Vercel CLI (推荐)**

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署 (项目根目录)
vercel --prod
```

**方式二: Git 集成**

1. 将代码推送到 GitHub/GitLab
2. 在 Vercel Dashboard 导入项目
3. 配置环境变量 (Settings > Environment Variables)
4. 自动部署

### 6.2 环境变量配置

在 Vercel Dashboard 设置以下环境变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `RESEND_API_KEY` | `re_xxxxxxxx` | Production |
| `CONTACT_EMAIL` | `1634099882@qq.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-kui.dev` | Production |
| `UMAMI_WEBSITE_ID` | `xxxxxxxx` | Production |

### 6.3 自定义域名

1. 在 Vercel 项目设置中添加域名
2. 在域名 DNS 服务商添加 CNAME 记录指向 `cname.vercel-dns.com`
3. 等待 SSL 证书自动颁发

### 6.4 构建验证

```bash
# 本地构建测试
npm run build

# 检查构建输出
ls -la out/     # output: 'export' 模式
ls -la .next/   # server 模式
```

---

## 7. Trae 编程 Checklist

### 7.1 初始化阶段

- [ ] 使用 `create-next-app` 创建项目，选择 TypeScript + Tailwind CSS + App Router
- [ ] 配置 `tailwind.config.ts`，添加自定义颜色、字体、动画
- [ ] 配置 `styles/globals.css`，定义 CSS 变量和暗色模式
- [ ] 初始化 shadcn/ui，安装 button/card/input/textarea/select/badge 组件
- [ ] 安装依赖: `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `resend`, `next-mdx-remote`, `gray-matter`, `rehype-slug`, `rehype-autolink-headings`, `rehype-prism-plus`, `remark-gfm`, `lucide-react`, `tailwindcss-animate`
- [ ] 配置 `tsconfig.json` paths: `"@/*": ["./*"]`
- [ ] 配置 `next.config.js` (静态导出或 server 模式)
- [ ] 创建项目目录结构 (app/, components/, lib/, hooks/, content/, types/, public/)

### 7.2 基础组件阶段

- [ ] 实现 `ThemeProvider` + `useTheme` Hook
- [ ] 实现 `ThemeToggle` 组件
- [ ] 实现 `Navbar` 组件 (含移动端响应式)
- [ ] 实现 `Footer` 组件
- [ ] 实现 `Container` 布局组件
- [ ] 实现 `SectionTitle` 通用组件
- [ ] 实现 `ScrollReveal` 动画包装组件
- [ ] 实现 `CountUp` 数字动画组件
- [ ] 实现根布局 `layout.tsx` (集成 ThemeProvider, Navbar, Footer)

### 7.3 页面开发阶段

**首页**:
- [ ] HeroSection: 文案 + 背景渐变
- [ ] ImpactBoard: 5个指标卡片 + 数字计数动画
- [ ] LatestUpdates: 精选项目展示
- [ ] SkillTags: 能力标签云

**关于我**:
- [ ] ProfileSection: 头像 + 简介
- [ ] PhilosophySection: 5条理念可展开卡片
- [ ] AbilityPyramid: 三层金字塔可视化
- [ ] Certifications: PMP/NPDP 徽章

**工作经历**:
- [ ] CareerPath: 横向时间线
- [ ] ExperienceTimeline: 纵向详细时间线

**项目作品集**:
- [ ] ProjectCard: 卡片组件
- [ ] ProjectGallery: 列表 + 筛选逻辑
- [ ] ProjectDetail: 详情页布局

**管理方法论**:
- [ ] MethodologyOverview: 3列卡片
- [ ] ProcessList: 可展开列表

**博客**:
- [ ] ArticleCard: 文章卡片
- [ ] ArticleList: 列表 + 分类筛选
- [ ] ArticleDetail: 详情页 + 目录
- [ ] Toc: 目录导航组件

**联系**:
- [ ] ContactForm: react-hook-form + zod + API 调用
- [ ] ContactInfo: 直接联系方式展示
- [ ] API Route: `/api/contact` + Resend 邮件发送

### 7.4 内容填充阶段

- [ ] 创建 `content/projects/*.mdx` (6个项目)
- [ ] 创建 `content/blog/*.mdx` (5篇文章)
- [ ] 创建 `content/experience/experiences.mdx`
- [ ] 创建 `content/methodology/methodology.mdx`
- [ ] 实现 `lib/content.ts` 内容查询函数（fs + gray-matter）
- [ ] 实现 `lib/mdx.ts` MDX序列化配置（next-mdx-remote）
- [ ] 添加项目封面图到 `public/images/projects/`
- [ ] 添加头像到 `public/images/avatar.jpg`
- [ ] 添加简历 PDF 到 `public/resume.pdf`

### 7.5 SEO & 优化阶段

- [ ] 配置 `app/layout.tsx` metadata
- [ ] 实现 `app/sitemap.ts` 动态 sitemap
- [ ] 添加 JSON-LD 结构化数据
- [ ] 配置 `app/robots.ts`
- [ ] 实现 `app/loading.tsx`
- [ ] 实现 `app/error.tsx`
- [ ] 实现 `app/not-found.tsx`
- [ ] 添加 Open Graph 图片
- [ ] 配置 Umami 统计脚本

### 7.6 测试 & 部署阶段

- [ ] 本地开发测试: `npm run dev`
- [ ] 本地构建测试: `npm run build`
- [ ] 检查所有页面路由正常
- [ ] 检查暗色模式切换
- [ ] 检查移动端响应式
- [ ] 检查表单提交和邮件发送
- [ ] 配置 Vercel 环境变量
- [ ] 部署到 Vercel
- [ ] 绑定自定义域名
- [ ] 验证生产环境功能
