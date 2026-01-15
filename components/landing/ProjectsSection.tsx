'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/config/constants';

const projectIcons: Record<number, React.ReactNode> = {
  1: (
    <Image
      src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/logos_partners/Cento%20Logos%20OK-03.png"
      alt="Cento"
      width={40}
      height={40}
      className="object-cover rounded-full"
    />
  ),
  2: (
    <div className="bg-white rounded-full p-1">
      <Image
        src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/logos_partners/QUILOMBO-LOGO-09-OK.png"
        alt="Quilombo"
        width={28}
        height={28}
        className="object-contain"
      />
    </div>
  ),
  3: (
    <Image
      src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/logos_partners/one_bangkok.png"
      alt="One Bangkok"
      width={40}
      height={40}
      className="object-cover rounded-full"
    />
  ),
  4: (
    <Image
      src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/logos_partners/one_bangkok.png"
      alt="One Bangkok"
      width={40}
      height={40}
      className="object-cover rounded-full"
    />
  ),
};

// Mobile Card Component
function MobileProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 180 * index);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative h-[280px] overflow-hidden rounded-lg border-2 border-[#292929] hover:border-[#F5F1E8] transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 500ms ease-out',
      }}
    >
      {/* Background Image */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="100vw"
        unoptimized
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute left-0 right-0 bottom-0 z-[2] p-4">
        <div className="flex items-end gap-3">
          <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[#000000] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0">
            {projectIcons[project.id]}
          </div>
          <div className="text-white flex-1">
            <div className="font-serif font-bold text-lg text-[#F5F1E8]">
              {project.title}
            </div>
            <div className="text-sm text-gray-300 font-sans">
              {project.category}
            </div>
            <p className="text-sm text-gray-200 font-sans font-light line-clamp-2 mt-2">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number, url: string) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    PROJECTS.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <section id="projects" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>Projects</h2>
        </div>

        {/* Mobile: Vertical Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {PROJECTS.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Desktop: Interactive Selector */}
        <div className="hidden md:flex w-full max-w-[1100px] h-[450px] mx-auto items-stretch overflow-hidden relative">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                transition: 'all 700ms ease-in-out',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '60px',
                minHeight: '100px',
                margin: 0,
                borderRadius: 0,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: activeIndex === index ? '#F5F1E8' : '#292929',
                backgroundColor: '#18181b',
                boxShadow:
                  activeIndex === index
                    ? '0 20px 60px rgba(0,0,0,0.50)'
                    : '0 10px 30px rgba(0,0,0,0.30)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
              }}
              onClick={() => handleOptionClick(index, project.url)}
            >
              {/* Background Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="70vw"
                unoptimized
                className="object-cover"
                style={{
                  transition: 'transform 700ms ease-in-out',
                  transform: activeIndex === index ? 'scale(1)' : 'scale(1.2)',
                }}
              />

              {/* Shadow overlay */}
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  transition: 'all 700ms ease-in-out',
                  bottom: activeIndex === index ? '0' : '-40px',
                  height: '120px',
                  boxShadow:
                    activeIndex === index
                      ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                      : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
                }}
              />

              {/* Label with icon and info */}
              <div className="absolute left-0 right-0 bottom-0 z-[2] pointer-events-none px-4 pb-4">
                {/* Dark gradient background for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

                <div className="relative flex items-end gap-3">
                  <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[#000000] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                    {projectIcons[project.id]}
                  </div>
                  <div className="text-white relative flex-1">
                    <div
                      className="font-serif font-bold text-lg text-[#F5F1E8]"
                      style={{
                        transition: 'all 700ms ease-in-out',
                        opacity: activeIndex === index ? 1 : 0,
                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                      }}
                    >
                      {project.title}
                    </div>
                    <div
                      className="text-sm text-gray-300 font-sans"
                      style={{
                        transition: 'all 700ms ease-in-out',
                        opacity: activeIndex === index ? 1 : 0,
                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                      }}
                    >
                      {project.category}
                    </div>
                    {/* Description - below title/category */}
                    {activeIndex === index && (
                      <p
                        className="text-sm text-gray-200 font-sans font-light line-clamp-2 max-w-lg mt-2"
                        style={{
                          transition: 'all 700ms ease-in-out',
                        }}
                      >
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
