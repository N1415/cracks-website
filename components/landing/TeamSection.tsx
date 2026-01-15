'use client';

import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { TEAM_MEMBERS } from '@/config/constants';

export default function TeamSection() {
  const formatParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph: string, index: number) => (
      <p
        key={index}
        className="font-sans text-sm text-foreground leading-relaxed mb-4 font-light"
      >
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <section id="team" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">THE TEAM</h2>
          <div className="w-16 h-0.5 bg-foreground mx-auto my-8" />
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            We are hospitality experts with proven track record of creating and
            scaling restaurants across multiple regions with over 40 years of
            experience combined.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="bg-muted rounded-lg shadow-md overflow-hidden w-full max-w-[500px]"
            >
              {/* Profile Banner with Name/Title */}
              <div className="relative h-64 p-8 flex items-end">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition:
                      member.name === 'Nacho López' ? '0% 15%' : 'center',
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-white">
                  <h3 className="font-serif text-3xl mb-1">{member.name}</h3>
                  <p className="font-sans text-sm text-gray-200">
                    {member.title}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 bg-card">
                {/* Summary */}
                <div className="h-24 flex items-center justify-center mb-6">
                  <p className="font-sans text-lg font-light text-center text-card-foreground">
                    {member.bio}
                  </p>
                </div>

                {/* Detailed Bio */}
                <div
                  className="bg-background p-6 rounded shadow-sm mb-6"
                  style={{ minHeight: '500px' }}
                >
                  {formatParagraphs(member.section)}
                </div>

                {/* LinkedIn Link */}
                <div className="flex justify-center">
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center text-muted-foreground hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={18} className="mr-2" />
                    <span className="font-sans text-sm">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
