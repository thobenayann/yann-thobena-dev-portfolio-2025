import '@/once-ui/styles/index.scss';
import '@/once-ui/tokens/index.scss';

import classNames from 'classnames';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Footer, Header, RouteGuard } from '@/components';
import { SpacingToken } from '@/once-ui/types';
import { baseURL, effects, style } from '@/resources';
import { OpacityLevel } from '@/types/effects';
import { Analytics } from '@vercel/analytics/react';

import { Inter, Source_Code_Pro } from 'next/font/google';

import { routing } from '@/i18n/routing';
import { Background, Column, Flex, ToastProvider } from '@/once-ui/components';
import { home, person } from '@/resources/content';
import { NextIntlClientProvider } from 'next-intl';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return {
        metadataBase: new URL(`https://${baseURL}`),
        title: home.title,
        description: home.description,
        openGraph: {
            title: `${person.firstName}'s Portfolio`,
            description: 'Portfolio website showcasing my work.',
            url: baseURL,
            siteName: `${person.firstName}'s Portfolio`,
            locale: locale === 'fr' ? 'fr_FR' : 'en_US',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

const primary = Inter({
    variable: '--font-primary',
    subsets: ['latin'],
    display: 'swap',
});

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
    variable: '--font-code',
    subsets: ['latin'],
    display: 'swap',
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    let messages;
    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Could not load messages for ${locale}`, error);
        messages = (await import(`@/messages/${routing.defaultLocale}.json`))
            .default;
    }

    return (
        <Flex
            as='html'
            lang={locale}
            background='page'
            data-neutral={style.neutral}
            data-brand={style.brand}
            data-accent={style.accent}
            data-solid={style.solid}
            data-solid-style={style.solidStyle}
            data-theme={style.theme}
            data-border={style.border}
            data-surface={style.surface}
            data-transition={style.transition}
            className={classNames(
                primary.variable,
                secondary ? secondary.variable : '',
                tertiary ? tertiary.variable : '',
                code.variable
            )}
        >
            <NextIntlClientProvider messages={messages} locale={locale}>
                <ToastProvider>
                    <Column
                        style={{ minHeight: '100vh' }}
                        as='body'
                        fillWidth
                        margin='0'
                        padding='0'
                    >
                        <Background
                            mask={{
                                cursor: effects.mask.cursor,
                                x: effects.mask.x,
                                y: effects.mask.y,
                                radius: effects.mask.radius,
                            }}
                            gradient={{
                                display: effects.gradient.display,
                                x: effects.gradient.x,
                                y: effects.gradient.y,
                                width: effects.gradient.width,
                                height: effects.gradient.height,
                                tilt: effects.gradient.tilt,
                                colorStart: effects.gradient.colorStart,
                                colorEnd: effects.gradient.colorEnd,
                                opacity: effects.gradient
                                    .opacity as OpacityLevel,
                            }}
                            dots={{
                                display: effects.dots.display,
                                color: effects.dots.color,
                                size: effects.dots
                                    .size as unknown as SpacingToken,
                                opacity: effects.dots.opacity as OpacityLevel,
                            }}
                            grid={{
                                display: effects.grid.display,
                                color: effects.grid.color,
                                width: effects.grid
                                    .width as unknown as SpacingToken,
                                height: effects.grid
                                    .height as unknown as SpacingToken,
                                opacity: effects.grid.opacity as OpacityLevel,
                            }}
                            lines={{
                                display: effects.lines.display,
                                opacity: effects.lines.opacity as OpacityLevel,
                            }}
                        />
                        <Flex fillWidth minHeight='16'></Flex>
                        <Header />
                        <Flex
                            position='relative'
                            zIndex={0}
                            fillWidth
                            paddingY='l'
                            paddingX='l'
                            horizontal='center'
                            flex={1}
                        >
                            <Flex horizontal='center' fillWidth minHeight='0'>
                                <RouteGuard>{children}</RouteGuard>
                            </Flex>
                        </Flex>
                        <Footer />
                    </Column>
                </ToastProvider>
                <Analytics />
            </NextIntlClientProvider>
        </Flex>
    );
}
