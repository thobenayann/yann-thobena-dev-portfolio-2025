import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: {
            mdxType: 'gfm',
            jsxImportSource: 'react',
        },
    },
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
});

// Combine MDX config with Next.js config
export default withMDX(nextConfig);
