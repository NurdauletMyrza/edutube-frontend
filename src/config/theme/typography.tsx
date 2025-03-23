import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends Record<CustomVariant, true> {}
}

type CustomVariant =
  | 'heading1'
  | 'heading1Mobile'
  | 'heading2'
  | 'heading2Mobile'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'uppercase'
  | 'text17'
  | 'text14'
  | 'text13'
  | 'action17'
  | 'action14'
  | 'action13'
  | 'caption12'
  | 'appLabelMedium'
  | 'appTextMedium';

export const variantMapping = {
  heading1: 'h1',
  heading1Mobile: 'h1',
  heading2: 'h2',
  heading2Mobile: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  uppercase: 'p',
  text17: 'p',
  text14: 'p',
  text13: 'p',
  action17: 'p',
  action14: 'p',
  action13: 'p',
  caption12: 'p',
  appLabelMedium: 'p',
  appTextMedium: 'p',
};

interface ExtendedTypographyOptions extends TypographyOptions {
  heading1?: TypographyStyleOptions;
  heading1Mobile?: TypographyStyleOptions;
  heading2?: TypographyStyleOptions;
  heading2Mobile?: TypographyStyleOptions;
  heading3?: TypographyStyleOptions;
  heading4?: TypographyStyleOptions;
  heading5?: TypographyStyleOptions;
  uppercase?: TypographyStyleOptions;
  text17?: TypographyStyleOptions;
  text14?: TypographyStyleOptions;
  text13?: TypographyStyleOptions;
  action17?: TypographyStyleOptions;
  action14?: TypographyStyleOptions;
  action13?: TypographyStyleOptions;
  caption12?: TypographyStyleOptions;
  appLabelMedium?: TypographyStyleOptions;
  appTextMedium?: TypographyStyleOptions;
}

export const typography = (increase: number): ExtendedTypographyOptions => ({
  fontSize: 13,
  heading1: {
    fontSize: 72 + increase + 'px',
    fontWeight: 900,
    lineHeight: 72 + increase + 'px',
  },
  heading1Mobile: {
    fontSize: 40 + increase + 'px',
    fontWeight: 800,
    lineHeight: 44 + increase + 'px',
  },
  heading2: {
    fontSize: 32 + increase + 'px',
    fontWeight: 700,
    lineHeight: 36 + increase + 'px',
  },
  heading2Mobile: {
    fontSize: 24 + increase + 'px',
    fontWeight: 700,
    lineHeight: 28 + increase + 'px',
  },
  heading3: {
    fontSize: 20 + increase + 'px',
    fontWeight: 600,
    lineHeight: 24 + increase + 'px',
  },
  heading4: {
    fontSize: 18 + increase + 'px',
    fontWeight: 600,
    lineHeight: 24 + increase + 'px',
  },
  heading5: {
    fontSize: 20 + increase + 'px',
    fontWeight: 500,
    lineHeight: 32 + increase + 'px',
  },
  uppercase: {
    fontSize: 13 + increase + 'px',
    fontWeight: 700,
    lineHeight: 20 + increase + 'px',
  },
  text17: {
    fontSize: 17 + increase + 'px',
    fontWeight: 400,
    lineHeight: 24 + increase + 'px',
  },
  text14: {
    fontSize: 14 + increase + 'px',
    fontWeight: 400,
    lineHeight: 20 + increase + 'px',
  },
  text13: {
    fontSize: 13 + increase + 'px',
    fontWeight: 400,
    lineHeight: 16 + increase + 'px',
  },
  action17: {
    fontSize: 17 + increase + 'px',
    fontWeight: 600,
    lineHeight: 24 + increase + 'px',
  },
  action14: {
    fontSize: 14 + increase + 'px',
    fontWeight: 500,
    lineHeight: 20 + increase + 'px',
  },
  action13: {
    fontSize: 13 + increase + 'px',
    fontWeight: 500,
    lineHeight: 16 + increase + 'px',
  },
  caption12: {
    fontSize: 11 + increase + 'px',
    fontWeight: 500,
    lineHeight: 12 + increase + 'px',
  },
  appLabelMedium: {
    fontSize: 15 + increase + 'px',
    fontWeight: 500,
    lineHeight: 20 + increase + 'px',
  },
  appTextMedium: {
    fontSize: 15 + increase + 'px',
    fontWeight: 400,
    lineHeight: 20 + increase + 'px',
  },
});
