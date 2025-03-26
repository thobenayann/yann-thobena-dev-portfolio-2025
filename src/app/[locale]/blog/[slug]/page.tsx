import { CustomMDX } from '@/components/mdx';
import ScrollToHash from '@/components/ScrollToHash';
import { routing } from '@/i18n/routing';
import {
    AvatarGroup,
    Button,
    Column,
    Heading,
    Row,
    Text,
} from '@/once-ui/components';
import { baseURL } from '@/resources';
import { person } from '@/resources/content';
import { formatDate } from '@/utils/formatDate';
import { getPosts } from '@/utils/utils';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

interface BlogParams {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogParams) {
    const { slug, locale } = await params;
    const post = getPosts(['blog', 'posts'], locale).find(
        (post) => post.slug === slug
    );

    if (!post) {
        return;
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata;

    const ogImage = image
        ? `https://${baseURL}${image}`
        : `https://${baseURL}/og?title=${title}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `https://${baseURL}/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
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

export default async function Blog({ params }: BlogParams) {
    const { slug, locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const post = getPosts(['blog', 'posts'], locale).find(
        (post) => post.slug === slug
    );

    if (!post) {
        notFound();
    }

    const avatars =
        post.metadata.team?.map((person) => ({
            src: person.avatar,
        })) || [];

    // Sérialiser le contenu MDX
    const mdxSource = await serialize(post.content);

    return (
        <Column as='section' maxWidth='xs' gap='l'>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? `https://${baseURL}${post.metadata.image}`
                            : `https://${baseURL}/og?title=${post.metadata.title}`,
                        url: `https://${baseURL}/blog/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: person.name,
                        },
                    }),
                }}
            />
            <Button
                href='/blog'
                weight='default'
                variant='tertiary'
                size='s'
                prefixIcon='chevronLeft'
            >
                Posts
            </Button>
            <Heading variant='display-strong-s'>{post.metadata.title}</Heading>
            <Row gap='12' vertical='center'>
                {avatars.length > 0 && (
                    <AvatarGroup size='s' avatars={avatars} />
                )}
                <Text variant='body-default-s' onBackground='neutral-weak'>
                    {formatDate(post.metadata.publishedAt)}
                </Text>
            </Row>
            <Column as='article' fillWidth>
                <CustomMDX source={mdxSource} />
            </Column>
            <ScrollToHash />
        </Column>
    );
}
