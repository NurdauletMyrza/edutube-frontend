import { Components } from '@mui/material/styles/components';

export const customMuiAccordionSummary = {
  styleOverrides: {
    root: {
      padding: '0',
      minHeight: '0',
    },
    content: {
      'margin': '20px 0',
      'fontWeight': '600',
      'fontSize': '18px',
      'lineHeight': '22px',
      '&.Mui-expanded': {
        color: '#fff',
      },
    },
  },
} as Components['MuiAccordionSummary'];
