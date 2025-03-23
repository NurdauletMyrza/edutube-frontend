import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default MainLayout;
