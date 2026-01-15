import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (with extensions like .js, .css, .png, etc.)
  // - Next.js internals (_next)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
