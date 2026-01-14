import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import MethodSection from '@/components/landing/MethodSection';
import ServicesSection from '@/components/landing/ServicesSection';
import FeesSection from '@/components/landing/FeesSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import TeamSection from '@/components/landing/TeamSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main>
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
