'use client';

import {
    Avatar,
    Button,
    Column,
    Flex,
    Heading,
    RevealFx,
    Text,
} from '@/once-ui/components';
import { about, person } from '@/resources/content';
import { useLocalizedContent } from './LocalizedContent';

export function LocalizedHome() {
    const content = useLocalizedContent();

    return (
        <Column maxWidth='s'>
            <RevealFx
                translateY='4'
                fillWidth
                horizontal='start'
                paddingBottom='m'
            >
                <Heading wrap='balance' variant='display-strong-l'>
                    {content.home.headline}
                </Heading>
            </RevealFx>
            <RevealFx
                translateY='8'
                delay={0.2}
                fillWidth
                horizontal='start'
                paddingBottom='m'
            >
                <Text
                    wrap='balance'
                    onBackground='neutral-weak'
                    variant='heading-default-xl'
                >
                    {content.home.subline}
                </Text>
            </RevealFx>
            <RevealFx translateY='12' delay={0.4} horizontal='start'>
                <Button
                    id='about'
                    data-border='rounded'
                    href='/about'
                    variant='secondary'
                    size='m'
                    arrowIcon
                >
                    <Flex gap='8' vertical='center'>
                        {about.avatar.display && (
                            <Avatar
                                style={{
                                    marginLeft: '-0.75rem',
                                    marginRight: '0.25rem',
                                }}
                                src={person.avatar}
                                size='m'
                            />
                        )}
                        {content.about.title}
                    </Flex>
                </Button>
            </RevealFx>
        </Column>
    );
}
