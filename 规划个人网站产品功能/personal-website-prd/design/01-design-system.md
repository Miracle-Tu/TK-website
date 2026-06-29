# 设计系统文档 (Design System)

> 版本: v1.0
> 项目: 涂奎个人网站
> 用途: Trae 编程实现的设计输入

---

## 1. 设计理念

### 1.1 设计目标

- **专业可信**: 通过克制的视觉语言传递项目管理专家的专业感，避免花哨和过度设计
- **信息优先**: 内容为王，所有视觉元素服务于信息的清晰传达
- **层级清晰**: 通过排版、色彩和间距建立明确的信息层级，让访客在 10 秒内抓住重点
- **暗色友好**: 双主题支持，暗色模式不是简单的反色，而是经过精心调色的独立主题

### 1.2 视觉人格

"沉稳专业的技术管理者形象 —— 像一份精心排版的咨询报告，而不是一份花哨的营销海报。"

---

## 2. 色彩系统

### 2.1 CSS 变量定义

所有颜色通过 CSS 变量定义，实现暗色模式的无缝切换。

```css
:root {
  /* 背景色 */
  --bg: #fafaf8;           /* 页面主背景 - 温暖的米白色 */
  --bg2: #f0f0ec;          /* 次级背景 - 卡片、表格交替行 */
  --surface: #ffffff;      /* 浮层背景 - 弹窗、下拉菜单 */

  /* 文字色 */
  --ink: #1a1b2e;          /* 主文字 - 深蓝黑色 */
  --muted: #6b7280;        /* 次级文字 - 灰蓝色 */

  /* 边框与分隔线 */
  --rule: #e5e5e0;         /* 边框、分隔线 */

  /* 强调色 */
  --accent: #e8772e;       /* 主强调色 - 活力橙 */
  --accent2: #2dd4bf;      /* 次强调色 - 薄荷青 */

  /* 语义色 */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### 2.2 暗色模式映射

```css
[data-theme="dark"] {
  --bg: #1a1b2e;           /* 深蓝黑背景 */
  --bg2: #252638;          /* 次级背景 */
  --surface: #2a2c42;      /* 浮层背景 */
  --ink: #f0f0ec;          /* 主文字 - 温暖的灰白色 */
  --muted: #9ca3af;        /* 次级文字 */
  --rule: #3f4155;         /* 边框 */
  --accent: #f0934a;       /* 强调色在暗色下更亮 */
  --accent2: #34e2cc;      /* 次强调色更亮 */
}
```

### 2.3 色彩使用规范

| 场景 | 颜色变量 | 说明 |
|------|---------|------|
| 页面背景 | `--bg` | 大面积使用，营造整体氛围 |
| 卡片/模块背景 | `--surface` | 在 `--bg` 上形成层级区分 |
| 表格交替行 | `--bg2` | 每两行交替，提升可读性 |
| 主标题/正文 | `--ink` | 所有主要文字内容 |
| 辅助文字/时间戳 | `--muted` | 次要信息、元数据 |
| 主要CTA按钮 | `--accent` | 主按钮、链接hover、重要标签 |
| 成功状态/通过 | `--accent2` | 成功提示、正向数据指标 |
| 边框/分隔线 | `--rule` | 卡片边框、表格线、模块分隔 |

### 2.4 强调色使用比例

- **accent (橙)**: 用于主按钮、核心数据高亮、活跃状态、重要标签。全页使用面积不超过 5%
- **accent2 (青)**: 用于次级标签、成功状态、正向指标、图表辅助色。全页使用面积不超过 3%
- **ink + muted**: 占页面 85% 以上的视觉面积，确保专业感

---

## 3. 字体系统

### 3.1 字体家族

```css
/* 主字体 - 无衬线 */
--font-sans: 'InstrumentSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 等宽字体 - 用于标签、数据、代码 */
--font-mono: 'GeistMono', 'SF Mono', 'Fira Code', monospace;
```

**字体加载策略**:
- 本地托管 TTF 文件（InstrumentSans Regular/Bold/Italic/BoldItalic, GeistMono Regular/Bold）
- 使用 `font-display: swap` 避免 FOIT
- 提供系统字体回退栈

### 3.2 字号层级

| Token | 桌面端 | 移动端 | 行高 | 字重 | 用途 |
|-------|--------|--------|------|------|------|
| display | 2.8rem (45px) | 2rem (32px) | 1.15 | 700 | Hero 主标题 |
| h1 | 1.6rem (26px) | 1.35rem (22px) | 1.3 | 700 | 页面大标题 |
| h2 | 1.15rem (18px) | 1.05rem (17px) | 1.4 | 700 | 区块标题 |
| h3 | 1rem (16px) | 0.95rem (15px) | 1.5 | 700 | 小标题 |
| body | 1rem (16px) | 0.95rem (15px) | 1.7 | 400 | 正文 |
| body-sm | 0.9rem (14px) | 0.85rem (14px) | 1.6 | 400 | 辅助正文 |
| caption | 0.82rem (13px) | 0.78rem (12px) | 1.5 | 400 | 图注、元数据 |
| label | 0.75rem (12px) | 0.72rem (12px) | 1.4 | 700 | 标签、徽章 |

### 3.3 排版规则

- **标题与正文字号比**: display 为 body 的 2.8 倍，h1 为 1.6 倍，形成清晰的层级跳跃
- **段落长度**: 每行 45-75 个字符（中文约 25-35 字），超出时容器 `max-width: 680px`
- **段间距**: 段落间 `margin-bottom: 1rem`
- **标题间距**: h2 上方 `margin-top: 2.5rem`，下方 `margin-bottom: 0.75rem`

---

## 4. 间距系统

### 4.1 基础单位

以 `0.25rem (4px)` 为基础单位，建立 8 点栅格系统。

| Token | 值 | 用途 |
|-------|-----|------|
| space-1 | 0.25rem (4px) | 紧凑间距 |
| space-2 | 0.5rem (8px) | 图标与文字间距 |
| space-3 | 0.75rem (12px) | 小组件内边距 |
| space-4 | 1rem (16px) | 标准内边距 |
| space-5 | 1.5rem (24px) | 卡片内边距 |
| space-6 | 2rem (32px) | 模块间距 |
| space-8 | 3rem (48px) | 大模块间距 |
| space-10 | 4rem (64px) | 页面级间距 |
| space-12 | 5rem (80px) | Section 间距 |

### 4.2 页面布局间距

- **容器最大宽度**: `max-width: 920px; margin: 0 auto`
- **容器水平内边距**: 桌面 `2rem`，移动端 `1.25rem`
- **Section 垂直间距**: 桌面 `3.5rem` 上下，移动端 `2.5rem`
- **卡片网格间距**: `gap: 1.25rem`
- **两列布局间距**: `gap: 2rem`

---

## 5. 圆角与阴影

### 5.1 圆角

| Token | 值 | 用途 |
|-------|-----|------|
| radius-sm | 4px | 标签、按钮、小元素 |
| radius-md | 6px | 卡片、输入框、图片 |
| radius-lg | 8px | 大卡片、模块容器 |
| radius-full | 9999px | 头像、圆形按钮 |

### 5.2 阴影

```css
/* 轻微阴影 - 卡片默认 */
--shadow-sm: 0 1px 2px rgba(26, 27, 46, 0.05);

