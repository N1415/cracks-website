import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/components/seo/schemas';
import { ASSETS_CONFIG } from '@/config/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://cracks-studio.com'),
  title: {
    default: 'Cracks Hospitality Studio',
    template: '%s | Cracks Hospitality Studio',
  },
  description:
    'Expert restaurant consulting services from concept to launch. We help create profitable hospitality businesses worldwide with our proven methodology.',
  keywords: [
    'restaurant consulting',
    'hospitality consulting',
    'restaurant development',
    'food service consulting',
    'worldwide restaurant consulting',
    'international hospitality consulting',
    'restaurant concept development',
    'restaurant launch services',
    'Thailand restaurant consulting',
  ],
  authors: [{ name: 'Cracks Hospitality Studio' }],
  creator: 'Cracks Hospitality Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cracks-studio.com',
    siteName: 'Cracks Hospitality Studio',
    title: 'Cracks Hospitality Studio',
    description:
      'Expert restaurant consulting services from concept to launch. We help create profitable hospitality businesses worldwide.',
    images: [
      {
        url: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/jpg/black_og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cracks Hospitality Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cracks Hospitality Studio',
    description:
      'Expert restaurant consulting services from concept to launch.',
    images: [
      'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/jpg/black_og.jpg',
    ],
  },
  icons: {
    icon: [
      {
        url: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_black.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_white.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png',
  },
  alternates: {
    canonical: 'https://cracks-studio.com',
    languages: {
      'en': 'https://cracks-studio.com/en',
      'es': 'https://cracks-studio.com/es',
      'x-default': 'https://cracks-studio.com/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://moyusgyrteirxbivehyz.supabase.co" />

        {/* Preload hero image for better LCP */}
        <link
          rel="preload"
          as="image"
          href={ASSETS_CONFIG.images.heroBackground}
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Calendly widget */}
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />

        {/* Organization & Website JSON-LD schemas */}
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
