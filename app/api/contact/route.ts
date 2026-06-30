import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不超过20个字符'),
  company: z.string().max(50, '公司名称不超过50字符').optional().or(z.literal('')),
  email: z.string().email('请输入有效的邮箱地址'),
  subject: z.enum(['business', 'recruit', 'consult', 'other'], {
    errorMap: () => ({ message: '请选择有效的联系主题' }),
  }),
  message: z.string().min(10, '消息至少10个字符').max(2000, '消息不超过2000字'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      const details = validated.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, error: '请求数据无效', details },
        { status: 400 }
      );
    }

    const { name, company, email, subject, message } = validated.data;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log('[Contact Form] 模拟发送邮件 - Resend API Key 未配置');
      console.log('[Contact Form] 表单数据:', { name, company, email, subject, message });
      return NextResponse.json(
        { success: true, message: '邮件发送成功' },
        { status: 200 }
      );
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const subjectLabels: Record<string, string> = {
      business: '商务合作',
      recruit: '招聘咨询',
      consult: '管理咨询',
      other: '其他',
    };

    await resend.emails.send({
      from: 'Contact Form <contact@tukui.dev>',
      to: '1634099882@qq.com',
      subject: `【${subjectLabels[subject]}】来自 ${name} 的联系表单`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1b2e; margin-bottom: 20px;">新的联系消息</h1>
          <div style="background: #f5f5f0; padding: 20px; border-radius: 8px;">
            <p style="margin: 8px 0;"><strong>姓名：</strong>${name}</p>
            ${company ? `<p style="margin: 8px 0;"><strong>公司/机构：</strong>${company}</p>` : ''}
            <p style="margin: 8px 0;"><strong>邮箱：</strong>${email}</p>
            <p style="margin: 8px 0;"><strong>主题：</strong>${subjectLabels[subject]}</p>
            <p style="margin: 8px 0;"><strong>消息内容：</strong></p>
            <p style="margin: 8px 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
      reply_to: email,
    });

    return NextResponse.json(
      { success: true, message: '邮件发送成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: '邮件发送失败，请稍后重试' },
      { status: 500 }
    );
  }
}
