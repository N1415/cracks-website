// Site Configuration
export const SITE_CONFIG = {
  name: 'Cracks Hospitality Studio',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cracks-studio.com',
  description: 'Expert restaurant consulting services from concept to launch. We help create profitable hospitality businesses worldwide with our proven methodology.',
  keywords: 'restaurant consulting, hospitality consulting, restaurant development, food service consulting, worldwide restaurant consulting, international hospitality consulting, restaurant concept development, restaurant launch services, Thailand restaurant consulting',
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nacho@cracks-studio.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+66800743811',
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

// API Configuration - Centralized SMTP service
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cracks-app.com',
  endpoints: {
    contact: '/public/contact'
  },
  timeout: 10000,
  retries: 3
} as const;

// External Assets
export const ASSETS_CONFIG = {
  supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://moyusgyrteirxbivehyz.supabase.co',
  images: {
    heroBackground: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/home-photo.jpg',
    cento: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/Cento-Header-Home-2400x932-1.jpg',
    frasers: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/one_bangkok.jpg',
    manu: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/manu.jpg',
    nacho: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/nacho.jpg',
    method1: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/Quilombo-gallery-02-824x1030.jpg',
    method2: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/cento_garden.jpg',
    method3: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/CENTO-BY-DIEGO-ARENAS---OCTOBER-2024-66.jpg',
    method4: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/velvet_room.png'
  },
  logos: {
    svg: {
      black: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_black.svg',
      white: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_white.svg'
    },
    png: {
      black: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png',
      white: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png'
    },
    og: {
      black: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/jpg/black_og.jpg',
      white: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/jpg/white_og.jpg'
    }
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

// Common country codes for hospitality industry clients
export const COUNTRY_CODES = [
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
] as const;

// Package features data
export const PACKAGE_FEATURES = {
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
} as const;

// Team members data
export const TEAM_MEMBERS = [
  {
    name: "Manuel Palacio",
    title: "Serial Founder & Hospitality Visionary",
    bio: "A hospitality innovator who combines operational excellence with brand magic to create successful restaurant concepts across Asia.",
    section: `Manuel is a hospitality innovator who combines operational excellence with brand magic to create some of Asia's most successful restaurant concepts.

As Co-founder of Pirata Group, he built Hong Kong's leading restaurant portfolio, scaling to 27 venues across 13 brands including PICI, The Pizza Project, TMK, TokyoLima, Pirata, and more, while driving a culture-first team model with industry-leading retention rates and multi-million dollar EBITDA growth.

Today, he serves as Chairman of Pirata Group, leads Cento — a modern Italian eatery redefining luxury casual dining in Bangkok — and runs Cracks Hospitality Studio, helping visionary operators across Asia develop next-generation F&B concepts that balance authenticity with scalability.

His approach, centered on Soul & Scale, operational excellence, guest obsession, and distinctive brand storytelling, continues to shape the future of hospitality across the region.`,
    image: "https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/manu.jpg",
    objectPosition: "100% 0%",
    linkedin: "https://www.linkedin.com/in/manuel-palacio/",
  },
  {
    name: "Nacho López",
    title: "F&B Strategist & Concept Builder",
    bio: "A seasoned hospitality professional with 15+ years of experience, transforming raw spaces into high-revenue destinations by combining European roots with Asian agility.",
    section: `Nacho is a seasoned hospitality professional with over 15 years of experience transforming raw spaces into high-revenue destinations by blending European roots with Asian agility.

He has built and led high-performing teams across Spain, Hong Kong, and Thailand, scaling operations while maintaining brand integrity and mentoring talent to create sustainable management structures.

As Operations Manager of Pici Hong Kong, he helped elevate one of the region's most celebrated pasta concepts, while earlier directing large-scale beach operations at Cala Bassa Beach Club in Ibiza and founding MamaQuilla in Madrid, a vibrant Latin dinner show experience.

Today, he leads Cracks Hospitality Studio, shaping next-generation restaurant concepts with purpose and performance, while also consulting for hotels and operators to create high-yield venues.

His approach, known as The Nacho Method, focuses on building people-first cultures, engineering concepts for operational success, and designing guest-centric experiences that consistently drive revenue and loyalty.`,
    image: "https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/nacho.jpg",
    objectPosition: "40% 20%",
    linkedin: "https://www.linkedin.com/in/nacho-lopez-diaz-29586450",
  }
] as const;

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: 'CENTO',
    category: 'Italian Eatery',
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/Cento-Header-Home-2400x932-1.jpg',
    description: "Cento, translating to 'hundred' in Italian, embraces a 'one hundred years' mentality across all aspects of its operations. It symbolises a commitment to enduring excellence, inviting guests to indulge in an unforgettable dining experience rooted in the beauty of uncomplicated simplicity.",
    url: 'https://centobangkok.com/'
  },
  {
    id: 2,
    title: 'QUILOMBO',
    category: 'Fire, Beef & Wine',
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/QUILOMBO%202%20By%20Diego%20Arenas%20-%20December%202025-19.jpg',
    description: "Where Buenos Aires meets Bangkok. Set within Bangkok's only castle, Quilombo is pure Argentine tradition—fire, exceptional beef, and wine—honoured with reverence and executed with precision. A steakhouse built the old way.",
    url: 'https://quilombobangkok.com/'
  },
  {
    id: 3,
    title: 'MODERN JAPANESE',
    category: 'Coming Soon to One Bangkok:',
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/japo_one_bangkok.jpg',
    description: "A modern interpretation of traditional Japanese robatayaki dining. Precise, elegant, and deeply rooted in Japan's cooking heritage. Designed as a destination dining experience within a luxury hotel, it celebrates the ancient art of charcoal grilling with a disciplined focus on ingredient quality, technical precision, and the theatrical performance of culinary craft.",
    url: 'https://www.frasershospitality.com/en/thailand/bangkok/fraser-suites-bangkok/'
  },
  {
    id: 4,
    title: 'ITALIAN MEDITERRANEAN',
    category: 'Coming Soon to One Bangkok:',
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/italian_one_bangkok.jpg',
    description: "A sophisticated Italian dining destination that captures the effortless elegance and sun-drenched luxury of the Italian Riviera while celebrating authentic Italian culinary traditions. The design evokes the feeling of dining at an exclusive beach club in the Mediterranean or a terrace overlooking the Italian Riviera.",
    url: 'https://www.frasershospitality.com/en/thailand/bangkok/fraser-suites-bangkok/'
  }
] as const;
