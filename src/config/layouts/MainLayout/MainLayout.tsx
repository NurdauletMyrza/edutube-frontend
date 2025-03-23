import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default MainLayout;
