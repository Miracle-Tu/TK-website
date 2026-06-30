'use client';

import { Shield, Building2, BookOpen, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Methodology } from '@/types';

interface MethodologyPageClientProps {
  methodologies: Methodology[];
}

export default function MethodologyPageClient({ methodologies }: MethodologyPageClientProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ink mb-4">管理方法论</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              分享项目管理领域的方法论、工具和实践经验
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {methodologies.map((methodology, index) => {
                const IconComponent = [Shield, Building2, BookOpen][index % 3];
                return (
                  <Card key={methodology.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <IconComponent size={20} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-ink">{methodology.title}</h3>
                          <p className="text-xs text-muted">{methodology.excerpt}</p>
                        </div>
                        <ChevronRight size={18} className="text-muted" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              {methodologies.length > 0 && (
                <Card className="p-8">
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge>{methodologies[0].category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-ink mb-4">{methodologies[0].title}</h2>
                    <div className="prose prose-lg max-w-none text-muted whitespace-pre-wrap">
                      {methodologies[0].body}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg2">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-ink mb-6">需要定制化的咨询服务？</h2>
            <p className="text-muted mb-8">
              我可以根据您的具体需求，提供一对一的项目管理咨询和指导服务。
            </p>
            <Button asChild size="lg">
              <Link href="/contact">联系我</Link>
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
