import Sidebar from "@/widgets/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";

const CabinetLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4">Private cabinet</Typography>
        {children}
      </Box>
    </>
  );
};

export default CabinetLayout;
