import type { NextApiRequest, NextApiResponse } from "next";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
} from "@/shared/utils/variables";
import { serialize } from "cookie";
import { logoutUserApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Получаем access_token и refresh_token из http-only cookies
    const accessToken = req.cookies[accessTokenCookieName];
    const refreshToken = req.cookies[refreshTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const response = await fetch(logoutUserApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      res.setHeader("Set-Cookie", [
        serialize(accessTokenCookieName, "", {
          httpOnly: accessTokenCookieConfig.httpOnly,
          secure: accessTokenCookieConfig.secure,
          maxAge: 0,
          sameSite: accessTokenCookieConfig.sameSite,
          path: accessTokenCookieConfig.path,
        }),
        serialize(refreshTokenCookieName, "", {
          httpOnly: refreshTokenCookieConfig.httpOnly,
          secure: refreshTokenCookieConfig.secure,
          maxAge: 0,
          sameSite: refreshTokenCookieConfig.sameSite,
          path: refreshTokenCookieConfig.path,
        }),
      ]);
      return res.status(response.status).json({ success: "User logout" });
    } else {
      return res.status(response.status).json(await response.json());
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
