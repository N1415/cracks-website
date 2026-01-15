'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const otherLocale = locale === 'en' ? 'es' : 'en';

  return (
    <button
      className="p-1 hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1 text-sm"
      onClick={() => handleChange(otherLocale as Locale)}
      aria-label={`Switch to ${localeNames[otherLocale as Locale]}`}
    >
      <Globe className="size-4" />
      <span className="uppercase font-medium">{otherLocale}</span>
    </button>
  );
}
