import { NextRequest, NextResponse } from "next/server";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
  specialMaxAgeReduceValue,
} from "@/shared/variables/variables";
import {
  authStatusPagePath,
  cabinetPagesPath,
  homePagesPath,
  loginPagePath,
} from "@/shared/variables/pagePaths";
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

  const hasRefreshToken = request.cookies.has(refreshTokenCookieName);
  const redirectResponse = NextResponse.redirect(
    new URL(authStatusPagePath, request.url)
  );
  const nextResponse = NextResponse.next();

  if (hasRefreshToken) {
    const hasAccessToken = request.cookies.has(accessTokenCookieName);

    if (hasAccessToken) {
      return NextResponse.next();
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

          redirectResponse.cookies.set(
            `access:${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
            access,
            { maxAge: 2000 }
          );

          redirectResponse.cookies.set(
            `refresh:${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`,
            refresh,
            { maxAge: 2000 }
          );

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

          return redirectResponse;
        } else {
          nextResponse.cookies.delete(refreshTokenCookieName);
        }
      } catch (error) {
        console.error(`Middleware server error: ${error}`);
      }
    }
  } else {
    nextResponse.cookies.delete(accessTokenCookieName);
  }

  if (request.nextUrl.pathname.startsWith(cabinetPagesPath)) {
    const loginPageRedirectResponse = NextResponse.redirect(
      new URL(loginPagePath, request.url)
    );

    loginPageRedirectResponse.cookies.delete(refreshTokenCookieName);
    loginPageRedirectResponse.cookies.delete(accessTokenCookieName);

    return loginPageRedirectResponse;
  }

  return nextResponse;
}
