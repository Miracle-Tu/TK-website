import { defineConfig } from 'tinacms';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch,
  client: { skip: true },
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'project',
        label: '项目案例',
        path: 'content/projects',
        format: 'mdx',
        ui: {
          filename: {
            readonly: false,
            slugify: (values: any) => values?.slug || '',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: '项目名称', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'URL标识', required: true },
          { type: 'string', name: 'description', label: '项目描述', required: true },
          { type: 'image', name: 'cover', label: '封面图', required: true },
          {
            type: 'string',
            name: 'industry',
            label: '所属行业',
            options: ['ai-gov', 'fintech', 'data-governance', 'scale', 'general'],
            required: true,
          },
          { type: 'string', name: 'role', label: '担任角色', required: true },
          { type: 'string', name: 'duration', label: '项目周期', required: true },
          { type: 'number', name: 'teamSize', label: '团队规模' },
          { type: 'string', name: 'budget', label: '资金规模' },
          {
            type: 'string',
            name: 'status',
            label: '项目状态',
            options: ['completed', 'in-progress', 'paused'],
            required: true,
          },
          { type: 'string', name: 'tags', label: '标签', list: true, required: true },
          { type: 'boolean', name: 'featured', label: '精选展示', default: false },
          {
            type: 'object',
            name: 'metrics',
            label: '关键指标',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: '指标名称' },
              { type: 'string', name: 'value', label: '指标值' },
            ],
          },
          { type: 'number', name: 'order', label: '排序权重', default: 999 },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      {
        name: 'post',
        label: '博客文章',
        path: 'content/blog',
        format: 'mdx',
        ui: {
          filename: {
            readonly: false,
            slugify: (values: any) => values?.slug || '',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: '文章标题', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'URL标识', required: true },
          { type: 'string', name: 'description', label: '文章摘要', required: true },
          { type: 'datetime', name: 'date', label: '发布日期', required: true, ui: { dateFormat: 'YYYY-MM-DD' } },
          { type: 'datetime', name: 'updatedAt', label: '更新日期', ui: { dateFormat: 'YYYY-MM-DD' } },
          { type: 'string', name: 'category', label: '分类', required: true },
          { type: 'string', name: 'tags', label: '标签', list: true, required: true },
          { type: 'image', name: 'cover', label: '封面图' },
          { type: 'boolean', name: 'featured', label: '推荐文章', default: false },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      {
        name: 'experience',
        label: '工作经历',
        path: 'content/experience',
        format: 'mdx',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '页面标题', isTitle: true, required: true },
          { type: 'string', name: 'summary', label: '职业生涯概述', required: true },
          {
            type: 'object',
            name: 'items',
            label: '工作经历条目',
            list: true,
            fields: [
              { type: 'string', name: 'company', label: '公司名称', required: true },
              { type: 'string', name: 'role', label: '职位', required: true },
              { type: 'string', name: 'duration', label: '时间段', required: true },
              { type: 'string', name: 'industry', label: '所属行业' },
              { type: 'string', name: 'highlights', label: '核心成果', list: true },
              { type: 'string', name: 'narrative', label: '关键转折叙事', ui: { component: 'textarea' } },
              { type: 'string', name: 'tools', label: '工具/方法论', list: true },
            ],
          },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      {
        name: 'methodology',
        label: '管理方法论',
        path: 'content/methodology',
        format: 'mdx',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '页面标题', isTitle: true, required: true },
          { type: 'string', name: 'description', label: '页面描述', required: true },
          {
            type: 'object',
            name: 'sections',
            label: '方法论区块',
            list: true,
            fields: [
              { type: 'string', name: 'id', label: '区块ID', required: true },
              { type: 'string', name: 'title', label: '区块标题', required: true },
              { type: 'rich-text', name: 'content', label: '区块内容' },
            ],
          },
          { type: 'rich-text', name: 'body', label: '正文', isBody: true },
        ],
      },

      {
        name: 'site',
        label: '站点配置',
        path: 'content/site',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'title', label: '站点标题', required: true },
          { type: 'string', name: 'description', label: '站点描述', required: true },
          { type: 'string', name: 'author', label: '作者名', required: true },
          { type: 'string', name: 'email', label: '联系邮箱' },
          {
            type: 'object',
            name: 'social',
            label: '社交链接',
            list: true,
            fields: [
              { type: 'string', name: 'platform', label: '平台' },
              { type: 'string', name: 'url', label: '链接' },
            ],
          },
        ],
      },
    ],
  },
});
