import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/config/providers/AuthProvider/AuthProvider";
import {
  cabinetProfilePagePath,
  loginPagePath,
  // registerPagePath,
} from "@/shared/variables/pagePaths";

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      {/*{isLoading && <CircularProgress size={24} color="inherit" />}*/}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Логотип */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          <Link
            href="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            EduTube
          </Link>
        </Typography>

        {/* Навигация */}
        <Box sx={{ display: "flex", gap: 8 }}>
          <Button
            color="inherit"
            component={Link}
            href="/home/courses"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Courses
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/home/students"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            For students
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/home/teachers"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            For teachers
          </Button>
        </Box>

        {/* Кнопки входа и регистрации */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {user ? (
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={logoutUser}
                sx={{
                  textTransform: "lowercase",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 2,
                  border: "none",
                }}
              >
                Log out
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href={cabinetProfilePagePath}
                sx={{ borderRadius: 2, textTransform: "capitalize" }}
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
                sx={{
                  textTransform: "lowercase",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 2,
                  border: "none",
                }}
              >
                Log in
              </Button>
              {/*<Button*/}
              {/*  variant="contained"*/}
              {/*  color="secondary"*/}
              {/*  component={Link}*/}
              {/*  href={registerPagePath}*/}
              {/*  sx={{ textTransform: "lowercase" }}*/}
              {/*>*/}
              {/*  Registration*/}
              {/*</Button>*/}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
