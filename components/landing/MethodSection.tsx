'use client';

import Image from 'next/image';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ASSETS_CONFIG } from '@/config/constants';

const methods = [
  {
    title: 'Guest-Centric & Revenue-Minded',
    description:
      'We believe the best atmosphere is a full, happy dining room. Our work is designed to drive repeat visits — aligning pricing, experience, and team culture to what guests truly value.',
    image: ASSETS_CONFIG.images.method1,
  },
  {
    title: 'Authentic & Story-Led',
    description:
      'Every concept we build has a clear identity and cultural soul — brought to life through design, food, and storytelling that feel honest and relevant.',
    image: ASSETS_CONFIG.images.method2,
  },
  {
    title: 'Operationally Built-In',
    description:
      'We make every decision with execution in mind. From day one, we ensure your teams can deliver experiences that are profitable, practical, and consistent.',
    image: ASSETS_CONFIG.images.method3,
  },
  {
    title: 'Global Perspective, Local Understanding',
    description:
      "Our concepts are globally aware but never out of place. We root each project in local insight — because context isn't just important, it's everything.",
    image: ASSETS_CONFIG.images.method4,
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl text-foreground mb-4 font-serif font-medium tracking-wide">
            OUR METHOD
          </h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto my-8" />
          <p className="text-xl font-serif text-muted-foreground">
            Clear, Grounded, Built to Last
          </p>
        </div>

        <BentoGrid className="md:grid-cols-3 gap-6">
          {/* Row 1: 1 col + 2 col span */}
          <BentoGridItem
            title={methods[0].title}
            description={methods[0].description}
            className="md:col-span-1"
            header={
              <div className="relative w-full h-full min-h-[200px]">
                <Image
                  src={methods[0].image}
                  alt={methods[0].title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            }
          />
          <BentoGridItem
            title={methods[1].title}
            description={methods[1].description}
            className="md:col-span-2"
            header={
              <div className="relative w-full h-full min-h-[200px]">
                <Image
                  src={methods[1].image}
                  alt={methods[1].title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            }
          />
          {/* Row 2: 2 col span + 1 col */}
          <BentoGridItem
            title={methods[2].title}
            description={methods[2].description}
            className="md:col-span-2"
            header={
              <div className="relative w-full h-full min-h-[200px]">
                <Image
                  src={methods[2].image}
                  alt={methods[2].title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            }
          />
          <BentoGridItem
            title={methods[3].title}
            description={methods[3].description}
            className="md:col-span-1"
            header={
              <div className="relative w-full h-full min-h-[200px]">
                <Image
                  src={methods[3].image}
                  alt={methods[3].title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}
