# 页面级精确视觉规格

> 版本: v1.0
> 项目: 涂奎个人网站
> 用途: Trae Code 编码的直接像素级输入
> 前置依赖: `01-design-system.md` (设计系统) + `02-prototype.md` (原型设计)

---

## 0. 全局布局常数

### 0.1 容器系统

```
Breakpoint:  Mobile  < 640px  |  Tablet  640-1024px  |  Desktop  > 1024px
Container:   full-width       |  max-w-5xl (64rem)   |  max-w-6xl (72rem)
Padding-x:   px-4 (16px)      |  px-6 (24px)         |  px-8 (32px)
```

### 0.2 Section 间距系统

| 场景 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Section 上下间距 | `py-20` (80px) | `py-16` (64px) | `py-12` (48px) |
| Section 内部元素间距 | `gap-10` (40px) | `gap-8` (32px) | `gap-6` (24px) |
| 相邻 Section 分隔线 | 1px rule, 无或有 | 同左 | 同左 |

### 0.3 Navbar 精确规格

```
高度: 80px (desktop) / 64px (mobile)
背景: transparent → bg/80 backdrop-blur-md (滚动后)
滚动阈值: scrollY > 20px 触发背景变化
过渡: background-color 0.3s ease, height 0.3s ease
滚动后高度: 60px (desktop) / 56px (mobile)

Logo 区: 左对齐, 字体 1.125rem, font-weight 700, letter-spacing -0.02em
导航链接: 右对齐, 间距 gap-8, 字体 0.875rem, font-weight 500
移动端: hamburger 按钮, 24x24px, 右侧对齐
```

### 0.4 Footer 精确规格

```
高度: auto (内容驱动)
上边框: 1px solid var(--rule)
上内边距: py-16 (64px)
下内边距: py-8 (32px)
布局: 三列 grid (desktop) → 单列 stack (mobile)
列间距: gap-12
```

---

## 1. 首页 `/`

### 1.1 页面整体结构

```
+----------------------------------------------------------+
| Navbar (80px fixed)                                      |
+----------------------------------------------------------+
| Hero Section (min-h: calc(100vh - 80px))                 |
|   - 全屏深色背景 + 渐变遮罩                               |
|   - 内容垂直居中                                         |
+----------------------------------------------------------+
| ImpactBoard Section                                      |
|   - 背景: var(--bg)                                      |
|   - 5 指标卡片横向排列                                    |
+----------------------------------------------------------+
| LatestUpdates Section                                    |
|   - 背景: var(--bg2)                                     |
|   - 精选项目 + 博客文章混合展示                            |
+----------------------------------------------------------+
| SkillTags Section                                        |
|   - 背景: var(--bg)                                      |
|   - 能力标签云                                           |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 1.2 Hero Section 精确规格

```
高度: min-h-[calc(100vh-80px)] (减去navbar)
背景:
  - 基础色: var(--ink) (#1a1b2e)
  - 径向渐变: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,119,46,0.15), transparent)
  - 网格纹理: 可选，1px线，opacity 0.03

内容区:
  - 垂直居中: flex items-center justify-center
  - 最大宽度: max-w-4xl (56rem)
  - 水平居中: mx-auto
  - 文字对齐: text-center

徽章:
  - display: inline-flex
  - padding: px-3 py-1
  - border: 1px solid var(--accent) / 30%
  - border-radius: 9999px (full)
  - 字体: 0.75rem, font-mono, font-weight 500
  - 颜色: var(--accent)
  - 下边距: mb-6

主标题 (h1):
  - 字体: 3rem (mobile) / 4.5rem (desktop), font-weight 700, line-height 1.1
  - 颜色: white
  - 下边距: mb-6
  - text-wrap: balance

副标题 (p):
  - 字体: 1.125rem (mobile) / 1.25rem (desktop), font-weight 400, line-height 1.7
  - 颜色: white/70%
  - 最大宽度: max-w-2xl (42rem)
  - 水平居中: mx-auto
  - 下边距: mb-10

CTA 按钮组:
  - display: flex, justify-center, gap-4
  - 移动端: flex-col (垂直堆叠)
  - 主按钮: btn-primary (见设计系统)
  - 次按钮: btn-secondary (背景 white/10, border white/20, 文字 white)

