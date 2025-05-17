import { useState, useEffect } from 'react';
import {  Mail, ChevronDown, ChevronUp } from 'lucide-react';



const packages = {
  bronze: {
    name: "BLUEPRINT",
    basePrice: 0,
    minPrice: 25000,
    ratePerSqm: 100,
    title: "STRATEGIC PLANNING & CONCEPT DEVELOPMENT",
    subtitle: "The starting point, providing the essential groundwork for a successful hospitality concept. We validate your vision through market analysis, concept refinement, and financial modeling to ensure your project stands on solid ground before significant investments are made. We provide you with tools to develop a successful concept.",
    includes: "VALIDATING YOUR IDEA:",
    features: [
      "MARKET & COMPETITIVE ANALYSIS",
" - Comprehensive market opportunity assessment",
" - Site location evaluation and recommendations",
" - Identification of market gaps and opportunities",
" - Customer persona development",
" - Spending pattern analysis",
" - Lifestyle and preference mapping",
" - Suggested pricing models",
" - Detailed competitor analysis (up to 5 direct competitors)",
" - SWOT analysis",
" - Unique selling proposition development",

"CONCEPT DEVELOPMENT",
" - Brand story and concept articulation",
" - Menu direction and pricing strategy (includes sample menus)",
" - Service style recommendations",
" - Basic design brief",
" - Space planning support",
" - Manuals to guide venue design",

"FINANCIAL FEASIBILITY & INVESTMENT PLANNING",
" - Initial investment estimation",
" - Projected profit and loss statements (3-year outlook)",
" - Break-even analysis",
" - Return on investment projections",
" - Capital requirement assessment",
" - Funding option recommendations",

"RISK ASSESSMENT & MITIGATION",
" - Identification of potential operational risks",
" - Market vulnerability analysis",
" - Contingency planning foundations",

"OPERATIONAL TOOLS & HR TEMPLATES",
" - HR templates: job descriptions, job advertisements, HR handbooks",
" - Training templates: cycle of service, wine service, bar training materials",

    ]
  },
  silver: {
    name: "FRAMEWORK",
    basePrice: 0,
    minPrice: 42500,
    ratePerSqm: 170,
    title: "DESIGN & DEVELOPMENT",
    subtitle: "Building upon your validated concept, this option guides you through transforming your vision into a physical space. We work with your design and construction teams to ensure the operational efficiency and aesthetic appeal of your establishment.",
    includes: "EVERYTHING IN THE BLUEPRINT PACKAGE, PLUS:",
    features: [
      "RESTAURANT DESIGN COORDINATION",
" - Designer selection assistance",
" - Operational flow optimization",
" - Design brief development",
" - Guest journey mapping",

"KITCHEN & BAR DESIGN",
" - Workflow efficiency planning",
" - Station configuration",
" - Equipment specification and sizing",
" - Capacity optimization",
" - Kitchen consultant assistance",

"LAYOUT OPTIMIZATION",
" - Space utilization analysis",
" - Traffic flow planning",
" - Seating configuration recommendations and planning with the designer",
" - Operational bottleneck prevention",

"EQUIPMENT SPECIFICATION",
" - Detailed equipment lists with specifications",
" - Vendor recommendations",
" - Budget-conscious alternatives",
" - Long-term cost analysis",

"PROJECT MANAGEMENT",
" - Timeline development and tracking",
" - Milestone establishment",
" - Coordination between stakeholders",
" - Once-a-week progress reporting",

"VENDOR COORDINATION",
" - Preferred supplier network access",
" - Contract negotiation assistance",
" - Quality and price evaluation",
" - Order tracking and delivery coordination",

"QUALITY CONTROL",
" - Design integrity verification",
" - Construction milestone inspections",
" - Equipment installation oversight",
" - Systems testing and validation",

"BUDGET MONITORING",
" - Cost tracking against projections",
" - Variance analysis",
" - Budget adjustment recommendations",
" - Value engineering when necessary",

"TEAM PROFILING",
" - Full development of key stakeholders' job descriptions",
" - 3 final interviews for key leaders (kitchen, wine, floor, and bar)",

    ]
  },
  gold: {
    name: "LAUNCH",
    basePrice: 0,
    minPrice: 57500,
    ratePerSqm: 230,
    title: "FROM 0 TO CASHFLOW",
    subtitle: "Designed for owners who wants to delegate their project and be hands off. The Launch package delivers comprehensive support from kick off meeting to construction through grand opening. We handle the critical operational setup, staff training, and launch preparations that will define your establishment's early success and long-term sustainability.",
    includes: "EVERYTHING IN BLUEPRINT AND FRAMEWORK PACKAGES, PLUS:",
    features: [
      "COMPLETE OPERATIONAL SETUP",
" - Customized standard operating procedures development",
" - POS system setup and configuration",
" - Reservation system implementation",
" - Inventory management system installation",
" - Back-office systems integration",

"STAFF TRAINING & DEVELOPMENT",
" - Recruitment assistance",
" - Comprehensive training program development",
" - Management team coaching",
" - Service standards implementation",
" - Team building and culture development",

"MARKETING & PR STRATEGY",
" - Brand launch plan in coordination with your Public Relations team",
" - Digital presence development planning",
" - Public relations campaign guidance",
" - Opening event planning",
" - Media relations management",
" - Marketing plan collaboration with your media company",

"LAUNCH SUPPORT",
" - Opening timeline creation",
" - Soft opening coordination",
" - Grand opening execution",
" - Initial guest feedback collection",
" - First 2 weeks of hands-on operational monitoring",

"QUALITY CONTROL SYSTEMS",
" - Quality assurance protocols",
" - Customer service standards",
" - Product consistency measures",
" - Cleanliness and maintenance routines",

"REVENUE OPTIMIZATION",
" - Pricing strategy implementation",
" - Upselling techniques",
" - Menu engineering and costing",
" - Promotion planning",
" - Reservation/table management optimization",

"ONGOING SUPPORT",
" - Weekly operations review (first month)",
" - Monthly performance assessment (first three months)",
" - Course correction recommendations",
" - 24/7 emergency consultation",
" - Management mentoring",
" - Full tastings: food, drinks, and wine — menu development with owners and key stakeholders",

"PERFORMANCE MONITORING",
" - KPI setup and tracking",
" - Customer satisfaction measurement",
" - Staff performance evaluation",
" - Financial target monitoring",

"TEAM",
" - Full management training",
" - Smart rostering systems",
" - Key stakeholder recruitment in collaboration with your HR team and external recruiters",
" - Job descriptions and job ads for all team members",
" - RASCI Matrix for each team member outlining responsibilities",
" - Full onboarding support with the management team",
" - Compensation and benefits table",
    ]
  }
};

