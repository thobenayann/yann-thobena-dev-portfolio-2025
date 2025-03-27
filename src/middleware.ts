import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/routing';

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: 'en',

    // Always show the locale in the URL
    localePrefix: 'always',
});

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
