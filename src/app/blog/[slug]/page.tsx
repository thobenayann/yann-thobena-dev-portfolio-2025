import { baseURL } from '@/app/resources';
import { person } from '@/app/resources/content';
import { formatDate } from '@/app/utils/formatDate';
import { getPosts } from '@/app/utils/utils';
import { CustomMDX } from '@/components/mdx';
import ScrollToHash from '@/components/ScrollToHash';
import {
    AvatarGroup,
    Button,
    Column,
    Heading,
    Row,
    Text,
} from '@/once-ui/components';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

interface BlogParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getPosts(['src', 'app', 'blog', 'posts']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: BlogParams) {
    const params = await props.params;
    const { slug } = params;

    const post = getPosts(['src', 'app', 'blog', 'posts']).find(
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

export default async function Blog(props: BlogParams) {
    const params = await props.params;
    const post = getPosts(['src', 'app', 'blog', 'posts']).find(
        (post) => post.slug === params.slug
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
