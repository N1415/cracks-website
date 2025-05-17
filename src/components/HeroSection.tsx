import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

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
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://banpdomqwvebesayycpm.supabase.co/storage/v1/object/public/image_metadata/permanent/Cracks%20website/home-photo.jpg")',
          opacity: 0.6
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 
          ref={titleRef} 
          className="opacity-0 font-playfair text-2xl md:text-3xl lg:text-4xl text-white mb-6 tracking-wider"
          style={{ 
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            transform: 'translateY(20px)'
          }}
        >
          CRACKS HOSPITALITY STUDIO 
        </h1>
        
        <h2 
          ref={subtitleRef} 
          className="opacity-0 font-playfair text-xl md:text-sm lg:text-base text-white mb-6 tracking-wider" 
          style={{ 
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out', 
            transform: 'translateY(20px)',
            fontSize: '85%' 
          }}
        >
          BUILDING HOSPITALITY ICONS, ONE CONCEPT AT A TIME
        </h2>
        {/*
        <button 
          onClick={scrollToServices}
          className="bg-white text-black font-lato py-3 px-8 tracking-wide hover:bg-gray-200 transition-colors"style={{ fontWeight: '300' }}
        >
          DISCOVER OUR SERVICES
        </button>
        */}
      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={scrollToServices}
      >
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
};

export default HeroSection;