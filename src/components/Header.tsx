'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from '@/components/Header.module.scss';
import { Fade, Flex, Line, ToggleButton } from '@/once-ui/components';

import { LanguageSelector } from '@/components/LanguageSelector';
import { display, routes } from '@/resources';
import { person } from '@/resources/content';
import { useTranslations } from 'next-intl';

type TimeDisplayProps = {
    timeZone: string;
    locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
    timeZone,
    locale = 'fr-FR',
}) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const timeString = new Intl.DateTimeFormat(locale, options).format(
                now
            );
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [timeZone, locale]);

    return <time suppressHydrationWarning>{currentTime}</time>;
};

export default TimeDisplay;

export const Header = () => {
    const pathname = usePathname() ?? '';
    const t = useTranslations('Navigation');
    const tStatic = useTranslations('StaticContent');

    return (
        <>
            <Fade hide='s' fillWidth position='fixed' height='80' zIndex={9} />
            <Fade
                show='s'
                fillWidth
                position='fixed'
                bottom='0'
                to='top'
                height='80'
                zIndex={9}
            />
            <Flex
                fitHeight
                className={styles.position}
                as='header'
                zIndex={9}
                fillWidth
                padding='8'
                horizontal='center'
            >
                <Flex
                    paddingLeft='12'
                    fillWidth
                    vertical='center'
                    textVariant='body-default-s'
                >
                    {display.location && (
                        <Flex hide='s'>{tStatic('person.location')}</Flex>
                    )}
                </Flex>
                <Flex fillWidth horizontal='center'>
                    <Flex
                        background='surface'
                        border='neutral-medium'
                        radius='m-4'
                        shadow='l'
                        padding='4'
                        horizontal='center'
                    >
                        <Flex
                            gap='4'
                            vertical='center'
                            textVariant='body-default-s'
                        >
                            {routes['/'] && (
                                <ToggleButton
                                    prefixIcon='home'
                                    href='/'
                                    selected={pathname === '/'}
                                />
                            )}
                            <Line vert maxHeight='24' />
                            {routes['/about'] && (
                                <>
                                    <ToggleButton
                                        className='s-flex-hide'
                                        prefixIcon='person'
                                        href='/about'
                                        label={t('about')}
                                        selected={pathname === '/about'}
                                    />
                                    <ToggleButton
                                        className='s-flex-show'
                                        prefixIcon='person'
                                        href='/about'
                                        selected={pathname === '/about'}
                                    />
                                </>
                            )}
                            {routes['/work'] && (
                                <>
                                    <ToggleButton
                                        className='s-flex-hide'
                                        prefixIcon='grid'
                                        href='/work'
                                        label={t('work')}
                                        selected={pathname.startsWith('/work')}
                                    />
                                    <ToggleButton
                                        className='s-flex-show'
                                        prefixIcon='grid'
                                        href='/work'
                                        selected={pathname.startsWith('/work')}
                                    />
                                </>
                            )}
                            {routes['/blog'] && (
                                <>
                                    <ToggleButton
                                        className='s-flex-hide'
                                        prefixIcon='book'
                                        href='/blog'
                                        label={t('blog')}
                                        selected={pathname.startsWith('/blog')}
                                    />
                                    <ToggleButton
                                        className='s-flex-show'
                                        prefixIcon='book'
                                        href='/blog'
                                        selected={pathname.startsWith('/blog')}
                                    />
                                </>
                            )}
                            {routes['/hobbies'] && (
                                <>
                                    <ToggleButton
                                        className='s-flex-hide'
                                        prefixIcon='hobbies'
                                        href='/hobbies'
                                        label={t('hobbies')}
                                        selected={pathname.startsWith(
                                            '/hobbies'
                                        )}
                                    />
                                    <ToggleButton
                                        className='s-flex-show'
                                        prefixIcon='hobbies'
                                        href='/hobbies'
                                        selected={pathname.startsWith(
                                            '/hobbies'
                                        )}
                                    />
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex fillWidth horizontal='end' vertical='center'>
                    <Flex
                        paddingRight='12'
                        horizontal='end'
                        vertical='center'
                        textVariant='body-default-s'
                        gap='20'
                    >
                        <Flex hide='s'>
                            {display.time && (
                                <TimeDisplay timeZone={person.timezone} />
                            )}
                        </Flex>
                        <LanguageSelector />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
