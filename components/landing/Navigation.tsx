'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ASSETS_CONFIG } from '@/config/constants';

const navigationItems = [
  { label: 'HOME', href: 'home' },
  { label: 'OUR METHOD', href: 'method' },
  { label: 'SERVICES', href: 'services' },
  { label: 'FEES', href: 'fees' },
  { label: 'PROJECTS', href: 'projects' },
  { label: 'TEAM', href: 'team' },
  { label: 'CONTACT', href: 'contact' }
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const logoSrc = mounted
    ? resolvedTheme === 'dark' || !isScrolled
      ? ASSETS_CONFIG.logos.svg.white
      : ASSETS_CONFIG.logos.svg.black
    : ASSETS_CONFIG.logos.svg.white;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-sm py-3 shadow-sm'
          : 'bg-transparent py-6'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="relative h-10 w-40 focus:outline-none"
            aria-label="Go to home"
          >
            <Image
              src={logoSrc}
              alt="Cracks Hospitality Studio"
              fill
              className="object-contain object-left"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            role="navigation"
            aria-label="Desktop navigation"
          >
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`font-sans font-light text-xs tracking-wide transition-colors focus:outline-none ${
                  isScrolled
                    ? 'text-foreground hover:text-muted-foreground'
                    : 'text-white hover:text-gray-300'
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className={`p-2 rounded transition-colors focus:outline-none ${
                isScrolled
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background/95 backdrop-blur-sm absolute w-full border-t border-border"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col items-center py-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground font-sans font-light text-sm tracking-wide py-4 px-6 hover:bg-muted transition-colors w-full text-center focus:outline-none"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
