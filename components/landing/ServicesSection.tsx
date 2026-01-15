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
import { useTranslations } from 'next-intl';

const phaseKeys = ['phase1', 'phase2', 'phase3'] as const;

const serviceIcons = {
  conceptDevelopment: <Lightbulb className="h-6 w-6" />,
  management: <Settings className="h-6 w-6" />,
  partner: <Handshake className="h-6 w-6" />,
  additional: <ClipboardList className="h-6 w-6" />,
};

const serviceKeys = ['conceptDevelopment', 'management', 'partner', 'additional'] as const;

export default function ServicesSection() {
  const t = useTranslations('services');

  const services: FeatureItem[] = serviceKeys.map((key) => ({
    title: t(`scope.${key}.title`),
    description: t(`scope.${key}.description`),
    icon: serviceIcons[key],
  }));

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
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{t('stepByStep')}</p>

            {/* Phases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-6">

              {phaseKeys.map((phaseKey) => (
                <GlareCard
                  key={phaseKey}
                  className="flex flex-col items-start justify-start p-8 text-left"
                >
                  <div className="font-serif text-4xl text-[#2C2C2C] dark:text-[#F5F1E8] mb-6">
                    {t(`phases.${phaseKey}.number`)}
                  </div>
                  <div className="w-12 h-px bg-[#2C2C2C]/30 dark:bg-[#F5F1E8]/30 mb-6" aria-hidden="true" />
                  <h3 className="font-serif text-xl mb-4 text-[#2C2C2C] dark:text-[#F5F1E8] font-semibold">
                    {t(`phases.${phaseKey}.title`)}
                  </h3>
                  <p className="font-sans font-light text-[#2C2C2C]/70 dark:text-[#F5F1E8]/70 text-sm leading-relaxed">
                    {t(`phases.${phaseKey}.description`)}
                  </p>
                </GlareCard>
              ))}
            </div>


              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-16 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>
                {t('scopeOfServices')}
              </h3>
              <p className="text-lg text-muted-foreground text-center">
                {t('scopeDescription')}
              </p>


            <FeaturesSectionWithHoverEffects features={services} />
          </div>

        </div>
      </WarpBackground>
    </section>
  );
}
