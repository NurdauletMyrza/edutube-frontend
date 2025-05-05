import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <AppBar position="static" color="success" sx={{ marginTop: "auto" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        {/* Навигационные ссылки */}
        <Box sx={{ display: "flex", gap: 3, marginBottom: 1 }}>
          <Link href="/" color="inherit" underline="none">
            About us
          </Link>
          <Link href="/" color="inherit" underline="none">
            Services
          </Link>
          <Link href="/" color="inherit" underline="none">
            Contacts
          </Link>
        </Box>

        {/* Иконки соцсетей */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="inherit"
            href="https://facebook.com"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://instagram.com"
            target="_blank"
          >
            <Instagram />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com"
            target="_blank"
          >
            <Twitter />
          </IconButton>
        </Box>

        {/* Копирайт */}
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          © {new Date().getFullYear()} My Site. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
