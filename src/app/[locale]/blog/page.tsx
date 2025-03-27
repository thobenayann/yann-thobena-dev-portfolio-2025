import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { routing } from '@/i18n/routing';
import { Column } from '@/once-ui/components';
import { baseURL } from '@/resources';
import { newsletter, person } from '@/resources/content';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface BlogParams {
    params: Promise<{
        locale: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Blog' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `https://${baseURL}/blog`,
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
            canonical: `https://${baseURL}/blog`,
            languages: routing.locales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: `https://${baseURL}/${locale}/blog`,
                }),
                {}
            ),
        },
    };
}

export default async function Blog({ params }: BlogParams) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get translations
    const t = await getTranslations('Blog');

    return (
        <Column maxWidth='s'>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Blog',
                        headline: t('title'),
                        description: t('description'),
                        url: `https://${baseURL}/blog`,
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
            <Posts range={[1, 3]} locale={locale} />
            {newsletter.display && <Mailchimp newsletter={newsletter} />}
        </Column>
    );
}
