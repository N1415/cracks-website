import { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
};

const SEO: React.FC<SEOProps> = ({
  title = SITE_CONFIG.name,
  description = SITE_CONFIG.description,
  keywords = SITE_CONFIG.keywords,
  canonical = window.location.href,
  image = `${SITE_CONFIG.url}/og-image.jpg`,
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', SITE_CONFIG.name);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', canonical, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', SITE_CONFIG.name, 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    
    // Social Media - LinkedIn, Facebook, Instagram
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:type', 'image/jpeg', 'property');
    
    // LinkedIn specific tags
    updateMetaTag('linkedin:owner', 'cracks-hospitality-studio', 'name'); // Update with your LinkedIn company page
    
    // Facebook specific tags
    updateMetaTag('fb:app_id', '', 'property'); // Add if you have Facebook App ID
    
    // Instagram won't use these meta tags, but good for general social sharing
    updateMetaTag('article:author', 'Cracks Hospitality Studio', 'property');
    
    // Canonical URL
    updateLinkTag('canonical', canonical);
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    
    // Language and region targeting
    updateMetaTag('language', 'English');
    updateMetaTag('geo.region', 'TH'); // Thailand as base
    updateMetaTag('geo.placename', 'Bangkok');
    
  }, [title, description, keywords, canonical, image, type]);

  return null;
};

export default SEO;
