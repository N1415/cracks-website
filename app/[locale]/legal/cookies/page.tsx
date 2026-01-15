'use client'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicyPage() {
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
        <h1 className="text-4xl font-serif mb-8">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-serif mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website.
              They help websites remember your preferences and understand how you interact with
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Cracks Hospitality website uses minimal cookies to enhance your browsing experience:
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Preference Cookies</h3>
            <p className="text-muted-foreground leading-relaxed">
              These cookies remember your settings and preferences to enhance your experience.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie/Storage</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2">theme</td>
                    <td className="py-2">Stores your light/dark mode preference</td>
                    <td className="py-2">Persistent (localStorage)</td>
                  </tr>
                  <tr>
                    <td className="py-2">NEXT_LOCALE</td>
                    <td className="py-2">Stores your language preference (English/Spanish)</td>
                    <td className="py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">3. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is hosted on Vercel, which may collect basic analytics data to help
              us understand website performance. This data is anonymous and does not personally
              identify you.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
              <li><strong>Vercel</strong> - Website hosting and performance analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">4. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and manage cookies through your browser settings:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
              <li>Adjust your browser settings to block or delete cookies</li>
              <li>Clear your browser&apos;s local storage to reset theme preferences</li>
              <li>Use browser extensions to manage cookies</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Note: Clearing cookies may reset your theme and language preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">5. Browser Settings</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most browsers allow you to manage cookies through their settings. Here are links
              to cookie management instructions for popular browsers:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">6. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time. Any changes will be posted
              on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>By email: <a href="mailto:nacho@cracks-studio.com" className="text-primary hover:underline">nacho@cracks-studio.com</a></li>
              <li>By visiting our website: <a href="https://cracks-hospitality.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cracks-hospitality.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