社交链接:
  - 位置: 绝对定位, bottom: 32px, 水平居中
  - display: flex, gap-6
  - 图标: 20x20px, 颜色 white/50%, hover white/100%
```

### 1.3 影响力看板 (ImpactBoard) 精确规格

```
Section padding: py-20 px-4 sm:px-6 lg:px-8
背景: var(--bg)

标题区:
  - 标题: "影响力数据", text-3xl, font-bold, text-center, mb-4
  - 副标题: "7年跨行业项目管理的量化成果", text-muted, text-center, mb-12

卡片容器:
  - display: grid
  - Desktop: grid-cols-5, gap-6
  - Tablet: grid-cols-3 (前3) + grid-cols-2 (后2), gap-4
  - Mobile: grid-cols-2 (前4) + grid-cols-1 (最后1居中), gap-4

单张卡片 (MetricCard):
  - 背景: var(--surface)
  - 边框: 1px solid var(--rule)
  - border-radius: 0.75rem (12px)
  - padding: 1.5rem (24px)
  - 文字对齐: text-center
  - 数字: text-4xl, font-bold, color: var(--accent), mb-2
  - 标签: text-sm, color: var(--muted)
  - hover: translateY(-4px), shadow-lg, transition 0.3s

数字动画:
  - 使用 CountUp 组件
  - duration: 2s
  - easing: ease-out
  - 触发: 元素进入视口时 (IntersectionObserver, threshold 0.3)
```

**5个指标的具体数据**:

| 指标 | 数字 | 标签 | 备注 |
|------|------|------|------|
| 累计管理资金 | 5000w+ | 项目资金规模 | hardcoded |
| 交付项目数 | 33+ | AI数据标注项目 | hardcoded |
| 峰值管理团队 | 800+ | 最大执行成员 | hardcoded |
| 跨行业数 | 5 | 行业覆盖 | hardcoded |
| 专业认证 | 2 | PMP & NPDP | hardcoded |

### 1.4 最新动态 (LatestUpdates) 精确规格

```
Section padding: py-20
背景: var(--bg2)

布局: 两列网格 (desktop) / 单列 (mobile)
  - grid-cols-1 lg:grid-cols-2, gap-10

左列: 精选项目 (2个)
  - 标题: "精选项目", text-2xl, font-bold, mb-6
  - 项目卡片: 同 ProjectCard 组件规格 (见第6章)

右列: 最新文章 (3篇)
  - 标题: "最新文章", text-2xl, font-bold, mb-6
  - 文章列表项:
    - 布局: flex, gap-4
    - 日期: text-xs, text-muted, font-mono, w-16
    - 标题: text-base, font-medium, hover:text-accent
    - 分割线: 底部 1px var(--rule), py-4
```

### 1.5 核心能力标签 (SkillTags) 精确规格

```
Section padding: py-20
背景: var(--bg)

标题: "核心能力", text-3xl, font-bold, text-center, mb-4
副标题: "战略层 · 战术层 · 执行层的项目管理能力体系", text-muted, text-center, mb-12

标签云布局:
  - display: flex, flex-wrap, justify-center, gap-3
  - 最大宽度: max-w-3xl, mx-auto

单标签:
  - padding: px-4 py-2
  - border-radius: 9999px
  - 字体: text-sm, font-medium
  - 背景: var(--bg2)
  - 边框: 1px solid var(--rule)
  - hover: bg-accent/10, border-accent/30, text-accent
  - transition: 0.2s

**三层标签分组** (视觉上通过颜色深浅区分):
- 战略层 (深色背景标签): PMO体系搭建、项目组合管理、战略规划、组织架构设计
- 战术层 (中色): 敏捷转型、需求管理、风险控制、跨部门协调、数据驱动决策
- 执行层 (浅色): JIRA、飞书、Confluence、项目管理、团队搭建、技术培训
```

---

## 2. 关于我 `/about`

### 2.1 页面整体结构

```
+----------------------------------------------------------+
| PageHeader: "关于我"                                     |
|   - 标题居中, 下方短描述                                  |
+----------------------------------------------------------+
| ProfileSection                                           |
|   - 左: 头像 + 基本信息                                   |
|   - 右: 个人简介                                          |
+----------------------------------------------------------+
| PhilosophySection                                        |
|   - 5条管理理念卡片, 可展开                               |
+----------------------------------------------------------+
| AbilityPyramid                                           |
|   - 三层金字塔可视化                                      |
+----------------------------------------------------------+
| Certifications                                           |
|   - PMP + NPDP 徽章展示                                   |
+----------------------------------------------------------+
| UsesList                                                 |
|   - 工具清单分类列表                                      |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 2.2 页面标题区 (PageHeader)

