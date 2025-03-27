import { Grid } from '@/once-ui/components';
import { getPosts } from '@/utils/utils';
import { Post } from './Post';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    locale: string;
}

export function Posts({ range, thumbnail = true, locale }: PostsProps) {
    const allBlogs = getPosts(['blog', 'posts'], locale);

    const sortedBlogs = allBlogs.sort((a, b) => {
        return (
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        );
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length
          )
        : sortedBlogs;

    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid
                    columns='1'
                    mobileColumns='1'
                    fillWidth
                    marginBottom='40'
                    gap='m'
                >
                    {displayedBlogs.map((post) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}
