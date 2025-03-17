/* eslint-disable */
'use client';

import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import React, { ReactNode } from 'react';

import { HeadingLink } from '@/components';
import { SmartImage, SmartLink, Text } from '@/once-ui/components';
import { CodeBlock } from '@/once-ui/modules';

import { SmartImageProps } from '@/once-ui/components/SmartImage';
import { TextProps } from '@/once-ui/interfaces';

type TableProps = {
    data: {
        headers: string[];
        rows: string[][];
    };
};

function Table({ data }: TableProps) {
    const headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));
    const rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
    if (href.startsWith('/')) {
        return (
            <SmartLink href={href} {...props}>
                {children}
            </SmartLink>
        );
    }

    if (href.startsWith('#')) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    return (
        <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
            {children}
        </a>
    );
}

function createImage({
    alt,
    src,
    ...props
}: SmartImageProps & { src: string }) {
    if (!src) {
        console.error("SmartImage requires a valid 'src' property.");
        return null;
    }

    return (
        <SmartImage
            className='my-20'
            enlarge
            radius='m'
            aspectRatio='16 / 9'
            alt={alt}
            src={src}
            {...props}
        />
    );
}

function slugify(str: string): string {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const CustomHeading = ({ children, ...props }: TextProps) => {
        const slug = slugify(children as string);
        return (
            <HeadingLink
                style={{
                    marginTop: 'var(--static-space-24)',
                    marginBottom: 'var(--static-space-12)',
                }}
                level={level}
                id={slug}
                {...props}
            >
                {children}
            </HeadingLink>
        );
    };

    CustomHeading.displayName = `Heading${level}`;

    return CustomHeading;
}

function createParagraph({ children }: TextProps) {
    return (
        <Text
            style={{ lineHeight: '175%' }}
            variant='body-default-m'
            onBackground='neutral-medium'
            marginTop='8'
            marginBottom='12'
        >
            {children}
        </Text>
    );
}

// Définir un type pour les composants MDX
type MDXComponentProps = {
    children?: ReactNode;
    [key: string]: ReactNode | string | number | boolean | object | undefined;
};

// Ajouter un type pour CodeBlock
type CodeBlockProps = {
    children?: ReactNode;
    language?: string;
    [key: string]: ReactNode | string | number | boolean | object | undefined;
};

// Composants de remplacement simples pour Terminal et AnimatedSpan
function SimpleTerminal({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-xl border border-gray-200 bg-gray-50 p-4 ${
                className || ''
            }`}
        >
            <div className='flex gap-2 border-b border-gray-200 pb-2 mb-2'>
                <div className='h-2 w-2 rounded-full bg-red-500'></div>
                <div className='h-2 w-2 rounded-full bg-yellow-500'></div>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
            </div>
            <pre>
                <code className='block overflow-auto'>{children}</code>
            </pre>
        </div>
    );
}

function SimpleAnimatedSpan({
    children,
    className,
    delay: _delay, // Ignoré, plus d'animation
    ...props
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    [key: string]: any;
}) {
    return (
        <span className={`inline-block ${className || ''}`} {...props}>
            {children}
        </span>
    );
}

type MDXComponents = {
    p: React.ComponentType<MDXComponentProps>;
    h1: React.ComponentType<MDXComponentProps>;
    h2: React.ComponentType<MDXComponentProps>;
    h3: React.ComponentType<MDXComponentProps>;
    h4: React.ComponentType<MDXComponentProps>;
    h5: React.ComponentType<MDXComponentProps>;
    h6: React.ComponentType<MDXComponentProps>;
    img: React.ComponentType<MDXComponentProps & { src: string; alt?: string }>;
    a: React.ComponentType<MDXComponentProps & { href: string }>;
    Table: React.ComponentType<TableProps>;
    CodeBlock: React.ComponentType<CodeBlockProps>;
    Terminal: React.ComponentType<{ children: ReactNode; className?: string }>;
    AnimatedSpan: React.ComponentType<{
        children: ReactNode;
        delay?: number;
        className?: string;
        [key: string]: any;
    }>;
};

const components: MDXComponents = {
    p: createParagraph as React.ComponentType<MDXComponentProps>,
    h1: createHeading(1) as React.ComponentType<MDXComponentProps>,
    h2: createHeading(2) as React.ComponentType<MDXComponentProps>,
    h3: createHeading(3) as React.ComponentType<MDXComponentProps>,
    h4: createHeading(4) as React.ComponentType<MDXComponentProps>,
    h5: createHeading(5) as React.ComponentType<MDXComponentProps>,
    h6: createHeading(6) as React.ComponentType<MDXComponentProps>,
    img: createImage as React.ComponentType<
        MDXComponentProps & { src: string; alt?: string }
    >,
    a: CustomLink as React.ComponentType<MDXComponentProps & { href: string }>,
    Table,
    CodeBlock,
    Terminal: SimpleTerminal as React.ComponentType<{
        children: ReactNode;
        className?: string;
    }>,
    AnimatedSpan: SimpleAnimatedSpan as React.ComponentType<{
        children: ReactNode;
        delay?: number;
        className?: string;
        [key: string]: any;
    }>,
};

type CustomMDXProps = {
    source: MDXRemoteSerializeResult;
    components?: Partial<MDXComponents>;
};

// Composant client unique pour le rendu MDX
export function CustomMDX({
    source,
    components: customComponents,
}: CustomMDXProps) {
    if (!source) {
        return (
            <Text
                style={{ lineHeight: '175%' }}
                variant='body-default-m'
                onBackground='neutral-medium'
                marginTop='8'
                marginBottom='12'
            >
                Aucun contenu à afficher. Le contenu source est vide ou non
                défini.
            </Text>
        );
    }

    return (
        <div>
            <MDXRemote
                {...source}
                components={{ ...components, ...(customComponents || {}) }}
            />
        </div>
    );
}
