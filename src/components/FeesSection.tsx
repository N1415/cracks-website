import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';

const locations = {
  Thailand: {
    cities: ['Bangkok', 'Phuket', 'Chiang Mai'],
    currency: 'THB',
    baseRate: 8000
  },
  Singapore: {
    cities: ['Singapore Central', 'Orchard', 'Marina Bay'],
    currency: 'SGD',
    baseRate: 300
  },
  'Hong Kong': {
    cities: ['Central', 'TST', 'Causeway Bay'],
    currency: 'HKD',
    baseRate: 2500
  }
};

const businessModels = ['Restaurant', 'Bar', 'Others'];
const currencies = ['THB', 'USD', 'EUR'];

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

const FeesSection = () => {
  const [country, setCountry] = useState('Thailand');
  const [city, setCity] = useState('');
  const [businessModel, setBusinessModel] = useState('Restaurant');
  const [sqm, setSqm] = useState('');
  const [calculatedFee, setCalculatedFee] = useState(0);
  const [timeline, setTimeline] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [convertedFee, setConvertedFee] = useState(0);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (city && businessModel && sqm) {
      calculateFees();
    }
  }, [country, city, businessModel, sqm, selectedCurrency, exchangeRates]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/THB');
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const calculateFees = () => {
    const sqmNum = parseInt(sqm);
    const baseRate = locations[country as keyof typeof locations].baseRate;
    
    let discountPercentage = 0;
    if (sqmNum > 500) {
      discountPercentage = Math.floor((sqmNum - 500) / 100) * 3;
    }
    
    if (discountPercentage > 18) {
      discountPercentage = 18;
    }
    
    setDiscount(discountPercentage);
    
    const baseFee = sqmNum * baseRate;
    const discountedFee = baseFee * (1 - (discountPercentage / 100));
    setCalculatedFee(Math.round(discountedFee));

    if (exchangeRates[selectedCurrency]) {
      const rate = exchangeRates[selectedCurrency];
      setConvertedFee(Math.round(discountedFee * rate));
    }

    if (sqmNum <= 250) setTimeline('6-8 months');
    else if (sqmNum <= 500) setTimeline('7-9 months');
    else if (sqmNum <= 700) setTimeline('8-12 months');
    else if (sqmNum <= 900) setTimeline('9-15 months');
    else setTimeline('15+ months');
  };

  return (
    <section id="fees" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">OUR FEES</h2>
          <div className="w-16 h-px bg-white mx-auto my-8"></div>
            <p className="font-lato font-thin text-lg text-gray-300 max-w-3xl mx-auto">Our fees are earned across three phases — each one designed to create tangible return before, during, and after your venue opens.
          </p>
          </div>
        <div>
          
          {/* Phases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {phases.map((phase) => (
            <div 
              key={phase.number} 
              className="bg-gray-900/50 border border-white/10 p-8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="font-playfair text-4xl text-white  p-8 mb-6">{phase.number}</div>
              <div className="w-12 h-px bg-white/30 mb-6"></div>
              <h3 className="font-playfair text-xl mb-4">{phase.title}</h3>
              <p className="font-lato text-white" style={{ fontWeight: '300' }}>{phase.description}</p>
            </div>
          ))}
        </div>
          <div className="h-24 flex items-center justify-center mb-6">
          <span className="font-playfair mb-10 text-xl text-white text-center p-8 max-w-3xl mx-auto">
            Calculate your project investment based on location, size, and business model.
          </span>
        </div>
        </div>
        <div className="grid grid-cols-1 bg-black md:grid-cols-2 gap-12">
          
          {/* Calculator Form */}
          <div className="bg-black text-white mt-10 p-8 border border-white/50 rounded px-3">
            <h3 className="font-playfair text-white text-2xl mb-6">Fee Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white font-medium mb-2">Country</label>
                <select 
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setCity('');
                  }}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {Object.keys(locations).map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  <option value="">Select a city</option>
                  {locations[country as keyof typeof locations].cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Model</label>
                <select 
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {businessModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Square Meters</label>
                <input 
                  type="number"
                  value={sqm}
                  onChange={(e) => setSqm(e.target.value)}
                  placeholder="Enter space size"
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                  min="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Currency</label>
                <select 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                >
                  {currencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-black text-white mt-10 p-8 border border-white/50  rounded px-3">
            <h3 className="font-playfair text-2xl mb-6">Project Details</h3>
            
            {calculatedFee > 0 && (
              <div className="space-y-6">
                <div>
                  <p className="text-gray-400 mb-2">Estimated Project Fee:</p>
                  <p className="text-3xl font-playfair">
                    {selectedCurrency} {convertedFee.toLocaleString()}
                  </p>
                  {selectedCurrency !== 'THB' && (
                    <p className="text-sm text-gray-400 mt-1">
                      (THB {calculatedFee.toLocaleString()})
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Estimated Timeline:</p>
                  <p className="text-xl">{timeline}</p>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-playfair text-lg mb-4">Payment Terms</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>20% upon contract signing</li>
                    <li>30% upon concept approval</li>
                    <li>30% upon operational manual delivery</li>
                    <li>20% upon project completion</li>
                  </ul>
                </div>

                <div className="pt-6">
                  <h4 className="font-playfair text-lg mb-4">Get Your Quotation</h4>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-white"
                    />
                    <a
                      href="/api/send-quotation"
                      className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors"
                    >
                      <Mail size={18} />
                      Send
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeesSection;