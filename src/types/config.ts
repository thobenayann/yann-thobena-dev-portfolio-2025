// Types pour la configuration du portfolio

// Types pour les routes
export type Routes = Record<string, boolean>;
export type ProtectedRoutes = Record<string, boolean>;

// Types pour le style
export type ThemeOption = 'dark' | 'light';
export type NeutralOption = 'sand' | 'gray' | 'slate';
export type ColorOption =
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
    | 'aqua'
    | 'cyan';
export type SolidOption = 'color' | 'contrast';
export type SolidStyleOption = 'flat' | 'plastic';
export type BorderOption = 'rounded' | 'playful' | 'conservative';
export type SurfaceOption = 'filled' | 'translucent';
export type TransitionOption = 'all' | 'micro' | 'macro';
export type ScalingOption = '90' | '95' | '100' | '105' | '110';

export interface StyleConfig {
    theme: ThemeOption;
    neutral: NeutralOption;
    brand: ColorOption;
    accent: ColorOption;
    solid: SolidOption;
    solidStyle: SolidStyleOption;
    border: BorderOption;
    surface: SurfaceOption;
    transition: TransitionOption;
    scaling: ScalingOption;
}

// Types pour les effets
export interface MaskEffect {
    cursor: boolean;
    x: number;
    y: number;
    radius: number;
}

export interface GradientEffect {
    display: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
    opacity: number;
}

export interface VisualEffect {
    display: boolean;
    color: string;
    opacity: number;
}

export interface DotsEffect extends VisualEffect {
    size: number;
}

export interface GridEffect extends VisualEffect {
    width?: string;
    height?: string;
}

export type LinesEffect = VisualEffect;

export interface EffectsConfig {
    mask: MaskEffect;
    gradient: GradientEffect;
    dots: DotsEffect;
    lines: LinesEffect;
    grid: GridEffect;
}

// Types pour l'affichage
export interface DisplayConfig {
    location: boolean;
    time: boolean;
}

// Types pour Mailchimp
export interface MailchimpConfig {
    action: string;
    effects: EffectsConfig;
}

// Type pour l'URL de base
export type BaseURL = string;
