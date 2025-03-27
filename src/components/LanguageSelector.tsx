import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { Flex, ToggleButton } from '@/once-ui/components';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment } from 'react';

export function LanguageSelector() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Common');

    const handleLanguageChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <Flex gap='2' vertical='center'>
            {locales.map((loc) => (
                <Fragment key={loc}>
                    <Flex className='s-flex-hide'>
                        <ToggleButton
                            size='m'
                            variant='ghost'
                            selected={loc === locale}
                            onClick={() => handleLanguageChange(loc)}
                            title={t(`languages.${loc}`)}
                        >
                            <Image
                                src={`/icons/flag_${loc}.png`}
                                alt={t(`languages.${loc}`)}
                                width={24}
                                height={18}
                            />
                        </ToggleButton>
                    </Flex>
                    <Flex className='s-flex-show'>
                        <ToggleButton
                            size='s'
                            variant='ghost'
                            selected={loc === locale}
                            onClick={() => handleLanguageChange(loc)}
                            title={t(`languages.${loc}`)}
                        >
                            <Image
                                src={`/icons/flag_${loc}.png`}
                                alt={t(`languages.${loc}`)}
                                width={20}
                                height={15}
                            />
                        </ToggleButton>
                    </Flex>
                </Fragment>
            ))}
        </Flex>
    );
}
