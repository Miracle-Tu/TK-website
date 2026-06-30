'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';

interface MarkdownRendererProps {
  content: string;
  components?: MDXComponents;
}

const defaultComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold text-ink mb-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold text-ink mb-4 mt-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold text-ink mb-3 mt-6">{children}</h3>,
  p: ({ children }) => <p className="text-muted leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-muted">{children}</ol>,
  li: ({ children }) => <li className="text-muted">{children}</li>,
  code: ({ className, children }) => {
    const language = className?.replace('language-', '');
    return (
      <code className={`px-2 py-1 rounded bg-bg2 text-accent font-mono text-sm ${language ? '' : 'inline-block'}`}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface rounded-xl border border-rule p-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-accent hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-muted my-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-rule my-8" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic text-ink">{children}</em>,
};

export function MarkdownRenderer({ content, components = {} }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={{ ...defaultComponents, ...components }} />
    </div>
  );
}