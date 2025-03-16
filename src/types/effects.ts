import {
    DotsEffect,
    GradientEffect,
    GridEffect,
    LinesEffect,
    MaskEffect,
} from './config';

// Types pour les niveaux d'opacité
export type OpacityLevel = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

// Types pour les tailles d'effets visuels
export type VisualSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type VisualSizeString =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10';

// Types étendus pour les effets visuels
export type TypedMaskEffect = MaskEffect; // type alias

export interface TypedGradientEffect extends Omit<GradientEffect, 'opacity'> {
    opacity: OpacityLevel;
}

export interface TypedDotsEffect extends Omit<DotsEffect, 'size' | 'opacity'> {
    size: VisualSize | VisualSizeString;
    opacity: OpacityLevel;
}

export interface TypedGridEffect
    extends Omit<GridEffect, 'width' | 'height' | 'opacity'> {
    width: VisualSize | VisualSizeString | string;
    height: VisualSize | VisualSizeString | string;
    opacity: OpacityLevel;
}

export interface TypedLinesEffect extends Omit<LinesEffect, 'opacity'> {
    opacity: OpacityLevel;
}

// Type pour les propriétés du composant Background
export interface BackgroundEffectsProps {
    mask: TypedMaskEffect;
    gradient: TypedGradientEffect;
    dots: TypedDotsEffect;
    grid: TypedGridEffect;
    lines: TypedLinesEffect;
}
