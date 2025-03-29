import { NextRequest, NextResponse } from "next/server";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
} from "@/shared/utils/variables";
import {
  authPagesPath,
  cabinetPagesPath,
  homePagePath,
  homePagesPath,
  loginPagePath,
  mainPagePath,
} from "@/shared/variables/pagePaths";
import {
  authServerApiBaseUrl,
  userServerApiBaseUrl,
} from "@/shared/variables/serverApiUrls";
import { refreshTokensApiUrl } from "@/shared/variables/backendApiUrls";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return;
  } else if (request.nextUrl.pathname === mainPagePath) {
    return Response.redirect(new URL(homePagePath, request.url));
  }

  const matchers = [
    authServerApiBaseUrl,
    userServerApiBaseUrl,
    cabinetPagesPath,
    authPagesPath,
    homePagesPath,
  ];
  if (
    matchers.every((matcher) => !request.nextUrl.pathname.startsWith(matcher))
  ) {
    return;
  }

  const hasRefreshToken = request.cookies.has(refreshTokenCookieName);

  const response = NextResponse.next();

  if (hasRefreshToken) {
    const hasAccessToken = request.cookies.has(accessTokenCookieName);

    if (hasAccessToken) {
      return response;
    } else {
      try {
        const refreshToken = request.cookies.get(refreshTokenCookieName)?.value;

        const refreshTokensResponse = await fetch(refreshTokensApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshTokensResponse.ok) {
          const {
            access,
            access_token_expires_in: accessTokenExpiresIn,
            // access_token_expires_at: accessTokenExpiresAt,
            refresh,
            refresh_token_expires_in: refreshTokenExpiresIn,
            // refresh_token_expires_at: refreshTokenExpiresAt,
          } = await refreshTokensResponse.json();

          response.cookies.set(accessTokenCookieName, access, {
            httpOnly: accessTokenCookieConfig.httpOnly,
            secure: accessTokenCookieConfig.secure,
            maxAge: accessTokenExpiresIn,
            sameSite: accessTokenCookieConfig.sameSite as
              | boolean
              | "strict"
              | "lax"
              | "none"
              | undefined,
            path: accessTokenCookieConfig.path,
            // expires: accessTokenExpiresAt,
          });
          response.cookies.set(refreshTokenCookieName, refresh, {
            httpOnly: refreshTokenCookieConfig.httpOnly,
            secure: refreshTokenCookieConfig.secure,
            maxAge: refreshTokenExpiresIn,
            sameSite: refreshTokenCookieConfig.sameSite as
              | boolean
              | "strict"
              | "lax"
              | "none"
              | undefined,
            path: refreshTokenCookieConfig.path,
            // expires: refreshTokenExpiresAt,
          });

          return response;
        } else {
          response.cookies.delete(refreshTokenCookieName);
        }
      } catch (error) {
        console.error(`Middleware server error: ${error}`);
      }
    }
  } else {
    response.cookies.delete(accessTokenCookieName);
  }

  if (request.nextUrl.pathname.startsWith(cabinetPagesPath)) {
    const redirectResponse = NextResponse.redirect(
      new URL(loginPagePath, request.url)
    );
    redirectResponse.cookies.set(refreshTokenCookieName, "", { maxAge: -1 });
    redirectResponse.cookies.set(accessTokenCookieName, "", { maxAge: -1 });

    return redirectResponse;
  }

  return response;
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
