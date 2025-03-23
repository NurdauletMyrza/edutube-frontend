import { Box, Paper, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { loginPagePath, registerPagePath } from "@/shared/variables/pagePaths";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { pathname, push } = useRouter();
  const isRegisterOrLoginPage =
    pathname.endsWith(loginPagePath) || pathname.endsWith(registerPagePath);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/tileableBackground.jpg)",
        backgroundSize: "777px",
      }}
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: isRegisterOrLoginPage ? 0 : 2,
          borderRadius: 5,
          width: 500,
        }}
      >
        {isRegisterOrLoginPage && (
          <Tabs
            value={pathname}
            onChange={(event, value) => {
              push(value);
            }}
            variant="fullWidth"
          >
            <Tab label="Sign in" value={loginPagePath} />
            <Tab label="Register" value={registerPagePath} />
          </Tabs>
        )}
        {children}
      </Paper>
    </Box>
  );
};

export default AuthLayout;