/* 中等阴影 - 卡片 hover */
--shadow-md: 0 4px 12px rgba(26, 27, 46, 0.08);

/* 强阴影 - 浮层、弹窗 */
--shadow-lg: 0 8px 24px rgba(26, 27, 46, 0.12);
```

暗色模式下阴影使用 `rgba(0, 0, 0, 0.3)` 替代，保持可见度。

---

## 6. 布局系统

### 6.1 响应式断点

| 名称 | 宽度 | 别名 |
|------|------|------|
| sm | < 640px | 手机 |
| md | 640px - 767px | 大手机 |
| lg | 768px - 1023px | 平板 |
| xl | 1024px - 1279px | 小桌面 |
| 2xl | >= 1280px | 大桌面 |

### 6.2 布局模式

**单列居中（默认内容布局）**:
```
+--------------------------+
|      max-width: 920px    |
|  +--------------------+  |
|  |   内容区域          |  |
|  +--------------------+  |
+--------------------------+
```

**两列网格（关于我、联系方式）**:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 2rem;
/* 移动端: grid-template-columns: 1fr */
```

**卡片网格（能力卡片、项目卡片）**:
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 1.25rem;
```

**三列数据看板（首页影响力看板）**:
```css
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 1.5rem;
/* 平板: repeat(3, 1fr) */
/* 手机: repeat(2, 1fr), 最后一个独占一行 */
```

---

## 7. 组件规范

### 7.1 按钮 (Button)

**主按钮 (Primary)**:
```css
background: var(--accent);
color: white;
padding: 0.6rem 1.5rem;
border-radius: 4px;
font-weight: 700;
font-size: 0.9rem;
transition: background 0.2s, transform 0.15s;
```
- Hover: `background: #d96a24` (accent 暗 10%), `transform: translateY(-1px)`
- Active: `transform: translateY(0)`
- Focus: `outline: 2px solid var(--accent); outline-offset: 2px`

