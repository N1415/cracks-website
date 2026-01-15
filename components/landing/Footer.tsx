'use client';

import Image from 'next/image';
import { Linkedin, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SITE_CONFIG, ASSETS_CONFIG } from '@/config/constants';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground py-16">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="h-px bg-foreground/20 mb-12" />
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={ASSETS_CONFIG.logos.svg.black}
                  alt="Cracks Hospitality Studio"
                  fill
                  sizes="64px"
                  className="object-contain dark:hidden"
                />
                <Image
                  src={ASSETS_CONFIG.logos.svg.white}
                  alt="Cracks Hospitality Studio"
                  fill
                  sizes="64px"
                  className="object-contain hidden dark:block"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-wide uppercase">Cracks Hospitality Studio</span>
                <span className="text-muted-foreground text-sm">Building hospitality icons,</span>
                <span className="text-muted-foreground text-sm">one restaurant at a time</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-base">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav('home')}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav('services')}
                </a>
              </li>
              <li>
                <a
                  href="#method"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav('method')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav('contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-base">{tNav('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{SITE_CONFIG.contact.location.city}, {SITE_CONFIG.contact.location.country}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Cracks Hospitality Studio. {t('copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
