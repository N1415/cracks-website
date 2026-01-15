'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ASSETS_CONFIG } from '@/config/constants';
import { useTranslations } from 'next-intl';

const navigationKeys = [
  { key: 'home', href: 'home' },
  { key: 'method', href: 'method' },
  { key: 'services', href: 'services' },
  { key: 'fees', href: 'fees' },
  { key: 'projects', href: 'projects' },
  { key: 'team', href: 'team' },
  { key: 'contact', href: 'contact' }
];

export default function Navigation() {
  const t = useTranslations('navigation');
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;
    let lastKnownScrollY = lastScrollY;

    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = lastKnownScrollY;
          const isPastHero = currentScrollY > 100;

          setScrolled(currentScrollY > 50);

          // Only show this navbar when past hero section
          if (!isPastHero) {
            setVisible(false);
          } else if (currentScrollY > lastScrollY) {
            setVisible(false);
          } else {
            setVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 inset-x-0 z-50 px-4 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className={`flex items-center justify-between h-14 px-4 rounded-xl backdrop-blur-md shadow-lg border border-border transition-colors ${
              scrolled ? 'bg-background/90' : 'bg-background/70'
            }`}
          >
            {/* Logo - fixed width for balance */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center focus:outline-none w-24"
            >
              <div className="relative h-7 w-24">
                <Image
                  src={ASSETS_CONFIG.logos.svg.black}
                  alt="Cracks Hospitality Studio"
                  fill
                  sizes="96px"
                  className="object-contain object-left dark:hidden"
                />
                <Image
                  src={ASSETS_CONFIG.logos.svg.white}
                  alt="Cracks Hospitality Studio"
                  fill
                  sizes="96px"
                  className="object-contain object-left hidden dark:block"
                />
              </div>
            </button>

            {/* Nav Links - Desktop (centered) */}
            <div className="hidden md:flex items-center justify-center gap-5">
              {navigationKeys.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>

            {/* Right Side - Theme Toggle + Language - fixed width for balance */}
            <div className="hidden md:flex items-center justify-end w-24 gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                className="size-10"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-28">
              <Image
                src={ASSETS_CONFIG.logos.svg.black}
                alt="Cracks Hospitality Studio"
                fill
                sizes="112px"
                className="object-contain object-left dark:hidden"
              />
              <Image
                src={ASSETS_CONFIG.logos.svg.white}
                alt="Cracks Hospitality Studio"
                fill
                sizes="112px"
                className="object-contain object-left hidden dark:block"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-10"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-6" />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col px-6 pt-12">
          {navigationKeys.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-3xl font-serif font-semibold text-foreground py-4 border-b border-border/50 transition-colors hover:text-secondary text-left focus:outline-none"
              style={{
                fontVariant: 'small-caps',
                animationDelay: `${index * 50}ms`
              }}
            >
              {t(item.key)}
            </button>
          ))}
        </div>

        {/* Bottom Section - Theme */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          {/* Theme Selection */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Theme
            </p>
            <div className="flex gap-2">
              <Button
                variant={mounted && resolvedTheme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
                className="flex-1 gap-2"
              >
                <Sun className="size-4" />
                Light
              </Button>
              <Button
                variant={mounted && resolvedTheme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
                className="flex-1 gap-2"
              >
                <Moon className="size-4" />
                Dark
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
