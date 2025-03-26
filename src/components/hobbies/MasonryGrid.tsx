'use client';

import ScrollElement from '@/components/core/scroll-element';
import { SmartImage } from '@/once-ui/components';
import { hobbies } from '@/resources/content';
import Masonry from 'react-masonry-css';
import styles from './Hobbies.module.scss';

export default function MasonryGrid() {
    const breakpointColumnsObj = {
        default: 4,
        1440: 3,
        1024: 2,
        560: 1,
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}
        >
            {hobbies.images.map((image, index) => (
                <ScrollElement
                    key={index}
                    viewport={{
                        once: true,
                        amount: 0.3,
                        margin: '0px 0px -100px 0px',
                    }}
                    delay={index * 0.1}
                    direction={'up'}
                >
                    <SmartImage
                        priority={index < 10}
                        sizes='(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw'
                        radius='m'
                        aspectRatio={
                            image.orientation === 'horizontal'
                                ? '16 / 9'
                                : '9 / 16'
                        }
                        src={image.src}
                        alt={image.alt}
                        className={styles.gridItem}
                    />
                </ScrollElement>
            ))}
        </Masonry>
    );
}
