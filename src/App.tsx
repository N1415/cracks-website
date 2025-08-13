import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import MethodSection from './components/MethodSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';

import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TeamSection from './components/TeamSection';
import FeesSection from './components/FeesSection';
import ErrorBoundary from './components/common/ErrorBoundary';
import SEO from './components/common/SEO';
import StructuredData from './components/common/StructuredData';
import CookieBanner from './components/common/CookieBanner';

function App() {
  return (
    <ErrorBoundary>
      <SEO />
      <StructuredData type="organization" />
      
      <div className="font-lato">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-3 z-50 rounded-br focus:outline-none"
        >
          Skip to main content
        </a>
        
        <Navbar />
        
        <main id="main-content" role="main">
          <HeroSection />
          <MethodSection />
          <AboutSection />
          <ServicesSection />
          <FeesSection />
          <ProjectsSection />
          <TeamSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
      
      <CookieBanner />
    </ErrorBoundary>
  );
}

export default App;