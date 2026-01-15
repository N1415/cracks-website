'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      {/* Floating back button */}
      <Link href="/" className="fixed top-6 left-10 z-50">
        <Button variant="ghost" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm border border-border shadow-sm">
          <ArrowLeft className="size-4" />
          Back to Home
        </Button>
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-serif mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using CRACKS Hospitality platform ("Service"), you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use
              our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              CRACKS Hospitality provides a comprehensive platform for restaurant development,
              including AI-powered concept creation, business planning, menu development, and
              operational management tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">3. User Accounts</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>You must provide accurate and complete registration information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>You may not share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malicious code or interfere with the Service</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Use automated tools to scrape or extract data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by
              CRACKS Hospitality and are protected by international copyright, trademark, and
              other intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Content you create using our platform remains your property. You grant us a license
              to use, store, and process this content to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">6. Subscription and Payments</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>We may change pricing with 30 days' notice</li>
              <li>Failure to pay may result in suspension of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">7. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us,
              or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, CRACKS Hospitality shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages, or any loss
              of profits or revenues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">9. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service is provided "as is" and "as available" without warranties of any kind,
              either express or implied. We do not guarantee that the Service will be uninterrupted,
              secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of
              significant changes. Continued use of the Service after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>By email: <a href="mailto:nacho@cracks-studio.com" className="text-primary hover:underline">nacho@cracks-studio.com</a></li>
              <li>By visiting our website: <a href="https://www.cracks-app.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.cracks-app.com/</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
