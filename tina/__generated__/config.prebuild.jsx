// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch,
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "project",
        label: "\u9879\u76EE\u6848\u4F8B",
        path: "content/projects",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || ""
          }
        },
        fields: [
          { type: "string", name: "title", label: "\u9879\u76EE\u540D\u79F0", isTitle: true, required: true },
          { type: "string", name: "slug", label: "URL\u6807\u8BC6", required: true },
          { type: "string", name: "description", label: "\u9879\u76EE\u63CF\u8FF0", required: true },
          { type: "image", name: "cover", label: "\u5C01\u9762\u56FE", required: true },
          {
            type: "string",
            name: "industry",
            label: "\u6240\u5C5E\u884C\u4E1A",
            options: ["ai-gov", "fintech", "data-governance", "scale", "general"],
            required: true
          },
          { type: "string", name: "role", label: "\u62C5\u4EFB\u89D2\u8272", required: true },
          { type: "string", name: "duration", label: "\u9879\u76EE\u5468\u671F", required: true },
          { type: "number", name: "teamSize", label: "\u56E2\u961F\u89C4\u6A21" },
          { type: "string", name: "budget", label: "\u8D44\u91D1\u89C4\u6A21" },
          {
            type: "string",
            name: "status",
            label: "\u9879\u76EE\u72B6\u6001",
            options: ["completed", "in-progress", "paused"],
            required: true
          },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true, required: true },
          { type: "boolean", name: "featured", label: "\u7CBE\u9009\u5C55\u793A", default: false },
          {
            type: "object",
            name: "metrics",
            label: "\u5173\u952E\u6307\u6807",
            list: true,
            fields: [
              { type: "string", name: "label", label: "\u6307\u6807\u540D\u79F0" },
              { type: "string", name: "value", label: "\u6307\u6807\u503C" }
            ]
          },
          { type: "number", name: "order", label: "\u6392\u5E8F\u6743\u91CD", default: 999 },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "post",
        label: "\u535A\u5BA2\u6587\u7AE0",
        path: "content/blog",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || ""
          }
        },
        fields: [
          { type: "string", name: "title", label: "\u6587\u7AE0\u6807\u9898", isTitle: true, required: true },
          { type: "string", name: "slug", label: "URL\u6807\u8BC6", required: true },
          { type: "string", name: "description", label: "\u6587\u7AE0\u6458\u8981", required: true },
          { type: "datetime", name: "date", label: "\u53D1\u5E03\u65E5\u671F", required: true, ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "datetime", name: "updatedAt", label: "\u66F4\u65B0\u65E5\u671F", ui: { dateFormat: "YYYY-MM-DD" } },
          { type: "string", name: "category", label: "\u5206\u7C7B", required: true },
          { type: "string", name: "tags", label: "\u6807\u7B7E", list: true, required: true },
          { type: "image", name: "cover", label: "\u5C01\u9762\u56FE" },
          { type: "boolean", name: "featured", label: "\u63A8\u8350\u6587\u7AE0", default: false },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "experience",
        label: "\u5DE5\u4F5C\u7ECF\u5386",
        path: "content/experience",
        format: "mdx",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "title", label: "\u9875\u9762\u6807\u9898", isTitle: true, required: true },
          { type: "string", name: "summary", label: "\u804C\u4E1A\u751F\u6DAF\u6982\u8FF0", required: true },
          {
            type: "object",
            name: "items",
            label: "\u5DE5\u4F5C\u7ECF\u5386\u6761\u76EE",
            list: true,
            fields: [
              { type: "string", name: "company", label: "\u516C\u53F8\u540D\u79F0", required: true },
              { type: "string", name: "role", label: "\u804C\u4F4D", required: true },
              { type: "string", name: "duration", label: "\u65F6\u95F4\u6BB5", required: true },
              { type: "string", name: "industry", label: "\u6240\u5C5E\u884C\u4E1A" },
              { type: "string", name: "highlights", label: "\u6838\u5FC3\u6210\u679C", list: true },
              { type: "string", name: "narrative", label: "\u5173\u952E\u8F6C\u6298\u53D9\u4E8B", ui: { component: "textarea" } },
              { type: "string", name: "tools", label: "\u5DE5\u5177/\u65B9\u6CD5\u8BBA", list: true }
            ]
          },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "methodology",
        label: "\u7BA1\u7406\u65B9\u6CD5\u8BBA",
        path: "content/methodology",
        format: "mdx",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "title", label: "\u9875\u9762\u6807\u9898", isTitle: true, required: true },
          { type: "string", name: "description", label: "\u9875\u9762\u63CF\u8FF0", required: true },
          {
            type: "object",
            name: "sections",
            label: "\u65B9\u6CD5\u8BBA\u533A\u5757",
            list: true,
            fields: [
              { type: "string", name: "id", label: "\u533A\u5757ID", required: true },
              { type: "string", name: "title", label: "\u533A\u5757\u6807\u9898", required: true },
              { type: "rich-text", name: "content", label: "\u533A\u5757\u5185\u5BB9" }
            ]
          },
          { type: "rich-text", name: "body", label: "\u6B63\u6587", isBody: true }
        ]
      },
      {
        name: "site",
        label: "\u7AD9\u70B9\u914D\u7F6E",
        path: "content/site",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "title", label: "\u7AD9\u70B9\u6807\u9898", required: true },
          { type: "string", name: "description", label: "\u7AD9\u70B9\u63CF\u8FF0", required: true },
          { type: "string", name: "author", label: "\u4F5C\u8005\u540D", required: true },
          { type: "string", name: "email", label: "\u8054\u7CFB\u90AE\u7BB1" },
          {
            type: "object",
            name: "social",
            label: "\u793E\u4EA4\u94FE\u63A5",
            list: true,
            fields: [
              { type: "string", name: "platform", label: "\u5E73\u53F0" },
              { type: "string", name: "url", label: "\u94FE\u63A5" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
