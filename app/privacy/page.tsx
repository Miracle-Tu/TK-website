import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-bold text-ink mb-8">隐私政策</h1>
          
          <div className="space-y-8 text-muted">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">1. 信息收集</h2>
              <p className="leading-relaxed">
                我们尊重您的隐私，仅收集必要的信息以提供服务。当您访问本网站或使用联系表单时，我们可能收集您的姓名、邮箱地址等信息。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">2. 信息使用</h2>
              <p className="leading-relaxed">
                收集的信息用于回复您的咨询、提供服务和改进网站。我们不会将您的个人信息出售给第三方。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">3. 信息保护</h2>
              <p className="leading-relaxed">
                我们采取适当的安全措施保护您的信息免受未经授权的访问、使用或泄露。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">4. Cookie使用</h2>
              <p className="leading-relaxed">
                本网站使用Cookie来改善用户体验。您可以在浏览器设置中管理Cookie偏好。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">5. 政策更新</h2>
              <p className="leading-relaxed">
                我们可能会不定期更新本隐私政策。更新后将在本页面发布通知。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-4">6. 联系我们</h2>
              <p className="leading-relaxed">
                如果您对隐私政策有任何疑问，请通过联系页面与我们联系。
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}