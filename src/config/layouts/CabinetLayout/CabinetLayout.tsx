import Sidebar, { sidebarHiddenStateWidth } from "@/widgets/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface CabinetLayoutProps {
  children: ReactNode;
}

const CabinetLayout: FC<CabinetLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Box component="main" marginLeft={sidebarHiddenStateWidth} marginY={5}>
        <Container
          maxWidth="lg"
          sx={{
            border: "1px solid white",
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
};

export default CabinetLayout;
