import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Instrument_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/shared/theme-provider';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '涂奎 · 产品项目经理 | PMO体系建设与千万级项目管理',
    template: '%s | 涂奎',
  },
  description: '7年项目管理经验，PMP & NPDP 双认证。横跨互联网、金融、政务、医疗、制造五大行业，管理过超5000w资金规模的项目组合。',
  keywords: ['项目管理', 'PMO', '产品经理', 'PMP', 'NPDP', '千万级项目', '政务项目'],
  authors: [{ name: '涂奎' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '涂奎个人网站',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={cn('font-sans', instrumentSans.variable)}>
      <body className="min-h-screen bg-bg text-ink font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}