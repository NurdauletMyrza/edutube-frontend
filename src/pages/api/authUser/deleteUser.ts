import type { NextApiRequest, NextApiResponse } from "next";
import { userDeleteApiUrl } from "@/shared/variables/backendApiUrls";
import {
  accessTokenCookieConfig,
  accessTokenCookieName,
  refreshTokenCookieConfig,
  refreshTokenCookieName,
} from "@/shared/utils/variables";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Получаем access_token из http-only cookies
    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { password } = req.body;

    // Делаем запрос на Django API `/users/user/delete-user/`
    const response = await fetch(userDeleteApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      res.setHeader("Set-Cookie", [
        serialize(accessTokenCookieName, "", {
          httpOnly: accessTokenCookieConfig.httpOnly,
          secure: accessTokenCookieConfig.secure,
          maxAge: 0,
          sameSite: accessTokenCookieConfig.sameSite as
            | boolean
            | "strict"
            | "lax"
            | "none"
            | undefined,
          path: accessTokenCookieConfig.path,
        }),
        serialize(refreshTokenCookieName, "", {
          httpOnly: refreshTokenCookieConfig.httpOnly,
          secure: refreshTokenCookieConfig.secure,
          maxAge: 0,
          sameSite: refreshTokenCookieConfig.sameSite as
            | boolean
            | "strict"
            | "lax"
            | "none"
            | undefined,
          path: refreshTokenCookieConfig.path,
        }),
      ]);
    }
    return res.status(response.status).json(await response.json());
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
