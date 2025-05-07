import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';

const locations = {
  Thailand: {
    cities: ['Bangkok', 'Phuket', 'Chiang Mai'],
    currency: 'THB',
    baseRate: 8000
  },
  International: {
    cities: ['Singapore Central', 'Orchard', 'Marina Bay'],
    currency: 'SGD',
    baseRate: 300
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
  const [, setDiscount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [convertedFee, setConvertedFee] = useState(0);

  useEffect(() => {
    // Load exchange rates when component mounts
    fetchExchangeRates();
    
    // Set up polling to refresh rates every 30 minutes
    const intervalId = setInterval(() => {
      fetchExchangeRates();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Make city field optional by not including it in the condition
    if (businessModel && sqm && exchangeRates) {
      calculateFees();
    }
  }, [country, city, businessModel, sqm, selectedCurrency, exchangeRates]);

  const fetchExchangeRates = async () => {
    try {
      // Use the Exchange Rate API that works without authentication
      const response = await axios.get('https://open.er-api.com/v6/latest/THB');
      
      if (response.data && response.data.rates) {
        console.log('Exchange rates fetched successfully');
        setExchangeRates(response.data.rates);
      } else {
        console.error('Invalid response from exchange rate API:', response.data);
        throw new Error('API response format not recognized');
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Do not set default rates, just alert the user
      alert('Could not fetch currency exchange rates. Please try again later or use THB.');
    }
  };

  const sendQuotation = async () => {
    // Verify email is provided
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    
    // Compile all the form data
    const quotationData = {
      projectDetails: {
        country,
        city,
        businessModel,
        squareMeters: sqm ? parseInt(sqm) : 0,
        currency: selectedCurrency,
        fee: {
          thb: calculatedFee,
          converted: convertedFee,
          displayCurrency: selectedCurrency
        },
        timeline,
      },
      contactInfo: {
        email
      },
      timestamp: new Date().toISOString()
    };
    
    try {
      // Use the provided n8n webhook URL
      const response = await axios.post('https://cracksstudio.app.n8n.cloud/webhook/321f6d73-288c-48f4-aa15-9b24cba76166', quotationData);
      
      if (response.status === 200) {
        alert("Quotation sent successfully! We'll contact you shortly.");
        setEmail(''); // Clear email field after successful submission
      } else {
        throw new Error('Failed to send quotation');
      }
    } catch (error) {
      console.error('Error sending quotation:', error);
      alert("There was an error sending your quotation. Please try again later.");
      
      // Fallback: open email client with pre-filled information
      const subject = encodeURIComponent("Restaurant Development Quotation Request");
      const body = encodeURIComponent(`
Project Details:
- Country: ${country}
- City: ${city || 'Not specified'}
- Business Model: ${businessModel}
- Square Meters: ${sqm}
- Estimated Fee: ${selectedCurrency} ${convertedFee.toLocaleString()}
- Timeline: ${timeline}

Please send me more information about this project.
      `);
      window.open(`mailto:nacho@cracks-studio.com?subject=${subject}&body=${body}`);
    }
  };

  const calculateFees = () => {
    const sqmNum = parseInt(sqm);
    
    // Check if country exists in locations
    if (!country || !locations[country as keyof typeof locations]) {
      console.error('Invalid country selected');
      return;
    }
    
    // Always use the same base rate of 8000 THB
    const baseRate = 8000;
    
    let discountPercentage = 0;
    if (sqmNum > 500) {
      discountPercentage = Math.floor((sqmNum - 500) / 100) * 3;
    }
    
    if (discountPercentage > 18) {
      discountPercentage = 18;
    }
    
    setDiscount(discountPercentage);
    
    // Calculate base fee in THB
    const baseFee = sqmNum * baseRate;
    
    // Apply the discount
    let discountedFee = baseFee * (1 - (discountPercentage / 100));
    
    // Minimum fee for small venues
    if (sqmNum < 250) {
      discountedFee = Math.max(discountedFee, 2000000);
    }
    
    // Set the calculated fee (in THB)
    setCalculatedFee(Math.round(discountedFee));

    // Handle currency conversion
    if (selectedCurrency === 'THB') {
      // No conversion needed
      setConvertedFee(Math.round(discountedFee));
    } else {
      // Check if we have the selected currency rate
      if (!exchangeRates || !exchangeRates[selectedCurrency]) {
        console.error('Exchange rate not available for', selectedCurrency);
        // Use THB as fallback but warn the user
        setConvertedFee(Math.round(discountedFee));
        // Switch back to THB in the UI
        setSelectedCurrency('THB');
        // Alert the user
        setTimeout(() => {
          alert(`Exchange rate for ${selectedCurrency} is not available. Displaying in THB.`);
        }, 100);
      } else {
        // Convert using the current exchange rate
        const rate = exchangeRates[selectedCurrency];
        console.log(`Converting ${discountedFee} THB to ${selectedCurrency} with rate ${rate}`);
        setConvertedFee(Math.round(discountedFee * rate));
      }
    }

    // Set timeline based on venue size
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
            <p className="font-lato font-thin text-lg text-gray-300 max-w-3xl mx-auto"style={{ fontWeight: '300' }}>Our fees are earned across three phases — each one designed to create tangible return before, during, and after your venue opens.
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
                <label className="block text-sm font-medium mb-2">City (Optional)</label>
                <input 
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Optional - Enter city name"
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                />
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
          <div className="bg-black text-white mt-10 p-8 border border-white/50 rounded px-3">
            <h3 className="font-playfair text-2xl mb-6">Project Details</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Estimated Project Fee:</p>
                {calculatedFee > 0 ? (
                  <>
                    <p className="text-3xl font-playfair">
                      {selectedCurrency} {convertedFee.toLocaleString()}
                    </p>
                    {selectedCurrency !== 'THB' && (
                      <p className="text-sm text-gray-400 mt-1">
                        (THB {calculatedFee.toLocaleString()})
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-xl text-gray-600 italic">Enter details to see fee calculation</p>
                )}
              </div>

              <div>
                <p className="text-gray-400 mb-2">Estimated Timeline:</p>
                {timeline ? (
                  <p className="text-xl">{timeline}</p>
                ) : (
                  <p className="text-xl text-gray-600 italic">Enter venue size to see timeline</p>
                )}
              </div>

              {calculatedFee > 0 && (
                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-playfair text-lg mb-4">Payment Terms</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>20% upon contract signing</li>
                    <li>30% upon concept approval</li>
                    <li>30% upon operational manual delivery</li>
                    <li>20% upon project completion</li>
                  </ul>
                </div>
              )}

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
                  <button
                    onClick={sendQuotation}
                    className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <Mail size={18} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeesSection;