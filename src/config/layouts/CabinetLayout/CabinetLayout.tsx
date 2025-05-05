import { sidebarHiddenStateWidth } from "@/widgets/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";
import Header from "@/widgets/Header/Header";

interface CabinetLayoutProps {
  children: ReactNode;
}

const CabinetLayout: FC<CabinetLayoutProps> = ({ children }) => {
  return (
    <>
      {/*<Sidebar />*/}
      <Header />
      <Box component="main" marginLeft={sidebarHiddenStateWidth} marginY={10}>
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
