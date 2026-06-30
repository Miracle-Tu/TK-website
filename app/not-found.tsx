import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-8xl font-bold text-accent/20 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-ink mb-3">页面不存在</h2>
        <p className="text-muted mb-8">
          您访问的页面可能已被移除或链接错误
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium transition-colors hover:bg-accent/90"
        >
          <Home className="w-5 h-5" />
          返回首页
        </Link>
      </div>
    </div>
  );
}
