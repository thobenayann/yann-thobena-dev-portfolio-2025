import { ReactNode } from 'react';

export interface Person {
    firstName: string;
    lastName: string;
    name: string;
    role: string;
    avatar: string;
    timezone: string;
    location: string;
    languages: string[];
}

export interface NewsletterProps {
    display: boolean;
    title: ReactNode;
    description: ReactNode;
}

export interface SocialLink {
    name: string;
    icon: string;
    link: string;
}

export interface HomeContent {
    label: string;
    title: string;
    description: string;
    headline: ReactNode;
    subline: ReactNode;
}

export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface ProjectLink {
    label: string;
    url: string;
    icon: string;
}

export interface WorkExperience {
    company: string;
    timeframe: string;
    role: string;
    achievements: ReactNode[];
    images: ImageProps[];
    environments?: Array<{
        label: string;
        icon?: string;
    }>;
}

export interface Institution {
    name: string;
    description: ReactNode;
}

export interface TechnicalSkill {
    title: string;
    description: ReactNode;
    images: ImageProps[];
}

export interface AboutContent {
    label: string;
    title: string;
    description: string;
    tableOfContent: {
        display: boolean;
        subItems: boolean;
    };
    avatar: {
        display: boolean;
    };
    calendar: {
        display: boolean;
        link: string;
    };
    intro: {
        display: boolean;
        title: string;
        description: ReactNode;
    };
    work: {
        display: boolean;
        title: string;
        experiences: WorkExperience[];
    };
    studies: {
        display: boolean;
        title: string;
        institutions: Institution[];
    };
    technical: {
        display: boolean;
        title: string;
        skills: TechnicalSkill[];
    };
}

export interface BlogPostMetadata {
    title: string;
    publishedAt: string;
    image?: string;
    tag?: string;
}

export interface BlogPost {
    slug: string;
    metadata: BlogPostMetadata;
    content?: string;
}

export interface BlogContent {
    label: string;
    title: string;
    description: string;
}

export interface WorkContent {
    label: string;
    title: string;
    description: string;
}

export interface HobbyImage {
    src: string;
    alt: string;
    orientation: 'horizontal' | 'vertical';
}

export interface HobbiesContent {
    label: string;
    title: string;
    description: string;
    images: HobbyImage[];
}
