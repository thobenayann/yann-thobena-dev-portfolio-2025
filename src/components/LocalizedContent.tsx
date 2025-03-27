'use client';

import { useTranslations } from 'next-intl';

export function useLocalizedContent() {
    const tHome = useTranslations('Home');
    const tAbout = useTranslations('About');
    const tBlog = useTranslations('Blog');
    const tWork = useTranslations('Work');
    const tHobbies = useTranslations('Hobbies');
    const tStatic = useTranslations('StaticContent');

    return {
        home: {
            title: tHome('title'),
            description: tHome('description'),
            headline: tHome('headline'),
            subline: tHome('subline'),
        },
        about: {
            title: tAbout('title'),
            description: tAbout('description'),
            intro: {
                title: tAbout('intro.title'),
            },
            work: {
                title: tAbout('work.title'),
            },
            studies: {
                title: tAbout('studies.title'),
            },
            technical: {
                title: tAbout('technical.title'),
            },
            calendar: {
                schedule: tAbout('calendar.schedule'),
            },
        },
        blog: {
            title: tBlog('title'),
            description: tBlog('description'),
        },
        work: {
            title: tWork('title'),
            description: tWork('description'),
        },
        hobbies: {
            title: tHobbies('title'),
            description: tHobbies('description'),
        },
        staticContent: {
            person: {
                role: tStatic('person.role'),
                location: tStatic('person.location'),
            },
            technical: {
                figma: {
                    title: tStatic('technical.figma.title'),
                    description: tStatic('technical.figma.description'),
                },
                nextjs: {
                    apps: {
                        title: tStatic('technical.nextjs.apps.title'),
                        description: tStatic(
                            'technical.nextjs.apps.description'
                        ),
                    },
                    websites: {
                        title: tStatic('technical.nextjs.websites.title'),
                        description: tStatic(
                            'technical.nextjs.websites.description'
                        ),
                    },
                },
            },
        },
    };
}
