import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

const phases = [
  {
    number: "01",
    title: "Smart Start — Capital Efficiency from Day Zero",
    description: "With over 50 openings across 3 continents, we help you avoid costly mistakes and make high-impact decisions early. From location choice to layout and budgeting, we protect your investment before the first guest walks in."
  },
  {
    number: "02",
    title: "Revenue Activation — Maximising the Top Line",
    description: "We engineer multiple revenue streams, from brand partnerships to service design. Our strategies are built into your operations, marketing, and menu — ensuring momentum from opening day."
  },
  {
    number: "03",
    title: "Sustained Profitability — Long-Term Performance",
    description: "We stay involved beyond the launch. From systems to leadership tools, we ensure your business is resilient, scalable, and tuned for consistent financial performance."
  }
];

const packages = {
  bronze: {
    name: "Bronze",
    basePrice: 0,
    minPrice: 1250000,
    ratePerSqm: 5000,
    features: [
      "STRATEGIC PLANNING & CONCEPT DEVELOPMENT",
      "Market & Competitive Analysis",
      "In-depth market research",
      "Target demographic profiling",
      "Competitive positioning",
      "Concept development",
      "Financial feasibility",
      "Investment planning",
      "ROI forecasting",
      "Risk assessment"
    ]
  },
  silver: {
    name: "Silver",
    basePrice: 0,
    minPrice: 1625000,
    ratePerSqm: 6500,
    features: [
      "DESIGN & DEVELOPMENT PHASE",
      "Everything in Bronze +",
      "Restaurant design coordination",
      "Kitchen & bar design",
      "Layout optimization",
      "Equipment specification",
      "Project management",
      "Vendor coordination",
      "Quality control",
      "Budget monitoring"
    ]
  },
  gold: {
    name: "Gold",
    basePrice: 0,
    minPrice: 2000000,
    ratePerSqm: 8000,
    features: [
      "PRE-OPENING IMPLEMENTATION",
      "Everything in Silver +",
      "Complete operational setup",
      "Staff training & development",
      "Marketing & PR strategy",
      "Launch support",
      "Quality control systems",
      "Revenue optimization",
      "Ongoing support",
      "Performance monitoring"
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
  THB: { rate: 1, symbol: '฿' },
  EUR: { rate: 0.026, symbol: '€' },
  USD: { rate: 0.028, symbol: '$' }
};

const FeesSection = () => {
  const [sqm, setSqm] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Thailand');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('THB');
  const [prices, setPrices] = useState({
    bronze: 0,
    silver: 0,
    gold: 0
  });
  const [discountPercent, setDiscountPercent] = useState(0);

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

  useEffect(() => {
    if (sqm) {
      const squareMeters = parseInt(sqm);
      const discount = getDiscountRate(squareMeters);
      setDiscountPercent(discount);
      
      const calculatePrice = (basePrice: number, minPrice: number, ratePerSqm: number) => {
        const initialPrice = Math.max(minPrice, basePrice + (squareMeters * ratePerSqm));
        const discountAmount = initialPrice * (discount / 100);
        return initialPrice - discountAmount;
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
  }, [sqm]);

  const getEstimatedTimeline = (sqm: number) => {
    if (sqm <= 250) return '6-8 months';
    if (sqm <= 500) return '7-9 months';
    if (sqm <= 700) return '8-12 months';
    if (sqm <= 900) return '9-15 months';
    return '15+ months';
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

  const handleSubmit = async (packageType: 'bronze' | 'silver' | 'gold') => {
    if (!email) {
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
        email,
        calculatedPrice: {
          thb: prices[packageType],
          selected: prices[packageType] * currencies[currency as keyof typeof currencies].rate,
          currency
        },
        discountApplied: discountPercent,
        timeline: getEstimatedTimeline(squareMeters)
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

  return (
    <section id="fees" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Phases Section */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">OUR FEES</h2>
          <div className="w-16 h-px bg-white mx-auto my-8"></div>
          <p className="font-lato font-thin text-lg text-gray-300 max-w-3xl mx-auto">
            Our fees are earned across three phases — each one designed to create tangible return before, during, and after your venue opens.
          </p>
        </div>

        {/* Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {phases.map((phase) => (
            <div 
              key={phase.number}
              className="bg-gray-900/50 border border-white/10 p-8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="font-playfair text-4xl text-white p-8 mb-6">{phase.number}</div>
              <div className="w-12 h-px bg-white/30 mb-6"></div>
              <h3 className="font-playfair text-xl mb-4">{phase.title}</h3>
              <p className="font-lato text-white" style={{ fontWeight: '300' }}>{phase.description}</p>
            </div>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {/* Calculator Column */}
          <div className="bg-gray-900/50 border border-white/10 p-6 rounded-lg">
            <h3 className="font-playfair text-xl mb-6">Calculate Your Investment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  <option value="Thailand">Thailand</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Enter city name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Square Meters</label>
                <input
                  type="number"
                  value={sqm}
                  onChange={(e) => setSqm(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Enter square meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {Object.keys(currencies).map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Your email"
                />
              </div>
              {sqm && (
                <div className="mt-4 text-sm text-gray-300">
                  <p>Estimated Timeline:</p>
                  <p className="font-semibold">{getEstimatedTimeline(parseInt(sqm))}</p>
                </div>
              )}
            </div>
          </div>

          {/* Package Columns */}
          {Object.entries(packages).map(([key, pack]) => (
            <div key={key} className="bg-gray-900/50 border border-white/10 p-6 rounded-lg">
              <h3 className="font-playfair text-xl mb-4">{pack.name}</h3>
              {prices[key as keyof typeof prices] > 0 && (
                <div className="text-2xl font-playfair mb-6">
                  {formatPrice(prices[key as keyof typeof prices])}
                </div>
              )}
              <ul className="space-y-3 mb-6">
                {pack.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubmit(key as 'bronze' | 'silver' | 'gold')}
                className="w-full bg-white text-black px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Mail size={18} />
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeesSection;