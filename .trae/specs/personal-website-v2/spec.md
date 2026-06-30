# 个人网站迭代需求 - 产品需求文档

## Overview
- **Summary**: 根据最新设计文档对涂奎个人网站进行细节迭代，调整首页Hero区域徽章文案、主标题文案、影响力看板指标标签等内容，确保100%符合设计文档规范。
- **Purpose**: 确保网站内容与设计文档完全一致，提升品牌传达准确性。
- **Target Users**: 访问涂奎个人网站的招聘方、合作方、行业同行。

## Goals
- 首页 Hero 区域徽章和标题文案100%符合设计文档
- 影响力看板5项指标标签符合设计文档规范
- 导航栏 Logo 符合设计文档规范（可选）

## Non-Goals (Out of Scope)
- 新增页面或新功能
- 大规模重构代码结构
- 改变页面整体布局

## Background & Context
设计文档 `06-page-specs.md` 和 `02-prototype.md` 对首页 Hero 区域有明确的文案规范：
- 徽章应为 "PMO负责人 · 7年跨行业项目管理 · PMP/NPDP 双认证"
- 主标题应为 "产品项目经理 / 从0到1搭建PMO体系"
- 影响力看板第5项应为 "专业认证" 标签，值 "2"

当前实现存在偏差，需要调整。

## Functional Requirements
- **FR-1**: Hero区域徽章文案调整为设计文档指定的内容
- **FR-2**: Hero区域主标题调整为设计文档指定的内容
- **FR-3**: 影响力看板指标顺序和标签按设计文档调整
- **FR-4**: 导航栏 Logo 调整为 "TQ" 文字样式（可选，取决于用户偏好）

## Non-Functional Requirements
- **NFR-1**: 不改变现有组件结构和动画效果
- **NFR-2**: 保持响应式设计不变
- **NFR-3**: 保持暗色模式兼容性

## Constraints
- **Technical**: Next.js 14 + TypeScript + Tailwind CSS
- **Dependencies**: 现有组件 `HomePageClient.tsx`, `navbar.tsx`

## Assumptions
- 用户希望网站内容100%符合设计文档
- 不需要大规模重构，仅需文案调整

## Acceptance Criteria

### AC-1: Hero徽章文案调整
- **Given**: 首页 Hero 区域已加载
- **When**: 查看徽章区域
- **Then**: 显示 "PMO负责人 · 7年跨行业项目管理 · PMP/NPDP 双认证"
- **Verification**: `human-judgment`

### AC-2: Hero主标题调整
- **Given**: 首页 Hero 区域已加载
- **When**: 查看主标题
- **Then**: 显示 "产品项目经理 / 从0到1搭建PMO体系"
- **Verification**: `human-judgment`

### AC-3: 影响力看板指标调整
- **Given**: 首页影响力看板已加载
- **When**: 查看5项指标
- **Then**: 按顺序显示：累计管理资金(5000w+)、交付项目数(33+)、峰值管理团队(800+)、跨行业数(5)、专业认证(2)
- **Verification**: `human-judgment`

### AC-4: Hero副标题调整
- **Given**: 首页 Hero 区域已加载
- **When**: 查看副标题
- **Then**: 显示设计文档指定的个人定位描述（约200字）
- **Verification**: `human-judgment`

## Open Questions
- [ ] 导航栏 Logo 是否需要改为 "TQ" 文字样式？