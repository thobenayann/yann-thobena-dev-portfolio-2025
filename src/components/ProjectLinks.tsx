import { Button, Flex } from '@/once-ui/components';

type ProjectLink = {
    label: string;
    url: string;
    icon: string;
};

type ProjectLinksProps = {
    links?: ProjectLink[];
};

export function ProjectLinks({ links }: ProjectLinksProps) {
    if (!links || links.length === 0) {
        return null;
    }

    return (
        <Flex gap='12' wrap marginTop='24' marginBottom='24'>
            {links.map((link, index) => {
                const isPrivate = link.url === '#' || link.icon === 'lock';

                return (
                    <Button
                        key={`${link.label}-${index}`}
                        href={isPrivate ? undefined : link.url}
                        target={isPrivate ? undefined : '_blank'}
                        rel={isPrivate ? undefined : 'noopener noreferrer'}
                        variant='secondary'
                        size='m'
                        prefixIcon={isPrivate ? 'lock' : link.icon}
                        disabled={isPrivate}
                    >
                        {link.label}
                    </Button>
                );
            })}
        </Flex>
    );
}
