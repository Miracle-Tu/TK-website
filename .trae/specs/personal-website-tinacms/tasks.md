# 个人网站 TinaCMS 集成迭代 - 实现计划

## [ ] Task 1: 安装 TinaCMS 依赖
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 安装 `tinacms` 运行时依赖
  - 安装 `@tinacms/cli` 开发依赖
  - 移除不再需要的 `next-mdx-remote` 和 `gray-matter`
  - 执行命令: `npm install tinacms && npm install -D @tinacms/cli`
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-1.1: `npm install` 成功，无错误
  - `programmatic` TR-1.2: package.json 中包含 tinacms 和 @tinacms/cli

## [ ] Task 2: 创建 TinaCMS 配置与 Schema
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 创建 `tina/config.ts`，定义 5 个 Collection Schema
  - Collection: project (项目), post (博客), experience (工作经历), methodology (方法论), site (站点配置)
  - 字段定义严格按照 04-data-api.md 第2节
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: `npx tinacms build` 成功生成客户端
  - `human-judgement` TR-2.2: 5个 Collection 的字段定义与设计文档一致

## [ ] Task 3: 创建站点配置文件
- **Priority**: medium
- **Depends On**: Task 2
- **Description**: 
  - 创建 `content/site/config.json`
  - 包含站点标题、描述、作者、邮箱、社交链接等
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-3.1: 文件存在且格式正确
  - `human-judgement` TR-3.2: 内容与当前网站配置一致

## [ ] Task 4: 重构内容查询层 (lib/content.ts)
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 重构 `lib/content.ts`，使用 TinaCMS 生成的客户端查询内容
  - 替换 `fs + gray-matter` 方式为 `client.queries.*` 方式
  - 保持函数接口不变: getAllProjects, getProjectBySlug, getAllPosts, getPostBySlug, getExperience, getMethodology, getSiteConfig
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-4.1: TypeScript 类型检查通过
  - `human-judgement` TR-4.2: 函数签名和返回类型与之前一致

## [ ] Task 5: 创建 TinaMarkdown 渲染组件
- **Priority**: high
- **Depends On**: Task 4
- **Description**: 
  - 创建 `components/shared/tina-markdown.tsx`
  - 使用 `tinacms/dist/rich-text` 的 TinaMarkdown 组件渲染 rich-text 内容
  - 替换原有的 MDX 渲染方式
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-5.1: 组件正常导入和使用
  - `human-judgement` TR-5.2: 渲染效果与之前 MDX 一致

## [ ] Task 6: 更新项目相关页面
- **Priority**: high
- **Depends On**: Task 4, Task 5
- **Description**: 
  - 更新 `app/projects/page.tsx` 和 `ProjectsPageClient.tsx`
  - 更新 `app/projects/[slug]/page.tsx` 和 `ProjectDetailClient.tsx`
  - 使用 TinaCMS 客户端获取数据，使用 TinaMarkdown 渲染正文
- **Acceptance Criteria Addressed**: AC-4, AC-6
- **Test Requirements**:
  - `human-judgement` TR-6.1: 项目列表页正常显示
  - `human-judgement` TR-6.2: 项目详情页正常显示

## [ ] Task 7: 更新博客相关页面
- **Priority**: high
- **Depends On**: Task 4, Task 5
- **Description**: 
  - 更新 `app/blog/page.tsx` 和 `BlogPageClient.tsx`
  - 更新 `app/blog/[slug]/page.tsx` 和 `BlogDetailClient.tsx`
  - 使用 TinaCMS 客户端获取数据，使用 TinaMarkdown 渲染正文
- **Acceptance Criteria Addressed**: AC-4, AC-6
- **Test Requirements**:
  - `human-judgement` TR-7.1: 博客列表页正常显示
  - `human-judgement` TR-7.2: 博客详情页正常显示

## [ ] Task 8: 更新工作经历与方法论页面
- **Priority**: high
- **Depends On**: Task 4, Task 5
- **Description**: 
  - 更新 `app/experience/page.tsx` 和 `ExperiencePageClient.tsx`
  - 更新 `app/methodology/page.tsx` 和 `MethodologyPageClient.tsx`
  - 调整数据结构适配 TinaCMS object 字段格式
- **Acceptance Criteria Addressed**: AC-4, AC-6
- **Test Requirements**:
  - `human-judgement` TR-8.1: 工作经历页正常显示
  - `human-judgement` TR-8.2: 方法论页正常显示

## [ ] Task 9: 更新首页与关于我页面
- **Priority**: high
- **Depends On**: Task 4
- **Description**: 
  - 更新 `app/page.tsx` 和 `HomePageClient.tsx`
  - 更新 `app/about/page.tsx` 和 `AboutPageClient.tsx`
  - 从 TinaCMS 获取精选项目、最新文章等数据
  - 从 site Collection 读取站点配置（可选）
- **Acceptance Criteria Addressed**: AC-4, AC-6, AC-7
- **Test Requirements**:
  - `human-judgement` TR-9.1: 首页正常显示
  - `human-judgement` TR-9.2: 关于我页面正常显示

## [ ] Task 10: 配置 Admin 路由与构建脚本
- **Priority**: medium
- **Depends On**: Task 2
- **Description**: 
  - 确认 `app/admin/[[...tina]]/page.tsx` 存在（TinaCMS 自动生成或手动创建）
  - 更新 package.json 脚本，添加 tinacms 相关命令
  - 更新 next.config.js 配置（如需要）
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-10.1: `/admin` 路由可访问
  - `programmatic` TR-10.2: 构建脚本正常工作

## [ ] Task 11: 构建验证与最终调试
- **Priority**: high
- **Depends On**: Task 6, 7, 8, 9, 10
- **Description**: 
  - 运行 `npx tinacms build && npm run build` 验证构建
  - 修复所有构建错误
  - 启动开发服务器进行预览验证
- **Acceptance Criteria Addressed**: AC-6, AC-4
- **Test Requirements**:
  - `programmatic` TR-11.1: 构建成功，无错误
  - `human-judgement` TR-11.2: 所有页面正常显示，功能完整