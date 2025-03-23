export const customMuiPagination = {
  styleOverrides: {
    root: {
      '.MuiPagination-ul': {
        gap: '4px',

        li: {
          '.MuiPaginationItem-page': {
            border: '1px solid rgba(0, 0, 0, 0.12)',
          },

          '.Mui-selected': {
            backgroundColor: '#129AFE',
            color: '#fff',
          },

          'button': {
            'margin': 0,
            'height': '36px',
            'minWidth': '36px',
            'fontSize': '14px',
            'borderRadius': '8px',
            'backgroundColor': 'transparent',
            'color': '#182331',
            '&:hover': {
              backgroundColor: '#d7d7d7',
            },
            '&:active': {
              backgroundColor: '#006AB8',
            },
            'fontWeight': 500,
            'svg': {
              margin: 0,
            },
          },

          '&:first-of-type': {
            button: {
              'padding': '8px 12px',
              'margin': 0,
              'backgroundColor': '#F4F4F8',
              'color': '#838383',
              '&::after': {
                content: "'Пред.'",
                marginLeft: '8px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
              },
              '&::disabled': {
                backgroundColor: '#F4F4F8',
                color: '#838383',
              },
            },
          },

          '&:last-of-type': {
            button: {
              'padding': '8px 12px',
              'margin': 0,
              'backgroundColor': '#F4F4F8',
              'color': '#838383',
              '&::before': {
                content: "'След.'",
                marginRight: '8px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 500,
              },
              '&::disabled': {
                backgroundColor: '#F4F4F8',
                color: '#838383',
              },
            },
          },
        },
      },
    },
  },
};
