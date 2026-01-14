'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

export function DifferenceSection() {
  const t = useTranslations('difference');

  const items = [
    {
      key: 'traffic',
      // Placeholder - user will provide image later
      image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/El%20Patio%20de%20Abascal%20septiembre%2024%20270.png',
      className: 'md:col-span-1',
      objectPosition: 'center top',
    },
    {
      key: 'creativity',
      // Placeholder - user will provide image later
      image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/Cento-Header-Home-2400x932-1.jpg',
      className: 'md:col-span-2',
    },
    {
      key: 'speed',
      // Placeholder - user will provide image later
      image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/CENTO-BY-DIEGO-ARENAS---OCTOBER-2024-66.jpg',
      className: 'md:col-span-2',
      objectFit: 'contain',
    },
    {
      key: 'conclusion',
      // Placeholder - user will provide image later
      image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/velvet_room.png',
      className: 'md:col-span-1',
      objectPosition: 'center 70%',
    },
  ];

  return (
    <section id="difference" className="py-24 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('intro')}</p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BentoGrid>
            {items.map((item) => (
              <BentoGridItem
                key={item.key}
                title={item.key === 'conclusion' ? t('conclusionTitle') : t(`items.${item.key}.title`)}
                description={item.key === 'conclusion' ? t('conclusion') : t(`items.${item.key}.description`)}
                header={
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.key === 'conclusion' ? 'The Difference' : t(`items.${item.key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                    />
                  </div>
                }
                className={item.className}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