**次按钮 (Secondary)**:
```css
background: transparent;
color: var(--ink);
border: 1px solid var(--rule);
padding: 0.6rem 1.5rem;
border-radius: 4px;
font-weight: 700;
```
- Hover: `background: var(--bg2); border-color: var(--muted)`

**文字按钮 (Ghost)**:
```css
background: transparent;
color: var(--accent);
padding: 0.4rem 0;
font-weight: 600;
```
- Hover: `text-decoration: underline`

### 7.2 卡片 (Card)

**标准卡片**:
```css
background: var(--surface);
border: 1px solid var(--rule);
border-radius: 8px;
padding: 1.5rem;
transition: border-color 0.2s, box-shadow 0.2s;
```
- Hover: `border-color: var(--accent); box-shadow: var(--shadow-md)`

**Hover 动效**:
```css
transform: translateY(-2px);
transition: transform 0.25s ease, border-color 0.2s, box-shadow 0.2s;
```

### 7.3 标签/徽章 (Tag)

**标准标签**:
```css
display: inline-block;
font-family: var(--font-mono);
font-size: 0.72rem;
font-weight: 700;
padding: 0.15rem 0.5rem;
border-radius: 3px;
background: var(--bg2);
color: var(--muted);
```

**强调标签 (Accent)**:
```css
background: rgba(232, 119, 46, 0.12);
color: var(--accent);
```

**青色标签 (Teal)**:
```css
background: rgba(45, 212, 191, 0.12);
color: #0d9488;
```

### 7.4 导航栏 (Navbar)

**桌面端**:
```css
position: fixed;
top: 0;
width: 100%;
height: 80px;
padding: 0 2rem;
background: transparent;
z-index: 50;
transition: background 0.3s, height 0.3s, backdrop-filter 0.3s;
```

**滚动后状态 (Scrolled)**:
```css
background: rgba(250, 250, 248, 0.85);
backdrop-filter: blur(12px);
height: 60px;
border-bottom: 1px solid var(--rule);
```

**暗色模式滚动后**:
```css
background: rgba(26, 27, 46, 0.85);
```

**移动端 (< 768px)**:
- 高度 60px
- 右侧汉堡菜单按钮（三条横线，accent 色）
- 展开后为全屏遮罩菜单，白色/深色背景，大字号链接垂直排列

### 7.5 时间线 (Timeline)

**结构**:
- 左侧竖线: `width: 2px; background: var(--rule);`
- 节点圆点: `width: 12px; height: 12px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg);`
- 卡片区域: 左侧缩进 `1.5rem`

**展开/收起动效**:
```css
max-height: 0;
opacity: 0;
overflow: hidden;
transition: max-height 0.4s ease, opacity 0.3s ease;
/* 展开后 */
max-height: 800px;
opacity: 1;
```

### 7.6 数据看板卡片 (Metric Card)

**首页影响力看板专用**:
```css
background: var(--surface);
border: 1px solid var(--rule);
border-radius: 8px;
padding: 1.75rem 1.25rem;
text-align: center;
```

**数字样式**:
```css
font-size: 2.2rem;
font-weight: 700;
color: var(--accent);
font-family: var(--font-mono);
```

**标签样式**:
```css
font-size: 0.8rem;
color: var(--muted);
margin-top: 0.5rem;
```

### 7.7 表单输入 (Input)

```css
width: 100%;
padding: 0.65rem 0.875rem;
font-size: 0.95rem;
border: 1px solid var(--rule);
border-radius: 6px;
background: var(--surface);
color: var(--ink);
transition: border-color 0.2s, box-shadow 0.2s;
```
- Focus: `border-color: var(--accent); box-shadow: 0 0 0 3px rgba(232, 119, 46, 0.15)`
- Error: `border-color: var(--error)`

