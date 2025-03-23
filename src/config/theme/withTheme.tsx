// import { customMuiAccordion } from '../theme/muiComponents/muiAccordion';
// import { customMuiAccordionSummary } from '@logistic-connect/config/providers/theme/muiComponents/muiAccordionSummary';
// import { customMuiAccordionDetails } from '@logistic-connect/config/providers/theme/muiComponents/muiAccordionDetails';
// import { customMuiButton } from '../theme/muiComponents/muiButton';
// import { customMuiChip } from '../theme/muiComponents/muiChip';
// import { customMuiDialog } from '../theme/muiComponents/muiDialog';
// import { customMuiFormControl } from '../theme/muiComponents/muiFormControl';
// import { customMuiList } from '../theme/muiComponents/muiList';
// import { customMuiPagination } from '../theme/muiComponents/muiPagination';
// import { customMuiSelect } from '../theme/muiComponents/muiSelect';
// import { customMuiTable } from '../theme/muiComponents/muiTable';
// import { customPalette } from '../theme/palette';
// import { typography, variantMapping } from '../theme/typography';
// import { ruRU } from '@mui/material/locale';
// import { createTheme } from '@mui/material/styles';
// import { ThemeOptions } from '@mui/material/styles/createTheme';
// import { customMuiTextField } from '@logistic-connect/config/providers/theme/muiComponents/muiTextField';
// import { customMuiSwitch } from '@logistic-connect/config/providers/theme/muiComponents/muiSwitch';
// import { customMuiTab } from '@logistic-connect/config/providers/theme/muiComponents/muiTab';
// import { customMuiRadio } from '@logistic-connect/config/providers/theme/muiComponents/muiRadio';
// import { Breakpoint, BreakpointsOptions } from '@mui/system/createTheme/createBreakpoints';
// import { customMuiPaper } from '@logistic-connect/config/providers/theme/muiComponents/muiPaper';
// import { customMuiIconButton } from '@logistic-connect/config/providers/theme/muiComponents/muiIconButton';

// import {
//   Breakpoint,
//   BreakpointsOptions,
//   createTheme,
//   ThemeOptions,
// } from "@mui/system";
// import { typography, variantMapping } from "@/config/theme/typography";
// import { customPalette } from "@/config/theme/palette";
// import { customMuiPaper } from "@/config/theme/muiComponents/muiPaper";
//
// type CustomThemeOptions = Omit<ThemeOptions, "breakpoints"> & {
//   breakpoints: Omit<BreakpointsOptions, "values"> & {
//     values: { [key in Breakpoint]: number | string };
//   };
// };
//
// const commonStyles: Partial<CustomThemeOptions> = {
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1500,
//     },
//   },
//   shape: {
//     borderRadius: 6,
//   },
//   palette: customPalette,
// };
//
// export const defaultTheme = createTheme(
//   {
//     typography: {
//       fontFamily: "Inter, sans-serif",
//       ...typography(0),
//     },
//     ...commonStyles,
//     components: {
//       MuiContainer: {
//         defaultProps: {
//           maxWidth: "xl",
//           disableGutters: false,
//         },
//       },
//       MuiTypography: {
//         defaultProps: {
//           variantMapping,
//         },
//       },
//       MuiPaper: customMuiPaper,
//       // MuiList: customMuiList,
//       // MuiSelect: customMuiSelect,
//       // MuiButton: customMuiButton,
//       // MuiFormControl: customMuiFormControl,
//       // MuiTable: customMuiTable.table,
//       // MuiTableRow: customMuiTable.tableRow,
//       // MuiTableHead: customMuiTable.tableHead,
//       // MuiTableCell: customMuiTable.tableCell,
//       // MuiPagination: customMuiPagination,
//       // MuiDialog: customMuiDialog,
//       // MuiChip: customMuiChip,
//       // MuiAccordion: customMuiAccordion,
//       // MuiAccordionSummary: customMuiAccordionSummary,
//       // MuiAccordionDetails: customMuiAccordionDetails,
//       // MuiTextField: customMuiTextField,
//       // MuiSwitch: customMuiSwitch,
//       // MuiTab: customMuiTab,
//       // MuiRadio: customMuiRadio,
//       // MuiPaper: customMuiPaper,
//       // MuiIconButton: customMuiIconButton,
//     },
//   } as ThemeOptions
//   // ruRU
// );

// export const cabinetTheme = {
//   ...defaultTheme,
//   breakpoints: {
//     ...defaultTheme.breakpoints,
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1800,
//     },
//   },
// };

import { createTheme } from "@mui/system";

export const defaultTheme = createTheme({
  palette: {},
  typography: {},
  components: {},
});
