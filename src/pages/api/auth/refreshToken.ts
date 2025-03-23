// import type { NextApiRequest, NextApiResponse } from "next";
// import { refreshTokenApiUrl } from "@/shared/variables/backendApiUrls";
// import { serialize } from "cookie";
// import {
//   accessTokenCookieConfig,
//   accessTokenCookieName,
//   refreshTokenCookieConfig,
//   refreshTokenCookieName,
// } from "@/shared/utils/variables";
//
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
//
//   try {
//     // Получаем refresh_token из HTTP-only cookies
//     const refreshToken = req.cookies[refreshTokenCookieName];
//
//     if (!refreshToken) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//
//     // Отправляем refresh_token на Django API `/auth/token/refresh/`
//     const response = await fetch(refreshTokenApiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh: refreshToken }),
//     });
//
//     if (!response.ok) {
//       return res
//         .status(response.status)
//         .json({ message: "Failed to refresh token" });
//     }
//
//     const {
//       access,
//       access_token_expires_in: accessTokenExpiresIn,
//       // access_token_expires_at: accessTokenExpiresAt,
//       refresh,
//       refresh_token_expires_in: refreshTokenExpiresIn,
//       // refresh_token_expires_at: refreshTokenExpiresAt,
//     } = await response.json();
//
//     res.setHeader("Set-Cookie", [
//       serialize(accessTokenCookieName, access, {
//         httpOnly: accessTokenCookieConfig.httpOnly,
//         secure: accessTokenCookieConfig.secure,
//         maxAge: accessTokenExpiresIn,
//         sameSite: accessTokenCookieConfig.sameSite,
//         path: accessTokenCookieConfig.path,
//         // expires: accessTokenExpiresAt,
//       }),
//       serialize(refreshTokenCookieName, refresh, {
//         httpOnly: refreshTokenCookieConfig.httpOnly,
//         secure: refreshTokenCookieConfig.secure,
//         maxAge: refreshTokenExpiresIn,
//         sameSite: refreshTokenCookieConfig.sameSite,
//         path: refreshTokenCookieConfig.path,
//         // expires: refreshTokenExpiresAt,
//       }),
//     ]);
//
//     return res.status(200).json({ success: "Token refreshed successfully!" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
