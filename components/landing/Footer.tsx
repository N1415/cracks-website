'use client';

import { Linkedin } from 'lucide-react';
import { SITE_CONFIG } from '@/config/constants';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0 max-w-md">
            <h2 className="text-3xl font-serif font-thin text-background mb-4">
              Cracks Hospitality Studio
            </h2>
            <p className="font-sans font-light text-background/80">
              Cracks Hospitality Studio exists to design, operationalize, and
              scale high-performance hospitality businesses by combining expert
              consulting, advanced technology, and education-driven media. We
              create pragmatic, profit-focused solutions that bridge the gap
              between operational excellence, guest experience, and brand
              scalability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4 text-background">
                Quick Links
              </h4>
              <ul className="space-y-2 font-sans font-light text-background/80">
                <li>
                  <a href="#home" className="hover:text-background transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-background transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#method" className="hover:text-background transition-colors">
                    Our Method
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-background transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-semibold text-lg mb-4 text-background">Legal</h4>
              <ul className="space-y-2 font-sans font-light text-background/80">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="hover:text-background transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/app-privacy"
                    className="hover:text-background transition-colors"
                  >
                    App Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="font-sans text-background/80 text-sm mb-4 md:mb-0 font-light">
            &copy; {currentYear} Cracks Hospitality Studio. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Visit our Facebook page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Visit our Instagram page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
