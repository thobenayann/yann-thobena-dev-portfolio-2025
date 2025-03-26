import { Projects } from '@/components/work/Projects';
import {
    Avatar,
    Button,
    Column,
    Flex,
    Heading,
    RevealFx,
    Text,
} from '@/once-ui/components';

import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { routing } from '@/i18n/routing';
import { baseURL, routes } from '@/resources';
import { about, newsletter, person } from '@/resources/content';
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

    const t = useTranslations('Home');
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
                        name: t('title'),
                        description: t('description'),
                        url: `https://${baseURL}`,
                        image: `${baseURL}/og?title=${encodeURIComponent(
                            t('title')
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
                <Column maxWidth='s'>
                    <RevealFx
                        translateY='4'
                        fillWidth
                        horizontal='start'
                        paddingBottom='m'
                    >
                        <Heading wrap='balance' variant='display-strong-l'>
                            {t('headline')}
                        </Heading>
                    </RevealFx>
                    <RevealFx
                        translateY='8'
                        delay={0.2}
                        fillWidth
                        horizontal='start'
                        paddingBottom='m'
                    >
                        <Text
                            wrap='balance'
                            onBackground='neutral-weak'
                            variant='heading-default-xl'
                        >
                            {t('subline')}
                        </Text>
                    </RevealFx>
                    <RevealFx translateY='12' delay={0.4} horizontal='start'>
                        <Button
                            id='about'
                            data-border='rounded'
                            href='/about'
                            variant='secondary'
                            size='m'
                            arrowIcon
                        >
                            <Flex gap='8' vertical='center'>
                                {about.avatar.display && (
                                    <Avatar
                                        style={{
                                            marginLeft: '-0.75rem',
                                            marginRight: '0.25rem',
                                        }}
                                        src={person.avatar}
                                        size='m'
                                    />
                                )}
                                {about.title}
                            </Flex>
                        </Button>
                    </RevealFx>
                </Column>
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
