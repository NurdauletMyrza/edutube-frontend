declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  }
}
export const customMuiIconButton = {
  defaultProps: {
    size: 'medium',
  },
  variants: [
    {
      props: { size: 'large', variant: 'primary' },
      style: {
        'width': '50px',
        'height': '50px',
        'padding': '13px',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'primary' },
      style: {
        'width': '44px',
        'height': '44px',
        'padding': '10px',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
      },
    },
    {
      props: { size: 'small', variant: 'primary' },
      style: {
        'width': '36px',
        'height': '36px',
        'padding': '6px',
        'color': '#FFFFFF',
        'backgroundColor': '#0387E7',
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
      },
    },
    {
      props: { size: 'large', variant: 'secondary' },
      style: {
        'width': '50px',
        'height': '50px',
        'padding': '13px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
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
        'width': '44px',
        'height': '44px',
        'padding': '10px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
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
        'width': '36px',
        'height': '36px',
        'padding': '6px',
        'color': '#182331',
        'backgroundColor': '#F4F4F8',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'large', variant: 'outlined' },
      style: {
        'width': '50px',
        'height': '50px',
        'padding': '13px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'medium', variant: 'outlined' },
      style: {
        'width': '44px',
        'height': '44px',
        'padding': '10px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'small', variant: 'outlined' },
      style: {
        'width': '36px',
        'height': '36px',
        'padding': '6px',
        'color': '#182331',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        '&:hover': {
          backgroundColor: '#F4F4F8',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { size: 'large', variant: 'ghost' },
      style: {
        'width': '50px',
        'height': '50px',
        'padding': '13px',
        'color': '#182331',
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
        'width': '44px',
        'height': '44px',
        'padding': '10px',
        'color': '#182331',
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
        'width': '36px',
        'height': '36px',
        'padding': '6px',
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
