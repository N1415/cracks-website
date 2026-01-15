'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ASSETS_CONFIG } from '@/config/constants';
import Image from 'next/image';
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

export default function HeroNavigation() {
  const t = useTranslations('navigation');
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide hero nav after scrolling 100px
      setVisible(scrollY <= 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 bg-transparent">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="relative h-10 w-36">
                <Image
                  src={ASSETS_CONFIG.logos.svg.white}
                  alt="Cracks Hospitality Studio"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>
            </button>

            {/* Desktop Layout - Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navigationKeys.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-base text-primary/80 hover:text-primary transition-colors font-medium focus:outline-none"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>

            {/* Right Side - Language + Theme Toggle (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <div className="text-primary/80 hover:text-primary">
                <LanguageSwitcher />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-primary/80 hover:text-primary hover:bg-primary/10"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {mounted && resolvedTheme === 'dark' ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </Button>
            </div>

            {/* Mobile Layout */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-primary/80 hover:text-primary hover:bg-primary/10"
                onClick={() => setIsOpen(true)}
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
          >
            <X className="size-6" />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col px-6 pt-12">
          {navigationKeys.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-3xl font-serif font-semibold text-foreground py-4 border-b border-border/50 transition-colors hover:text-secondary text-left focus:outline-none"
              style={{ fontVariant: 'small-caps' }}
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
