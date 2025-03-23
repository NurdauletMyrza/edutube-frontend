export const customMuiSwitch = {
  defaultProps: {},
  styleOverrides: {
    root: {
      'height': 31,
      'width': 51,
      'padding': 0,
      'display': 'flex',
      '&:active': {
        '& .MuiSwitch-thumb': {
          width: 21,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          transform: 'translateX(20px)',
        },
      },
      '& .MuiSwitch-switchBase': {
        'padding': 2,
        '&.Mui-checked': {
          'transform': 'translateX(20px)',
          'color': '#fff',
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#0387E7',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 27,
        height: 27,
        borderRadius: 15,
      },
      '& .MuiSwitch-track': {
        borderRadius: 15,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
      },
    },
  },
};