const discountRates = [
  { sqm: 250, discount: 0 },
  { sqm: 300, discount: 0 },
  { sqm: 350, discount: 0 },
  { sqm: 400, discount: 0 },
  { sqm: 450, discount: 0 },
  { sqm: 500, discount: 1 },
  { sqm: 550, discount: 1 },
  { sqm: 600, discount: 2 },
  { sqm: 650, discount: 2 },
  { sqm: 700, discount: 3 },
  { sqm: 750, discount: 3 },
  { sqm: 800, discount: 4 },
  { sqm: 850, discount: 4 },
  { sqm: 900, discount: 5 },
  { sqm: 950, discount: 5 },
  { sqm: 1000, discount: 6 },
  { sqm: 1050, discount: 6 },
  { sqm: 1100, discount: 7 },
  { sqm: 1150, discount: 7 },
  { sqm: 1200, discount: 8 },
  { sqm: 1250, discount: 8 },
  { sqm: 1300, discount: 9 },
  { sqm: 1350, discount: 9 }
];

const currencies = {
  USD: { rate: 1, symbol: '$' },
  THB: { rate: 35, symbol: '฿' },
  EUR: { rate: 0.9, symbol: '€' }
};

// Travel supplement fees by region
const travelSupplements = {
  'Thailand': 0, // No additional fee
  'Southeast Asia': 0.05, // +5% of base fee
  'Asia-Pacific': 0.10, // +10% of base fee
  'Europe/Middle East': 0.15, // +15% of base fee
  'Americas': 0.20, // +20% of base fee
};

