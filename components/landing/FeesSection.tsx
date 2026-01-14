'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, Mail, Loader2 } from 'lucide-react';
import { useFeesCalculator } from '@/hooks/useFeesCalculator';
import { useRateLimit } from '@/hooks/useRateLimit';
import { ApiService } from '@/lib/api';
import { PACKAGES, PACKAGE_FEATURES, TRAVEL_SUPPLEMENTS, CURRENCIES } from '@/config/constants';

interface PackageCardProps {
  packageId: string;
  name: string;
  title: string;
  subtitle: string;
  includes: string;
  features: readonly { readonly title: string; readonly items: readonly string[] }[];
  currency: string;
  timeline: string;
  email: string;
  onEmailChange: (packageId: string, email: string) => void;
  onGetQuote: (packageId: string) => void;
  isSubmitting?: boolean;
}

function PackageCard({
  packageId,
  name,
  title,
  subtitle,
  includes,
  features,
  currency,
  timeline,
  email,
  onEmailChange,
  onGetQuote,
  isSubmitting = false,
}: PackageCardProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetQuote(packageId);
  };

  return (
    <div className="bg-[#0f1420] border border-gray-800 rounded-lg flex flex-col h-full">
      <h3 className="font-serif text-xl py-4 border-b border-gray-800 text-center text-white">
        {name}
      </h3>

      {title && (
        <h4 className="font-sans text-sm font-light py-3 px-4 text-center border-b border-gray-800 h-16 flex items-center justify-center text-white">
          {title}
        </h4>
      )}

      {subtitle && (
        <div className="border-b border-gray-800 h-48 overflow-auto px-4 py-3">
          <p className="font-sans text-sm font-light text-left text-gray-300">
            {subtitle}
          </p>
        </div>
      )}

      {includes && (
        <div className="border-b border-gray-800 h-10 flex items-center">
          <h4 className="font-sans text-xs px-4 text-left text-white">
            {includes}
          </h4>
        </div>
      )}

      {/* Features with collapsible sections */}
      <div className="flex-grow overflow-auto min-h-[200px]">
        {features.map((section, index) => {
          const sectionKey = `${packageId}-${index}`;
          const isExpanded = expandedSections[sectionKey];

          return (
            <div key={sectionKey} className="border-b border-gray-800">
              <button
                onClick={() => toggleSection(sectionKey)}
                className="flex items-center justify-between cursor-pointer py-3 px-4 w-full text-left hover:bg-gray-800/50 transition-colors focus:outline-none"
                aria-expanded={isExpanded}
                aria-controls={`section-${sectionKey}`}
              >
                <h4 className="font-light text-xs text-white">{section.title}</h4>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-white flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-white flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div id={`section-${sectionKey}`} className="px-4 pb-3 space-y-2">
                  {section.items.map((item, idx) => (
                    <p key={idx} className="text-xs font-light text-white pl-2">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeline Section */}
      <div className="border-t border-gray-800 py-6 px-4 text-center">
        <p className="text-base text-gray-400">Estimated Timeline:</p>
        <p className="text-xl font-semibold mt-1 text-white">{timeline}</p>
      </div>

      {/* Quote Form */}
      <div className="p-4 mt-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(packageId, e.target.value)}
            className="flex-grow bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white text-sm focus:border-white focus:outline-none transition-colors"
            placeholder="Your email"
            required
            aria-label={`Email address for ${name} package quote`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-white text-black px-3 py-3 rounded flex items-center justify-center gap-1 transition-all text-sm whitespace-nowrap ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
            aria-label={`Get quote for ${name} package`}
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                <Mail size={14} />
                Get Quote
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function FeesSection() {
  const {
    squareMeters,
    country,
    city,
    currency,
    packageEmails,
    updateSquareMeters,
    updateCountry,
    updateCity,
    updatePackageEmail,
    getEstimatedTimeline,
  } = useFeesCalculator();

  const { checkRateLimit } = useRateLimit({ limit: 5, windowMs: 300000 });
  const [submittingPackage, setSubmittingPackage] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleQuoteRequest = async (packageId: string) => {
    if (!checkRateLimit()) {
      setSubmitError('Too many requests. Please wait before trying again.');
      return;
    }

    const email = packageEmails[packageId as keyof typeof packageEmails];

    if (!email) {
      setSubmitError('Please enter your email address');
      return;
    }

    try {
      setSubmittingPackage(packageId);
      setSubmitError(null);

      const quotationData = {
        package: packageId,
        email,
        region: country,
        city,
        squareMeters,
        timeline: getEstimatedTimeline(packageId, parseInt(squareMeters) || 0),
      };

      await ApiService.submitQuotationRequest(quotationData);
      setSubmitSuccess(packageId);
      setTimeout(() => setSubmitSuccess(null), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setSubmittingPackage(null);
    }
  };

  return (
    <section
      id="fees"
      className="py-24 bg-black text-white"
      role="region"
      aria-labelledby="fees-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="fees-heading" className="font-serif text-3xl md:text-4xl mb-4">
            FEES
          </h2>
          <div className="w-16 h-px bg-white mx-auto my-8" aria-hidden="true" />
          <p className="font-sans font-light text-lg text-gray-300 max-w-3xl mx-auto">
            Our fees are structured around three distinct packages tailored to
            your specific needs and scope of work. Whether you need support with
            concept development only or comprehensive guidance from initial
            planning through to opening day, we offer flexible engagement
            options that align with your project&apos;s complexity and your
            level of involvement.
          </p>
        </div>

        {/* Project Information Calculator */}
        <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-12 mb-12">
          <h2 className="font-serif text-3xl mb-10 text-center">
            Project Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col">
              <label htmlFor="region-select" className="block text-base mb-3 font-medium">
                Region
              </label>
              <select
                id="region-select"
                value={country}
                onChange={(e) => updateCountry(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
              >
                {Object.keys(TRAVEL_SUPPLEMENTS).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="city-input" className="block text-base mb-3 font-medium">
                City / Country
              </label>
              <input
                id="city-input"
                type="text"
                value={city}
                onChange={(e) => updateCity(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
                placeholder="Enter city name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sqm-input" className="block text-base mb-3 font-medium">
                Square Meters <span className="text-red-400">*</span>
              </label>
              <input
                id="sqm-input"
                type="number"
                value={squareMeters}
                onChange={(e) => updateSquareMeters(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
                placeholder="Enter square meters"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitSuccess && (
          <div
            className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-8 text-center"
            role="alert"
          >
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-green-300">
              Quote request submitted successfully! We&apos;ll contact you
              within 24 hours.
            </p>
          </div>
        )}

        {submitError && (
          <div
            className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-8 text-center"
            role="alert"
          >
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-red-300">{submitError}</p>
          </div>
        )}

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <PackageCard
            packageId="bronze"
            name={PACKAGES.BLUEPRINT.name}
            title={PACKAGES.BLUEPRINT.title}
            subtitle="The starting point, providing the essential groundwork for a successful hospitality concept. We validate your vision through market analysis, concept refinement, and financial modeling to ensure your project stands on solid ground before significant investments are made."
            includes="VALIDATING YOUR IDEA:"
            features={PACKAGE_FEATURES.bronze}
            currency={currency}
            timeline={getEstimatedTimeline('bronze', parseInt(squareMeters) || 0)}
            email={packageEmails.bronze}
            onEmailChange={updatePackageEmail}
            onGetQuote={handleQuoteRequest}
            isSubmitting={submittingPackage === 'bronze'}
          />

          <PackageCard
            packageId="silver"
            name={PACKAGES.FRAMEWORK.name}
            title={PACKAGES.FRAMEWORK.title}
            subtitle="Building upon your validated concept, this option guides you through transforming your vision into a physical space. We work with your design and construction teams to ensure the operational efficiency and aesthetic appeal of your establishment."
            includes="EVERYTHING IN THE BLUEPRINT PACKAGE, PLUS:"
            features={PACKAGE_FEATURES.silver}
            currency={currency}
            timeline={getEstimatedTimeline('silver', parseInt(squareMeters) || 0)}
            email={packageEmails.silver}
            onEmailChange={updatePackageEmail}
            onGetQuote={handleQuoteRequest}
            isSubmitting={submittingPackage === 'silver'}
          />

          <PackageCard
            packageId="gold"
            name={PACKAGES.LAUNCH.name}
            title={PACKAGES.LAUNCH.title}
            subtitle="Designed for owners who wants to delegate their project and be hands off. The Launch package delivers comprehensive support from kick off meeting to construction through grand opening."
            includes="EVERYTHING IN BLUEPRINT AND FRAMEWORK PACKAGES, PLUS:"
            features={PACKAGE_FEATURES.gold}
            currency={currency}
            timeline={getEstimatedTimeline('gold', parseInt(squareMeters) || 0)}
            email={packageEmails.gold}
            onEmailChange={updatePackageEmail}
            onGetQuote={handleQuoteRequest}
            isSubmitting={submittingPackage === 'gold'}
          />
        </div>

        {/* Legal Disclaimers */}
        <div className="mt-16 space-y-2">
          <p className="font-sans font-light text-sm text-gray-400">
            * Minimum project size is 250 SQM.
          </p>
          <p className="font-sans font-light text-sm text-gray-400">
            * Travel expenses are billed separately according to our
            International Consulting Engagement Policy.
          </p>
          <p className="font-sans font-light text-sm text-gray-400">
            * All fees are subject to applicable taxes. For detailed terms and
            conditions, please refer to your consulting agreement.
          </p>
          <p className="font-sans font-light text-sm text-gray-400">
            * For custom projects or special requirements, please contact us.
          </p>
        </div>
      </div>
    </section>
  );
}
