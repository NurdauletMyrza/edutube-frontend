export const customMuiDialog = {
  styleOverrides: {
    root: {
      '.MuiPaper-root': { padding: '24px', borderRadius: '12px' },
      '.MuiDialogTitle-root, .MuiDialogContent-root, .MuiDialogActions-root': {
        padding: 0,
      },
      '.MuiDialogTitle-root': {
        paddingBottom: '16px',
      },
      '.MuiDialogActions-root': {
        paddingTop: '16px',
        gap: '8px',
      },
    },
  },
};