const FeesSection = () => {
  const [sqm, setSqm] = useState('');
  const [email, setEmail] = useState('');
  const [packageEmails, setPackageEmails] = useState({
    bronze: '',
    silver: '',
    gold: ''
  });
  const [country, setCountry] = useState('Thailand');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [prices, setPrices] = useState({
    bronze: 0,
    silver: 0,
    gold: 0
  });
  const [discountPercent, setDiscountPercent] = useState(0);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const getDiscountRate = (squareMeters: number) => {
    // Apply 10% flat discount for areas over 1400 sqm
    if (squareMeters > 1400) {
      return 10;
    }
    
    // Find the applicable discount rate
    for (let i = discountRates.length - 1; i >= 0; i--) {
      if (squareMeters >= discountRates[i].sqm) {
        return discountRates[i].discount;
      }
    }
    
    return 0;
  };

//  const handleDownloadPDF = () => {
//    // PDF URL
//    const pdfUrl = "";
//    
//    // Open PDF in a new tab
//    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
//  };

  useEffect(() => {
    if (sqm) {
      const squareMeters = parseInt(sqm);
      const discount = getDiscountRate(squareMeters);
      setDiscountPercent(discount);
      
      const calculatePrice = (basePrice: number, minPrice: number, ratePerSqm: number) => {
        const initialPrice = Math.max(minPrice, basePrice + (squareMeters * ratePerSqm));
        // Add this if you want to apply a discount
        // const discountAmount = initialPrice * (discount / 100);
        let finalPrice = initialPrice;
        
        // Apply region-based travel supplement
        const supplement = travelSupplements[country as keyof typeof travelSupplements] || 0;
        if (supplement > 0) {
          finalPrice += (finalPrice * supplement);
        }
        
        return finalPrice;
      };
      
      const newPrices = {
        bronze: calculatePrice(packages.bronze.basePrice, packages.bronze.minPrice, packages.bronze.ratePerSqm),
        silver: calculatePrice(packages.silver.basePrice, packages.silver.minPrice, packages.silver.ratePerSqm),
        gold: calculatePrice(packages.gold.basePrice, packages.gold.minPrice, packages.gold.ratePerSqm)
      };
      
      setPrices(newPrices);
    } else {
      setPrices({ bronze: 0, silver: 0, gold: 0 });
    }
  }, [sqm, country]);

  const getEstimatedTimeline = (packageType: string, squareMeters: number = 0) => {
    switch (packageType) {
      case 'bronze':
        return '6-8 weeks';
      case 'silver':
        return squareMeters > 700 ? '19-28 weeks' : '12-18 weeks';
      case 'gold':
        return squareMeters > 700 ? '29-48 weeks' : '20-28 weeks';
      default:
        return '6-28 weeks';
    }
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencies[currency as keyof typeof currencies].rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  const handlePackageEmailChange = (packageType: string, value: string) => {
    setPackageEmails(prev => ({
      ...prev,
      [packageType]: value
    }));
  };

  const handleSubmit = async (packageType: 'bronze' | 'silver' | 'gold') => {
    // Use package-specific email if provided, otherwise fall back to the global email
    const emailToUse = packageEmails[packageType] || email;
    
    if (!emailToUse) {
      alert('Please enter your email address');
      return;
    }

    const squareMeters = parseInt(sqm);
    if (!squareMeters) {
      alert('Please enter a valid square meters value');
      return;
    }

    try {
      const quotationData = {
        package: packageType,
        squareMeters,
        country,
        city,
        currency,
        email: emailToUse,
        calculatedPrice: {
          thb: prices[packageType],
          selected: prices[packageType] * currencies[currency as keyof typeof currencies].rate,
          currency
        },
        discountApplied: discountPercent,
        travelSupplement: travelSupplements[country as keyof typeof travelSupplements] * 100, // Convert to percentage
        timeline: getEstimatedTimeline(packageType, squareMeters)
      };

      const response = await fetch('https://n8n-cracks-u43278.vm.elestio.app/webhook/321f6d73-288c-48f4-aa15-9b24cba76166', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotationData)
      });

      if (response.ok) {
        alert('Thank you! We will contact you shortly with more information.');
        setEmail('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your request. Please try again later.');
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Function to check if a feature is a section header
  const isSectionHeader = (feature: string) => !feature.startsWith(' -');

  // Function to process features for a package
  const processFeatures = (features: string[]) => {
    const sections: {title: string, items: string[]}[] = [];
    let currentItems: string[] = [];
    let currentTitle = '';

    features.forEach(feature => {
      if (isSectionHeader(feature)) {
        if (currentTitle) {
          sections.push({
            title: currentTitle,
            items: [...currentItems]
          });
          currentItems = [];
        }
        currentTitle = feature;
      } else {
        currentItems.push(feature);
      }
    });

    // Add the last section
    if (currentTitle && currentItems.length > 0) {
      sections.push({
        title: currentTitle,
        items: [...currentItems]
      });
    }

    return sections;
  };

  return (
    <section id="fees" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Phases Section */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">FEES</h2>
          <div className="w-16 h-px bg-white mx-auto my-8"></div>
          <p className="font-lato font-thin text-lg text-gray-300 max-w-3xl mx-auto">
           Cracks Hospitality Studio utilizes a transparent square meter-based pricing model that scales with your project size. This approach ensures our fees directly correspond to the complexity and scope of your hospitality establishment while providing predictability for your consulting budget.
          </p>
        </div>

        {/* Calculator Section - Long Landscape Box */}
        <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-12 mb-12">
          <h2 className="font-playfair text-3xl mb-10 text-center">Calculate Your Fees</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col">
              <label className="block text-base mb-3">Region</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white"
              >
                <option value="Thailand">Thailand</option>
                <option value="Southeast Asia">Southeast Asia</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
                <option value="Europe/Middle East">Europe/Middle East</option>
                <option value="Americas">Americas</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label className="block text-base mb-3">City / Country</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white"
                placeholder="Enter city name"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="block text-base mb-3">Square Meters</label>
              <input
                type="number"
                value={sqm}
                onChange={(e) => setSqm(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white"
                placeholder="Enter square meters"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="block text-base mb-3">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white"
              >
                {Object.keys(currencies).map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
            
          </div>
        </div>

        {/* Package Boxes - 3 in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Package Columns */}
          {Object.entries(packages).map(([key, pack]) => {
            const processedFeatures = processFeatures(pack.features);
            
            return (
              <div key={key} className="bg-[#0f1420] border border-gray-800 rounded-lg flex flex-col h-full">
                <h3 className="font-playfair text-xl py-4 border-b border-gray-800 text-center">{pack.name}</h3>
                
                {prices[key as keyof typeof prices] > 0 && (
                  <div className="text-xl font-playfair py-3 text-center border-b border-gray-800">
                    {formatPrice(prices[key as keyof typeof prices])}
                  </div>
                )}

                {pack.title && (
                  <h4 className="font-lato text-sm font-light py-3 px-4 text-center border-b border-gray-800 h-16 flex items-center justify-center">{pack.title}</h4>
                )}
                
                {pack.subtitle && (
                  <div className="border-b border-gray-800 h-48 overflow-auto px-4 py-3">
                    <h4 className="font-lato text-m font-light text-left text-gray-300">{pack.subtitle}</h4>
                  </div>
                )}
                
                {/* Includes section with fixed height */}
                <div className="border-b border-gray-800 h-10 flex items-center">
                  <h4 className="font-lato text-xs  px-4 text-left text-white">{pack.includes || ""}</h4>
                </div>
                
                <div className="flex-grow overflow-auto mix-h-100">
                  {processedFeatures.map((section, index) => {
                    const sectionKey = `${key}-${index}`;
                    const isExpanded = expandedSections[sectionKey];
                    
                    return (
                      <div key={sectionKey} className="border-b border-gray-800">
                        <div 
                          onClick={() => toggleSection(sectionKey)}
                          className="flex items-center justify-between cursor-pointer py-3 px-4"
                        >
                          <h4 className="font-light text-xs">{section.title}</h4>
                          {isExpanded 
                            ? <ChevronUp size={16} className="text-white" /> 
                            : <ChevronDown size={16} className="text-white" />
                          }
                        </div>
                        
                        {isExpanded && (
                          <div className="px-4 pb-3 space-y-2">
                            {section.items.map((item, idx) => (
                              <p key={idx} className="text-xs font-thin text-white pl-2">{item}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Timeline Section - Based on package type and sqm */}
                <div className="border-t border-gray-800 py-6 px-4 text-center">
                  <p className="text-base text-gray-400">Estimated Timeline:</p>
                  <p className="text-xl font-semibold mt-1">
                    {getEstimatedTimeline(key as string, sqm ? parseInt(sqm) : 0)}
                  </p>
                </div>
                
                <div className="p-4 mt-auto">
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={packageEmails[key as keyof typeof packageEmails]}
                      onChange={(e) => handlePackageEmailChange(key, e.target.value)}
                      className="flex-grow bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white"
                      placeholder="Your email"
                    />
                    <button
                      onClick={() => handleSubmit(key as 'bronze' | 'silver' | 'gold')}
                      className="bg-white text-black px-3 py-3 rounded flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
                    >
                      <Mail size={14} />
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>
        
        {/* Additional Services Box 
        <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-8 mb-8">
          <h3 className="font-playfair text-2xl mb-10 text-center">ADDITIONAL SERVICES</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Feasibility Study 
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Feasibility Study</h4>
              <p className="font-lato font-light text-white text-sm mb-8">(standalone)</p>
              <p className="font-lato font-medium text-lg">500,000 THB</p>
              <p className="font-lato font-light text-white text-sm">14,286 USD</p>
            </div>
            */}
            {/* Concept Review 
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Concept Review</h4>
              <p className="font-lato font-light text-white text-sm mb-8">(standalone)</p>
              <p className="font-lato font-medium text-lg">300,000 THB</p>
              <p className="font-lato font-light text-white text-sm">8,571 USD</p>
            </div>
            */}
            {/* Menu Development 
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Menu Development</h4>
              <p className="font-lato font-light text-white text-sm mb-8">(standalone)</p>
              <p className="font-lato font-medium text-lg">250,000 THB</p>
              <p className="font-lato font-light text-white text-sm">7,143 USD</p>
            </div>
            */}
            {/* Operational Audit 
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Operational Audit</h4>
              <p className="font-lato font-light text-white text-sm mb-8">&nbsp;</p>
              <p className="font-lato font-medium text-lg">350,000 THB</p>
              <p className="font-lato font-light text-white text-sm">10,000 USD</p>
            </div>
            */}
            {/* Partner Service Coordination 
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Partner Service</h4>
              <p className="font-lato font-light text-white text-sm mb-8">Coordination</p>
              <p className="font-lato font-medium text-lg">15% management fee</p>
              <p className="font-lato font-light text-white text-sm">on partner services</p>
            </div>
            */}
            {/* Additional On-Site Days
            <div className="border-t border-gray-800 pt-4">
              <h4 className="font-lato font-medium mb-1">Additional On-Site Days</h4>
              <p className="font-lato font-light text-white text-sm mb-8">&nbsp;</p>
              <p className="font-lato font-medium text-lg">45,000 THB per day</p>
              <p className="font-lato font-light text-white text-sm">1,286 USD per day</p>
            </div>
          </div>
        </div>
        {/* Download Button 
        <div className="text-center">
          <button 
            className="bg-white border-black text-black mb-8 font-lato font-light py-4 px-8 flex items-center justify-center mx-auto hover:bg-gray-200 transition-colors group cursor-pointer"
            onClick={handleDownloadPDF}
          >
            <Download size={20} className="mr-2 group-hover:transform group-hover:-translate-y-1 transition-transform" />
            DOWNLOAD FULL DEVELOPMENT SERVICES PITCH
          </button>
        </div>
        */}
        <div className="mt-auto">
          <p className="font-lato font-light text-sm text-gray-300">* Minimum project size is 250 SQM. Projects smaller than 250 SQM will be billed at the 250 SQM rate.</p>
          <p className="font-lato font-light text-sm text-gray-300">* Travel expenses are billed separately according to our International Consulting Engagement Policy.</p>
          <p className="font-lato font-light text-sm text-gray-300">* All fees are subject to applicable taxes. Fees are valid for contracts signed in 2025 and subject to annual review. For detailed terms and conditions, please refer to your consulting agreement.</p>
          <p className="font-lato font-light text-sm text-gray-300">* For custom projects or special requirements, please contact us for personalized pricing.</p>
        </div>
        </div>
    </section>
  );
};
export default FeesSection;