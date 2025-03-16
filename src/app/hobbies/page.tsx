import { baseURL } from '@/app/resources';
import { hobbies, person } from '@/app/resources/content';
import MasonryGrid from '@/components/hobbies/MasonryGrid';
import { Flex } from '@/once-ui/components';

export async function generateMetadata() {
    const title = hobbies.title;
    const description = hobbies.description;
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

export default function Hobbies() {
    return (
        <Flex fillWidth>
            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: hobbies.title,
                        description: hobbies.description,
                        url: `https://${baseURL}/hobbies`,
                        itemListElement: hobbies.images.map((image, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            item: {
                                '@type': 'ImageObject',
                                url: `${baseURL}${image.src}`,
                                description: image.alt,
                            },
                        })),
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
