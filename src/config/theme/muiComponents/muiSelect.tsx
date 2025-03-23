import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const customMuiSelect = {
  defaultProps: {
    size: 'medium',
    variant: 'standard',
    IconComponent: ExpandMoreIcon,
  },
  styleOverrides: {
    root: {
      'overflow': 'hidden',
      'borderRadius': '8px',
      'padding': '0 12px',
      'color': '#182331',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiInputBase-input': {
        padding: '0',
      },
      '$ .MuiSelect-select': {
        lineHeight: '100%',
      },
      '&:before, &:after': {
        display: 'none',
      },
    },
    icon: {
      height: '24px',
      width: '24px',
    },
  },
  variants: [
    {
      props: { variant: 'standard' },
      style: {
        'color': '#ffffff',
        'backgroundColor': '#0387E7',
        '& .MuiSelect-select': {
          marginRight: '8px',
        },
        '&:hover': {
          backgroundColor: '#129AFE',
        },
        '&:active': {
          backgroundColor: '#006AB8',
        },
      },
    },
    {
      props: { variant: 'filled' },
      style: {
        'backgroundColor': '#f4f4f8',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        'backgroundColor': 'transparent',
        'border': '1px solid rgba(0, 0, 0, 0.08)',
        'boxShadow': '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
        '&:hover': {
          backgroundColor: '#FFFFFF',
        },
        '&:active': {
          backgroundColor: '#E5E5EF',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '2px solid #0075CA',
        },
      },
    },
    {
      props: { size: 'medium' },
      style: {
        'height': '50px',
        'fontSize': '17px',
        'fontWeight': '400',
        'lineHeight': '24',
        'paddingRight': '10px',
        '& .MuiSelect-icon': {
          right: '12px',
        },
      },
    },
    {
      props: { size: 'small' },
      style: {
        'height': '44px',
        'fontSize': '14px',
        'fontWeight': '500',
        'lineHeight': '20',
        'paddingRight': '8px',
        '& .MuiSelect-icon': {
          right: '10px',
        },
      },
    },
  ],
};
