'use client';

import { formatDate } from '@/app/utils/formatDate';
import {
    Column,
    Flex,
    Heading,
    SmartImage,
    SmartLink,
    Tag,
    Text,
} from '@/once-ui/components';
import { BlogPost } from '@/types/content';
import styles from './Posts.module.scss';

interface PostProps {
    post: BlogPost;
    thumbnail: boolean;
}

export function Post({ post, thumbnail }: PostProps) {
    return (
        <SmartLink
            fillWidth
            className={styles.hover}
            unstyled
            key={post.slug}
            href={`/blog/${post.slug}`}
        >
            <Flex
                position='relative'
                mobileDirection='column'
                fillWidth
                paddingY='12'
                paddingX='16'
                gap='32'
            >
                {post.metadata.image && thumbnail && (
                    <SmartImage
                        priority
                        maxWidth={20}
                        className={styles.image}
                        sizes='640px'
                        border='neutral-alpha-weak'
                        cursor='interactive'
                        radius='m'
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio='16 / 9'
                    />
                )}
                <Column position='relative' fillWidth gap='8' vertical='center'>
                    <Heading as='h2' variant='heading-strong-l' wrap='balance'>
                        {post.metadata.title}
                    </Heading>
                    <Text variant='label-default-s' onBackground='neutral-weak'>
                        {formatDate(post.metadata.publishedAt, false)}
                    </Text>
                    {post.metadata.tag && (
                        <Tag
                            className='mt-8'
                            label={post.metadata.tag}
                            variant='neutral'
                        />
                    )}
                </Column>
            </Flex>
        </SmartLink>
    );
}
