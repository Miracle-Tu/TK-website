# 个人网站 TinaCMS 集成迭代 - 产品需求文档

## Overview
- **Summary**: 将现有个人网站的内容管理方式从直接 MDX 文件读取，升级为 TinaCMS (Git-based CMS) 方案，提供可视化内容编辑界面，同时保持内容存于 Git 仓库的优势。
- **Purpose**: 降低内容更新门槛，使非技术人员也能通过可视化界面编辑网站内容；同时保留 Git 版本控制和静态生成的性能优势。
- **Target Users**: 网站所有者（涂奎）、内容编辑者。

## Goals
- 集成 TinaCMS 到现有 Next.js 项目
- 定义 5 个 Collection Schema: project, post, experience, methodology, site
- 重构内容查询层使用 TinaCMS 客户端
- 提供可视化编辑界面 (`/admin`)
- 保持所有现有页面功能和视觉效果不变
- 保持 SSG 静态生成和 SEO 优化

## Non-Goals (Out of Scope)
- 迁移到 SaaS CMS (Sanity/Contentful)
- 添加数据库
- 修改页面布局和视觉设计
- 新增页面或功能模块
- 改变技术栈框架

## Background & Context
原方案使用 `fs + gray-matter + next-mdx-remote` 直接读取 MDX 文件，存在以下问题：
1. 内容编辑需要修改代码文件，门槛高
2. 无可视化编辑界面
3. 需要熟悉 Markdown 语法

TinaCMS 是 Git-based CMS，内容仍存于 MDX 文件，但提供了可视化编辑界面和类型安全的 GraphQL 查询客户端。

## Functional Requirements
- **FR-1**: TinaCMS 配置与初始化，生成 GraphQL 客户端
- **FR-2**: 定义 5 个 Collection Schema (project/post/experience/methodology/site)
- **FR-3**: 重构 `lib/content.ts` 使用 TinaCMS 客户端查询
- **FR-4**: 创建 `TinaMarkdownRenderer` 组件渲染 rich-text 内容
- **FR-5**: 提供可视化编辑界面 `/admin`
- **FR-6**: 站点配置从 TinaCMS site Collection 读取
- **FR-7**: 所有页面内容从 TinaCMS 获取，功能保持不变

## Non-Functional Requirements
- **NFR-1**: 保持 SSG 静态生成，构建时生成所有页面
- **NFR-2**: 保持现有页面视觉和交互完全一致
- **NFR-3**: 保持暗色模式和响应式设计
- **NFR-4**: 构建性能不显著下降（构建时间增加 < 30%）
- **NFR-5**: 类型安全，所有查询有 TypeScript 类型

## Constraints
- **Technical**: Next.js 14 + TypeScript + TinaCMS 2.x
- **Dependencies**: tinacms, @tinacms/cli
- **Content**: 现有 content/ 目录下的 MDX 文件需保持兼容

## Assumptions
- 本地开发使用 TinaCMS 本地模式，无需 TinaCloud 账号
- 生产环境可后续配置 TinaCloud
- 现有 MDX 文件格式与 TinaCMS Schema 兼容
- 工作经历和方法论的结构需要调整以适配 TinaCMS object 字段

## Acceptance Criteria

### AC-1: TinaCMS 配置正确
- **Given**: 项目已安装 tinacms 和 @tinacms/cli
- **When**: 运行 `npx tinacms build`
- **Then**: 成功生成 `tina/__generated__/` 目录，包含 client.ts 和 types.ts
- **Verification**: `programmatic`

### AC-2: Collection Schema 定义完整
- **Given**: tina/config.ts 已创建
- **When**: 检查 Schema 定义
- **Then**: 包含 project, post, experience, methodology, site 5 个 Collection，字段与设计文档一致
- **Verification**: `human-judgment`

### AC-3: 内容查询函数重构完成
- **Given**: lib/content.ts 已重构
- **When**: 调用 getAllProjects(), getPostBySlug() 等函数
- **Then**: 返回正确的数据结构和类型
- **Verification**: `programmatic`

### AC-4: 所有页面正常渲染
- **Given**: TinaCMS 集成完成
- **When**: 访问首页、关于我、项目、博客、经历、方法论、联系页面
- **Then**: 页面内容正常显示，与之前完全一致
- **Verification**: `human-judgment`

### AC-5: 可视化编辑界面可用
- **Given**: 开发服务器已启动
- **When**: 访问 `/admin` 路由
- **Then**: 显示 TinaCMS 登录/编辑界面
- **Verification**: `human-judgment`

### AC-6: 构建成功
- **Given**: 所有代码修改完成
- **When**: 运行 `npx tinacms build && npm run build`
- **Then**: 构建成功，所有静态页面正确生成
- **Verification**: `programmatic`

### AC-7: 站点配置可编辑
- **Given**: site Collection 已配置
- **When**: 在 TinaCMS 中编辑站点标题、描述、社交链接
- **Then**: 网站对应内容更新
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要配置 TinaCloud 生产环境？
- [ ] 工作经历和方法论的 MDX 结构是否需要调整？
- [ ] 是否需要从 site Collection 读取 Footer 和 Navbar 配置？