'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ASSETS_CONFIG } from '@/config/constants';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
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

  const scrollToFees = () => {
    const feesSection = document.getElementById('fees');
    if (feesSection) {
      feesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/nacho-cracks-studio/60min?primary_color=1a1a1a',
      });
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
        <Image
          src={ASSETS_CONFIG.images.heroBackground}
          alt="Elegant restaurant interior showcasing Cracks Hospitality Studio's design expertise"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1
          id="hero-title"
          ref={titleRef}
          className="opacity-0 font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-6 tracking-wider text-center"
          style={{
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            transform: 'translateY(20px)',
          }}
        >
          CRACKS HOSPITALITY STUDIO
        </h1>

        <h2
          ref={subtitleRef}
          className="opacity-0 font-serif text-lg md:text-xl text-white mb-6 tracking-wider text-center"
          style={{
            transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
            transform: 'translateY(20px)',
            fontSize: '85%',
          }}
          aria-describedby="hero-description"
        >
          BUILDING HOSPITALITY ICONS, ONE RESTAURANT AT A TIME
        </h2>

        <div id="hero-description" className="sr-only">
          Cracks Hospitality Studio specializes in restaurant concept
          development, design coordination, and comprehensive launch support for
          hospitality businesses.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={openCalendly}
            className="bg-transparent border-2 border-white text-white font-sans py-3 px-8 tracking-wide hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded font-light"
            aria-label="Book a first consultation"
          >
            BOOK A FIRST CALL
          </button>

          <button
            onClick={scrollToFees}
            className="bg-transparent border-2 border-white text-white font-sans py-3 px-8 tracking-wide hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded font-light"
          >
            GET A TAILORED QUOTE
          </button>
        </div>
      </div>
    </section>
  );
}
