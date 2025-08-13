import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '../config/constants';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy for Cracks Hospitality Studio - How we collect, use, and protect your personal information."
        canonical={`${SITE_CONFIG.url}/privacy-policy`}
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white py-6">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <h1 className="font-playfair text-3xl md:text-4xl">Privacy Policy</h1>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cracks Hospitality Studio ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Information We Collect</h2>
              
              <h3 className="font-semibold text-lg mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Contact information (name, email, phone number)</li>
                <li>Company information</li>
                <li>Project details and requirements</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="font-semibold text-lg mb-3">Information Automatically Collected</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Respond to inquiries and provide customer service</li>
                <li>Deliver consulting services and project management</li>
                <li>Send project updates and business communications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience on our website. You can control cookie preferences through our cookie banner or browser settings.
              </p>
              
              <h3 className="font-semibold text-lg mb-3">Types of Cookies</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Necessary:</strong> Required for website functionality</li>
                <li><strong>Analytics:</strong> Help us understand website usage</li>
                <li><strong>Marketing:</strong> Used for personalized content and ads</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell or rent your personal information. We may share information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Service providers and business partners</li>
                <li>Legal authorities when required by law</li>
                <li>Successors in case of business transfer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
                alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal data</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data during international transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data only as long as necessary for the purposes outlined in this policy, 
                or as required by law. Project-related data is typically retained for 7 years after project completion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this privacy policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <p><strong>Email:</strong> {SITE_CONFIG.contact.email}</p>
                <p><strong>Phone:</strong> {SITE_CONFIG.contact.phone}</p>
                <p><strong>Address:</strong> {SITE_CONFIG.contact.location.city}, {SITE_CONFIG.contact.location.country}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-playfair text-2xl mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page 
                and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
