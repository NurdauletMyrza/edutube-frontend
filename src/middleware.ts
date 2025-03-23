import { NextRequest, NextResponse } from "next/server";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
} from "@/shared/utils/variables";
import { cabinetPagesPath, loginPagePath } from "@/shared/variables/pagePaths";
import { aboutMeServerApiUrl } from "@/shared/variables/serverApiUrls";
import { serialize } from "cookie";
import { refreshTokenApiUrl } from "@/shared/variables/backendApiUrls";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return;
  }

  // Skip unrelated pages
  const matchers = [cabinetPagesPath, aboutMeServerApiUrl];
  if (
    matchers.every((matcher) => !request.nextUrl.pathname.startsWith(matcher))
  )
    return;

  const accessToken = request.cookies.get(accessTokenCookieName)?.value;
  const refreshToken = request.cookies.get(refreshTokenCookieName)?.value;

  const isInCabinetUrl = request.nextUrl.pathname.startsWith(cabinetPagesPath);

  if (!accessToken && !refreshToken && isInCabinetUrl) {
    return NextResponse.redirect(new URL(loginPagePath, request.url));
  }

  // Проверяем, истек ли accessToken (добавь свою логику проверки)
  const isAccessTokenExpired = !accessToken; // Здесь можно декодировать токен и проверить exp

  if (isAccessTokenExpired && refreshToken) {
    try {
      const refreshResponse = await fetch(refreshTokenApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const {
          access,
          access_token_expires_in: accessTokenExpiresIn,
          // access_token_expires_at: accessTokenExpiresAt,
          refresh,
          refresh_token_expires_in: refreshTokenExpiresIn,
          // refresh_token_expires_at: refreshTokenExpiresAt,
        } = await refreshResponse.json();

        console.log(accessTokenExpiresIn);

        const response = NextResponse.next();

        // need to update code

        const cookies = [
          serialize(accessTokenCookieName, access, {
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
          }),
          serialize(refreshTokenCookieName, refresh, {
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
          }),
        ];
        console.log(cookies);

        response.headers.set("Set-Cookie", "");

        return response;
      } else if (isInCabinetUrl) {
        return NextResponse.redirect(new URL(loginPagePath, request.url));
      }
    } catch (error) {
      console.error("Ошибка обновления токена middleware:", error);

      if (isInCabinetUrl)
        return NextResponse.redirect(new URL(loginPagePath, request.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [`/api/:path*`], // Применяем middleware для `/cabinet/*`, `/auth/*`
// };
