export const customMuiChip = {
  styleOverrides: {
    // fontSize: '14px',
    // lineHeight: '18px',
    // colorPrimary: {
    //   backgroundColor: 'rgba(2, 136, 209, 0.16)',
    //   color: '#2564CC',
    // },
    // colorError: {
    //   backgroundColor: '#D32F2F29',
    //   color: '#EE2B2B',
    // },
    // colorSuccess: {
    //   backgroundColor: '#2E7D3229',
    //   color: '#2E7D32',
    // },
    root: {
      'fontSize': '13px',
      'lineHeight': '16px',
      'fontWeight': '500',
      'borderRadius': '40px',
      'padding': '0 8px',
      '& .MuiChip-label': {
        padding: 0,
      },
    },
    colorPrimary: {
      backgroundColor: 'content2.primary',
      color: 'white',
    },
    colorWarning: {
      backgroundColor: 'content2.warning',
      color: 'white',
    },
    colorError: {
      backgroundColor: 'content2.error',
      color: 'white',
    },
    colorSuccess: {
      backgroundColor: 'content2.success',
      color: 'white',
    },
    colorDefault: {
      backgroundColor: 'bg.tertiary',
      color: 'content.primary',
    },
    sizeSmall: {
      height: '28px',
    },
    sizeMedium: {
      height: '36px',
    },
  },
};
