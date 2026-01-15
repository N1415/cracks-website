'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ASSETS_CONFIG } from '@/config/constants';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const IMG_PADDING = 12;

export default function HeroSection() {
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
      role="banner"
      aria-labelledby="hero-title"
    >
      <div
        style={{
          paddingLeft: IMG_PADDING,
          paddingRight: IMG_PADDING,
        }}
      >
        <div className="relative h-[150vh]">
          <StickyImage imgUrl={ASSETS_CONFIG.images.heroBackground} />
          <OverlayCopy
            openCalendly={openCalendly}
            scrollToFees={scrollToFees}
          />
        </div>
      </div>
    </section>
  );
}

interface StickyImageProps {
  imgUrl: string;
}

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/50"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

interface OverlayCopyProps {
  openCalendly: () => void;
  scrollToFees: () => void;
}

const OverlayCopy = ({ openCalendly, scrollToFees }: OverlayCopyProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4"
    >
      <h1
        id="hero-title"
        className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wider text-center"
        style={{ fontVariant: 'small-caps' }}
      >
        Cracks Hospitality Studio
      </h1>
      <h2
        className="font-serif text-lg md:text-xl text-white mb-8 tracking-wider text-center"
        style={{ fontVariant: 'small-caps' }}
      >
        Building Hospitality Icons, One Restaurant at a Time
      </h2>

      <div id="hero-description" className="sr-only">
        Cracks Hospitality Studio specializes in restaurant concept
        development, design coordination, and comprehensive launch support for
        hospitality businesses.
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={openCalendly}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-wide font-bold"
          aria-label="Book a first consultation"
        >
          BOOK A FIRST CALL
        </Button>

        <Button
          onClick={scrollToFees}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 tracking-wide font-bold"
        >
          GET A TAILORED QUOTE
        </Button>
      </div>
    </motion.div>
  );
};