**文本域 (Textarea)**:
- `min-height: 120px; resize: vertical;`

**下拉选择 (Select)**:
- 同 Input 样式，右侧向下箭头图标（SVG，muted 色）

### 7.8 表格 (Table)

```css
width: 100%;
border-collapse: collapse;
font-size: 0.9rem;
```

**表头**:
```css
background: var(--ink);
color: white;
font-weight: 700;
font-size: 0.8rem;
padding: 0.75rem 1rem;
text-align: left;
```

**单元格**:
```css
padding: 0.75rem 1rem;
border-bottom: 1px solid var(--rule);
```

**交替行**:
```css
tr:nth-child(even) td { background: var(--bg2); }
```

**Hover**:
```css
tr:hover td { background: rgba(232, 119, 46, 0.06); }
```

### 7.9 代码块 (Code Block)

```css
font-family: var(--font-mono);
font-size: 0.85em;
background: var(--bg2);
padding: 0.15em 0.4em;
border-radius: 3px;
color: var(--accent);
```

---

## 8. 动画与过渡

### 8.1 全局过渡

```css
/* 颜色主题切换 */
--transition-theme: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

/* 交互反馈 */
--transition-fast: all 0.15s ease;
--transition-base: all 0.2s ease;
--transition-slow: all 0.3s ease;
```

### 8.2 页面加载动画

- **影响力看板数字**: 从 0 计数滚动到目标值，持续 1.5s，使用 `ease-out`
- **卡片入场**: `opacity: 0 → 1, translateY(20px) → 0`， stagger 间隔 0.1s
- **时间线节点**: 依次从左侧滑入，stagger 间隔 0.15s

### 8.3 滚动触发动画

使用 Intersection Observer，当元素进入视口 20% 时触发:
```css
opacity: 0;
transform: translateY(24px);
transition: opacity 0.5s ease, transform 0.5s ease;

&.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 8.4 Hover 效果

- **卡片**: `translateY(-2px) + shadow-md + border-accent`
- **按钮**: `translateY(-1px) + background 变暗`
- **链接**: `color → accent`
- **标签**: 无特殊 hover（保持静态）

---

## 9. 暗色模式详细映射

| 元素 | 亮色模式 | 暗色模式 | 切换过渡 |
|------|---------|---------|---------|
| 页面背景 | `#fafaf8` | `#1a1b2e` | `background 0.3s` |
| 卡片背景 | `#ffffff` | `#2a2c42` | `background 0.3s` |
| 主文字 | `#1a1b2e` | `#f0f0ec` | `color 0.3s` |
| 次级文字 | `#6b7280` | `#9ca3af` | `color 0.3s` |
| 边框 | `#e5e5e0` | `#3f4155` | `border-color 0.3s` |
| 强调色 | `#e8772e` | `#f0934a` | `color 0.3s` |
| 导航栏背景(滚动后) | `rgba(250,250,248,0.85)` | `rgba(26,27,46,0.85)` | `background 0.3s` |
| 表格表头 | `#1a1b2e` | `#252638` | `background 0.3s` |
| 阴影 | `rgba(26,27,46,0.08)` | `rgba(0,0,0,0.3)` | `box-shadow 0.3s` |

**主题切换按钮**:
- 位置: 导航栏最右侧
- 图标: 太阳(亮色) / 月亮(暗色)，SVG，大小 20px
- 点击后: `localStorage.setItem('theme', 'dark'|'light')`，同时设置 `document.documentElement.dataset.theme`

---

## 10. 图标系统

### 10.1 图标来源

使用 **Lucide React** 图标库（`lucide-react`），按需提供，无需全量引入。

### 10.2 各页面所需图标清单

| 页面 | 图标名称 | 用途 |
|------|---------|------|
| 全局 | Menu, X, Sun, Moon | 汉堡菜单、关闭、主题切换 |
| 首页 | ArrowRight, Mail, Briefcase, BookOpen, Award | CTA箭头、联系方式、项目、博客、认证 |
| 关于我 | ChevronDown, ExternalLink | 展开/收起、外部链接 |
| 工作经历 | Building2, Calendar, Users, DollarSign | 公司、时间、团队、资金 |
| 项目 | Filter, Search, ArrowUpRight, GitBranch | 筛选、搜索、外部链接、分支 |
| 博客 | Clock, Tag, Search, ChevronLeft, ChevronRight | 阅读时间、标签、搜索、翻页 |
| 联系 | Send, Phone, MapPin, Linkedin, Github | 发送、电话、地址、社交 |