```
通用规格 (所有页面共用):
  - padding: pt-32 (128px, 为fixed navbar留空间) pb-16
  - 背景: var(--bg)
  - 标题: text-4xl, font-bold, text-center, mb-4
  - 副标题/描述: text-lg, text-muted, text-center, max-w-2xl, mx-auto
```

### 2.3 个人简介 (ProfileSection) 精确规格

```
Section padding: py-16
布局: grid grid-cols-1 lg:grid-cols-3, gap-12

左列 (1/3):
  - 头像: 192x192px, rounded-full, border-4 border-accent/20
  - 姓名: text-2xl, font-bold, mt-6
  - 职位: text-muted, mt-1
  - 地点/联系: text-sm, text-muted, mt-4, flex flex-col gap-2

右列 (2/3):
  - 标题: "个人简介", text-2xl, font-bold, mb-6
  - 正文: text-base, leading-relaxed (1.75), space-y-4
  - 重点句子: 使用 var(--accent) 或 font-bold 强调
```

### 2.4 管理理念 (PhilosophySection) 精确规格

```
Section padding: py-16
背景: var(--bg2)

标题: "管理理念", text-3xl, font-bold, text-center, mb-12

卡片容器:
  - display: grid
  - Desktop: grid-cols-3, gap-6
  - Tablet: grid-cols-2, gap-4
  - Mobile: grid-cols-1, gap-4

单张卡片 (可展开):
  - 默认状态:
    - 背景: var(--surface)
    - border-radius: 0.75rem
    - padding: 1.5rem
    - 图标: 40x40px, rounded-lg, bg-accent/10, 图标居中
    - 标题: text-lg, font-semibold, mt-4
    - 摘要: text-sm, text-muted, mt-2, 2行截断
    - "了解更多 →" 链接: text-sm, text-accent, mt-4

  - 展开状态 (点击后):
    - 卡片占满整行或弹出 modal (推荐卡片内展开)
    - 展开内容: 详细描述 + 实践案例 + 相关项目链接
    - 动画: max-height 0.4s ease, opacity 0.3s ease
```

**5条管理理念卡片内容**:

| # | 标题 | 图标 | 摘要 |
|---|------|------|------|
| 1 | 体系先行 | Shield | 没有流程规范的项目管理是救火，建立体系是规模化交付的前提 |
| 2 | 数据驱动 | BarChart | 用指标说话，让项目状态透明化，用数据支撑决策而非经验直觉 |
| 3 | 人即核心 | Users | 流程是骨架，团队是血液。再完美的流程也需要合适的人来执行 |
| 4 | 敏捷务实 | Zap | 不追求完美的敏捷，追求适合团队当前阶段的实践组合 |
| 5 | 价值导向 | Target | 项目管理的终极目标不是按时交付，而是交付真正的业务价值 |

### 2.5 能力金字塔 (AbilityPyramid) 精确规格

