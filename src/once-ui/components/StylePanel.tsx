'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Column, Flex, IconButton, Scroller, SegmentedControl, Text } from '.';

import { style as appStyle } from '@/app/resources';
import classNames from 'classnames';
import styles from './StylePanel.module.scss';

interface StylePanelProps extends React.ComponentProps<typeof Flex> {
    style?: React.CSSProperties;
    className?: string;
}

type BorderShape = 'conservative' | 'playful' | 'rounded';
type BrandColor =
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'magenta'
    | 'pink'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'moss'
    | 'green'
    | 'emerald'
    | 'aqua';
type NeutralColor = 'sand' | 'gray' | 'slate';
type SolidType = 'color' | 'contrast' | 'inverse';
type SolidStyleType = 'flat' | 'plastic';
type ThemeType = 'light' | 'dark';
type TransitionType = 'all' | 'micro' | 'macro' | 'none';
type SurfaceType = 'translucent' | 'filled';
type ScalingType = '90' | '95' | '100' | '105' | '110';

const shapes: BorderShape[] = ['conservative', 'playful', 'rounded'];

const colorOptions = {
    brand: [
        'cyan',
        'blue',
        'indigo',
        'violet',
        'magenta',
        'pink',
        'red',
        'orange',
        'yellow',
        'moss',
        'green',
        'emerald',
        'aqua',
    ] as BrandColor[],
    accent: [
        'cyan',
        'blue',
        'indigo',
        'violet',
        'magenta',
        'pink',
        'red',
        'orange',
        'yellow',
        'moss',
        'green',
        'emerald',
        'aqua',
    ] as BrandColor[],
    neutral: ['sand', 'gray', 'slate'] as NeutralColor[],
};

