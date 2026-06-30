# 涂奎个人网站完善 - 实施计划

## [ ] Task 1: 内容层重构 - 类型定义与数据结构
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 重构 types/index.ts，使类型定义符合 04-data-api.md 的 Schema
  - 重构 lib/content.ts，更新所有内容查询函数
  - 创建 lib/mdx.ts，配置 next-mdx-remote 序列化和 rehype/remark 插件
  - 更新 content/ 目录下的 MDX 文件 frontmatter 格式
  - 确保 Project、Post、Experience、Methodology 类型完整
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `programmatic` TR-1.1: TypeScript 类型检查通过，无 any 类型
  - `programmatic` TR-1.2: getAllProjects/getAllPosts 等函数返回正确类型
  - `programmatic` TR-1.3: MDX frontmatter 字段与类型定义一致
  - `human-judgement` TR-1.4: 类型命名和结构符合设计文档规范

## [ ] Task 2: 首页重构 - Hero与影响力看板
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 重写 Hero 区域：深色背景 (var(--ink))、径向渐变装饰、徽章、主副标题、CTA按钮组
  - 重写影响力看板：5个指标卡片（5000w+累计资金、33+交付项目、800+峰值团队、5跨行业数、2专业认证）
  - 使用 CountUp 数字计数动画
  - 确保移动端响应式布局正确
- **Acceptance Criteria Addressed**: AC-1, AC-10
- **Test Requirements**:
  - `human-judgement` TR-2.1: Hero 区域视觉符合 06-page-specs.md 第1.2节精确规格
  - `human-judgement` TR-2.2: 影响力看板5个卡片布局正确，数字动画正常
  - `human-judgement` TR-2.3: 暗色模式下颜色正确
  - `human-judgement` TR-2.4: 移动端布局正常（2列+1居中）

## [ ] Task 3: 首页完善 - 最新动态与核心能力
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - 添加"最新动态"区块：左侧精选项目（2个），右侧最新文章（3篇）
  - 重写核心能力标签区块：按战略层/战术层/执行层分组
  - 添加联系方式快速入口
  - 确保所有滚动触发动画正常工作
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-3.1: 最新动态区块布局正确，项目和文章卡片样式一致
  - `human-judgement` TR-3.2: 核心能力标签三层分组视觉区分明显
  - `human-judgement` TR-3.3: 滚动动画流畅，stagger 效果正确

## [ ] Task 4: 关于我页面重构
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 重写个人简介区域：头像+基本信息+简介文案（符合设计文档的内容）
  - 添加管理理念区块：5条可展开卡片（体系先行、数据驱动、人即核心、敏捷务实、价值导向）
  - 添加能力金字塔组件：三层可视化（战略层/战术层/执行层），悬停交互
  - 重写资质认证区块：PMP + NPDP 双认证徽章
  - 添加工具清单区块：按项目管理/数据分析/协作沟通分类
- **Acceptance Criteria Addressed**: AC-2, AC-10
- **Test Requirements**:
  - `human-judgement` TR-4.1: 管理理念卡片可展开/收起，动画流畅
  - `human-judgement` TR-4.2: 能力金字塔三层结构正确，悬停有交互反馈
  - `human-judgement` TR-4.3: 资质认证徽章样式符合设计规范
  - `human-judgement` TR-4.4: 工具清单分类清晰，布局正确

## [ ] Task 5: 工作经历页面重构
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 添加成长路径横向时间线组件（5个节点）
  - 重写详细纵向时间线：可展开/收起，手风琴效果（同一时间仅一条展开）
  - 添加行业筛选器：全部、互联网、金融、政务医疗、制造业
  - 每条经历展开内容：职责描述、核心成果、关键转折、工具方法论
  - 内容基于设计文档中的5段经历
- **Acceptance Criteria Addressed**: AC-3, AC-10
- **Test Requirements**:
  - `human-judgement` TR-5.1: 横向时间线节点正确，连接线样式符合设计
  - `human-judgement` TR-5.2: 纵向时间线展开/收起动画流畅，手风琴效果正确
  - `human-judgement` TR-5.3: 行业筛选功能正常，筛选动画流畅
  - `human-judgement` TR-5.4: 每条经历内容完整，结构清晰

## [ ] Task 6: 项目作品集页面完善
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 更新筛选器分类：全部、AI+政务、PMO体系建设、数据治理、金融创新、规模化交付、总集管理
  - 实现重点项目（大卡片）+ 补充项目（小卡片）分层展示
  - 项目卡片 hover 效果：translateY + shadow + 封面图缩放
  - 更新6个项目 MDX 内容，符合设计文档定义的 Schema
- **Acceptance Criteria Addressed**: AC-4, AC-10
- **Test Requirements**:
  - `human-judgement` TR-6.1: 筛选器样式符合设计，激活状态正确
  - `human-judgement` TR-6.2: 重点项目和补充项目分层布局正确
  - `human-judgement` TR-6.3: 筛选动画流畅（淡出+缩放）
  - `programmatic` TR-6.4: 项目 frontmatter 字段完整正确

## [ ] Task 7: 项目详情页 MDX 渲染
- **Priority**: high
- **Depends On**: Task 1, Task 6
- **Description**:
  - 使用 next-mdx-remote 渲染项目详情页 MDX 内容
  - 实现项目详情页结构：问题背景、约束条件、关键决策、成果与数据、复盘思考
  - 添加返回按钮和面包屑导航
  - 添加上一项目/下一项目导航
  - 配置 MDX 组件映射（自定义标题、段落、列表等样式）
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-7.1: MDX 内容正确渲染，样式符合排版规范
  - `human-judgement` TR-7.2: 项目详情页结构完整（背景/约束/决策/成果/复盘）
  - `human-judgement` TR-7.3: 上一篇/下一篇导航正常工作
  - `programmatic` TR-7.4: generateStaticParams 正确生成所有静态路径

