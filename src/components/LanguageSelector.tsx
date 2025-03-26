import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { Flex, ToggleButton } from '@/once-ui/components';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export function LanguageSelector() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };

    const renderToggleButton = (loc: Locale, isSmall: boolean) => (
        <ToggleButton
            key={`${loc}-${isSmall ? 'small' : 'default'}`}
            size={isSmall ? 's' : 'm'}
            variant='ghost'
            selected={loc === locale}
            onClick={() => handleLanguageChange(loc)}
            title={loc === 'fr' ? 'Français' : 'English'}
        >
            <Image
                src={`/icons/flag_${loc}.png`}
                alt={loc === 'fr' ? 'Français' : 'English'}
                width={isSmall ? 20 : 24}
                height={isSmall ? 15 : 18}
            />
        </ToggleButton>
    );

    return (
        <Flex gap='2' vertical='center'>
            {locales.map((loc) => (
                <>
                    <Flex className='s-flex-hide'>
                        {renderToggleButton(loc, false)}
                    </Flex>
                    <Flex className='s-flex-show'>
                        {renderToggleButton(loc, true)}
                    </Flex>
                </>
            ))}
        </Flex>
    );
}
