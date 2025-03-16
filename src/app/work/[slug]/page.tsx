import { baseURL } from '@/app/resources';
import { person } from '@/app/resources/content';
import { formatDate } from '@/app/utils/formatDate';
import { getPosts } from '@/app/utils/utils';
import { CustomMDX } from '@/components/mdx';
import { ProjectLinks } from '@/components/ProjectLinks';
import ScrollToHash from '@/components/ScrollToHash';
import {
    AvatarGroup,
    Button,
    Column,
    Flex,
    Heading,
    SmartImage,
    Text,
} from '@/once-ui/components';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

interface WorkParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getPosts(['src', 'app', 'work', 'projects']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(props: WorkParams) {
    const params = await props.params;

    const { slug } = params;

    const post = getPosts(['src', 'app', 'work', 'projects']).find(
        (post) => post.slug === slug
    );

    if (!post) {
        return;
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        images,
        image,
        team,
    } = post.metadata;
    const ogImage = image
        ? `https://${baseURL}${image}`
        : `https://${baseURL}/og?title=${title}`;

    return {
        title,
        description,
        images,
        team,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `https://${baseURL}/work/${post.slug}`,
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

export default async function Project(props: WorkParams) {
    try {
        const params = await props.params;
        const posts = getPosts(['src', 'app', 'work', 'projects']);

        if (!Array.isArray(posts) || posts.length === 0) {
            console.error('No posts found or invalid posts array');
            notFound();
        }

        const post = posts.find((post) => post.slug === params.slug);

        if (!post) {
            console.error(`Post not found for slug: ${params.slug}`);
            notFound();
        }

        if (!post.content || typeof post.content !== 'string') {
            console.error(`Invalid content for post with slug: ${params.slug}`);
            return (
                <Column as='section' maxWidth='m' horizontal='center' gap='l'>
                    <Column maxWidth='xs' gap='16'>
                        <Button
                            href='/work'
                            variant='tertiary'
                            weight='default'
                            size='s'
                            prefixIcon='chevronLeft'
                        >
                            Projects
                        </Button>
                        <Heading variant='display-strong-s'>
                            {post.metadata?.title || 'Contenu non disponible'}
                        </Heading>
                        <Text
                            variant='body-default-m'
                            onBackground='neutral-medium'
                        >
                            Le contenu de ce projet n&apos;est pas disponible
                            actuellement. Veuillez réessayer ultérieurement.
                        </Text>
                    </Column>
                </Column>
            );
        }

        if (!post.metadata) {
            console.error(
                `Invalid metadata for post with slug: ${params.slug}`
            );
            post.metadata = {
                title: 'Contenu non disponible',
                publishedAt: new Date().toISOString(),
                summary:
                    'Les métadonnées de ce projet ne sont pas disponibles.',
                images: [],
                team: [],
            };
        }

        const avatars =
            post.metadata.team?.map((person) => ({
                src: person.avatar,
            })) || [];

        // Sérialiser le contenu MDX
        const mdxSource = await serialize(post.content);

        return (
            <Column as='section' maxWidth='m' horizontal='center' gap='l'>
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
                            url: `https://${baseURL}/work/${post.slug}`,
                            author: {
                                '@type': 'Person',
                                name: person.name,
                            },
                        }),
                    }}
                />
                <Column maxWidth='xs' gap='16'>
                    <Button
                        href='/work'
                        variant='tertiary'
                        weight='default'
                        size='s'
                        prefixIcon='chevronLeft'
                    >
                        Projects
                    </Button>
                    <Heading variant='display-strong-s'>
                        {post.metadata.title}
                    </Heading>
                </Column>
                {post.metadata.images && post.metadata.images.length > 0 && (
                    <SmartImage
                        priority
                        aspectRatio='16 / 9'
                        radius='m'
                        alt='image'
                        src={post.metadata.images[0]}
                    />
                )}
                <Column style={{ margin: 'auto' }} as='article' maxWidth='xs'>
                    <Flex gap='12' marginBottom='24' vertical='center'>
                        {post.metadata.team &&
                            post.metadata.team.length > 0 && (
                                <AvatarGroup
                                    reverse
                                    avatars={avatars}
                                    size='m'
                                />
                            )}
                        <Text
                            variant='body-default-s'
                            onBackground='neutral-weak'
                        >
                            {formatDate(post.metadata.publishedAt)}
                        </Text>
                    </Flex>
                    {post.metadata.links && (
                        <ProjectLinks links={post.metadata.links} />
                    )}
                    <CustomMDX source={mdxSource} />
                </Column>
                <ScrollToHash />
            </Column>
        );
    } catch (error) {
        console.error('Error rendering project page:', error);
        return (
            <Column as='section' maxWidth='m' horizontal='center' gap='l'>
                <Column maxWidth='xs' gap='16'>
                    <Button
                        href='/work'
                        variant='tertiary'
                        weight='default'
                        size='s'
                        prefixIcon='chevronLeft'
                    >
                        Projects
                    </Button>
                    <Heading variant='display-strong-s'>
                        Erreur lors du chargement du projet
                    </Heading>
                    <Text
                        variant='body-default-m'
                        onBackground='neutral-medium'
                    >
                        Une erreur s&apos;est produite lors du chargement de ce
                        projet. Veuillez réessayer ultérieurement.
                    </Text>
                </Column>
            </Column>
        );
    }
}
