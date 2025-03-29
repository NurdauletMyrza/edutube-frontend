export const isProduction = process.env.NODE_ENV === "production";

export const accessTokenCookieName = "clientSecret";
export const refreshTokenCookieName = "serverSecret";
export const accessTokenCookieConfig = {
  httpOnly: true,
  secure: isProduction,
  // maxAge: 1, //30 * 60; // если менять то на бэкенде тоже нужно ACCESS_TOKEN_LIFETIME поменять
  sameSite: "strict",
  path: "/",
};
export const refreshTokenCookieConfig = {
  httpOnly: true,
  secure: isProduction,
  // maxAge: 24 * 60 * 60, // если менять то на бэкенде тоже нужно REFRESH_TOKEN_LIFETIME поменять
  sameSite: "strict",
  path: "/",
};

////////////////////////////////

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const authenticatedStatus = "authenticated";
// export const unauthenticatedStatus = "unauthenticated";
// export const loadingAuthStatus = "loading";

export const studentRole = "student";
export const teacherRole = "teacher";
export const adminRole = "admin";
