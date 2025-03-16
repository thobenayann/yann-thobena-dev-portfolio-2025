import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type ProjectLink = {
    label: string;
    url: string;
    icon: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Team[];
    link?: string;
    links?: ProjectLink[];
};

function getMDXFiles(dir: string) {
    try {
        if (!fs.existsSync(dir)) {
            console.error(`Directory does not exist: ${dir}`);
            return [];
        }

        return fs
            .readdirSync(dir)
            .filter((file) => path.extname(file) === '.mdx');
    } catch (error) {
        console.error(`Error reading MDX files from directory ${dir}:`, error);
        return [];
    }
}

function readMDXFile(filePath: string) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File does not exist: ${filePath}`);
            return {
                metadata: {
                    title: 'Not Found',
                    publishedAt: new Date().toISOString(),
                    summary: 'This content could not be found.',
                    images: [],
                    team: [],
                },
                content: 'Content not found.',
            };
        }

        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(rawContent);

        const metadata: Metadata = {
            title: data.title || '',
            publishedAt: data.publishedAt,
            summary: data.summary || '',
            image: data.image || '',
            images: data.images || [],
            tag: data.tag || [],
            team: data.team || [],
            link: data.link || '',
            links: data.links || [],
        };

        return { metadata, content };
    } catch (error) {
        console.error(`Error reading MDX file ${filePath}:`, error);
        return {
            metadata: {
                title: 'Error',
                publishedAt: new Date().toISOString(),
                summary: 'An error occurred while reading this content.',
                images: [],
                team: [],
            },
            content: 'Error loading content.',
        };
    }
}

function getMDXData(dir: string) {
    try {
        const mdxFiles = getMDXFiles(dir);
        return mdxFiles.map((file) => {
            try {
                const { metadata, content } = readMDXFile(path.join(dir, file));
                const slug = path.basename(file, path.extname(file));

                return {
                    metadata,
                    slug,
                    content,
                };
            } catch (error) {
                console.error(`Error processing MDX file ${file}:`, error);
                const slug = path.basename(file, path.extname(file));
                return {
                    metadata: {
                        title: 'Error',
                        publishedAt: new Date().toISOString(),
                        summary:
                            'An error occurred while processing this content.',
                        images: [],
                        team: [],
                    },
                    slug,
                    content: 'Error processing content.',
                };
            }
        });
    } catch (error) {
        console.error(`Error getting MDX data from directory ${dir}:`, error);
        return [];
    }
}

export function getPosts(customPath = ['', '', '', '']) {
    try {
        const postsDir = path.join(process.cwd(), ...customPath);
        return getMDXData(postsDir);
    } catch (error) {
        console.error(
            `Error in getPosts with path ${customPath.join('/')}:`,
            error
        );
        return [];
    }
}
