'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Briefcase, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import type { ContactFormData, ContactSubject } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不超过20个字符'),
  company: z.string().max(50, '公司名称不超过50字符').optional(),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.enum(['business', 'recruit', 'consult', 'other'], {
    errorMap: () => ({ message: '请选择联系主题' }),
  }),
  message: z.string().min(10, '消息至少10个字符').max(2000, '消息不超过2000字'),
});

type FormData = z.infer<typeof formSchema>;

const subjectOptions: { value: ContactSubject; label: string }[] = [
  { value: 'business', label: '商务合作' },
  { value: 'recruit', label: '招聘咨询' },
  { value: 'consult', label: '管理咨询' },
  { value: 'other', label: '其他' },
];

const contactInfoItems = [
  {
    icon: Mail,
    title: '电子邮箱',
    detail: '1634099882@qq.com',
    href: 'mailto:1634099882@qq.com',
  },
  {
    icon: Phone,
    title: '联系电话',
    detail: '如需电话沟通，请先邮件预约',
    href: undefined,
  },
  {
    icon: MapPin,
    title: '所在地区',
    detail: '中国 · 重庆',
    href: undefined,
  },
  {
    icon: Briefcase,
    title: '当前职位',
    detail: '产品项目经理 / PMO负责人',
    href: undefined,
  },
];

export default function ContactPageClient() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      subject: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

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
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || '发送失败，请稍后重试');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('发送失败，请稍后重试或直接发送邮件。');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16">
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl font-bold text-center mb-4 text-ink">联系我</h1>
              <p className="text-lg text-muted text-center max-w-2xl mx-auto">
                有项目合作或管理咨询需求？欢迎随时联系
              </p>
            </motion.div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-surface border border-rule rounded-2xl p-8">
                  {submitStatus === 'success' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-ink mb-2">消息发送成功！</h3>
                      <p className="text-muted">我会尽快回复您。</p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="mt-6 text-accent hover:underline text-sm font-medium"
                      >
                        再发一条
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                      <h2 className="text-xl font-semibold text-ink">发送消息</h2>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-ink">
                          姓名 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('name')}
                          placeholder="请输入您的姓名"
                          className={`w-full h-11 px-4 border rounded-lg bg-bg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-rule'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-ink">公司/机构</label>
                        <input
                          type="text"
                          {...register('company')}
                          placeholder="请输入公司/机构名称（可选）"
                          className={`w-full h-11 px-4 border rounded-lg bg-bg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors ${
                            errors.company ? 'border-red-500' : 'border-rule'
                          }`}
                        />
                        {errors.company && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.company.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-ink">
                          邮箱 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          placeholder="请输入您的邮箱"
                          className={`w-full h-11 px-4 border rounded-lg bg-bg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-rule'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-ink">
                          主题 <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('subject')}
                          defaultValue=""
                          className={`w-full h-11 px-4 border rounded-lg bg-bg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors appearance-none cursor-pointer ${
                            errors.subject ? 'border-red-500' : 'border-rule'
                          }`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                          }}
                        >
                          <option value="" disabled>
                            请选择联系主题
                          </option>
                          {subjectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-ink">
                          消息内容 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register('message')}
                          placeholder="请输入您的消息内容..."
                          rows={6}
                          className={`w-full h-40 px-4 py-3 border rounded-lg bg-bg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-y ${
                            errors.message ? 'border-red-500' : 'border-rule'
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
                        )}
                      </div>

                      {submitStatus === 'error' && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                              {errorMessage}
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className={`w-full h-12 bg-accent text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                          submitStatus === 'loading'
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-accent/90'
                        }`}
                      >
                        {submitStatus === 'loading' ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            发送中...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            发送消息
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                {contactInfoItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block bg-surface border border-rule rounded-xl p-6 flex items-start gap-4 hover:border-accent/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <item.icon size={24} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold mb-1 text-ink">{item.title}</h3>
                          <p className="text-sm text-muted hover:text-accent transition-colors">
                            {item.detail}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="bg-surface border border-rule rounded-xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <item.icon size={24} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold mb-1 text-ink">{item.title}</h3>
                          <p className="text-sm text-muted">{item.detail}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 p-6 bg-bg2 rounded-xl"
                >
                  <h3 className="text-base font-semibold mb-2 text-ink">响应时间</h3>
                  <p className="text-sm text-muted">
                    通常在1-2个工作日内回复邮件。如遇紧急事项，请在邮件标题注明【紧急】。
                  </p>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