### 10.3 图标规范

- 默认大小: `20px` (1.25rem)
- 按钮内图标: `16px`
- 导航栏图标: `20px`
- 颜色: 默认 `currentColor`，hover 时跟随父元素

---

## 11. 特殊组件规范

### 11.1 能力金字塔 (Ability Pyramid)

**视觉结构**: 三层堆叠的梯形，从上到下依次变宽
- 顶层（战略层）: 最窄，accent 色背景
- 中层（战术层）: 中等宽度，accent2 色背景
- 底层（执行层）: 最宽，bg2 背景

**交互**: 点击每层展开/收起详细能力列表

### 11.2 项目筛选器 (Project Filter)

**视觉**: 横向排列的 pill 形按钮组
```css
display: flex;
gap: 0.5rem;
flex-wrap: wrap;
```

**状态**:
- 默认: `background: var(--bg2); color: var(--muted);`
- 激活: `background: var(--accent); color: white;`
- Hover(未激活): `background: var(--rule)`

**过渡**: `background 0.2s, color 0.2s`

**筛选动画**: 被过滤掉的卡片 `opacity → 0, scale → 0.95`，持续 0.25s；保留的卡片重新排列，使用 CSS Grid 自动重排

### 11.3 目录导航 (TOC)

**桌面端**: 右侧固定，距顶部 `100px`，宽度 `200px`
```css
position: fixed;
right: calc((100vw - 920px) / 2 - 220px);
top: 100px;
width: 200px;
```

**移动端**: 文章顶部可折叠的面板
```css
width: 100%;
max-height: 0;
overflow: hidden;
transition: max-height 0.3s;
```

**激活状态**: 当前阅读到的章节标题高亮，`color: var(--accent); font-weight: 700`

### 11.4 项目卡片 (Project Card)

**封面图区域**: 宽高比 16:9，`border-radius: 6px 6px 0 0`，`object-fit: cover`
**内容区域**: `padding: 1.25rem`
**标签区域**: 底部，flex 换行排列
**Hover**: 整体卡片 `translateY(-4px) + shadow-lg`，封面图 `scale(1.03)`（overflow hidden 裁剪）

### 11.5 资质认证徽章 (Cert Badge)

**布局**: 左右结构，左侧徽章图标，右侧文字信息
```css
display: flex;
gap: 1rem;
align-items: center;
padding: 1.25rem;
border: 1px solid var(--rule);
border-radius: 8px;
```

**徽章图标**: 圆形，直径 56px，accent 色背景，白色图标/文字
**认证名称**: `font-weight: 700; font-size: 1rem`
**认证编号**: `font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted)`

---

## 12. 图片处理规范

### 12.1 头像/职业照
- 尺寸: 400x400px 以上
- 比例: 1:1（圆形裁剪）
- 格式: WebP（优先）/ JPG
- 背景: 纯色或模糊办公环境

### 12.2 项目封面图
- 尺寸: 1280x720px (16:9)
- 格式: WebP
- 风格: 统一使用项目截图或高质量示意图
- 暗色模式下: 保持原图，无需特殊处理

### 12.3 文章配图
- 最大宽度: 容器宽度（不超过 920px）
- 格式: WebP
- 懒加载: 使用 Next.js Image 组件自动处理

---

## 13. 无障碍规范 (Accessibility)

### 13.1 色彩对比度
- 主文字 `--ink` on `--bg`: 对比度 >= 12:1
- 次级文字 `--muted` on `--bg`: 对比度 >= 4.6:1
- 按钮文字 white on `--accent`: 对比度 >= 3.5:1

### 13.2 焦点状态
- 所有可交互元素必须有可见的焦点环
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### 13.3 语义化 HTML
- 使用正确的标题层级 (`h1 > h2 > h3`)
- 导航使用 `<nav>`，文章使用 `<article>`，页脚使用 `<footer>`
- 按钮使用 `<button>`，链接使用 `<a>`，不使用 div 模拟

### 13.4 动画减弱
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 13.5 ARIA 标签
- 导航栏: `aria-label="主导航"`
- 主题切换按钮: `aria-label="切换暗色模式"`
- 移动端菜单按钮: `aria-expanded="true|false"`
- 时间线展开按钮: `aria-expanded` + `aria-controls`
