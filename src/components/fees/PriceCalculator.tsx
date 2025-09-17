import React from 'react';
import { CURRENCIES, TRAVEL_SUPPLEMENTS } from '../../config/constants';

interface PriceCalculatorProps {
  squareMeters: string;
  onSquareMetersChange: (value: string) => void;
  country: string;
  onCountryChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  squareMeters,
  onSquareMetersChange,
  country,
  onCountryChange,
  city,
  onCityChange,
  currency,
  onCurrencyChange
}) => {
  return (
    <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-12 mb-12">
      <h2 className="font-playfair text-3xl mb-10 text-center">Calculate Your Fees</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col">
          <label htmlFor="region-select" className="block text-base mb-3 font-medium">
            Region
          </label>
          <select
            id="region-select"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] transition-colors"
            aria-describedby="region-description"
          >
            {Object.keys(TRAVEL_SUPPLEMENTS).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <div id="region-description" className="text-xs text-gray-400 mt-1">
            {/* Travel supplement display removed */}
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="city-input" className="block text-base mb-3 font-medium">
            City / Country
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] transition-colors"
            placeholder="Enter city name"
            aria-describedby="city-help"
          />
          <div id="city-help" className="text-xs text-gray-400 mt-1">
            Specify the project location
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="sqm-input" className="block text-base mb-3 font-medium">
            Square Meters <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            id="sqm-input"
            type="number"
            value={squareMeters}
            onChange={(e) => onSquareMetersChange(e.target.value)}
            className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] transition-colors"
            placeholder="Enter square meters"
            min="250"
            aria-describedby="sqm-help"
            aria-required="true"
          />
          <div id="sqm-help" className="text-xs text-gray-400 mt-1">
            Minimum 250 sqm
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="currency-select" className="block text-base mb-3 font-medium">
            Currency
          </label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full bg-[#0a0f1a] border border-gray-800 rounded px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0f1420] transition-colors"
          >
            {Object.keys(CURRENCIES).map(curr => (
              <option key={curr} value={curr}>
                {curr} ({CURRENCIES[curr as keyof typeof CURRENCIES].symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