```
Section padding: py-16

标题: "能力金字塔", text-3xl, font-bold, text-center, mb-4
副标题: "战略层 → 战术层 → 执行层", text-muted, text-center, mb-12

金字塔容器:
  - 最大宽度: max-w-2xl, mx-auto
  - display: flex, flex-col, align-items-center

三层结构 (从上到下):

顶层 - 战略层 (最窄):
  - 宽度: w-1/3 (约 33%)
  - 背景: var(--accent)
  - 颜色: white
  - padding: py-4 px-6
  - border-radius: 0.5rem 0.5rem 0 0
  - 标签: "战略层", text-center, font-bold
  - 内容: 项目组合管理、PMO体系搭建、战略规划

中层 - 战术层 (中等):
  - 宽度: w-2/3 (约 66%)
  - 背景: var(--accent) / 70%
  - 颜色: white
  - padding: py-4 px-6
  - 内容: 敏捷转型、需求管理、风险控制、跨部门协调

底层 - 执行层 (最宽):
  - 宽度: w-full (100%)
  - 背景: var(--accent) / 40%
  - 颜色: var(--ink)
  - padding: py-4 px-6
  - border-radius: 0 0 0.5rem 0.5rem
  - 内容: JIRA、飞书、Confluence、项目管理、团队搭建、技术培训

层间连接线:
  - 每层之间: 2px 间隔，背景 transparent

交互:
  - 悬停某层: 该层 opacity 100%, 其他层 opacity 60%
  - 显示 tooltip: 该层详细能力描述
```

### 2.6 资质认证 (Certifications) 精确规格

```
Section padding: py-16
背景: var(--bg2)

标题: "专业认证", text-3xl, font-bold, text-center, mb-12

徽章容器:
  - display: flex, justify-center, gap-8
  - Mobile: flex-col, align-items-center, gap-6

单个徽章:
  - 尺寸: 160x200px (宽x高)
  - 背景: var(--surface)
  - border: 2px solid var(--rule)
  - border-radius: 1rem
  - padding: 1.5rem
  - 文字对齐: center

  徽章图标区:
    - 64x64px, rounded-full, bg-accent/10, mx-auto
    - 图标: 32x32px, color: var(--accent)

  徽章名称:
    - text-lg, font-bold, mt-4

  徽章编号/详情:
    - text-xs, text-muted, font-mono, mt-2

  状态标签:
    - "已认证", px-2 py-0.5, rounded-full, bg-green-100, text-green-700, text-xs

**两个徽章**:
| 名称 | 图标 | 详情 |
|------|------|------|
| PMP | Award | 项目管理专业人士认证 |
| NPDP | Lightbulb | 新产品开发专业人士认证 |
```

### 2.7 工具清单 (UsesList) 精确规格

```
Section padding: py-16

标题: "常用工具", text-3xl, font-bold, text-center, mb-12

分类网格:
  - display: grid
  - Desktop: grid-cols-4, gap-8
  - Tablet: grid-cols-2, gap-6
  - Mobile: grid-cols-1, gap-6

单分类卡片:
  - 标题: text-lg, font-semibold, mb-4, 带左侧 3px accent 色条
  - 工具列表: flex flex-col gap-3
  - 单个工具: flex items-center gap-3
    - 图标/色点: 8x8px, rounded-full, bg-accent
    - 名称: text-base
    - 用途: text-sm, text-muted
```

---

## 3. 工作经历 `/experience`

### 3.1 页面整体结构

```
+----------------------------------------------------------+
| PageHeader: "工作经历"                                   |
+----------------------------------------------------------+
| CareerPath (横向时间线)                                  |
+----------------------------------------------------------+
| ExperienceTimeline (纵向详细时间线)                       |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 3.2 成长路径 (CareerPath) 精确规格

```
Section padding: py-16
背景: var(--bg2)

标题: "成长路径", text-3xl, font-bold, text-center, mb-12

时间线容器:
  - 最大宽度: max-w-5xl, mx-auto
  - overflow-x: auto (移动端可横向滚动)
  - padding-bottom: 16px (为滚动条留空间)

横向时间线:
  - display: flex, justify-between, align-items-center
  - 相对定位

连接线:
  - 绝对定位, top: 50%, left: 0, right: 0
  - height: 2px
  - 背景: var(--rule)
  - z-index: 0

节点:
  - 位置: relative, z-index: 1
  - display: flex, flex-col, align-items-center
  - 最小宽度: 120px

  节点圆点:
    - 16x16px, rounded-full
    - 当前节点: bg-accent, ring-4 ring-accent/20
    - 过往节点: bg-muted
    - 过渡: 0.3s

  节点标签:
    - mt-3, text-sm, font-medium, text-center
    - 最大宽度: 100px

  节点时间:
    - mt-1, text-xs, text-muted, font-mono

  节点数据标签 (下方小徽章):
    - mt-2, px-2 py-0.5, rounded-full, bg-accent/10, text-accent, text-xs

