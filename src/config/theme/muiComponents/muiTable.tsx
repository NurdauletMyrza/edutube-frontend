import { tableCellClasses } from '@mui/material';

export const customMuiTable = {
  table: {
    styleOverrides: {
      root: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
        borderCollapse: 'inherit',
      },
    },
  },
  tableRow: {
    styleOverrides: {
      root: {
        '&:last-of-type td': {
          border: 0,
        },
      },
    },
  },
  tableHead: {
    styleOverrides: {
      root: {
        backgroundColor: '#EBEBEB',
      },
    },
  },
  tableCell: {
    styleOverrides: {
      root: {
        [`&.${tableCellClasses.head}`]: {
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.60)',
          padding: '10px 16px',
          whiteSpace: 'nowrap',
        },
        padding: '16px',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        color: '#212121',
      },
    },
  },
};
