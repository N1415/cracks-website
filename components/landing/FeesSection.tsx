'use client';

import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/ui/feature-card';
import { useFeesCalculator } from '@/hooks/useFeesCalculator';
import { useRateLimit } from '@/hooks/useRateLimit';
import { ApiService } from '@/lib/api';
import { PACKAGES, PACKAGE_FEATURES, TRAVEL_SUPPLEMENTS } from '@/config/constants';

interface PackageCardProps {
  name: string;
  title: string;
  subtitle: string;
  includes: string;
  features: readonly { readonly title: string; readonly items: readonly string[] }[];
  timeline: string;
}

function PackageCard({
  name,
  title,
  subtitle,
  includes,
  features,
  timeline,
}: PackageCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(200,92,60,0.3)] hover:border-secondary/60 hover:scale-[1.01]">
      <h3 className="font-serif text-xl py-4 border-b border-border text-center text-foreground">
        {name}
      </h3>

      {title && (
        <h4 className="font-sans text-sm font-light py-3 px-4 text-center border-b border-border h-16 flex items-center justify-center text-foreground">
          {title}
        </h4>
      )}

      {subtitle && (
        <div className="border-b border-border px-4 py-3">
          <p className="font-sans text-sm font-light text-left text-foreground">
            {subtitle}
          </p>
        </div>
      )}

      {/* Timeline Section */}
      <div className="border-b border-border py-4 px-4 text-center">
        <p className="text-xs text-foreground">Estimated Timeline:</p>
        <p className="text-sm font-semibold mt-1 text-foreground">{timeline}</p>
      </div>

      {includes && (
        <div className="border-b border-border h-10 flex items-center">
          <h4 className="font-sans text-xs px-4 text-left text-foreground">
            {includes}
          </h4>
        </div>
      )}

      {/* Features as Bento Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((section, index) => (
            <FeatureCard
              key={index}
              title={section.title}
              items={section.items}
              className={features.length % 2 !== 0 && index === features.length - 1 ? "sm:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeesSection() {
  const {
    squareMeters,
    country,
    city,
    updateSquareMeters,
    updateCountry,
    updateCity,
    getEstimatedTimeline,
  } = useFeesCalculator();

  const { checkRateLimit } = useRateLimit({ limit: 5, windowMs: 300000 });
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [quoteEmail, setQuoteEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleQuoteRequest = async () => {
    if (!checkRateLimit()) {
      setSubmitError('Too many requests. Please wait before trying again.');
      return;
    }

    if (!quoteEmail || !selectedPackage) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const quotationData = {
        package: selectedPackage,
        email: quoteEmail,
        region: country,
        city,
        squareMeters,
        timeline: getEstimatedTimeline(selectedPackage, parseInt(squareMeters) || 0),
      };

      await ApiService.submitQuotationRequest(quotationData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const packages = [
    {
      packageId: "bronze",
      name: PACKAGES.BLUEPRINT.name,
      title: PACKAGES.BLUEPRINT.title,
      subtitle: "The starting point, providing the essential groundwork for a successful hospitality concept. We validate your vision through market analysis, concept refinement, and financial modeling to ensure your project stands on solid ground before significant investments are made.",
      includes: "VALIDATING YOUR IDEA:",
      features: PACKAGE_FEATURES.bronze,
    },
    {
      packageId: "silver",
      name: PACKAGES.FRAMEWORK.name,
      title: PACKAGES.FRAMEWORK.title,
      subtitle: "Building upon your validated concept, this option guides you through transforming your vision into a physical space. We work with your design and construction teams to ensure the operational efficiency and aesthetic appeal of your establishment.",
      includes: "EVERYTHING IN THE BLUEPRINT PACKAGE, PLUS:",
      features: PACKAGE_FEATURES.silver,
    },
    {
      packageId: "gold",
      name: PACKAGES.LAUNCH.name,
      title: PACKAGES.LAUNCH.title,
      subtitle: "Designed for owners who wants to delegate their project and be hands off. The Launch package delivers comprehensive support from kick off meeting to construction through grand opening.",
      includes: "EVERYTHING IN BLUEPRINT AND FRAMEWORK PACKAGES, PLUS:",
      features: PACKAGE_FEATURES.gold,
    },
  ];

  return (
    <section
      id="fees"
      className="py-12 bg-background text-foreground"
      role="region"
      aria-labelledby="fees-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side - Sticky (Fees Description + Project Information) */}
          <div className="lg:w-2/5">
            <div className="lg:sticky lg:top-24">
              {/* Header */}
              <h3 id="fees-heading" className="text-3xl font-semibold mb-4 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>
                Fees
              </h3>

              {/* Fees Description */}
              <div className="mb-6">
                <p className="font-light text-sm text-foreground leading-relaxed">
                  Our fees are structured around three distinct packages tailored to
                  your specific needs and scope of work. Whether you need support with
                  concept development only or comprehensive guidance from initial
                  planning through to opening day, we offer flexible engagement
                  options that align with your project&apos;s complexity and your
                  level of involvement.
                </p>
              </div>

              {/* Project Information Calculator */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-serif text-xl mb-4 text-center text-foreground font-semibold">
                  Project Information
                </h4>

                <div className="space-y-4">
                  {/* Region and City in a row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="region-select" className="block text-xs mb-1 font-medium">
                        Region
                      </label>
                      <select
                        id="region-select"
                        value={country}
                        onChange={(e) => updateCountry(e.target.value)}
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                      >
                        {Object.keys(TRAVEL_SUPPLEMENTS).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="city-input" className="block text-xs mb-1 font-medium">
                        City / Country
                      </label>
                      <input
                        id="city-input"
                        type="text"
                        value={city}
                        onChange={(e) => updateCity(e.target.value)}
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                        placeholder="Enter city name"
                      />
                    </div>
                  </div>

                  {/* Square Meters and Package in a row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="sqm-input" className="block text-xs mb-1 font-medium">
                        Square Meters <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="sqm-input"
                        type="number"
                        value={squareMeters}
                        onChange={(e) => updateSquareMeters(e.target.value)}
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                        placeholder="Enter square meters"
                        min="1"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="package-select" className="block text-xs mb-1 font-medium">
                        Select Package <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="package-select"
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                      >
                        <option value="">Select a package</option>
                        <option value="bronze">{PACKAGES.BLUEPRINT.name}</option>
                        <option value="silver">{PACKAGES.FRAMEWORK.name}</option>
                        <option value="gold">{PACKAGES.LAUNCH.name}</option>
                      </select>
                    </div>
                  </div>

                  {/* Email and Get Quote button in a row */}
                  <div className="flex gap-4">
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="email-input" className="block text-xs mb-1 font-medium">
                        Your Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <Button
                        onClick={handleQuoteRequest}
                        disabled={isSubmitting || !selectedPackage || !quoteEmail}
                        className="bg-secondary text-white hover:bg-secondary/90 font-bold px-6"
                        aria-label="Get quote for selected package"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-1" />
                            Get Quote
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Success/Error Messages */}
                  {submitSuccess && (
                    <p className="text-green-500 text-xs text-center">
                      Quote request submitted successfully!
                    </p>
                  )}
                  {submitError && (
                    <p className="text-red-500 text-xs text-center">
                      {submitError}
                    </p>
                  )}
                </div>
              </div>

              {/* Legal Disclaimers */}
              <div className="mt-6 space-y-1">
                <p className="font-sans font-light text-sm text-foreground">
                  * Travel expenses are billed separately according to our
                  International Consulting Engagement Policy.
                </p>
                <p className="font-sans font-light text-sm text-foreground">
                  * All fees are subject to applicable taxes. For detailed terms and
                  conditions, please refer to your consulting agreement.
                </p>
                <p className="font-sans font-light text-sm text-foreground">
                  * For custom projects or special requirements, please contact us.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Package Cards (scroll with page) */}
          <div className="lg:w-3/5 space-y-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.packageId}
                name={pkg.name}
                title={pkg.title}
                subtitle={pkg.subtitle}
                timeline={getEstimatedTimeline(pkg.packageId, parseInt(squareMeters) || 0)}
                includes={pkg.includes}
                features={pkg.features}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
