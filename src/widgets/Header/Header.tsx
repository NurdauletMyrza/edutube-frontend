import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import {
  cabinetProfilePagePath,
  loginPagePath,
  registerPagePath,
} from "@/shared/variables/pagePaths";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const { isLoading } = useLoading();

  return (
    <AppBar component="nav" color="primary">
      {isLoading && <CircularProgress size={24} color="inherit" />}
      <Toolbar>
        {/* Логотип */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            href="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            EduTube
          </Link>
        </Typography>

        {/* Навигация */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            About us
          </Button>
          <Button color="inherit" component={Link} href="/">
            Services
          </Button>
          <Button color="inherit" component={Link} href="/">
            Contact us
          </Button>
        </Box>

        {/* Кнопки входа и регистрации */}
        <Box sx={{ marginLeft: 2 }}>
          {user ? (
            <>
              <Button variant="outlined" color="inherit" onClick={logoutUser}>
                Log out
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href={cabinetProfilePagePath}
              >
                {user.first_name} {user.last_name}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                href={loginPagePath}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href={registerPagePath}
              >
                Registration
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
