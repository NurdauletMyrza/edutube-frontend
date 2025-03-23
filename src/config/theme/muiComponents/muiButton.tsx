declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    outline: true;
    ghost: true;
  }
}

export const customMuiButton = {
  defaultProps: {
    size: 'medium',
  },
  variants: [
    {
      props: { size: 'large', variant: 'primary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '17px',
        'fontWeight': '600',
        'lineHeight': '24px',
        'padding': '13px 16px',
        'borderRadius': '8px',
        'height': '50px',
        'gap': '6px',
        'textDecoration': 'none',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
        '&:disabled': {
          backgroundColor: 'rgba(3, 135, 231, 0.4)',
          color: '#FFFFFF',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'primary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'padding': '10px 12px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'gap': '4px',
        'height': '44px',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
        '&:disabled': {
          backgroundColor: 'rgba(3, 135, 231, 0.4)',
          color: '#FFFFFF',
        },
      },
    },
    {
      props: { size: 'small', variant: 'primary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'textDecoration': 'none',
        'padding': '6px 8px',
        'borderRadius': '8px',
        'gap': '4px',
        'height': '36px',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
        '&:disabled': {
          backgroundColor: 'rgba(3, 135, 231, 0.4)',
          color: '#FFFFFF',
        },
      },
    },
    {
      props: { size: 'large', variant: 'outline' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '17px',
        'fontWeight': '600',
        'lineHeight': '24px',
        'padding': '13px 16px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'height': '50px',
        'gap': '6px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'outline' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'padding': '10px 12px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'height': '44px',
        'gap': '4px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'small', variant: 'outline' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'padding': '6px 8px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'height': '36px',
        'gap': '4px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'large', variant: 'secondary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '17px',
        'fontWeight': '600',
        'lineHeight': '24px',
        'padding': '13px 16px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'gap': '6px',
        'height': '50px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'secondary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'textDecoration': 'none',
        'padding': '10px 12px',
        'borderRadius': '8px',
        'gap': '4px',
        'height': '44px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'small', variant: 'secondary' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'padding': '6px 8px',
        'borderRadius': '8px',
        'textDecoration': 'none',
        'gap': '4px',
        'height': '36px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'large', variant: 'ghost' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '17px',
        'fontWeight': '600',
        'lineHeight': '24px',
        'textDecoration': 'none',
        'padding': '13px 16px',
        'borderRadius': '8px',
        'gap': '6px',
        'height': '50px',
        'color': '#182331',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'ghost' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'textDecoration': 'none',
        'lineHeight': '20px',
        'padding': '10px 12px',
        'borderRadius': '8px',
        'gap': '4px',
        'height': '44px',
        'color': '#182331',
        'textTransform': 'none',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'small', variant: 'ghost' },
      style: {
        'display': 'flex',
        'alignItems': 'center',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20px',
        'padding': '6px 8px',
        'textDecoration': 'none',
        'borderRadius': '8px',
        'gap': '4px',
        'height': '36px',
        'textTransform': 'none',
        'color': '#182331',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
  ],
};
