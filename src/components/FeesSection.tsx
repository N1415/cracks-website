import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useFeesCalculator } from '../hooks/useFeesCalculator';
import { useRateLimit } from '../hooks/useRateLimit';
import { ApiService } from '../services/api';
import { PACKAGES, TRAVEL_SUPPLEMENTS } from '../config/constants';
import PriceCalculator from './fees/PriceCalculator';
import PackageCard from './fees/PackageCard';

// Package features data - moved from the original component
const packageFeatures = {
  bronze: [
    {
      title: "MARKET & COMPETITIVE ANALYSIS",
      items: [
        "- Comprehensive market opportunity assessment",
        "- Site location evaluation and recommendations", 
        "- Identification of market gaps and opportunities",
        "- Customer persona development",
        "- Spending pattern analysis",
        "- Lifestyle and preference mapping",
        "- Suggested pricing models",
        "- Detailed competitor analysis (up to 5 direct competitors)",
        "- SWOT analysis",
        "- Unique selling proposition development"
      ]
    },
    {
      title: "CONCEPT DEVELOPMENT",
      items: [
        "- Brand story and concept articulation",
        "- Menu direction and pricing strategy (includes sample menus)",
        "- Service style recommendations",
        "- Basic design brief",
        "- Space planning support",
        "- Manuals to guide venue design"
      ]
    },
    {
      title: "FINANCIAL FEASIBILITY & INVESTMENT PLANNING",
      items: [
        "- Initial investment estimation",
        "- Projected profit and loss statements (3-year outlook)",
        "- Break-even analysis",
        "- Return on investment projections",
        "- Capital requirement assessment",
        "- Funding option recommendations"
      ]
    },
    {
      title: "RISK ASSESSMENT & MITIGATION",
      items: [
        "- Identification of potential operational risks",
        "- Market vulnerability analysis",
        "- Contingency planning foundations"
      ]
    },
    {
      title: "OPERATIONAL TOOLS & HR TEMPLATES",
      items: [
        "- HR templates: job descriptions, job advertisements, HR handbooks",
        "- Training templates: cycle of service, wine service, bar training materials"
      ]
    }
  ],
  silver: [
    {
      title: "RESTAURANT DESIGN COORDINATION",
      items: [
        "- Designer selection assistance",
        "- Operational flow optimization",
        "- Design brief development",
        "- Guest journey mapping"
      ]
    },
    {
      title: "KITCHEN & BAR DESIGN",
      items: [
        "- Workflow efficiency planning",
        "- Station configuration",
        "- Equipment specification and sizing",
        "- Capacity optimization",
        "- Kitchen consultant assistance"
      ]
    },
    {
      title: "LAYOUT OPTIMIZATION",
      items: [
        "- Space utilization analysis",
        "- Traffic flow planning",
        "- Seating configuration recommendations and planning with the designer",
        "- Operational bottleneck prevention"
      ]
    },
    {
      title: "EQUIPMENT SPECIFICATION",
      items: [
        "- Detailed equipment lists with specifications",
        "- Vendor recommendations",
        "- Budget-conscious alternatives",
        "- Long-term cost analysis"
      ]
    },
    {
      title: "PROJECT MANAGEMENT",
      items: [
        "- Timeline development and tracking",
        "- Milestone establishment",
        "- Coordination between stakeholders",
        "- Once-a-week progress reporting"
      ]
    },
    {
      title: "VENDOR COORDINATION",
      items: [
        "- Preferred supplier network access",
        "- Contract negotiation assistance",
        "- Quality and price evaluation",
        "- Order tracking and delivery coordination"
      ]
    },
    {
      title: "QUALITY CONTROL",
      items: [
        "- Design integrity verification",
        "- Construction milestone inspections",
        "- Equipment installation oversight",
        "- Systems testing and validation"
      ]
    },
    {
      title: "BUDGET MONITORING",
      items: [
        "- Cost tracking against projections",
        "- Variance analysis",
        "- Budget adjustment recommendations",
        "- Value engineering when necessary"
      ]
    },
    {
      title: "TEAM PROFILING",
      items: [
        "- Full development of key stakeholders' job descriptions",
        "- 3 final interviews for key leaders (kitchen, wine, floor, and bar)"
      ]
    }
  ],
  gold: [
    {
      title: "COMPLETE OPERATIONAL SETUP",
      items: [
        "- Customized standard operating procedures development",
        "- POS system setup and configuration",
        "- Reservation system implementation",
        "- Inventory management system installation",
        "- Back-office systems integration"
      ]
    },
    {
      title: "STAFF TRAINING & DEVELOPMENT",
      items: [
        "- Recruitment assistance",
        "- Comprehensive training program development",
        "- Management team coaching",
        "- Service standards implementation",
        "- Team building and culture development"
      ]
    },
    {
      title: "MARKETING & PR STRATEGY",
      items: [
        "- Brand launch plan in coordination with your Public Relations team",
        "- Digital presence development planning",
        "- Public relations campaign guidance",
        "- Opening event planning",
        "- Media relations management",
        "- Marketing plan collaboration with your media company"
      ]
    },
    {
      title: "LAUNCH SUPPORT",
      items: [
        "- Opening timeline creation",
        "- Soft opening coordination",
        "- Grand opening execution",
        "- Initial guest feedback collection",
        "- First 2 weeks of hands-on operational monitoring"
      ]
    },
    {
      title: "QUALITY CONTROL SYSTEMS",
      items: [
        "- Quality assurance protocols",
        "- Customer service standards",
        "- Product consistency measures",
        "- Cleanliness and maintenance routines"
      ]
    },
    {
      title: "REVENUE OPTIMIZATION",
      items: [
        "- Pricing strategy implementation",
        "- Upselling techniques",
        "- Menu engineering and costing",
        "- Promotion planning",
        "- Reservation/table management optimization"
      ]
    },
    {
      title: "ONGOING SUPPORT",
      items: [
        "- Weekly operations review (first month)",
        "- Monthly performance assessment (first three months)",
        "- Course correction recommendations",
        "- 24/7 emergency consultation",
        "- Management mentoring",
        "- Full tastings: food, drinks, and wine — menu development with owners and key stakeholders"
      ]
    },
    {
      title: "PERFORMANCE MONITORING",
      items: [
        "- KPI setup and tracking",
        "- Customer satisfaction measurement",
        "- Staff performance evaluation",
        "- Financial target monitoring"
      ]
    },
    {
      title: "TEAM",
      items: [
        "- Full management training",
        "- Smart rostering systems",
        "- Key stakeholder recruitment in collaboration with your HR team and external recruiters",
        "- Job descriptions and job ads for all team members",
        "- RASCI Matrix for each team member outlining responsibilities",
        "- Full onboarding support with the management team",
        "- Compensation and benefits table"
      ]
    }
  ]
};

