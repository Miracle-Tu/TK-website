'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-ink mb-3">出错了</h1>
        <p className="text-muted mb-8">
          抱歉，页面加载时出现了问题。您可以尝试刷新页面，或返回首页继续浏览。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium transition-colors hover:bg-accent/90"
          >
            <RotateCcw className="w-5 h-5" />
            重试
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface text-ink font-medium border border-rule transition-colors hover:bg-bg2"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
