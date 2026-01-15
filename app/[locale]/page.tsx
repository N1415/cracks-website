import type { Metadata } from 'next';
import Navigation from '@/components/landing/Navigation';
import HeroNavigation from '@/components/landing/HeroNavigation';
import HeroSection from '@/components/landing/HeroSection';
import MethodSection from '@/components/landing/MethodSection';
import ServicesSection from '@/components/landing/ServicesSection';
import FeesSection from '@/components/landing/FeesSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import TeamSection from '@/components/landing/TeamSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateLocalBusinessSchema,
  generateServicesSchema,
  generateFAQSchema,
  generateTeamSchema,
} from '@/components/seo/schemas';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `https://cracks-studio.com/${locale}`,
      languages: {
        'en': 'https://cracks-studio.com/en',
        'es': 'https://cracks-studio.com/es',
        'x-default': 'https://cracks-studio.com/en',
      },
    },
  };
}

export default function HomePage() {
  const teamSchemas = generateTeamSchema();

  return (
    <main>
      {/* Page-specific JSON-LD schemas */}
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateServicesSchema()} />
      <JsonLd data={generateFAQSchema()} />
      {teamSchemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <HeroNavigation />
      <Navigation />
      <HeroSection />
      <MethodSection />
      <ServicesSection />
      <FeesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