## [ ] Task 8: 管理方法论页面重构
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 重写体系概览：3列卡片（PMO体系、敏捷实践、数据驱动）
  - 添加制度规范列表：4项可展开（项目管理规范、研发流程规范、绩效评价体系、知识库与模板库规范）
  - 添加工具链架构图：JIRA ↔ 中间层 ↔ 飞书 的数据流转示意
  - 添加模板下载区：4个模板卡片
  - 更新 methodology MDX 内容
- **Acceptance Criteria Addressed**: AC-6, AC-10
- **Test Requirements**:
  - `human-judgement` TR-8.1: 体系概览3列卡片布局正确，图标和文字清晰
  - `human-judgement` TR-8.2: 制度规范列表可展开/收起，序号样式正确
  - `human-judgement` TR-8.3: 工具链架构图视觉清晰，布局合理
  - `human-judgement` TR-8.4: 模板下载区卡片样式统一

## [ ] Task 9: 博客页面完善 - 列表与搜索
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 添加搜索框组件，支持按标题/摘要/标签搜索
  - 更新分类筛选器，与设计文档一致
  - 优化文章卡片样式（添加封面图占位、分类标签、阅读时间）
  - 更新博客 MDX 文件，符合设计文档 Schema
  - 添加分页或加载更多功能（如内容足够）
- **Acceptance Criteria Addressed**: AC-5, AC-10
- **Test Requirements**:
  - `human-judgement` TR-9.1: 搜索框样式符合设计，输入有反馈
  - `programmatic` TR-9.2: 搜索功能正确匹配标题、摘要和标签
  - `human-judgement` TR-9.3: 文章卡片布局正确，信息完整
  - `human-judgement` TR-9.4: 分类筛选功能正常

## [ ] Task 10: 博客详情页 - MDX渲染与目录导航
- **Priority**: high
- **Depends On**: Task 1, Task 9
- **Description**:
  - 使用 next-mdx-remote 渲染文章详情页 MDX 内容
  - 实现目录导航（TOC）组件：桌面端右侧固定，移动端顶部可折叠
  - 使用 IntersectionObserver 实现滚动时高亮当前章节
  - 添加上一篇/下一篇导航
  - 配置 MDX 样式：标题层级、引用块、代码块、列表、表格、图片等
  - 配置 rehype-slug、rehype-autolink-headings、rehype-prism-plus 等插件
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-10.1: 文章排版精美，符合 06-page-specs.md 第6.2节规格
  - `human-judgement` TR-10.2: 目录导航位置正确，滚动高亮当前章节
  - `human-judgement` TR-10.3: 代码块有语法高亮，样式美观
  - `programmatic` TR-10.4: 标题有正确的 slug 和锚点链接

## [ ] Task 11: 联系页面完善
- **Priority**: medium
- **Depends On**: Task 1
- **Description**:
  - 将主题字段从 input 改为 select 下拉选择
  - 主题选项：商务合作、招聘咨询、管理咨询、其他
  - 添加公司/机构字段（可选）
  - 更新联系信息为设计文档中的真实信息（邮箱、电话、地点、职位）
  - 完善 API Route 验证逻辑（zod + 服务端二次验证）
  - 确保表单加载、成功、失败状态正确显示
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-11.1: 所有必填字段验证正确（姓名2-20字、邮箱格式、消息10-2000字）
  - `programmatic` TR-11.2: 主题下拉选项正确，默认值合理
  - `human-judgement` TR-11.3: 表单状态（提交中/成功/失败）视觉反馈清晰
  - `programmatic` TR-11.4: API Route 返回正确的 HTTP 状态码和 JSON 响应

## [ ] Task 12: SEO 与错误处理
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - 创建 app/sitemap.ts，动态生成 sitemap（含所有项目和博客文章）
  - 创建 app/robots.ts
  - 在 layout.tsx 中添加 JSON-LD 结构化数据（Person Schema）
  - 创建 app/loading.tsx 全局加载状态
  - 创建 app/error.tsx 全局错误边界
  - 创建 app/not-found.tsx 404页面
  - 完善各页面 metadata（标题、描述、OG图片等）
- **Acceptance Criteria Addressed**: AC-9
- **Test Requirements**:
  - `programmatic` TR-12.1: /sitemap.xml 返回正确的 XML，包含所有页面URL
  - `programmatic` TR-12.2: /robots.txt 返回正确的规则
  - `human-judgement` TR-12.3: 页面包含正确的 JSON-LD 脚本标签
  - `human-judgement` TR-12.4: 404页面和错误页面样式美观，有返回按钮

## [ ] Task 13: 全局优化与最终调试
- **Priority**: medium
- **Depends On**: Task 2-12
- **Description**:
  - 检查所有页面暗色模式显示正常
  - 检查移动端响应式布局
  - 验证页面转场动画
  - 检查无障碍访问（焦点状态、语义化标签）
  - 修复构建错误和 TypeScript 警告
  - 运行 npm run build 确保构建成功
- **Acceptance Criteria Addressed**: AC-10, NFR-1, NFR-2, NFR-3
- **Test Requirements**:
  - `programmatic` TR-13.1: npm run build 构建成功，无错误
  - `human-judgement` TR-13.2: 暗色模式切换流畅，所有组件颜色正确
  - `human-judgement` TR-13.3: 移动端（375px宽度）布局正常，无横向滚动
  - `human-judgement` TR-13.4: 键盘导航可用，焦点状态可见
