import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navigationItems = [
  { label: 'HOME', href: 'home' },
  { label: 'OUR METHOD', href: 'method' },
  { label: 'ABOUT', href: 'about' },
  { label: 'SERVICES', href: 'services' },
  { label: 'FEES', href: 'fees' },
  { label: 'TEAM', href: 'team' },
  { label: 'CONTACT', href: 'contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button 
                key={item.href} 
                onClick={() => handleNavClick(item.href)}
                className="text-white font-lato font-thin text-sm tracking-wide hover:text-gray-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 absolute w-full">
          <nav className="flex flex-col items-center py-8">
            {navigationItems.map((item) => (
              <button 
                key={item.href} 
                onClick={() => handleNavClick(item.href)}
                className="text-white font-lato font-thin text-sm tracking-wide py-4 hover:text-gray-300 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;