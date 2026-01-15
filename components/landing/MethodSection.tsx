'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ASSETS_CONFIG } from '@/config/constants';

const methods = [
  {
    key: 'guestCentric',
    title: 'Guest-Centric & Revenue-Minded',
    description:
      'We believe the best atmosphere is a full, happy dining room. Our work is designed to drive repeat visits — aligning pricing, experience, and team culture to what guests truly value.',
    image: ASSETS_CONFIG.images.method1,
    className: 'md:col-span-1',
    objectPosition: 'center center',
  },
  {
    key: 'authentic',
    title: 'Authentic & Story-Led',
    description:
      'Every concept we build has a clear identity and cultural soul — brought to life through design, food, and storytelling that feel honest and relevant.',
    image: ASSETS_CONFIG.images.method2,
    className: 'md:col-span-2',
    objectPosition: 'center 60%',
  },
  {
    key: 'operational',
    title: 'Operationally Built-In',
    description:
      'We make every decision with execution in mind. From day one, we ensure your teams can deliver experiences that are profitable, practical, and consistent.',
    image: ASSETS_CONFIG.images.method3,
    className: 'md:col-span-2',
  },
  {
    key: 'global',
    title: 'Global Perspective, Local Understanding',
    description:
      "Our concepts are globally aware but never out of place. We root each project in local insight — because context isn't just important, it's everything.",
    image: ASSETS_CONFIG.images.method4,
    className: 'md:col-span-1',
    objectPosition: 'center 70%',
  },
];

export default function MethodSection() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>Our Method</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Clear, Grounded, Built to Last
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
            {methods.map((method) => (
              <BentoGridItem
                key={method.key}
                title={method.title}
                description={method.description}
                header={
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={method.image}
                      alt={method.title}
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
