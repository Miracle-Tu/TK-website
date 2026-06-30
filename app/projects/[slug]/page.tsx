import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjects } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import ProjectDetailClient from './ProjectDetailClient';
import type { ProjectFrontmatter } from '@/types';
import type { MDXComponents } from 'mdx/types';

const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-ink mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-ink mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-ink mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-muted leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-muted">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-muted my-4">
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
    <pre className="bg-surface rounded-xl border border-rule p-4 overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-accent hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  hr: () => <hr className="border-rule my-8" />,
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: '项目不存在 | 涂奎',
    };
  }
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: `${project.frontmatter.title} | 涂奎`,
      description: project.frontmatter.description,
      type: 'article',
      images: project.frontmatter.cover ? [project.frontmatter.cover] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const projectResult = getProjectBySlug(params.slug);
  const allProjects = getAllProjects();

  if (!projectResult) {
    return null;
  }

  const { frontmatter, content } = projectResult;

  const currentIndex = allProjects.findIndex((p: ProjectFrontmatter) => p.slug === frontmatter.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <ProjectDetailClient
      project={frontmatter}
      prevProject={prevProject}
      nextProject={nextProject}
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
    </ProjectDetailClient>
  );
}
