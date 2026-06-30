import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: '联系我',
  description: '与涂奎取得联系，探讨项目合作、职业机会或专业咨询。邮箱：1634099882@qq.com',
  openGraph: {
    title: '联系我 | 涂奎',
    description: '与涂奎取得联系，探讨项目合作、职业机会或专业咨询。邮箱：1634099882@qq.com',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
