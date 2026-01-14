'use client';

import { useState, useEffect, useCallback } from 'react';
import { PACKAGES, CURRENCIES, TRAVEL_SUPPLEMENTS } from '@/config/constants';

interface PriceCalculation {
  bronze: number;
  silver: number;
  gold: number;
}

interface FeesCalculatorState {
  squareMeters: string;
  country: string;
  city: string;
  currency: string;
  prices: PriceCalculation;
  discountPercent: number;
  packageEmails: {
    bronze: string;
    silver: string;
    gold: string;
  };
}

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

export const useFeesCalculator = () => {
  const [state, setState] = useState<FeesCalculatorState>({
    squareMeters: '',
    country: 'Thailand',
    city: '',
    currency: 'USD',
    prices: { bronze: 0, silver: 0, gold: 0 },
    discountPercent: 0,
    packageEmails: { bronze: '', silver: '', gold: '' }
  });

  const getDiscountRate = useCallback((squareMeters: number): number => {
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
  }, []);

  const calculatePrice = useCallback((
    basePrice: number,
    minPrice: number,
    ratePerSqm: number,
    squareMeters: number,
    country: string
  ): number => {
    const initialPrice = Math.max(minPrice, basePrice + (squareMeters * ratePerSqm));
    // Apply region-based travel supplement
    const supplement = TRAVEL_SUPPLEMENTS[country as keyof typeof TRAVEL_SUPPLEMENTS] || 0;
    let finalPrice = initialPrice;

    if (supplement > 0) {
      finalPrice += (finalPrice * supplement);
    }

    return finalPrice;
  }, []);

  const getEstimatedTimeline = useCallback((packageType: string, squareMeters: number = 0): string => {
    switch (packageType) {
      case 'bronze':
        return PACKAGES.BLUEPRINT.timeline;
      case 'silver':
        return squareMeters > 700
          ? (typeof PACKAGES.FRAMEWORK.timeline === 'object' ? PACKAGES.FRAMEWORK.timeline.large : PACKAGES.FRAMEWORK.timeline)
          : (typeof PACKAGES.FRAMEWORK.timeline === 'object' ? PACKAGES.FRAMEWORK.timeline.small : PACKAGES.FRAMEWORK.timeline);
      case 'gold':
        return squareMeters > 700
          ? (typeof PACKAGES.LAUNCH.timeline === 'object' ? PACKAGES.LAUNCH.timeline.large : PACKAGES.LAUNCH.timeline)
          : (typeof PACKAGES.LAUNCH.timeline === 'object' ? PACKAGES.LAUNCH.timeline.small : PACKAGES.LAUNCH.timeline);
      default:
        return '6-28 weeks';
    }
  }, []);

  // Recalculate prices when square meters or country changes
  useEffect(() => {
    if (state.squareMeters) {
      const squareMeters = parseInt(state.squareMeters);
      const discount = getDiscountRate(squareMeters);

      const newPrices = {
        bronze: calculatePrice(
          PACKAGES.BLUEPRINT.basePrice,
          PACKAGES.BLUEPRINT.minPrice,
          PACKAGES.BLUEPRINT.ratePerSqm,
          squareMeters,
          state.country
        ),
        silver: calculatePrice(
          PACKAGES.FRAMEWORK.basePrice,
          PACKAGES.FRAMEWORK.minPrice,
          PACKAGES.FRAMEWORK.ratePerSqm,
          squareMeters,
          state.country
        ),
        gold: calculatePrice(
          PACKAGES.LAUNCH.basePrice,
          PACKAGES.LAUNCH.minPrice,
          PACKAGES.LAUNCH.ratePerSqm,
          squareMeters,
          state.country
        )
      };

      setState(prev => ({
        ...prev,
        prices: newPrices,
        discountPercent: discount
      }));
    } else {
      setState(prev => ({
        ...prev,
        prices: { bronze: 0, silver: 0, gold: 0 },
        discountPercent: 0
      }));
    }
  }, [state.squareMeters, state.country, getDiscountRate, calculatePrice]);

  const updateSquareMeters = useCallback((value: string) => {
    setState(prev => ({ ...prev, squareMeters: value }));
  }, []);

  const updateCountry = useCallback((value: string) => {
    setState(prev => ({ ...prev, country: value }));
  }, []);

  const updateCity = useCallback((value: string) => {
    setState(prev => ({ ...prev, city: value }));
  }, []);

  const updateCurrency = useCallback((value: string) => {
    setState(prev => ({ ...prev, currency: value }));
  }, []);

  const updatePackageEmail = useCallback((packageType: string, email: string) => {
    setState(prev => ({
      ...prev,
      packageEmails: {
        ...prev.packageEmails,
        [packageType]: email
      }
    }));
  }, []);

  const formatPrice = useCallback((price: number): string => {
    const convertedPrice = price * CURRENCIES[state.currency as keyof typeof CURRENCIES].rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: state.currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  }, [state.currency]);

  return {
    ...state,
    updateSquareMeters,
    updateCountry,
    updateCity,
    updateCurrency,
    updatePackageEmail,
    getEstimatedTimeline,
    formatPrice,
    getDiscountRate
  };
};