**5个节点数据**:
| 位置 | 标签 | 时间 | 数据标签 |
|------|------|------|---------|
| 1 | 湛腾世纪 | 2018-2020 | 23人团队 |
| 2 | 字节跳动 | 2020-2021 | 800+人 |
| 3 | 三维天地 | 2021-2023 | 480w项目 |
| 4 | 瀚华融资 | 2022-2024 | 20人 |
| 5 | 中国电信 | 2024-至今 | 2000w+ |
```

### 3.3 详细时间线 (ExperienceTimeline) 精确规格

```
Section padding: py-16

时间线轴:
  - 左侧: 绝对定位竖线
  - 位置: left: 24px (desktop) / 16px (mobile)
  - 宽度: 2px
  - 背景: var(--rule)
  - 高度: 100%

时间线项:
  - 左侧留白: pl-16 (desktop) / pl-12 (mobile)
  - 每项间距: mb-8

单条经历 (默认收起):
  - 头部:
    - 公司名: text-xl, font-bold
    - 职位·时间: text-sm, text-muted, mt-1
    - 行业标签: mt-2, inline-flex, px-2 py-0.5, rounded, bg-bg2, text-xs

  - 展开按钮:
    - mt-3, text-sm, text-accent, flex items-center gap-1
    - 图标: ChevronDown, 展开时旋转 180deg

  - 展开内容:
    - mt-4, pt-4, border-top: 1px var(--rule)
    - 分区块: 职责描述 / 核心成果 / 关键转折 / 工具方法论
    - 各区块标题: text-sm, font-semibold, uppercase, tracking-wider, text-muted, mb-2
    - 列表项: flex gap-2, 左侧小圆点 accent 色

动画:
  - 展开: max-height 0→auto (0.4s ease), opacity 0→1 (0.3s)
  - 收起: max-height auto→0 (0.3s ease), opacity 1→0 (0.2s)
  - 同一时间仅一项展开
```

---

## 4. 项目作品集 `/projects`

### 4.1 页面整体结构

```
+----------------------------------------------------------+
| PageHeader: "项目作品"                                   |
+----------------------------------------------------------+
| ProjectFilter (筛选器)                                   |
+----------------------------------------------------------+
| ProjectGallery                                           |
|   - 重点项目 (4个, 大卡片)                                |
|   - 补充项目 (2个, 小卡片)                                |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 4.2 项目筛选器 (ProjectFilter) 精确规格

```
Section padding: pb-8 (与header衔接)

筛选按钮组:
  - display: flex, flex-wrap, justify-center, gap-2

单按钮:
  - padding: px-4 py-2
  - border-radius: 9999px
  - 字体: text-sm, font-medium
  - 默认状态: bg-bg2, text-muted
  - 激活状态: bg-accent, text-white
  - hover: bg-accent/10, text-accent (非激活)
  - transition: 0.2s

**筛选选项**:
| id | label |
|----|-------|
| all | 全部 |
| ai-gov | AI+政务 |
| data-governance | 数据治理 |
| fintech | 金融科技 |
| scale | 规模化交付 |
```

### 4.3 项目画廊 (ProjectGallery) 精确规格

```
重点项目区 (Featured):
  - display: grid
  - Desktop: grid-cols-2, gap-8
  - Mobile: grid-cols-1, gap-6

补充项目区 (Secondary):
  - display: grid
  - Desktop: grid-cols-2, gap-6 (放在重点项目下方，宽度较小)
  - Mobile: grid-cols-1, gap-6
  - 或使用单列列表样式

项目卡片 (ProjectCard):
  - 背景: var(--surface)
  - border: 1px solid var(--rule)
  - border-radius: 0.75rem
  - overflow: hidden
  - hover: translateY(-4px), shadow-lg, transition 0.3s

  封面图:
    - 宽高比: 16/9
    - object-fit: cover
    - hover: scale 1.05, transition 0.5s

  内容区:
    - padding: 1.5rem

  标题:
    - text-lg, font-semibold, mb-2

  元信息行:
    - flex, flex-wrap, gap-2, mb-3
    - 标签: px-2 py-0.5, rounded, bg-bg2, text-xs, text-muted

  描述:
    - text-sm, text-muted, line-clamp-2, mb-4

  底部数据:
    - flex, justify-between, align-items-center
    - 资金/团队: text-sm, font-medium
    - 箭头图标: 20x20px, text-accent

筛选动画:
  - 不匹配卡片: opacity→0, scale→0.95, transition 0.2s, 然后 display:none
  - 匹配卡片: opacity→1, scale→1, transition 0.3s
```

---

## 5. 管理方法论 `/methodology`

### 5.1 页面整体结构

```
+----------------------------------------------------------+
| PageHeader: "管理方法论"                                 |
+----------------------------------------------------------+
| MethodologyOverview (3列卡片)                            |
+----------------------------------------------------------+
| ProcessList (制度规范, 可展开)                            |
+----------------------------------------------------------+
| ToolchainDiagram (工具链架构)                            |
+----------------------------------------------------------+
| TemplateDownloads (模板下载)                             |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 5.2 体系概览 (MethodologyOverview) 精确规格

```
Section padding: py-16

3列卡片:
  - display: grid
  - Desktop: grid-cols-3, gap-8
  - Mobile: grid-cols-1, gap-6

单卡片:
  - 背景: var(--surface)
  - border: 1px solid var(--rule)
  - border-radius: 0.75rem
  - padding: 2rem
  - 图标: 48x48px, rounded-xl, bg-accent/10, mb-6
  - 标题: text-xl, font-bold, mb-3
  - 描述: text-muted, mb-4
  - 列表: flex flex-col gap-2
    - 每项: flex gap-2, text-sm
    - 标记: 6x6px rounded-full bg-accent, mt-1.5

**3张卡片**:
| 标题 | 图标 | 描述 | 列表项 |
|------|------|------|--------|
| PMO体系 | Layers | 从0到1搭建PMO管理体系的完整框架 | 组织架构、角色定义、流程规范、度量体系 |
| 敏捷实践 | Zap | 适合中国团队的务实敏捷转型路径 | Scrum/Kanban混合、迭代节奏、回顾机制 |
| 数据驱动 | BarChart | 用数据替代直觉的管理决策方法 | 指标体系、仪表板、预警机制、复盘分析 |
```

### 5.3 制度规范列表 (ProcessList) 精确规格

```
Section padding: py-16
背景: var(--bg2)

标题: "制度规范", text-3xl, font-bold, text-center, mb-12

列表容器:
  - 最大宽度: max-w-3xl, mx-auto
  - display: flex, flex-col, gap-4

单列表项 (可展开):
  - 背景: var(--surface)
  - border: 1px solid var(--rule)
  - border-radius: 0.5rem
  - 默认 padding: px-6 py-4

  头部:
    - flex, justify-between, align-items-center
    - 序号: text-2xl, font-bold, text-accent/30, w-12
    - 标题: text-lg, font-semibold
    - 图标: ChevronDown, 20x20px, text-muted

  展开内容:
    - padding-top: 4
    - border-top: 1px var(--rule), mt-4
    - 正文: text-muted, leading-relaxed

**4项制度**:
| # | 标题 | 内容概要 |
|---|------|---------|
| 01 | 项目管理规范 | 项目全生命周期流程定义，从立项到结项的标准化操作 |
| 02 | 研发流程规范 | 需求评审、技术方案、代码审查、测试验收的协作标准 |
| 03 | 绩效评价体系 | 基于OKR+KPI的混合绩效评估，量化团队产出质量 |
| 04 | 知识库与模板库 | 项目文档标准化模板、复盘模板、交接清单的可复用沉淀 |
```

---

## 6. 博客 `/blog`

### 6.1 博客列表页 `/blog`

```
+----------------------------------------------------------+
| PageHeader: "博客文章"                                   |
+----------------------------------------------------------+
| 分类筛选 + 搜索栏                                         |
+----------------------------------------------------------+
| ArticleList                                              |
|   - Grid 布局文章卡片                                     |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

#### 搜索栏精确规格

```
搜索容器:
  - 最大宽度: max-w-xl, mx-auto, mb-12
  - display: flex, gap-2

输入框:
  - flex: 1
  - height: 44px
  - padding: px-4
  - border: 1px solid var(--rule)
  - border-radius: 0.5rem
  - 背景: var(--surface)
  - focus: border-accent, ring-2 ring-accent/20

搜索按钮:
  - width: 44px, height: 44px
  - 背景: var(--accent)
  - 颜色: white
  - border-radius: 0.5rem
```

#### 文章卡片 (ArticleCard) 精确规格

```
卡片容器:
  - display: grid
  - Desktop: grid-cols-3, gap-8
  - Tablet: grid-cols-2, gap-6
  - Mobile: grid-cols-1, gap-6

单卡片:
  - 背景: var(--surface)
  - border: 1px solid var(--rule)
  - border-radius: 0.75rem
  - overflow: hidden
  - hover: translateY(-4px), shadow-lg

  封面图 (可选):
    - 宽高比: 16/9
    - 无封面时使用纯色背景 + 首字母大图标

  内容区:
    - padding: 1.5rem

  分类标签:
    - px-2 py-0.5, rounded, bg-accent/10, text-accent, text-xs, mb-3

  标题:
    - text-lg, font-semibold, line-clamp-2, mb-2

  描述:
    - text-sm, text-muted, line-clamp-3, mb-4

  底部:
    - flex, justify-between, align-items-center
    - 日期: text-xs, text-muted, font-mono
    - 阅读时长: text-xs, text-muted
```

### 6.2 博客详情页 `/blog/[slug]`

```
+----------------------------------------------------------+
| 返回按钮 + 分类标签                                       |
+----------------------------------------------------------+
| 文章标题 + 元信息                                         |
+----------------------------------------------------------+
| 两列布局:                                                |
|   左 (3/4): 文章内容                                      |
|   右 (1/4): 目录导航 (sticky)                             |
+----------------------------------------------------------+
| 分享按钮 + 上下篇导航                                     |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

#### 文章正文排版精确规格

```
文章容器:
  - 最大宽度: max-w-3xl (文章正文不宜过宽，保证阅读体验)
  - 字体大小: text-lg (18px), line-height: 1.8
  - 段落间距: space-y-6

标题层级:
  - h2: text-3xl, font-bold, mt-12, mb-6, pb-2, border-bottom 2px var(--rule)
  - h3: text-2xl, font-semibold, mt-8, mb-4
  - h4: text-xl, font-semibold, mt-6, mb-3

引用块:
  - 左侧边框: 4px solid var(--accent)
  - 背景: var(--bg2)
  - padding: 1rem 1.5rem
  - border-radius: 0 0.5rem 0.5rem 0
  - 字体: italic

代码块:
  - 背景: var(--ink)
  - 颜色: var(--bg)
  - padding: 1.5rem
  - border-radius: 0.75rem
  - overflow-x: auto
  - 字体: Geist Mono, 0.875rem

内联代码:
  - 背景: var(--bg2)
  - padding: px-1.5 py-0.5
  - border-radius: 0.25rem
  - 字体: Geist Mono, 0.875em

列表:
  - 无序列表: disc, pl-6, space-y-2
  - 有序列表: decimal, pl-6, space-y-2

链接:
  - 颜色: var(--accent)
  - hover: underline
  - 外部链接: 尾部加 ↗ 图标

图片:
  - 最大宽度: 100%
  - border-radius: 0.5rem
  - 居中: mx-auto
  - 标题: text-sm, text-muted, text-center, mt-2
```

#### 目录导航 (Toc) 精确规格

```
容器:
  - position: sticky
  - top: 100px (为 navbar 留空间)
  - 最大高度: calc(100vh - 120px)
  - overflow-y: auto

标题: "目录", text-sm, font-semibold, uppercase, tracking-wider, mb-4

链接列表:
  - display: flex, flex-col, gap-2
  - border-left: 2px solid var(--rule)
  - padding-left: 1rem

单链接:
  - 字体: text-sm
  - 默认颜色: text-muted
  - hover: text-ink
  - 激活状态 (当前可见标题): text-accent, font-medium, border-left 2px accent (向左偏移覆盖父边框)
  - 缩进层级:
    - h2: ml-0
    - h3: ml-3
    - h4: ml-6
