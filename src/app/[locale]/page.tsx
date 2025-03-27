import { Projects } from '@/components/work/Projects';
import { Column, Flex, Heading, RevealFx } from '@/once-ui/components';

import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { LocalizedHome } from '@/components/LocalizedHome';
import { routing } from '@/i18n/routing';
import { baseURL, routes } from '@/resources';
import { newsletter, person } from '@/resources/content';
import { hasLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Home' });

    const title = t('title');
    const description = t('description');
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://${baseURL}`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: `https://${baseURL}`,
            languages: routing.locales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: `https://${baseURL}/${locale}`,
                }),
                {}
            ),
        },
    };
}

export default function Home({ params }: PageProps) {
    const { locale } = use(params);

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const tHome = useTranslations('Home');
    const tCommon = useTranslations('Common');

    return (
        <Column maxWidth='m' gap='xl' horizontal='center'>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: tHome('title'),
                        description: tHome('description'),
                        url: `https://${baseURL}`,
                        image: `${baseURL}/og?title=${encodeURIComponent(
                            tHome('title')
                        )}`,
                        publisher: {
                            '@type': 'Person',
                            name: person.name,
                            image: {
                                '@type': 'ImageObject',
                                url: `${baseURL}${person.avatar}`,
                            },
                        },
                    }),
                }}
            />
            <Column fillWidth paddingY='l' gap='m'>
                <LocalizedHome />
            </Column>
            <RevealFx translateY='16' delay={0.6}>
                <Projects range={[1, 1]} locale={locale} />
            </RevealFx>
            {routes['/blog'] && (
                <Flex fillWidth gap='24' mobileDirection='column'>
                    <Flex flex={1} paddingLeft='l'>
                        <Heading
                            as='h2'
                            variant='display-strong-xs'
                            wrap='balance'
                        >
                            {tCommon('latestFromBlog')}
                        </Heading>
                    </Flex>
                    <Flex flex={3} paddingX='20'>
                        <Posts range={[1, 2]} columns='2' locale={locale} />
                    </Flex>
                </Flex>
            )}
            <Projects range={[2]} locale={locale} />
            {newsletter.display && <Mailchimp newsletter={newsletter} />}
        </Column>
    );
}