const FeesSection = () => {
  const {
    squareMeters,
    country,
    city,
    currency,
    prices,
    packageEmails,
    updateSquareMeters,
    updateCountry,
    updateCity,
    updateCurrency,
    updatePackageEmail,
    getEstimatedTimeline,
    formatPrice
  } = useFeesCalculator();

  const { checkRateLimit } = useRateLimit({ limit: 5, windowMs: 300000 }); // 5 minutes
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
        email
      };

      await ApiService.submitQuotationRequest(quotationData);
      setSubmitSuccess(packageId);
      setTimeout(() => setSubmitSuccess(null), 5000); // Clear success message after 5 seconds
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setSubmittingPackage(null);
    }
  };

  return (
    <section id="fees" className="py-24 bg-black text-white" role="region" aria-labelledby="fees-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="fees-heading" className="font-playfair text-3xl md:text-4xl mb-4">FEES</h2>
          <div className="w-16 h-px bg-white mx-auto my-8" aria-hidden="true"></div>
          <p className="font-lato font-light text-lg text-gray-300 max-w-3xl mx-auto">
            Our fees are structured around three distinct packages tailored to your specific needs and scope of work.
            Whether you need support with concept development only or comprehensive guidance from initial planning through to opening day,
            we offer flexible engagement options that align with your project's complexity and your level of involvement.
          </p>
        </div>

        {/* Price Calculator - Hidden */}
        {/* <PriceCalculator
          squareMeters={squareMeters}
          onSquareMetersChange={updateSquareMeters}
          country={country}
          onCountryChange={updateCountry}
          city={city}
          onCityChange={updateCity}
          currency={currency}
          onCurrencyChange={updateCurrency}
        /> */}

        {/* Success/Error Messages */}
        {submitSuccess && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-8 text-center" role="alert">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" aria-hidden="true" />
            <p className="text-green-300">
              Quote request submitted successfully! We'll contact you within 24 hours.
            </p>
          </div>
        )}

        {submitError && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-8 text-center" role="alert">
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" aria-hidden="true" />
            <p className="text-red-300">{submitError}</p>
                  </div>
                )}
                
        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <PackageCard
            packageId="bronze"
            name={PACKAGES.BLUEPRINT.name}
            title={PACKAGES.BLUEPRINT.title}
            subtitle="The starting point, providing the essential groundwork for a successful hospitality concept. We validate your vision through market analysis, concept refinement, and financial modeling to ensure your project stands on solid ground before significant investments are made. We provide you with tools to develop a successful concept."
            includes="VALIDATING YOUR IDEA:"
            features={packageFeatures.bronze}
            price={prices.bronze}
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
            features={packageFeatures.silver}
            price={prices.silver}
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
            subtitle="Designed for owners who wants to delegate their project and be hands off. The Launch package delivers comprehensive support from kick off meeting to construction through grand opening. We handle the critical operational setup, staff training, and launch preparations that will define your establishment's early success and long-term sustainability."
            includes="EVERYTHING IN BLUEPRINT AND FRAMEWORK PACKAGES, PLUS:"
            features={packageFeatures.gold}
            price={prices.gold}
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
          <p className="font-lato font-light text-sm text-gray-400">
            * Minimum project size is 250 SQM.
          </p>
          <p className="font-lato font-light text-sm text-gray-400">
            * Travel expenses are billed separately according to our International Consulting Engagement Policy.
          </p>
          <p className="font-lato font-light text-sm text-gray-400">
            * All fees are subject to applicable taxes. For detailed terms and conditions, please refer to your consulting agreement.
          </p>
          <p className="font-lato font-light text-sm text-gray-400">
            * For custom projects or special requirements, please contact us.
          </p>
        </div>
        </div>
    </section>
  );
};

export default FeesSection;