const StylePanel = forwardRef<HTMLDivElement, StylePanelProps>(
    ({ style: customStyle, ...rest }, ref) => {
        const [selectedShape, setSelectedShape] = useState<BorderShape>(
            appStyle.border as BorderShape
        );
        const [brandColor, setBrandColor] = useState<BrandColor>(
            appStyle.brand as BrandColor
        );
        const [accentColor, setAccentColor] = useState<BrandColor>(
            appStyle.accent as BrandColor
        );
        const [neutralColor, setNeutralColor] = useState<NeutralColor>(
            appStyle.neutral as NeutralColor
        );
        const [theme, setTheme] = useState<ThemeType>(
            appStyle.theme as ThemeType
        );
        const [solid, setSolid] = useState<SolidType>(
            appStyle.solid as SolidType
        );
        const [solidStyle, setSolidStyle] = useState<SolidStyleType>(
            appStyle.solidStyle as SolidStyleType
        );
        const [transition, setTransition] = useState<TransitionType>(
            appStyle.transition as TransitionType
        );
        const [scaling, setScaling] = useState<ScalingType>(
            appStyle.scaling as ScalingType
        );
        const [surface, setSurface] = useState<SurfaceType>(
            appStyle.surface as SurfaceType
        );

        useEffect(() => {
            const root = document.documentElement;
            root.setAttribute('data-border', selectedShape);
            root.setAttribute('data-brand', brandColor);
            root.setAttribute('data-accent', accentColor);
            root.setAttribute('data-neutral', neutralColor);
            root.setAttribute('data-solid', solid);
            root.setAttribute('data-solid-style', solidStyle);
            root.setAttribute('data-theme', theme);
            root.setAttribute('data-transition', transition);
            root.setAttribute('data-scaling', scaling);
            root.setAttribute('data-surface', surface);
        }, [
            selectedShape,
            brandColor,
            accentColor,
            neutralColor,
            solid,
            solidStyle,
            theme,
            transition,
            surface,
            scaling,
        ]);

        return (
            <Column fillWidth gap='16' ref={ref} style={customStyle} {...rest}>
                <Column fillWidth paddingTop='12' paddingLeft='16' gap='4'>
                    <Text variant='heading-strong-s'>Page</Text>
                    <Text variant='body-default-s' onBackground='neutral-weak'>
                        Customize global design settings
                    </Text>
                </Column>

                <Column fillWidth border='neutral-alpha-medium' radius='l-4'>
                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Theme</Text>
                        <SegmentedControl
                            maxWidth={22}
                            buttons={[
                                {
                                    size: 'l',
                                    label: 'Light',
                                    value: 'light',
                                    prefixIcon: 'light',
                                },
                                {
                                    size: 'l',
                                    label: 'Dark',
                                    value: 'dark',
                                    prefixIcon: 'dark',
                                },
                            ]}
                            onToggle={(value) => setTheme(value as ThemeType)}
                            selected={theme}
                        />
                    </Flex>
                    <Flex
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                    >
                        <Text variant='label-default-s'>Shape</Text>
                        <Flex gap='4'>
                            {shapes.map((radius, index) => (
                                <Flex
                                    data-border={shapes[index]}
                                    key={radius}
                                    horizontal='center'
                                    vertical='center'
                                    className={classNames(
                                        styles.select,
                                        selectedShape === radius
                                            ? styles.selected
                                            : ''
                                    )}
                                    onClick={() => {
                                        setSelectedShape(radius);
                                    }}
                                >
                                    <IconButton variant='ghost' size='m'>
                                        <div
                                            className={classNames(
                                                styles.neutral,
                                                styles.swatch
                                            )}
                                        ></div>
                                    </IconButton>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Column>

                <Column fillWidth paddingTop='12' paddingLeft='16' gap='4'>
                    <Text variant='heading-strong-s'>Color</Text>
                    <Text variant='body-default-s' onBackground='neutral-weak'>
                        Customize color schemes
                    </Text>
                </Column>
                <Column fillWidth border='neutral-alpha-medium' radius='l-4'>
                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Flex textVariant='label-default-s' minWidth={3}>
                            Brand
                        </Flex>
                        <Scroller minWidth={0} fitWidth>
                            {colorOptions.brand.map((color) => (
                                <Flex
                                    marginRight='2'
                                    key={color}
                                    horizontal='center'
                                    vertical='center'
                                    className={classNames(
                                        styles.select,
                                        brandColor === color
                                            ? styles.selected
                                            : ''
                                    )}
                                    onClick={() => {
                                        setBrandColor(color);
                                    }}
                                >
                                    <IconButton variant='ghost' size='m'>
                                        <div
                                            className={`${styles[color]} ${styles.swatch}`}
                                        ></div>
                                    </IconButton>
                                </Flex>
                            ))}
                        </Scroller>
                    </Flex>

                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Flex textVariant='label-default-s' minWidth={3}>
                            Accent
                        </Flex>
                        <Scroller minWidth={0} fitWidth>
                            {colorOptions.accent.map((color) => (
                                <Flex
                                    marginRight='2'
                                    key={color}
                                    horizontal='center'
                                    vertical='center'
                                    className={classNames(
                                        styles.select,
                                        accentColor === color
                                            ? styles.selected
                                            : ''
                                    )}
                                    onClick={() => {
                                        setAccentColor(color);
                                    }}
                                >
                                    <IconButton variant='ghost' size='m'>
                                        <div
                                            className={`${styles[color]} ${styles.swatch}`}
                                        ></div>
                                    </IconButton>
                                </Flex>
                            ))}
                        </Scroller>
                    </Flex>

                    <Flex
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Flex textVariant='label-default-s' minWidth={3}>
                            Neutral
                        </Flex>
                        <Scroller minWidth={0} fitWidth>
                            {colorOptions.neutral.map((color) => (
                                <Flex
                                    marginRight='2'
                                    key={color}
                                    horizontal='center'
                                    vertical='center'
                                    className={classNames(
                                        styles.select,
                                        neutralColor === color
                                            ? styles.selected
                                            : ''
                                    )}
                                    onClick={() => {
                                        setNeutralColor(color);
                                    }}
                                >
                                    <IconButton variant='ghost' size='m'>
                                        <div
                                            className={`${styles[color]} ${styles.swatch}`}
                                        ></div>
                                    </IconButton>
                                </Flex>
                            ))}
                        </Scroller>
                    </Flex>
                </Column>

                <Column fillWidth paddingTop='12' paddingLeft='16' gap='4'>
                    <Text variant='heading-strong-s'>Solid style</Text>
                    <Text variant='body-default-s' onBackground='neutral-weak'>
                        Customize the appearance of interactive elements
                    </Text>
                </Column>
                <Column fillWidth border='neutral-alpha-medium' radius='l-4'>
                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Style</Text>
                        <SegmentedControl
                            maxWidth={22}
                            minWidth={0}
                            buttons={[
                                {
                                    size: 'l',
                                    label: (
                                        <Flex vertical='center' gap='12'>
                                            <Flex
                                                data-solid='color'
                                                border='brand-strong'
                                                solid='brand-weak'
                                                position='relative'
                                                width='24'
                                                height='24'
                                                radius='s'
                                            ></Flex>
                                            Color
                                        </Flex>
                                    ),
                                    value: 'color',
                                },
                                {
                                    size: 'l',
                                    label: (
                                        <Flex vertical='center' gap='12'>
                                            <Flex
                                                data-solid='inverse'
                                                border='brand-strong'
                                                solid='brand-strong'
                                                position='relative'
                                                width='24'
                                                height='24'
                                                radius='s'
                                            ></Flex>
                                            Inverse
                                        </Flex>
                                    ),
                                    value: 'inverse',
                                },
                                {
                                    size: 'l',
                                    label: (
                                        <Flex vertical='center' gap='12'>
                                            <Flex
                                                data-solid='contrast'
                                                border='brand-strong'
                                                solid='brand-strong'
                                                position='relative'
                                                width='24'
                                                height='24'
                                                radius='s'
                                            ></Flex>
                                            Contrast
                                        </Flex>
                                    ),
                                    value: 'contrast',
                                },
                            ]}
                            onToggle={(value) => setSolid(value as SolidType)}
                            selected={solid}
                        />
                    </Flex>
                    <Flex
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Effect</Text>
                        <SegmentedControl
                            maxWidth={22}
                            minWidth={0}
                            buttons={[
                                {
                                    size: 'l',
                                    label: (
                                        <Flex vertical='center' gap='12'>
                                            <Flex
                                                border='brand-strong'
                                                solid='brand-weak'
                                                position='relative'
                                                width='24'
                                                height='24'
                                                radius='s'
                                            ></Flex>
                                            Flat
                                        </Flex>
                                    ),
                                    value: 'flat',
                                },
                                {
                                    size: 'l',
                                    label: (
                                        <Flex vertical='center' gap='12'>
                                            <Flex
                                                border='brand-strong'
                                                style={{
                                                    boxShadow:
                                                        'inset 0 calc(-1 * var(--static-space-8)) var(--static-space-8) var(--brand-solid-strong)',
                                                }}
                                                solid='brand-weak'
                                                position='relative'
                                                width='24'
                                                height='24'
                                                radius='s'
                                            ></Flex>
                                            Plastic
                                        </Flex>
                                    ),
                                    value: 'plastic',
                                },
                            ]}
                            onToggle={(value) =>
                                setSolidStyle(value as SolidStyleType)
                            }
                            selected={solidStyle}
                        />
                    </Flex>
                </Column>
                <Column fillWidth paddingTop='12' paddingLeft='16' gap='4'>
                    <Text variant='heading-strong-s'>Advanced</Text>
                    <Text variant='body-default-s' onBackground='neutral-weak'>
                        Customize advanced styling options
                    </Text>
                </Column>
                <Column fillWidth border='neutral-alpha-medium' radius='l-4'>
                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Surface</Text>
                        <SegmentedControl
                            maxWidth={22}
                            minWidth={0}
                            onToggle={(value) =>
                                setSurface(value as SurfaceType)
                            }
                            selected={surface}
                            buttons={[
                                {
                                    size: 'l',
                                    label: 'Filled',
                                    value: 'filled',
                                },
                                {
                                    size: 'l',
                                    label: 'Translucent',
                                    value: 'translucent',
                                },
                            ]}
                        />
                    </Flex>
                    <Flex
                        borderBottom='neutral-alpha-medium'
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Scaling</Text>
                        <SegmentedControl
                            maxWidth={22}
                            minWidth={0}
                            onToggle={(value) =>
                                setScaling(value as ScalingType)
                            }
                            selected={scaling}
                            buttons={[
                                {
                                    size: 'l',
                                    label: '90',
                                    value: '90',
                                },
                                {
                                    size: 'l',
                                    label: '95',
                                    value: '95',
                                },
                                {
                                    size: 'l',
                                    label: '100',
                                    value: '100',
                                },
                                {
                                    size: 'l',
                                    label: '105',
                                    value: '105',
                                },
                                {
                                    size: 'l',
                                    label: '110',
                                    value: '110',
                                },
                            ]}
                        />
                    </Flex>
                    <Flex
                        horizontal='space-between'
                        vertical='center'
                        fillWidth
                        paddingX='24'
                        paddingY='16'
                        gap='24'
                    >
                        <Text variant='label-default-s'>Transition</Text>
                        <SegmentedControl
                            maxWidth={22}
                            minWidth={0}
                            onToggle={(value) =>
                                setTransition(value as TransitionType)
                            }
                            selected={transition}
                            buttons={[
                                {
                                    size: 'l',
                                    label: 'All',
                                    value: 'all',
                                },
                                {
                                    size: 'l',
                                    label: 'Micro',
                                    value: 'micro',
                                },
                                {
                                    size: 'l',
                                    label: 'Macro',
                                    value: 'macro',
                                },
                                {
                                    size: 'l',
                                    label: 'None',
                                    value: 'none',
                                },
                            ]}
                        />
                    </Flex>
                </Column>
            </Column>
        );
    }
);

StylePanel.displayName = 'StylePanel';
export { StylePanel };
