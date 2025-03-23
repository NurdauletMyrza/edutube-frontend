import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    content?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
      primaryInvert?: string;
      secondaryInvert?: string;
    };
    content2?: {
      primary?: string;
      error?: string;
      success?: string;
      warning?: string;
    };
    bg?: {
      primary?: string;
      secondary?: string;
      tertiary?: string;
      quaternary?: string;
    };
    bg2?: {
      accentVariant?: string;
      brand?: string;
      accent?: string;
      accentHover?: string;
      accentActive?: string;
    };
    outline?: {
      tertiary?: string;
      tertiaryInvert?: string;
      primaryInvert?: string;
    };
  }
}

export const customPalette: PaletteOptions = {
  mode: 'light',
  content: {
    primary: '#182331',
    secondary: '#838383',
    tertiary: '#ABABAB',
    primaryInvert: '#FFFFFF',
    secondaryInvert: 'rgba(255, 255, 255, 0.6)',
  },
  content2: {
    primary: '#007EDA',
    error: '#E72114',
    success: '#1CAE57',
    warning: '#EFAB27',
  },
  bg: {
    primary: '#FFFFFF',
    secondary: '#F4F4F8',
    tertiary: '#E5E5EF',
    quaternary: 'rgba(255, 255, 255, 0.1)',
  },
  bg2: {
    accentVariant: '#000000',
    brand: '#1F2269',
    accent: '#0387E7',
    accentHover: '#129AFE',
    accentActive: '#006AB8',
  },
  outline: {
    tertiary: 'rgba(0, 0, 0, 0.08)',
    tertiaryInvert: 'rgba(255, 255, 255, 0.2)',
    primaryInvert: 'rgba(255, 255, 255, 1)',
  },
};
