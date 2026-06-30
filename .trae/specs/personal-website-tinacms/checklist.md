# 个人网站 TinaCMS 集成迭代 - 验证清单

## 配置与初始化

- [ ] Checkpoint 1: `tinacms` 和 `@tinacms/cli` 已正确安装
- [ ] Checkpoint 2: `tina/config.ts` 存在且包含 5 个 Collection Schema
- [ ] Checkpoint 3: `npx tinacms build` 成功生成 `tina/__generated__/` 目录
- [ ] Checkpoint 4: `tina/__generated__/client.ts` 和 `types.ts` 文件存在

## 功能验证

- [ ] Checkpoint 5: 首页正常显示，数据正确加载
- [ ] Checkpoint 6: 关于我页面正常显示
- [ ] Checkpoint 7: 工作经历页面时间线正常显示
- [ ] Checkpoint 8: 项目列表页正常显示，筛选功能正常
- [ ] Checkpoint 9: 项目详情页正常显示，正文渲染正确
- [ ] Checkpoint 10: 博客列表页正常显示，搜索和筛选功能正常
- [ ] Checkpoint 11: 博客详情页正常显示，目录导航正常
- [ ] Checkpoint 12: 管理方法论页面正常显示
- [ ] Checkpoint 13: 联系页面正常显示，表单功能正常

## TinaCMS 编辑界面

- [ ] Checkpoint 14: `/admin` 路由可访问
- [ ] Checkpoint 15: TinaCMS 编辑界面可正常打开
- [ ] Checkpoint 16: 5 个 Collection 在编辑界面中可见
- [ ] Checkpoint 17: 内容编辑后保存正确写入 MDX 文件

## 构建与部署

- [ ] Checkpoint 18: `npx tinacms build && npm run build` 构建成功
- [ ] Checkpoint 19: 所有静态页面正确生成
- [ ] Checkpoint 20: 暗色模式切换正常
- [ ] Checkpoint 21: 响应式布局正常
- [ ] Checkpoint 22: SEO 元数据和 sitemap 正常工作

## 内容一致性

- [ ] Checkpoint 23: 所有页面内容与重构前一致
- [ ] Checkpoint 24: 站点配置（标题、描述等）正确读取
- [ ] Checkpoint 25: 图片资源正确加载