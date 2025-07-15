
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import MethodSection from './components/MethodSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
// import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import TeamSection from './components/TeamSection';
import FeesSection from './components/FeesSection';

function App() {
  return (
    <div className="font-lato">
      <Navbar />
      <HeroSection />
      <MethodSection />
      <AboutSection />
      <ServicesSection />
      <FeesSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;