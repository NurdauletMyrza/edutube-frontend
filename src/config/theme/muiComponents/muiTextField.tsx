import '@mui/material/TextField';

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

export const customMuiTextField = {
  defaultProps: {
    size: 'medium',
  },
  styleOverrides: {
    root: {
      'fieldset': {
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
      },
      '& .MuiInputAdornment-root': {
        width: '24px',
        height: '24px',
        margin: '0 12px 0 -4px',
      },

      '& .MuiInputBase-root': {
        'padding': '0',
        'backgroundColor': '#fff',
        'height': '100%',
        '&:hover': {
          backgroundColor: '#f4f4f8',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid #0075ca',
        },
        '& .MuiInputBase-input': {
          'padding': '0 12px',
          'color': '#182331',
          'fontWeight': '400',
          '&::placeholder': {
            color: '#000000',
          },
        },
      },
    },
  },
  variants: [
    {
      props: { size: 'large' },
      style: {
        '& .MuiInputBase-root': {
          '& .MuiInputBase-input': {
            fontSize: '17px',
            lineHeight: '24px',
            height: '50px',
          },
        },
      },
    },
    {
      props: { size: 'medium' },
      style: {
        '& .MuiInputBase-root': {
          '& .MuiInputBase-input': {
            fontSize: '14px',
            lineHeight: '20px',
            height: '44px',
          },
        },
      },
    },
  ],
};
