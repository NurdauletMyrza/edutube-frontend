export const customMuiList = {
  styleOverrides: {
    root: {
      'padding': '0',
      'minWidth': '160px',
      'borderRadius': '16px',
      'maxHeight': '400px',
      'border': '1px solid #00000014',
      'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px',
      'overflowY': 'auto',
      'boxSizing': 'content-box',
      '& .MuiMenuItem-root': {
        'height': '40px',
        'padding': '0 12px',
        'fontSize': '14px',
        'borderBottom': '1px solid #00000014',
        'fontWeight': '500',
        '&:first-of-type': {
          borderTop: 'none',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
        '&:last-of-type': {
          borderBottom: 'none',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        },
      },
    },
  },
};
