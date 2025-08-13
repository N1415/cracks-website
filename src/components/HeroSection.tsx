import { useEffect, useRef } from 'react';
import LazyImage from './common/LazyImage';
import { ASSETS_CONFIG } from '../config/constants';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement; // <-- add this line
            target.classList.add('animate-fade-in');
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    if (subtitleRef.current) {
      observer.observe(subtitleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (subtitleRef.current) {
        observer.unobserve(subtitleRef.current);
      }
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('fees');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full h-screen bg-black flex items-center justify-center" 
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.6 }}>
        <LazyImage
          src={ASSETS_CONFIG.images.heroBackground}
          alt="Elegant restaurant interior showcasing Cracks Hospitality Studio's design expertise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" aria-hidden="true"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 
          id="hero-title"
          ref={titleRef} 
          className="opacity-0 font-playfair text-2xl md:text-3xl lg:text-4xl text-white mb-6 tracking-wider text-center"
          style={{ 
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            transform: 'translateY(20px)'
          }}
        >
          CRACKS HOSPITALITY STUDIO 
        </h1>
        
        <h2 
          ref={subtitleRef} 
          className="opacity-0 font-playfair text-lg md:text-xl text-white mb-6 tracking-wider text-center" 
          style={{ 
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out', 
            transform: 'translateY(20px)',
            fontSize: '85%' 
          }}
          aria-describedby="hero-description"
        >
          BUILDING HOSPITALITY ICONS, ONE RESTAURANT AT A TIME
        </h2>
        
        <div id="hero-description" className="sr-only">
          Cracks Hospitality Studio specializes in restaurant concept development, design coordination, and comprehensive launch support for hospitality businesses.
        </div>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <button 
            onClick={() => {
              if (window.Calendly) {
                window.Calendly.initPopupWidget({url: 'https://calendly.com/nacho-cracks-studio/60min?primary_color=1a1a1a'});
              }
            }}
            className="bg-transparent border-2 border-white text-white font-lato py-3 px-8 tracking-wide hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
            style={{ fontWeight: '300' }}
            aria-label="Book a first consultation"
          >
            BOOK A FIRST CALL
          </button>

          <button 
            onClick={scrollToServices}
            className="bg-transparent border-2 border-white text-white font-lato py-3 px-8 tracking-wide hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
            style={{ fontWeight: '300' }}
          >
            GET A TAILORED QUOTE
          </button>
          
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;