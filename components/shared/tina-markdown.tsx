'use client';

import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface TinaMarkdownRendererProps {
  content: any;
}

export function TinaMarkdownRenderer({ content }: TinaMarkdownRendererProps) {
  if (!content) return null;
  return <TinaMarkdown content={content} />;
}
