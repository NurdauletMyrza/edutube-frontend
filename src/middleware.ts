import { NextRequest, NextResponse } from "next/server";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
  specialMaxAgeReduceValue,
} from "@/shared/utils/variables";
import {
  cabinetPagesPath,
  // homePagePath,
  homePagesPath,
  loginPagePath,
  // mainPagePath,
} from "@/shared/variables/pagePaths";
// import {
//   authServerApiBaseUrl,
//   userServerApiBaseUrl,
// } from "@/shared/variables/serverApiUrls";
import { refreshTokensApiUrl } from "@/shared/variables/backendApiUrls";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return;
  }

  const matchers = [
    // authServerApiBaseUrl,
    // userServerApiBaseUrl,
    cabinetPagesPath,
    loginPagePath,
    homePagesPath,
  ];
  if (
    matchers.every((matcher) => !request.nextUrl.pathname.startsWith(matcher))
  ) {
    return NextResponse.next();
  }

  console.log("Middleware is running! URL:", request.nextUrl.pathname);

  const hasRefreshToken = request.cookies.has(refreshTokenCookieName);
  const redirectResponse = NextResponse.redirect(
    new URL(request.nextUrl.pathname, request.url)
  );

  if (hasRefreshToken) {
    const hasAccessToken = request.cookies.has(accessTokenCookieName);

    if (hasAccessToken) {
      console.log("Access, refresh tokens exist:", request.nextUrl.pathname);
      return NextResponse.next();
    } else {
      try {
        const refreshToken = request.cookies.get(refreshTokenCookieName)?.value;

        console.log(refreshTokensApiUrl, "=>", request.nextUrl.pathname);
        const refreshTokensResponse = await fetch(refreshTokensApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        console.log("Refresh response status:", refreshTokensResponse.ok);

        if (refreshTokensResponse.ok) {
          const {
            access,
            access_token_expires_in: accessTokenExpiresIn,
            // access_token_expires_at: accessTokenExpiresAt,
            refresh,
            refresh_token_expires_in: refreshTokenExpiresIn,
            // refresh_token_expires_at: refreshTokenExpiresAt,
          } = await refreshTokensResponse.json();

          console.log(accessTokenCookieName, access);
          console.log(refreshTokenCookieName, refresh);

          console.log(accessTokenCookieConfig.secure);

          console.log(1);
          redirectResponse.cookies.set(
            `access:${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
            access,
            { maxAge: 2000 }
          );
          console.log(2);
          redirectResponse.cookies.set(
            `refresh:${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
            refresh,
            { maxAge: 2000 }
          );
          console.log(3);

          redirectResponse.cookies.set(accessTokenCookieName, access, {
            httpOnly: accessTokenCookieConfig.httpOnly,
            secure: accessTokenCookieConfig.secure,
            maxAge: accessTokenExpiresIn - specialMaxAgeReduceValue,
            sameSite: accessTokenCookieConfig.sameSite as
              | boolean
              | "strict"
              | "lax"
              | "none"
              | undefined,
            path: accessTokenCookieConfig.path,
            // expires: accessTokenExpiresAt,
          });
          console.log(4);
          redirectResponse.cookies.set(refreshTokenCookieName, refresh, {
            httpOnly: refreshTokenCookieConfig.httpOnly,
            secure: refreshTokenCookieConfig.secure,
            maxAge: refreshTokenExpiresIn - specialMaxAgeReduceValue,
            sameSite: refreshTokenCookieConfig.sameSite as
              | boolean
              | "strict"
              | "lax"
              | "none"
              | undefined,
            path: refreshTokenCookieConfig.path,
            // expires: refreshTokenExpiresAt,
          });
          console.log(5);

          return redirectResponse;
        } else {
          const test = await refreshTokensResponse.json();
          console.log(test.error ?? test.message ?? test.detail ?? "?");
          console.log(test.message ?? test.detail ?? "?");
          console.log(test.detail ?? "?");
          console.log("refresh token:", refreshToken);

          // redirectResponse.cookies.set(refreshTokenCookieName, "", {
          //   maxAge: -1,
          // });
          redirectResponse.cookies.delete(refreshTokenCookieName);
          return redirectResponse;
        }
      } catch (error) {
        console.error(`Middleware server error: ${error}`);
      }
    }
  } else {
    // redirectResponse.cookies.set(accessTokenCookieName, "", { maxAge: -1 });
    redirectResponse.cookies.delete(accessTokenCookieName);
    return redirectResponse;
  }

  if (request.nextUrl.pathname.startsWith(cabinetPagesPath)) {
    console.log("Clear cookie:", request.nextUrl.pathname);
    const loginPageRedirectResponse = NextResponse.redirect(
      new URL(loginPagePath, request.url)
    );
    // loginPageRedirectResponse.cookies.set(refreshTokenCookieName, "", {
    //   maxAge: -1,
    // });
    loginPageRedirectResponse.cookies.delete(refreshTokenCookieName);
    // loginPageRedirectResponse.cookies.set(accessTokenCookieName, "", {
    //   maxAge: -1,
    // });
    loginPageRedirectResponse.cookies.delete(accessTokenCookieName);

    return loginPageRedirectResponse;
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     `${authServerApiBaseUrl}/:path*`,
//     `${userServerApiBaseUrl}/:path*`,
//     `${cabinetPagesPath}/:path*`,
//     `${authPagesPath}/:path*`,
//     `${homePagesPath}/:path*`,
//   ], // Применяем middleware для `/cabinet/*`, `/auth/*`
// };
