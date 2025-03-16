import {
    BaseURL,
    DisplayConfig,
    EffectsConfig,
    MailchimpConfig,
    ProtectedRoutes,
    Routes,
    StyleConfig,
} from '@/types/config';

const baseURL: BaseURL = 'demo.magic-portfolio.com';

const routes: Routes = {
    '/': true,
    '/about': true,
    '/work': true,
    '/blog': true,
    '/hobbies': true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutes = {
    // '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true,
    // 'some-other-route': true,
};
// How it works :
// Configuration : The routes to protect are defined in config.ts under protectedRoutes.
// Verification : The RouteGuard component checks if the current route is protected.
// Authentication : If the route is protected, the user must enter a password.
// Storage : After successful authentication, a cookie is stored to avoid asking for the password again.
// Environment : The password is defined in the .env file via the PAGE_ACCESS_PASSWORD variable.

const style: StyleConfig = {
    theme: 'dark', // dark | light
    neutral: 'gray', // sand | gray | slate
    brand: 'violet', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent: 'orange', // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid: 'contrast', // color | contrast
    solidStyle: 'flat', // flat | plastic
    border: 'playful', // rounded | playful | conservative
    surface: 'translucent', // filled | translucent
    transition: 'all', // all | micro | macro
};

const effects: EffectsConfig = {
    mask: {
        cursor: true,
        x: 0,
        y: 0,
        radius: 75,
    },
    gradient: {
        display: true,
        x: 50,
        y: 0,
        width: 100,
        height: 100,
        tilt: 0,
        colorStart: 'brand-background-strong',
        colorEnd: 'static-transparent',
        opacity: 50,
    },
    dots: {
        display: true,
        size: 2,
        color: 'brand-on-background-weak',
        opacity: 20,
    },
    lines: {
        display: false,
        color: 'neutral-alpha-weak',
        opacity: 100,
    },
    grid: {
        display: false,
        color: 'neutral-alpha-weak',
        opacity: 100,
    },
};

const display: DisplayConfig = {
    location: true,
    time: true,
};

const mailchimp: MailchimpConfig = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        mask: {
            cursor: false,
            x: 100,
            y: 0,
            radius: 100,
        },
        gradient: {
            display: true,
            x: 100,
            y: 50,
            width: 100,
            height: 100,
            tilt: -45,
            colorStart: 'accent-background-strong',
            colorEnd: 'static-transparent',
            opacity: 100,
        },
        dots: {
            display: false,
            size: 24,
            color: 'brand-on-background-weak',
            opacity: 100,
        },
        lines: {
            display: false,
            color: 'neutral-alpha-weak',
            opacity: 100,
        },
        grid: {
            display: true,
            color: 'neutral-alpha-weak',
            opacity: 100,
        },
    },
};

export { baseURL, display, effects, mailchimp, protectedRoutes, routes, style };
