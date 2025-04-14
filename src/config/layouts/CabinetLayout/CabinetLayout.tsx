import Sidebar from "@/widgets/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface CabinetLayoutProps {
  children: ReactNode;
}

const CabinetLayout: FC<CabinetLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default CabinetLayout;
