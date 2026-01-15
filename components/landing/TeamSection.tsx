'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';

const team = [
  {
    key: 'manuel',
    name: 'Manuel Palacio',
    role: 'Serial Founder & Hospitality Visionary',
    bio: 'A hospitality innovator who combines operational excellence with brand magic to create some of Asia\'s most successful restaurant concepts.',
    section: `As Co-founder of Pirata Group, he built Hong Kong's leading restaurant portfolio, scaling to 27 venues across 13 brands including PICI, The Pizza Project, TMK, TokyoLima, Pirata, and more, while driving a culture-first team model with industry-leading retention rates and multi-million dollar EBITDA growth.

Today, he serves as Chairman of Pirata Group, leads Cento — a modern Italian eatery redefining luxury casual dining in Bangkok — and runs Cracks Hospitality Studio, helping visionary operators across Asia develop next-generation F&B concepts that balance authenticity with scalability.

His approach, centered on Soul & Scale, operational excellence, guest obsession, and distinctive brand storytelling, continues to shape the future of hospitality across the region.`,
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/manu.jpg',
    linkedin: 'https://www.linkedin.com/in/manuelpalacioleon/',
    objectPosition: 'object-[0%_30%]',
  },
  {
    key: 'nacho',
    name: 'Nacho López',
    role: 'F&B Strategist & Concept Builder',
    bio: 'A seasoned hospitality professional with 15+ years of experience transforming raw spaces into high-revenue destinations by blending European roots with Asian agility.',
    section: `He has built and led high-performing teams across Spain, Hong Kong, and Thailand, scaling operations while maintaining brand integrity and mentoring talent to create sustainable management structures.

As Operations Manager of Pici Hong Kong, he helped elevate one of the region's most celebrated pasta concepts, while earlier directing large-scale beach operations at Cala Bassa Beach Club in Ibiza and founding MamaQuilla in Madrid, a vibrant Latin dinner show experience.

Today, he leads Cracks Hospitality Studio, shaping next-generation restaurant concepts with purpose and performance, while also consulting for hotels and operators to create high-yield venues.

His approach, known as The Nacho Method, focuses on building people-first cultures, engineering concepts for operational success, and designing guest-centric experiences that consistently drive revenue and loyalty.`,
    image: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Images/Cracks%20website/nacho.jpg',
    linkedin: 'https://www.linkedin.com/in/nacholopezalvarez/',
    objectPosition: 'object-[50%_20%]',
  },
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif tracking-wide" style={{ fontVariant: 'small-caps' }}>The Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are hospitality experts with proven track record of creating and
            scaling restaurants across multiple regions with over 40 years of
            experience combined.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              {/* Photo */}
              <div className="relative mb-6 inline-block">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto ring-4 ring-primary relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className={`object-cover ${member.objectPosition}`}
                  />
                </div>
                {/* LinkedIn Badge */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-foreground/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Name & Role */}
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-secondary font-medium mb-4">{member.role}</p>

              {/* Bio */}
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                {member.bio}
              </p>

              {/* Detailed Section */}
              <div className="text-muted-foreground text-sm max-w-md mx-auto text-center space-y-4">
                {member.section.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
