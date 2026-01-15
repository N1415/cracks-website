import React, { useState } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { CURRENCIES } from '../../config/constants';
import LoadingSpinner from '../common/LoadingSpinner';

interface PackageFeature {
  title: string;
  items: string[];
}

interface PackageCardProps {
  packageId: string;
  name: string;
  title: string;
  subtitle: string;
  includes: string;
  features: PackageFeature[];
  price: number;
  currency: string;
  timeline: string;
  email: string;
  onEmailChange: (packageId: string, email: string) => void;
  onGetQuote: (packageId: string) => void;
  isSubmitting?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageId,
  name,
  title,
  subtitle,
  includes,
  features,
  price,
  currency,
  timeline,
  email,
  onEmailChange,
  onGetQuote,
  isSubmitting = false
}) => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * CURRENCIES[currency as keyof typeof CURRENCIES].rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetQuote(packageId);
  };

  return (
    <div className="bg-[#0f1420] border border-gray-800 rounded-lg flex flex-col h-full">
      <h3 className="font-playfair text-xl py-4 border-b border-gray-800 text-center">
        {name}
      </h3>
      
      {price > 0 && (
        <div className="text-xl font-playfair py-3 text-center border-b border-gray-800" aria-live="polite">
          {formatPrice(price)}
        </div>
      )}

      {title && (
        <h4 className="font-lato text-sm font-light py-3 px-4 text-center border-b border-gray-800 h-16 flex items-center justify-center">
          {title}
        </h4>
      )}
      
      {subtitle && (
        <div className="border-b border-gray-800 h-48 overflow-auto px-4 py-3">
          <p className="font-lato text-sm font-light text-left text-gray-300">
            {subtitle}
          </p>
        </div>
      )}
      
      {/* Includes section */}
      {includes && (
        <div className="border-b border-gray-800 h-10 flex items-center">
          <h4 className="font-lato text-xs px-4 text-left text-white">
            {includes}
          </h4>
        </div>
      )}
      
      {/* Features with collapsible sections */}
      <div className="flex-grow overflow-auto min-h-100">
        {features.map((section, index) => {
          const sectionKey = `${packageId}-${index}`;
          const isExpanded = expandedSections[sectionKey];
          
          return (
            <div key={sectionKey} className="border-b border-gray-800">
              <button 
                onClick={() => toggleSection(sectionKey)}
                className="flex items-center justify-between cursor-pointer py-3 px-4 w-full text-left hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420]"
                aria-expanded={isExpanded}
                aria-controls={`section-${sectionKey}`}
              >
                <h4 className="font-light text-xs">{section.title}</h4>
                {isExpanded 
                  ? <ChevronUp size={16} className="text-white flex-shrink-0" aria-hidden="true" /> 
                  : <ChevronDown size={16} className="text-white flex-shrink-0" aria-hidden="true" />
                }
              </button>
              
              {isExpanded && (
                <div id={`section-${sectionKey}`} className="px-4 pb-3 space-y-2">
                  {section.items.map((item, idx) => (
                    <p key={idx} className="text-xs font-thin text-white pl-2">
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
        <p className="text-xl font-semibold mt-1">
          {timeline}
        </p>
      </div>
      
      {/* Quote Form */}
      <div className="p-4 mt-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(packageId, e.target.value)}
            className="flex-grow bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white text-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] transition-colors"
            placeholder="Your email"
            required
            aria-label={`Email address for ${name} package quote`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-white text-black px-3 py-3 rounded flex items-center justify-center gap-1 transition-all text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
            aria-label={`Get quote for ${name} package`}
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Mail size={14} aria-hidden="true" />
                Get Quote
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackageCard;
