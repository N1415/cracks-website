import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cracks-studio.com';
  const locales = ['en', 'es'];
  const lastModified = new Date();

  // Define all pages with their priorities
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/bim', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/app-privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Generate sitemap entries for all locale/page combinations
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page.path}`;

      // Create alternates for hreflang
      const alternates: { languages: Record<string, string> } = {
        languages: {},
      };

      for (const altLocale of locales) {
        alternates.languages[altLocale] = `${baseUrl}/${altLocale}${page.path}`;
      }
      alternates.languages['x-default'] = `${baseUrl}/en${page.path}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: locale === 'en' ? page.priority : page.priority * 0.9,
        alternates,
      });
    }
  }

  return sitemapEntries;
}
