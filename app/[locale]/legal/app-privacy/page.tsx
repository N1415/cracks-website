import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'App Privacy Policy',
  description:
    'Privacy Policy for Cracks App - How we collect, use, and protect your personal information in our mobile application.',
};

export default function AppPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl">App Privacy Policy</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-serif text-3xl mb-4 text-gray-800 dark:text-foreground">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-muted-foreground mb-4">
                Last updated: September 26, 2025
              </p>
              <p className="mb-4 text-gray-800 dark:text-foreground leading-relaxed text-justify">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>
              <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
            </div>

            <hr className="border-gray-300 dark:border-border" />

            {/* Interpretation and Definitions */}
            <div>
              <h2 className="font-serif text-2xl mb-4 text-gray-800 dark:text-foreground">
                Interpretation and Definitions
              </h2>

              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-foreground">
                Interpretation
              </h3>
              <p className="mb-4 text-gray-800 dark:text-foreground leading-relaxed text-justify">
                The words whose initial letters are capitalized have meanings
                defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>

              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-foreground">
                Definitions
              </h3>
              <p className="mb-4 text-gray-800 dark:text-foreground leading-relaxed text-justify">
                For the purposes of this Privacy Policy:
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Account</strong> means a unique account created for
                    You to access our Service or parts of our Service.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Application</strong> refers to cracks-app, the
                    software program provided by the Company.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Company</strong> (referred to as either &quot;the
                    Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                    &quot;Our&quot; in this Agreement) refers to Cracks Studio
                    Ltd, RM 1-2, 17/F, 135 BONHAM STRAND TRADE CENTRE, 135
                    BONHAM STRAND, SHEUNG WAN, HONG KONG.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Country</strong> refers to: Hong Kong SAR China
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Device</strong> means any device that can access the
                    Service such as a computer, a cell phone or a digital
                    tablet.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Personal Data</strong> is any information that
                    relates to an identified or identifiable individual.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Service</strong> refers to the Application.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>Usage Data</strong> refers to data collected
                    automatically, either generated by the use of the Service or
                    from the Service infrastructure itself.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground leading-relaxed text-justify">
                    <strong>You</strong> means the individual accessing or using
                    the Service, or the company, or other legal entity on behalf
                    of which such individual is accessing or using the Service,
                    as applicable.
                  </p>
                </li>
              </ul>
            </div>

            <hr className="border-gray-300 dark:border-border" />

            {/* Collecting and Using Your Personal Data */}
            <div>
              <h2 className="font-serif text-2xl mb-4 text-gray-800 dark:text-foreground">
                Collecting and Using Your Personal Data
              </h2>

              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-foreground">
                Types of Data Collected
              </h3>

              <h4 className="font-semibold text-base mb-3 text-gray-800 dark:text-foreground">
                Personal Data
              </h4>
              <p className="mb-4 text-gray-800 dark:text-foreground">
                While using Our Service, We may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
              </p>
              <ul className="space-y-2 mb-6">
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    Email address
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    First name and last name
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    Usage Data
                  </p>
                </li>
              </ul>

              <h4 className="font-semibold text-base mb-3 text-gray-800 dark:text-foreground">
                Usage Data
              </h4>
              <p className="mb-4 text-gray-800 dark:text-foreground">
                Usage Data is collected automatically when using the Service.
                This may include information such as Your Device&apos;s Internet
                Protocol address, browser type, browser version, the pages of
                our Service that You visit, the time and date of Your visit, the
                time spent on those pages, unique device identifiers and other
                diagnostic data.
              </p>
            </div>

            <hr className="border-gray-300 dark:border-border" />

            {/* Use of Your Personal Data */}
            <div>
              <h2 className="font-serif text-2xl mb-4 text-gray-800 dark:text-foreground">
                Use of Your Personal Data
              </h2>
              <p className="mb-4 text-gray-800 dark:text-foreground">
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="space-y-3 mb-6">
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    <strong>To provide and maintain our Service</strong>,
                    including to monitor the usage of our Service.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    <strong>To manage Your Account:</strong> to manage Your
                    registration as a user of the Service.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    <strong>To contact You:</strong> To contact You by email,
                    telephone calls, SMS, or other equivalent forms of
                    electronic communication.
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    <strong>To manage Your requests:</strong> To attend and
                    manage Your requests to Us.
                  </p>
                </li>
              </ul>
            </div>

            <hr className="border-gray-300 dark:border-border" />

            {/* Security */}
            <div>
              <h2 className="font-serif text-2xl mb-4 text-gray-800 dark:text-foreground">
                Security of Your Personal Data
              </h2>
              <p className="text-gray-800 dark:text-foreground">
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially reasonable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
            </div>

            <hr className="border-gray-300 dark:border-border" />

            {/* Contact Us */}
            <div>
              <h2 className="font-serif text-2xl mb-4 text-gray-800 dark:text-foreground">
                Contact Us
              </h2>
              <p className="mb-4 text-gray-800 dark:text-foreground">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <ul className="space-y-2">
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    By email: nacho@cracks-studio.com
                  </p>
                </li>
                <li>
                  <p className="text-gray-800 dark:text-foreground">
                    By visiting our website:{' '}
                    <a
                      href="https://www.cracks-studio.com/"
                      rel="external nofollow noopener"
                      target="_blank"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      https://www.cracks-studio.com/
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
