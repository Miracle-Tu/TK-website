import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import BlogDetailClient from './BlogDetailClient';
import type { PostFrontmatter } from '@/types';
import type { MDXComponents } from 'mdx/types';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
    items.push({ id, text, level });
  }

  return items;
}

const mdxComponents: MDXComponents = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="text-3xl font-bold mt-12 mb-6 pb-2 border-b-2 border-rule scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="text-xl font-semibold mt-6 mb-3 scroll-mt-24"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed text-ink mb-6">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 text-ink">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-ink">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-lg leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent bg-bg2 p-4 pl-6 rounded-r-lg italic my-6">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-bg2 px-1.5 py-0.5 rounded font-mono text-sm">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-ink text-bg p-6 rounded-xl overflow-x-auto font-mono text-sm my-6">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent hover:underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ''} className="max-w-full rounded-lg mx-auto my-6" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-rule rounded-lg">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-rule px-4 py-2 bg-bg2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-rule px-4 py-2">{children}</td>
  ),
  hr: () => <hr className="border-rule my-8" />,
};

interface BlogDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: '文章不存在 | 涂奎',
    };
  }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: `${post.frontmatter.title} | 涂奎`,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const postData = getPostBySlug(params.slug);
  const allPosts = getAllPosts();

  if (!postData) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">文章不存在</h1>
          <p className="text-muted mb-8">抱歉，您访问的文章不存在或已被删除</p>
          <a href="/blog" className="text-accent hover:underline">
            返回博客列表
          </a>
        </div>
      </div>
    );
  }

  const { frontmatter, content, readingTime } = postData;
  const toc = extractToc(content);

  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <BlogDetailClient
      frontmatter={frontmatter}
      readingTime={readingTime}
      toc={toc}
      prevPost={prevPost}
      nextPost={nextPost}
    >
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              rehypePrismPlus,
            ],
          },
        }}
      />
    </BlogDetailClient>
  );
}
