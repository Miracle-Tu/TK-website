import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjectById, getAllProjects } from '@/lib/content';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) {
    return {
      title: '项目不存在',
    };
  }
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  const allProjects = await getAllProjects();

  if (!project) {
    return (
      <div className="min-h-screen pt-32">
        <Navbar />
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-ink mb-4">项目不存在</h1>
            <Button asChild>
              <Link href="/projects">返回项目列表</Link>
            </Button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 2);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} />;
}
