import { SITE_CONFIG, ASSETS_CONFIG, PACKAGES, TEAM_MEMBERS } from '@/config/constants';

const BASE_URL = 'https://cracks-studio.com';

// Organization Schema - for the company identity
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: BASE_URL,
    logo: ASSETS_CONFIG.logos.png.black,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.contact.location.city,
      addressCountry: SITE_CONFIG.contact.location.country,
      postalCode: SITE_CONFIG.contact.location.postalCode,
    },
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.contact.phone,
      contactType: 'customer service',
      email: SITE_CONFIG.contact.email,
      availableLanguage: ['English', 'Spanish'],
    },
  };
}

// ProfessionalService Schema - for local business SEO
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.name,
    url: BASE_URL,
    logo: ASSETS_CONFIG.logos.png.black,
    image: ASSETS_CONFIG.logos.og.black,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.contact.location.city,
      addressCountry: SITE_CONFIG.contact.location.country,
      postalCode: SITE_CONFIG.contact.location.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.7563,
      longitude: 100.5018,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$$',
    areaServed: [
      { '@type': 'Country', name: 'Thailand' },
      { '@type': 'Continent', name: 'Asia' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: [
      'Restaurant Consulting',
      'Hospitality Consulting',
      'Restaurant Concept Development',
      'Restaurant Launch Services',
    ],
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ],
  };
}

// Service Schema - for the 3 packages
export function generateServicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: `${PACKAGES.BLUEPRINT.name} - ${PACKAGES.BLUEPRINT.title}`,
          description: 'Strategic planning and concept development for restaurant ventures. Includes market analysis, competitive research, concept development, financial feasibility studies, and operational templates.',
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: PACKAGES.BLUEPRINT.minPrice,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: PACKAGES.BLUEPRINT.minPrice,
              minPrice: PACKAGES.BLUEPRINT.minPrice,
            },
          },
          serviceType: 'Restaurant Consulting',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: `${PACKAGES.FRAMEWORK.name} - ${PACKAGES.FRAMEWORK.title}`,
          description: 'Complete strategic planning, design coordination, and development services. Includes everything in Blueprint plus restaurant design coordination, kitchen and bar design, project management, and vendor coordination.',
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: PACKAGES.FRAMEWORK.minPrice,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: PACKAGES.FRAMEWORK.minPrice,
              minPrice: PACKAGES.FRAMEWORK.minPrice,
            },
          },
          serviceType: 'Restaurant Consulting',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: `${PACKAGES.LAUNCH.name} - ${PACKAGES.LAUNCH.title}`,
          description: 'Full-service restaurant launch package from concept to cashflow. Includes everything in Framework plus operational setup, staff training, marketing strategy, launch support, and ongoing performance monitoring.',
          provider: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
          },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: PACKAGES.LAUNCH.minPrice,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              price: PACKAGES.LAUNCH.minPrice,
              minPrice: PACKAGES.LAUNCH.minPrice,
            },
          },
          serviceType: 'Restaurant Consulting',
        },
      },
    ],
  };
}

// Person Schema - for team members
export function generateTeamSchema() {
  return TEAM_MEMBERS.map((member, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
    image: member.image,
    url: `${BASE_URL}/#team`,
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    sameAs: [member.linkedin],
    knowsAbout: [
      'Restaurant Management',
      'Hospitality Consulting',
      'Restaurant Operations',
      'Food & Beverage',
      'Team Leadership',
    ],
  }));
}

// FAQ Schema - for services section
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Cracks Hospitality Studio offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer three comprehensive consulting packages: BLUEPRINT for strategic planning and concept development, FRAMEWORK for complete design and development coordination, and LAUNCH for full-service restaurant opening support from concept to cashflow.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do restaurant consulting services cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our packages start from $25,000 USD for BLUEPRINT (strategic planning), $42,500 USD for FRAMEWORK (design & development), and $57,500 USD for LAUNCH (full opening support). Pricing is based on venue size at $100-230 per square meter depending on the package.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Cracks Hospitality Studio located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are based in Bangkok, Thailand, but we work with clients worldwide. Our team has extensive experience across Asia, Europe, and the Middle East.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to open a restaurant with your help?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Timeline depends on the package and venue size. BLUEPRINT takes 6-8 weeks, FRAMEWORK takes 12-28 weeks, and LAUNCH takes 20-48 weeks from start to opening day.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the restaurant consulting process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our process includes market analysis, concept development, financial planning, design coordination, operational setup, staff training, marketing strategy, and launch support. We provide a hands-on approach with weekly progress updates and on-site support.',
        },
      },
    ],
  };
}

// WebSite Schema - for sitelinks search box
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: BASE_URL,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: ASSETS_CONFIG.logos.png.black,
    },
    inLanguage: ['en', 'es'],
  };
}

// Combine all schemas for homepage
export function generateHomePageSchemas() {
  return [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebsiteSchema(),
    generateServicesSchema(),
    generateFAQSchema(),
    ...generateTeamSchema(),
  ];
}
