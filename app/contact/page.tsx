'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { SectionTitle } from '@/components/shared/section-title';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, { message: '请输入您的姓名' }).max(50, { message: '姓名过长' }),
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  subject: z.string().min(2, { message: '请输入主题' }).max(100, { message: '主题过长' }),
  message: z.string().min(10, { message: '请输入至少10个字符' }).max(2000, { message: '消息过长' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('提交失败:', result.error);
      }
    } catch (error) {
      console.error('提交错误:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: '邮箱', value: 'tu.kui@example.com', href: 'mailto:tu.kui@example.com' },
    { icon: Phone, label: '电话', value: '+86 138 0000 0000', href: 'tel:+8613800000000' },
    { icon: MapPin, label: '地址', value: '湖北省武汉市', href: undefined },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">联系我</h1>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                有项目合作、咨询或交流需求？欢迎通过以下方式联系我，期待与您的沟通！
              </p>
            </motion.div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-12">
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <Card className="p-6">
                  <CardContent className="p-0">
                    <h2 className="text-xl font-semibold text-ink mb-6">联系方式</h2>
                    <div className="space-y-4">
                      {contactInfo.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className={`flex items-center gap-4 p-4 rounded-xl hover:bg-bg2 transition-colors ${!item.href ? 'cursor-default' : ''}`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                            <item.icon size={24} />
                          </div>
                          <div>
                            <div className="text-sm text-muted">{item.label}</div>
                            <div className="font-semibold text-ink">{item.value}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <h2 className="text-xl font-semibold text-ink mb-6">社交媒体</h2>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://github.com/tukui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-bg2 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={24} />
                      </a>
                      <a
                        href="https://linkedin.com/in/tukui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-bg2 flex items-center justify-center text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={24} />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="p-0">
                    <h2 className="text-xl font-semibold text-ink mb-4">免费咨询</h2>
                    <p className="text-muted text-sm mb-4">
                      提供30分钟免费项目诊断服务，帮助您分析项目现状、识别风险并制定改进方案。
                    </p>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      预约咨询
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <Card className="p-8">
                  <CardContent className="p-0">
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
                          <CheckCircle size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-ink mb-4">提交成功！</h2>
                        <p className="text-muted">感谢您的留言，我会尽快回复您。</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <h2 className="text-xl font-semibold text-ink mb-6">发送消息</h2>
                        
                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">姓名</label>
                          <Input
                            {...register('name')}
                            placeholder="请输入您的姓名"
                            className={errors.name ? 'border-red-500' : ''}
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">邮箱</label>
                          <Input
                            type="email"
                            {...register('email')}
                            placeholder="请输入您的邮箱"
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">主题</label>
                          <Input
                            {...register('subject')}
                            placeholder="请输入主题"
                            className={errors.subject ? 'border-red-500' : ''}
                          />
                          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-ink mb-2">消息内容</label>
                          <Textarea
                            {...register('message')}
                            placeholder="请输入您的消息内容..."
                            rows={6}
                            className={errors.message ? 'border-red-500' : ''}
                          />
                          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              发送中...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send size={20} />
                              发送消息
                            </span>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}