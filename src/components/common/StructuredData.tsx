import { SITE_CONFIG } from '../../config/constants';

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'article';
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'organization', data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": SITE_CONFIG.name,
          "description": SITE_CONFIG.description,
          "url": SITE_CONFIG.url,
          "telephone": SITE_CONFIG.contact.phone,
          "email": SITE_CONFIG.contact.email,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": SITE_CONFIG.contact.location.city,
            "addressCountry": SITE_CONFIG.contact.location.country,
            "postalCode": SITE_CONFIG.contact.location.postalCode
          },
          "serviceArea": {
            "@type": "Place",
            "name": "Asia-Pacific, Europe, Middle East, Americas"
          },
          "areaServed": [
            {
              "@type": "Country",
              "name": "Thailand"
            },
            {
              "@type": "Country",
              "name": "Hong Kong"
            },
            {
              "@type": "Country",
              "name": "Singapore"
            },
            {
              "@type": "Country",
              "name": "Malaysia"
            },
            {
              "@type": "Country",
              "name": "Indonesia"
            },
            {
              "@type": "Country",
              "name": "Philippines"
            },
            {
              "@type": "Continent",
              "name": "Asia"
            },
            {
              "@type": "Continent", 
              "name": "Europe"
            },
            {
              "@type": "Continent",
              "name": "North America"
            },
            {
              "@type": "Continent",
              "name": "South America"
            },
            {
              "@type": "Continent",
              "name": "Africa"
            },
            {
              "@type": "Continent",
              "name": "Australia"
            }
          ],
          "services": [
            {
              "@type": "Service",
              "name": "Restaurant Concept Development",
              "description": "Complete restaurant concept creation and validation services"
            },
            {
              "@type": "Service",
              "name": "Restaurant Design & Development", 
              "description": "Comprehensive design coordination and development support"
            },
            {
              "@type": "Service",
              "name": "Restaurant Launch Support",
              "description": "Complete launch and operational setup services"
            },
            {
              "@type": "Service",
              "name": "Restaurant Management Consulting",
              "description": "Ongoing operational support and performance optimization"
            }
          ],
          "founder": {
            "@type": "Person",
            "name": "Nacho",
            "email": SITE_CONFIG.contact.email
          },
          "sameAs": [
            SITE_CONFIG.social.linkedin,
            SITE_CONFIG.social.facebook,
            SITE_CONFIG.social.instagram
          ]
        };
      
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "provider": {
            "@type": "ProfessionalService",
            "name": SITE_CONFIG.name
          },
          ...data
        };
        
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "publisher": {
            "@type": "Organization",
            "name": SITE_CONFIG.name,
            "url": SITE_CONFIG.url
          },
          ...data
        };
        
      default:
        return data || {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;
