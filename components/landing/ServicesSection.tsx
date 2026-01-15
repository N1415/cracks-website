'use client';

import {
  FeaturesSectionWithHoverEffects,
  type FeatureItem,
} from '@/components/ui/feature-section-with-hover-effects';
import { GlareCard } from '@/components/ui/glare-card';
import { WarpBackground } from '@/components/ui/warp-background';
import {
  Lightbulb,
  Settings,
  Handshake,
  ClipboardList,
} from 'lucide-react';

const phases = [
  {
    number: '01',
    title: 'Smart Start — Capital Efficiency from Day Zero',
    description:
      'With over 50 openings across 3 continents, we help you avoid costly mistakes and make high-impact decisions early. From location choice to layout and budgeting, we protect your investment before the first guest walks in.',
  },
  {
    number: '02',
    title: 'Revenue Activation — Maximising the Top Line',
    description:
      'We engineer multiple revenue streams, from brand partnerships to service design. Our strategies are built into your operations, marketing, and menu — ensuring momentum from opening day.',
  },
  {
    number: '03',
    title: 'Sustained Profitability — Long-Term Performance',
    description:
      'We stay involved beyond the launch. From systems to leadership tools, we ensure your business is resilient, scalable, and tuned for consistent financial performance.',
  },
];

const services: FeatureItem[] = [
  {
    title: 'Concept Development and Launch',
    description:
      'Our concept development packages—Blueprint, Framework, and Launch—are designed to meet you where you are. From strategy and branding to operational systems and launch execution.',
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    title: 'Management Services',
    description:
      'Continued operational support after your successful opening. We optimize performance, implement systems, and drive sustainable growth.',
    icon: <Settings className="h-6 w-6" />,
  },
  {
    title: 'Partner Services',
    description:
      'We work with vetted specialist partners to provide complementary services, coordinating partnerships to ensure seamless integration.',
    icon: <Handshake className="h-6 w-6" />,
  },
  {
    title: 'Additional Services',
    description:
      'Feasibility study, concept review, menu development, and operational audits to help get your restaurant up and running.',
    icon: <ClipboardList className="h-6 w-6" />,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      role="region"
      aria-labelledby="services-heading"
    >
      <WarpBackground
        className="py-24 bg-white dark:bg-[#2c2c2c]"
        beamsPerSide={2}
        beamSize={8}
        beamDuration={8}
        beamDelayMax={5}
        beamDelayMin={1}
        gridColor="hsl(35, 20%, 85%)"
        perspective={150}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              id="services-heading"
              className="text-3xl md:text-5xl font-semibold text-foreground mb-4 font-serif tracking-wide"
              style={{ fontVariant: 'small-caps' }}
            >
              Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">Step by Step</p>

            {/* Phases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-6">
              
              {phases.map((phase) => (
                <GlareCard
                  key={phase.number}
                  className="flex flex-col items-start justify-start p-8 text-left"
                >
                  <div className="font-serif text-4xl text-[#2C2C2C] dark:text-[#F5F1E8] mb-6">
                    {phase.number}
                  </div>
                  <div className="w-12 h-px bg-[#2C2C2C]/30 dark:bg-[#F5F1E8]/30 mb-6" aria-hidden="true" />
                  <h4 className="font-serif text-xl mb-4 text-[#2C2C2C] dark:text-[#F5F1E8] font-semibold">
                    {phase.title}
                  </h4>
                  <p className="font-sans font-light text-[#2C2C2C]/70 dark:text-[#F5F1E8]/70 text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </GlareCard>
              ))}
            </div>

            
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-16 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>
                Scope of Services
              </h3>
              <p className="text-lg text-muted-foreground text-center">
                Comprehensive restaurant consulting services tailored for high-end
                establishments, from concept development to operational excellence.
              </p>
            

            <FeaturesSectionWithHoverEffects features={services} />
          </div>
          
        </div>
      </WarpBackground>
    </section>
  );
}
