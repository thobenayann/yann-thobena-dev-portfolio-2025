import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: {
            mdxType: 'gfm',
            jsxImportSource: 'react',
        },
    },
    // Transpiler les packages qui pourraient causer des problèmes de SSR
    transpilePackages: ['react-icons'],
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

// Combine MDX config with Next.js config
export default withNextIntl(withMDX(nextConfig));
