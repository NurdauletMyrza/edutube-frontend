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
  console.log(user);

  return (
    <AppBar position="sticky" color="primary">
      {isLoading && <CircularProgress size={24} color="inherit" />}
      <Toolbar>
        {/* Логотип */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Мой Сайт
          </Link>
        </Typography>

        {/* Навигация */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            О нас
          </Button>
          <Button color="inherit" component={Link} href="/">
            Услуги
          </Button>
          <Button color="inherit" component={Link} href="/">
            Контакты
          </Button>
        </Box>

        {/* Кнопки входа и регистрации */}
        <Box sx={{ marginLeft: 2 }}>
          {user ? (
            <>
              <Button color="inherit" onClick={logoutUser}>
                Выход
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
              <Button color="inherit" component={Link} href={loginPagePath}>
                Вход
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href={registerPagePath}
              >
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
