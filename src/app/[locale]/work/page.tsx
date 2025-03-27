import { Projects } from '@/components/work/Projects';
import { routing } from '@/i18n/routing';
import { Column } from '@/once-ui/components';
import { baseURL } from '@/resources';
import { person } from '@/resources/content';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface WorkParams {
    params: Promise<{
        locale: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: WorkParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Work' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://${baseURL}/work`,
            siteName: person.name,
            locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
        alternates: {
            canonical: `https://${baseURL}/work`,
            languages: routing.locales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: `https://${baseURL}/${locale}/work`,
                }),
                {}
            ),
        },
    };
}

export default async function Work({ params }: WorkParams) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get translations
    const t = await getTranslations('Work');

    return (
        <Column maxWidth='m'>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        headline: t('title'),
                        description: t('description'),
                        url: `https://${baseURL}/work`,
                        image: `${baseURL}/og?title=${encodeURIComponent(
                            t('title')
                        )}`,
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
            <Projects range={[1, 3]} locale={locale} />
        </Column>
    );
}
