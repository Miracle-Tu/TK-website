# 个人网站迭代 - 实现计划

## [ ] Task 1: Hero徽章与标题文案调整
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 调整首页 Hero 区域的徽章文案、主标题、副标题，使其100%符合设计文档 `06-page-specs.md` 的规范
  - 文件修改: `/workspace/app/HomePageClient.tsx`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4
- **Test Requirements**:
  - `human-judgement` TR-1.1: 徽章显示 "PMO负责人 · 7年跨行业项目管理 · PMP/NPDP 双认证"
  - `human-judgement` TR-1.2: 主标题显示 "产品项目经理 / 从0到1搭建PMO体系"
  - `human-judgement` TR-1.3: 副标题符合设计文档的约200字个人定位描述
- **Notes**: 副标题文案从设计文档 `02-prototype.md` 第3.2节获取

## [ ] Task 2: 影响力看板指标调整
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 调整影响力看板的指标顺序和标签名称
  - 第5项指标标签从 "跨行业数" 改为 "专业认证"
  - 文件修改: `/workspace/app/HomePageClient.tsx` 中的 metrics 数组
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-2.1: 5项指标顺序为：累计管理资金、交付项目数、峰值团队规模、跨行业数、专业认证
  - `human-judgement` TR-2.2: 第5项显示 "2" 和 "专业认证"
- **Notes**: 按设计文档 `06-page-specs.md` 第1.3节表格

## [ ] Task 3: 验证构建与预览
- **Priority**: medium
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 运行 `npm run build` 验证构建成功
  - 启动开发服务器进行最终预览验证
- **Acceptance Criteria Addressed**: 全部
- **Test Requirements**:
  - `programmatic` TR-3.1: `npm run build` 成功，无错误
  - `human-judgement` TR-3.2: 预览页面文案调整正确显示