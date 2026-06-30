import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-bold text-ink mb-8">使用条款</h1>
          
          <div className="space-y-8 text-muted">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">1. 接受条款</h2>
              <p className="leading-relaxed">
                访问和使用本网站即表示您同意接受本使用条款。如果您不同意这些条款，请不要使用本网站。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">2. 网站内容</h2>
              <p className="leading-relaxed">
                本网站上的内容仅供参考，不构成专业建议。在根据网站内容做出决策前，请咨询专业人士。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">3. 知识产权</h2>
              <p className="leading-relaxed">
                本网站的所有内容，包括文字、图片、代码等，均受版权法保护。未经许可，不得复制、分发或修改。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">4. 链接到第三方网站</h2>
              <p className="leading-relaxed">
                本网站可能包含指向第三方网站的链接。我们对这些网站的内容或隐私政策不承担责任。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">5. 责任限制</h2>
              <p className="leading-relaxed">
                在法律允许的范围内，我们对因使用本网站而产生的任何损失不承担责任。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">6. 条款更新</h2>
              <p className="leading-relaxed">
                我们可能会不定期更新本使用条款。更新后将在本页面发布通知。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">7. 联系我们</h2>
              <p className="leading-relaxed">
                如果您对使用条款有任何疑问，请通过联系页面与我们联系。
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}