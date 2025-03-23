import { Components } from '@mui/material/styles/components';

export const customMuiAccordion = {
  styleOverrides: {
    root: {
      'padding': '0 16px',
      'boxShadow': 'none',
      '&:not(:first-of-type)': {
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '0',
      },
      '&.Mui-expanded': {
        borderRadius: '16px',
        backgroundColor: '#0387e7',
      },
      '&.Mui-expanded + *': {
        borderTop: 'none',
      },
      '&:before': {
        display: 'none',
      },
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
        color: '#fff',
      },
      '& .MuiAccordionSummary-expandIconWrapper': {
        color: '#000000DE',
      },
    },
  },
} as Components['MuiAccordion'];
