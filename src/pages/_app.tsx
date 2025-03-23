import "@/styles/globals.css";
// import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
// import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import MainLayout from "@/config/layouts/MainLayout/MainLayout";
import { authPagesPath, cabinetPagesPath } from "@/shared/variables/pagePaths";
import CabinetLayout from "@/config/layouts/CabinetLayout/CabinetLayout";
import AuthLayout from "@/config/layouts/AuthLayout/AuthLayout";
import { SnackbarProvider } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import { AuthProvider } from "@/config/providers/AuthProvider/AuthProvider";
import { LoadingProvider } from "@/config/providers/LoadingProvider/LoadingProvider";
// import defaultTheme from "@/config/theme/theme";
// import { ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  let Layout = MainLayout;

  if (pathname.startsWith(cabinetPagesPath)) Layout = CabinetLayout;
  else if (pathname.startsWith(authPagesPath)) Layout = AuthLayout;

  return (
    // <AppCacheProvider>
    // <ThemeProvider theme={{ defaultTheme }}>
    <LoadingProvider>
      <SnackbarProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </SnackbarProvider>
    </LoadingProvider>
    // </ThemeProvider>
    // </AppCacheProvider>
  );
}
