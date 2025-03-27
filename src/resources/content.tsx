import { Flex, Heading, InlineCode, Tag, Text } from '@/once-ui/components';
import {
    AboutContent,
    BlogContent,
    HobbiesContent,
    HomeContent,
    NewsletterProps,
    Person,
    SocialLink,
    WorkContent,
} from '@/types/content';

// Definition of the objects with their types
const person: Person = {
    firstName: 'Yann',
    lastName: 'THOBENA',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role: 'Application Designer & Developer',
    avatar: '/images/avatar.svg',
    timezone: 'Europe/Paris', // Expecting the IANA time zone identifier
    location: 'Toulouse, France',
    languages: ['French', 'English'], // optional: Leave the array empty if you don't want to display languages
};

export const newsletter: NewsletterProps = {
    display: true,
    title: {
        en: (
            <Heading as='h1' size='xl'>
                Subscribe to my newsletter
            </Heading>
        ),
        fr: (
            <Heading as='h1' size='xl'>
                Abonnez-vous à ma newsletter
            </Heading>
        ),
    },
    description: {
        en: (
            <Text size='m'>
                Stay up to date with my latest articles about web development,
                tech, and more.
            </Text>
        ),
        fr: (
            <Text size='m'>
                Restez informé de mes derniers articles sur le développement
                web, la tech et plus encore.
            </Text>
        ),
    },
    buttonText: {
        en: 'Subscribe',
        fr: "S'abonner",
    },
    placeholderText: {
        en: 'Enter your email',
        fr: 'Votre adresse email',
    },
    successMessage: {
        en: 'Thank you for subscribing!',
        fr: 'Merci de votre abonnement !',
    },
    errorMessages: {
        en: {
            alreadySubscribed: 'You are already subscribed to the newsletter.',
            invalidEmail: 'Please enter a valid email address.',
            serverError: 'An error occurred. Please try again later.',
        },
        fr: {
            alreadySubscribed: 'Vous êtes déjà abonné à la newsletter.',
            invalidEmail: 'Veuillez entrer une adresse email valide.',
            serverError:
                'Une erreur est survenue. Veuillez réessayer plus tard.',
        },
    },
} as const;

const social: SocialLink[] = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/thobenayann',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/yannthobena/',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:thobena.yann@gmail.com',
    },
];

const home: HomeContent = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Application Designer & Developer</>,
    subline: (
        <>
            I&apos;m {person.firstName}, an application designer at{' '}
            <InlineCode>IPANOVA</InlineCode>, where I craft intuitive
            <br /> user experiences. I am also a fullstack web developer,
            creating robust and scalable web applications.
        </>
    ),
};

