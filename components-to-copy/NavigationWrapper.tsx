'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { locales, type Locale, localeNames } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// IMPORTANT: Update logo URLs to Studio logos when implementing
// Light: https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png
// Dark: https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png

export function NavigationWrapper() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

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
          setIsInHero(!isPastHero);

          if (!isPastHero) {
            setShowScrollNav(false);
          } else if (currentScrollY > lastScrollY) {
            setShowScrollNav(false);
          } else {
            setShowScrollNav(true);
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

  // UPDATE these nav links for cracks-website sections
  const navLinks = [
    { href: '#method', label: t('method') },
    { href: '#services', label: t('services') },
    { href: '#projects', label: t('projects') },
    { href: '#fees', label: t('fees') },
    { href: '#team', label: t('team') },
    { href: '#contact', label: t('contact') },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hero Navigation (transparent, centered) */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isInHero ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-16 bg-transparent">
            {/* Desktop Layout - Centered */}
            <div className="hidden md:flex items-center justify-center w-full gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 text-foreground/80 hover:text-foreground hover:bg-foreground/10">
                    <Globe className="size-4" />
                    <span className="sr-only">Change language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {locales.map((loc) => (
                    <DropdownMenuItem
                      key={loc}
                      onClick={() => handleLocaleChange(loc)}
                      className={locale === loc ? 'bg-accent' : ''}
                    >
                      {localeNames[loc]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </div>

            {/* Mobile Layout - Just burger menu */}
            <div className="flex md:hidden items-center justify-end w-full">
              <Button
                variant="ghost"
                size="icon"
                className="size-10 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Navigation (pill style with logo, centered) */}
      <nav
        className={`fixed top-4 inset-x-0 z-50 transition-all duration-300 ${
          showScrollNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-center h-14 px-6 md:px-12 lg:px-16">
            {/* Desktop Layout - Centered */}
            <div
              className={`hidden md:flex items-center gap-8 px-6 py-2 rounded-xl backdrop-blur-md shadow-lg border border-border transition-colors ${
                scrolled ? 'bg-background/90' : 'bg-background/70'
              }`}
            >
              <Link href="/" className="flex items-center">
                <div className="relative h-7 w-24">
                  <Image
                    src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png"
                    alt="Cracks Hospitality Studio"
                    fill
                    sizes="96px"
                    className="object-contain object-left dark:hidden"
                  />
                  <Image
                    src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png"
                    alt="Cracks Hospitality Studio"
                    fill
                    sizes="96px"
                    className="object-contain object-left hidden dark:block"
                  />
                </div>
              </Link>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 text-foreground/80 hover:text-foreground hover:bg-foreground/10">
                    <Globe className="size-4" />
                    <span className="sr-only">Change language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {locales.map((loc) => (
                    <DropdownMenuItem
                      key={loc}
                      onClick={() => handleLocaleChange(loc)}
                      className={locale === loc ? 'bg-accent' : ''}
                    >
                      {localeNames[loc]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </div>

            {/* Mobile Layout - Pill with logo and burger */}
            <div
              className={`flex md:hidden items-center justify-between w-full max-w-md px-4 py-2 rounded-xl backdrop-blur-md shadow-lg border border-border transition-colors ${
                scrolled ? 'bg-background/90' : 'bg-background/70'
              }`}
            >
              <Link href="/" className="flex items-center">
                <div className="relative h-6 w-20">
                  <Image
                    src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png"
                    alt="Cracks Hospitality Studio"
                    fill
                    sizes="80px"
                    className="object-contain object-left dark:hidden"
                  />
                  <Image
                    src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png"
                    alt="Cracks Hospitality Studio"
                    fill
                    sizes="80px"
                    className="object-contain object-left hidden dark:block"
                  />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-foreground/80 hover:text-foreground hover:bg-foreground/10"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background md:hidden"
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-28">
              <Image
                src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png"
                alt="Cracks Hospitality Studio"
                fill
                sizes="112px"
                className="object-contain object-left dark:hidden"
              />
              <Image
                src="https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png"
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-3xl font-serif font-semibold text-foreground py-4 border-b border-border/50 transition-colors hover:text-secondary"
              style={{ fontVariant: 'small-caps' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Section - Theme & Language */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          {/* Language Selection */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Language
            </p>
            <div className="flex gap-2">
              {locales.map((loc) => (
                <Button
                  key={loc}
                  variant={locale === loc ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLocaleChange(loc)}
                  className="flex-1"
                >
                  {localeNames[loc]}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Theme
            </p>
            <div className="flex gap-2">
              <Button
                variant={resolvedTheme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
                className="flex-1 gap-2"
              >
                <Sun className="size-4" />
                Light
              </Button>
              <Button
                variant={resolvedTheme === 'dark' ? 'default' : 'outline'}
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
      )}
    </>
  );
}
