// Site Configuration
export const SITE_CONFIG = {
  name: import.meta.env.VITE_SITE_NAME || 'Cracks Hospitality Studio',
  url: import.meta.env.VITE_SITE_URL || 'https://cracks-studio.com',
  description: 'Expert restaurant consulting services from concept to launch. We help create profitable hospitality businesses worldwide with our proven methodology.',
  keywords: 'restaurant consulting, hospitality consulting, restaurant development, food service consulting, worldwide restaurant consulting, international hospitality consulting, restaurant concept development, restaurant launch services, Thailand restaurant consulting',
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'nacho@cracks-studio.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+66800743811',
    location: {
      city: 'Bangkok',
      country: 'Thailand',
      postalCode: '10110'
    }
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/cracks-hospitality-studio',
    facebook: 'https://www.facebook.com/people/Cracks-Hospitality-Studio/61577749381887/',
    instagram: 'https://www.instagram.com/crackshospitalitystudio'
  }
} as const;

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://n8n-cracks-u43278.vm.elestio.app',
  endpoints: {
    contact: `/webhook/${import.meta.env.VITE_CONTACT_WEBHOOK_ID || 'c3d103a5-6075-42e7-9b45-2b2a4e0ccca9'}`,
    quotation: `/webhook/${import.meta.env.VITE_QUOTATION_WEBHOOK_ID || '321f6d73-288c-48f4-aa15-9b24cba76166'}`
  },
  timeout: 10000,
  retries: 3
} as const;

// External Assets
export const ASSETS_CONFIG = {
  supabaseURL: import.meta.env.VITE_SUPABASE_URL || 'https://banpdomqwvebesayycpm.supabase.co',
  images: {
    heroBackground: `${import.meta.env.VITE_SUPABASE_URL || 'https://banpdomqwvebesayycpm.supabase.co'}/storage/v1/object/public/image_metadata/permanent/Cracks%20website/home-photo.jpg`
  }
} as const;

// Package Configuration
export const PACKAGES = {
  BLUEPRINT: {
    id: 'bronze',
    name: 'BLUEPRINT',
    basePrice: 0,
    minPrice: 25000,
    ratePerSqm: 100,
    title: 'STRATEGIC PLANNING & CONCEPT DEVELOPMENT',
    timeline: '6-8 weeks'
  },
  FRAMEWORK: {
    id: 'silver',
    name: 'FRAMEWORK',
    basePrice: 0,
    minPrice: 42500,
    ratePerSqm: 170,
    title: 'STRATEGIC PLANNING, DESIGN & DEVELOPMENT',
    timeline: { small: '12-18 weeks', large: '19-28 weeks' }
  },
  LAUNCH: {
    id: 'gold',
    name: 'LAUNCH',
    basePrice: 0,
    minPrice: 57500,
    ratePerSqm: 230,
    title: 'FROM ZERO TO CASHFLOW',
    timeline: { small: '20-28 weeks', large: '29-48 weeks' }
  }
} as const;

// Currency Configuration
export const CURRENCIES = {
  USD: { rate: 1, symbol: '$' },
  THB: { rate: 35, symbol: '฿' },
  EUR: { rate: 0.9, symbol: '€' }
} as const;

// Travel Supplements
export const TRAVEL_SUPPLEMENTS = {
  'Thailand': 0,
  'Southeast Asia': 0.05,
  'Asia-Pacific': 0.10,
  'Europe/Middle East': 0.15,
  'Americas': 0.20
} as const;

// Theme Configuration
export const THEME = {
  colors: {
    primary: {
      50: '#f8fafc',
      900: '#0f172a',
    }
  },
  spacing: {
    section: 'py-24',
    card: 'p-8',
  },
  typography: {
    heading: 'font-playfair text-3xl md:text-4xl',
    body: 'font-lato font-light',
  }
} as const;