```

---

## 7. 联系 `/contact`

### 7.1 页面整体结构

```
+----------------------------------------------------------+
| PageHeader: "联系我"                                     |
+----------------------------------------------------------+
| 两列布局:                                                |
|   左 (1/2): 联系表单                                      |
|   右 (1/2): 直接联系信息                                  |
+----------------------------------------------------------+
| Footer                                                   |
+----------------------------------------------------------+
```

### 7.2 联系表单精确规格

```
表单容器:
  - 背景: var(--surface)
  - border: 1px solid var(--rule)
  - border-radius: 1rem
  - padding: 2rem (desktop) / 1.5rem (mobile)

表单布局:
  - display: flex, flex-col, gap-6

输入项标签:
  - text-sm, font-medium, mb-1.5
  - 必填标记: 红色星号 *

输入框通用:
  - width: 100%
  - height: 44px
  - padding: px-4
  - border: 1px solid var(--rule)
  - border-radius: 0.5rem
  - 背景: var(--bg)
  - focus: border-accent, ring-2 ring-accent/20
  - 错误状态: border-red-500, bg-red-50

文本域:
  - height: 160px
  - padding: px-4 py-3
  - resize: vertical

下拉选择:
  - 同输入框高度
  - 右侧下拉箭头图标

错误提示:
  - mt-1.5, text-xs, text-red-500

提交按钮:
  - width: 100%
  - height: 48px
  - 背景: var(--accent)
  - 颜色: white
  - border-radius: 0.5rem
  - 字体: font-medium
  - hover: bg-accent/90
  - 加载状态: opacity 70%, cursor not-allowed, 显示 spinner
```

### 7.3 直接联系信息精确规格

```
信息卡片:
  - display: flex, flex-col, gap-6

单信息项:
  - display: flex, gap-4

  图标容器:
    - 48x48px, rounded-xl, bg-accent/10
    - flex items-center justify-center
    - 图标: 24x24px, color: var(--accent)

  内容:
    - 标签: text-sm, text-muted
    - 值: text-base, font-medium
    - 链接: hover:text-accent

**信息项**:
| 图标 | 标签 | 值 |
|------|------|-----|
| Mail | 邮箱 | 1634099882@qq.com |
| MapPin | 地点 | 重庆市江北区江北城 |
| Briefcase | 当前职位 | 中国电信重庆分公司 · 产品项目经理 |
```

---

## 8. 全局组件精确规格

### 8.1 ScrollReveal 动画参数

```
默认配置:
  - 初始状态: opacity: 0, translateY: 30px
  - 动画后: opacity: 1, translateY: 0
  - duration: 0.6s
  - easing: cubic-bezier(0.16, 1, 0.3, 1)
  - 触发: IntersectionObserver, threshold: 0.15
  - 只触发一次: true

交错动画 (子元素依次出现):
  - 每个子元素 delay: index * 0.1s
  - 最大 delay: 0.5s (防止过多元素等待过长)
```

### 8.2 页面转场 (template.tsx)

```
过渡效果:
  - 初始: opacity: 0, translateY: 10px
  - 进入: opacity: 1, translateY: 0
  - duration: 0.3s
  - easing: ease-out
```

### 8.3 暗色模式切换过渡

```
全局过渡:
  - 所有颜色变化添加 transition
  - duration: 0.3s
  - easing: ease
  - 应用于: background-color, color, border-color, fill, stroke
```

---

## 9. 响应式断点总结

| 断点 | 宽度 | Tailwind 前缀 | 核心变化 |
|------|------|--------------|---------|
| Mobile | < 640px | 无前缀 | 单列布局、减小间距、汉堡菜单 |
| Tablet | 640-1024px | `sm:` / `md:` | 两列网格、中等间距 |
| Desktop | > 1024px | `lg:` | 完整多列布局、最大间距 |

**关键响应式规则**:
- 所有 grid 布局必须有 mobile fallback (grid-cols-1)
- 导航栏在 lg 以下切换为汉堡菜单
- 字体大小在 mobile 下降 1-2 级
- Section padding 在 mobile 减半
- 卡片在 mobile 全宽显示
