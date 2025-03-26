import { baseURL } from '@/resources';
import { getPosts } from '@/utils/utils';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const blogs = {
        fr: getPosts(['blog', 'posts'], 'fr').map((post) => ({
            url: `https://${baseURL}/fr/blog/${post.slug}`,
            lastModified: new Date(post.metadata.publishedAt),
        })),
        en: getPosts(['blog', 'posts'], 'en').map((post) => ({
            url: `https://${baseURL}/en/blog/${post.slug}`,
            lastModified: new Date(post.metadata.publishedAt),
        })),
    };

    const works = {
        fr: getPosts(['work', 'projects'], 'fr').map((post) => ({
            url: `https://${baseURL}/fr/work/${post.slug}`,
            lastModified: new Date(post.metadata.publishedAt),
        })),
        en: getPosts(['work', 'projects'], 'en').map((post) => ({
            url: `https://${baseURL}/en/work/${post.slug}`,
            lastModified: new Date(post.metadata.publishedAt),
        })),
    };

    return [
        {
            url: `https://${baseURL}`,
            lastModified: new Date(),
        },
        {
            url: `https://${baseURL}/fr`,
            lastModified: new Date(),
        },
        {
            url: `https://${baseURL}/en`,
            lastModified: new Date(),
        },
        ...blogs.fr,
        ...blogs.en,
        ...works.fr,
        ...works.en,
    ];
}
