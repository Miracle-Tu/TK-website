import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { href: 'https://github.com/tukui', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/tukui', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:tu.kui@example.com', icon: Mail, label: '邮箱' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-rule mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-lg">
                T
              </div>
              <span className="font-semibold text-lg text-ink">涂奎</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              7年项目管理经验，PMP & NPDP 双认证。专注于大型项目管理、PMO体系建设和组织效能提升。
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-4">快速链接</h4>
            <ul className="space-y-3">
              {['首页', '关于我', '工作经历', '项目作品集', '管理方法论', '博客'].map((link) => (
                <li key={link}>
                  <Link href={`/${link === '首页' ? '' : link.toLowerCase().replace('我', '')}`} className="text-sm text-muted hover:text-accent transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-4">联系方式</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail size={16} />
                <span>tu.kui@example.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={16} />
                <span>湖北省武汉市</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-bg2 hover:bg-accent/10 hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rule mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} 涂奎. 保留所有权利.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted hover:text-accent transition-colors">隐私政策</Link>
            <Link href="/terms" className="text-sm text-muted hover:text-accent transition-colors">使用条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}