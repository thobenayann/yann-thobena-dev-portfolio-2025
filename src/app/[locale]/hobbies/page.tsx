import MasonryGrid from '@/components/hobbies/MasonryGrid';
import { routing } from '@/i18n/routing';
import { Flex } from '@/once-ui/components';
import { baseURL } from '@/resources';
import { person } from '@/resources/content';
import { hasLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { use } from 'react';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Hobbies' });

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
            url: `https://${baseURL}/hobbies`,
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
    };
}

export default function Hobbies({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const t = useTranslations('Hobbies');

    return (
        <Flex fillWidth>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: t('title'),
                        description: t('description'),
                        url: `https://${baseURL}/hobbies`,
                        author: {
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
            <MasonryGrid />
        </Flex>
    );
}
