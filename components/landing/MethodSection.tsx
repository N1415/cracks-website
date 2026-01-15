'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ASSETS_CONFIG } from '@/config/constants';
import { useTranslations } from 'next-intl';

const methodKeys = [
  {
    key: 'guestCentric',
    image: ASSETS_CONFIG.images.method1,
    className: 'md:col-span-1',
    objectPosition: 'center center',
  },
  {
    key: 'authentic',
    image: ASSETS_CONFIG.images.method2,
    className: 'md:col-span-2',
    objectPosition: 'center 60%',
  },
  {
    key: 'operational',
    image: ASSETS_CONFIG.images.method3,
    className: 'md:col-span-2',
  },
  {
    key: 'global',
    image: ASSETS_CONFIG.images.method4,
    className: 'md:col-span-1',
    objectPosition: 'center 70%',
  },
];

export default function MethodSection() {
  const t = useTranslations('method');

  return (
    <section id="method" className="py-24 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BentoGrid>
            {methodKeys.map((method) => (
              <BentoGridItem
                key={method.key}
                title={t(`cards.${method.key}.title`)}
                description={t(`cards.${method.key}.description`)}
                header={
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={method.image}
                      alt={t(`cards.${method.key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      style={method.objectPosition ? { objectPosition: method.objectPosition } : undefined}
                    />
                  </div>
                }
                className={method.className}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