const about: AboutContent = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false,
    },
    avatar: {
        display: true,
    },
    calendar: {
        display: false,
        link: 'https://cal.com',
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: (
            <>
                Yann est un concepteur développeur d&apos;applications basé à
                Toulouse, passionné par la transformation de défis complexes en
                solutions simples et élégantes. Son travail couvre les
                interfaces numériques, les expériences interactives et la
                convergence entre conception et technologie.
            </>
        ),
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Ipanova',
                timeframe: "Octobre 2023 - Aujourd'hui",
                role: 'Fullstack developer & Support',
                achievements: [
                    <>
                        Analysis & Enhancement of existing React web apps to
                        implement new features
                    </>,
                    <>
                        Bug fixing & enhancement of an Angular application about
                        item management
                    </>,
                    <>
                        Maintenance & Support on several web sites made in
                        native PHP & some with Symfony
                    </>,
                    <>Support (all levels)</>,
                    <>Help the training of new comer in web development</>,
                    <>
                        Help the manager in pre-sale phase (workload estimation,
                        solution design, meeting with leads)
                    </>,
                ],
                environments: [
                    { label: 'Business requirements', icon: 'fileText' },
                    { label: 'Solution design', icon: 'puzzle' },
                    { label: 'UX/UI design', icon: 'layout' },
                    { label: 'React', icon: 'react' },
                    { label: 'NodeJS', icon: 'nodejs' },
                    { label: 'Docker', icon: 'docker' },
                ],
                images: [],
            },
            {
                company: 'Ipanova - Atelier du Dirigeant',
                timeframe: 'Décembre 2022 - Juillet 2023',
                role: 'Fullstack developer & Support',
                achievements: [
                    <>
                        End-to-end web application development to connect
                        company directors with external secretaries and
                        streamline interaction & task management
                    </>,
                    <>Workload estimation</>,
                    <>
                        Compare and shortlist web hosts, support the
                        infrastructure configuration
                    </>,
                    <>Customer & User support (all levels)</>,
                    <>
                        Focal point for the customer to advise and include
                        smoothly further features
                    </>,
                ],
                environments: [
                    { label: 'Business requirements', icon: 'fileText' },
                    { label: 'Technical design', icon: 'code' },
                    { label: 'UX/UI design', icon: 'layout' },
                    { label: 'React', icon: 'react' },
                    { label: 'NodeJS', icon: 'nodejs' },
                    { label: 'Docker', icon: 'docker' },
                ],
                images: [],
            },
            {
                company: 'Ipanova',
                timeframe: 'Octobre 2021 - Décembre 2022',
                role: 'Fullstack developer & Support',
                achievements: [
                    <>
                        End-to-end web application development to facilitate
                        forecast management in IT companies (staffing) with
                        VueJS, NodeJS, TypeScript, Next.js
                    </>,
                    <>
                        Proof of Concept for an internal website using React and
                        Strapi (CMS for apps)
                    </>,
                    <>Multi-website maintenance using PHP / Symfony</>,
                    <>Support (all levels)</>,
                ],
                environments: [
                    { label: 'Javascript/PHP', icon: 'code' },
                    { label: 'Business requirements', icon: 'fileText' },
                    { label: 'Fullstack development', icon: 'layers' },
                    { label: 'Scrum', icon: 'gitBranch' },
                    { label: 'GitLab', icon: 'gitlab' },
                ],
                images: [],
            },
            {
                company: "O'Clock School",
                timeframe: 'Janvier 2021 - Septembre 2021',
                role: 'Fullstack developer (Final Study Project)',
                achievements: [
                    <>
                        Web application design and development to connect local
                        producers and private customers
                    </>,
                    <>
                        Website development for a welding equipment selling
                        company
                    </>,
                ],
                environments: [
                    { label: 'Javascript', icon: 'code' },
                    { label: 'React', icon: 'react' },
                    { label: 'NodeJS', icon: 'nodejs' },
                    { label: 'Mockup design', icon: 'layout' },
                    { label: 'Database design', icon: 'database' },
                ],
                images: [],
            },
            {
                company: 'A.S.H',
                timeframe: 'Août 2010 - Janvier 2021',
                role: 'Shop and Sales Manager',
                achievements: [
                    <>
                        Started as a salesperson in a welding equipment sales
                        company
                    </>,
                    <>Served as a store manager</>,
                    <>
                        Transitioned into web development after 10 years in the
                        retail sector
                    </>,
                ],
                environments: [
                    { label: 'Team management', icon: 'users' },
                    { label: 'Supplier relations', icon: 'truck' },
                    { label: 'Purchasing management', icon: 'shoppingCart' },
                    { label: 'Employee training', icon: 'graduationCap' },
                    { label: 'Customer negotiation', icon: 'messageSquare' },
                    { label: 'Marketing strategy', icon: 'trendingUp' },
                ],
                images: [],
            },
        ],
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Education & Training',
        institutions: [
            {
                name: 'Digital Marketing / Web Marketing',
                description: (
                    <>
                        <Text as='p' variant='body-default-m' marginBottom='8'>
                            <strong>Period:</strong> November 2024
                            <br />
                            <strong>Institution:</strong> CFCE
                            <br />
                            <strong>Company:</strong> Ipanova
                        </Text>
                        <Text as='p' variant='body-default-m'>
                            Master web marketing concepts in their entirety.
                            <br />
                            Integrate digital, mobile and multimedia marketing
                            specifics.
                            <br />
                            Understand the importance and management of social
                            media.
                            <br />
                            Learn email campaign strategies.
                            <br />
                            Manage e-advertising campaigns.
                        </Text>
                    </>
                ),
            },
            {
                name: `Application Developer (Level 6, Professional Title - Bachelor's degree)`,
                description: (
                    <>
                        <Text as='p' variant='body-default-m' marginBottom='8'>
                            <strong>Period:</strong> October 2021 - January 2023
                            <br />
                            <strong>Institution:</strong> O&apos;Clock School
                            <br />
                            <strong>Company:</strong> Ipanova
                        </Text>
                        <Flex gap='8' wrap marginTop='12'>
                            <Tag size='s' prefixIcon='react'>
                                React.js
                            </Tag>
                            <Tag size='s' prefixIcon='code'>
                                TypeScript
                            </Tag>
                            <Tag size='s' prefixIcon='gitBranch'>
                                GraphQL
                            </Tag>
                            <Tag size='s' prefixIcon='server'>
                                API
                            </Tag>
                            <Tag size='s' prefixIcon='layers'>
                                Microservices
                            </Tag>
                            <Tag size='s' prefixIcon='code'>
                                Unit Testing
                            </Tag>
                            <Tag size='s' prefixIcon='users'>
                                Team Projects
                            </Tag>
                            <Tag size='s' prefixIcon='docker'>
                                Docker
                            </Tag>
                            <Tag size='s' prefixIcon='gitMerge'>
                                CI/CD
                            </Tag>
                        </Flex>
                    </>
                ),
            },
            {
                name: 'HTML5 & CSS3 Certification',
                description: (
                    <>
                        <Text as='p' variant='body-default-m'>
                            <strong>Period:</strong> March - April 2022
                            <br />
                            <strong>Institution:</strong> Dyma Formation
                        </Text>
                    </>
                ),
            },
            {
                name: 'Web Quality Certification (895pts/1000)',
                description: (
                    <>
                        <Text as='p' variant='body-default-m' marginBottom='8'>
                            <strong>Period:</strong> March - April 2021
                            <br />
                            <strong>Institution:</strong> OPQUAST
                        </Text>
                        <Text as='p' variant='body-default-m'>
                            Mastery of best practices framework aimed at
                            improving user experience.
                            <br />
                            Cross-functional approach to all professions related
                            to web project creation.
                        </Text>
                    </>
                ),
            },
            {
                name: `Web and Mobile Developer (Level 5, Professional Title - Associate's degree)`,
                description: (
                    <>
                        <Text as='p' variant='body-default-m' marginBottom='8'>
                            <strong>Period:</strong> August 2020 - January 2021
                            <br />
                            <strong>Institution:</strong> O&apos;Clock School
                        </Text>
                        <Flex gap='8' wrap marginTop='12' marginBottom='12'>
                            <Tag size='s' prefixIcon='code'>
                                Advanced JavaScript
                            </Tag>
                            <Tag size='s' prefixIcon='layers'>
                                OOP
                            </Tag>
                            <Tag size='s' prefixIcon='react'>
                                React
                            </Tag>
                            <Tag size='s' prefixIcon='database'>
                                Redux
                            </Tag>
                        </Flex>
                        <Text as='p' variant='body-default-m' marginTop='12'>
                            <strong>Projects:</strong>
                        </Text>
                        <Flex gap='8' wrap marginTop='8'>
                            <Tag size='s' prefixIcon='utensils'>
                                Recipe Website
                            </Tag>
                            <Tag size='s' prefixIcon='trello'>
                                Kanban Board
                            </Tag>
                            <Tag size='s' prefixIcon='fileText'>
                                Blog
                            </Tag>
                            <Tag size='s' prefixIcon='checkSquare'>
                                Todo List
                            </Tag>
                            <Tag size='s' prefixIcon='messageSquare'>
                                Chat Room
                            </Tag>
                            <Tag size='s' prefixIcon='music'>
                                Spotify Client
                            </Tag>
                        </Flex>
                    </>
                ),
            },
            {
                name: 'BTS - Business Unit Management (Work-study program)',
                description: (
                    <>
                        <Text as='p' variant='body-default-m'>
                            <strong>Period:</strong> 2010 - 2012
                            <br />
                            <strong>Company:</strong> A.S.H
                        </Text>
                    </>
                ),
            },
        ],
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Figma',
                description: (
                    <>
                        Able to prototype in Figma with creativity and modern
                        design approach.
                    </>
                ),
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-jkd/figma-jkd.png',
                        alt: 'Project jkd image',
                        width: 16,
                        height: 9,
                    },
                    {
                        src: '/images/projects/project-add/figma-add.png',
                        alt: 'Project add image',
                        width: 16,
                        height: 9,
                    },
                ],
            },
            {
                title: 'Next.js custom applications',
                description: (
                    <>Building next gen apps with Next.js + Tailwind CSS</>
                ),
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-wine/wine-store-mngt-views.png',
                        alt: 'Project wine image',
                        width: 16,
                        height: 9,
                    },
                ],
            },
            {
                title: 'Next.js web sites',
                description: (
                    <>
                        Building beautiful responsive administrable web sites
                        SEO optimized with Next.js + Strapi CMS
                    </>
                ),
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: '/images/projects/project-ash/ash-website-desktop.png',
                        alt: 'Project ash image',
                        width: 22,
                        height: 10,
                    },
                ],
            },
        ],
    },
};

const blog: BlogContent = {
    label: 'Blog',
    title: 'Writing about design applications, AI, tech stuff and more...',
    description: `Read what ${person.name} has been up to recently`,
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
};

const work: WorkContent = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`,
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
};

const hobbies: HobbiesContent = {
    label: 'Hobbies',
    title: 'My passions',
    description: `Discover ${person.name}'s passions`,
    // Images from https://pexels.com
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-06.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-07.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-08.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-09.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-10.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-11.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-12.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-13.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-14.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-21.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-15.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-16.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-19.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-17.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-22.jpg',
            alt: 'image',
            orientation: 'vertical',
        },
        {
            src: '/images/gallery/img-18.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-20.jpg',
            alt: 'image',
            orientation: 'horizontal',
        },
    ],
};

export { about, blog, hobbies, home, person, social, work };
