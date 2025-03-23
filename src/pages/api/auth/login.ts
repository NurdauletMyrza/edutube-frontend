import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenApiUrl } from "@/shared/variables/backendApiUrls";
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
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { email, password } = req.body;

  try {
    const response = await fetch(getTokenApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      const {
        access,
        access_token_expires_in: accessTokenExpiresIn,
        // access_token_expires_at: accessTokenExpiresAt,
        refresh,
        refresh_token_expires_in: refreshTokenExpiresIn,
        // refresh_token_expires_at: refreshTokenExpiresAt,
      } = data;
      console.log(access);

      // Сохраняем refresh и access в куки (HTTP-only)
      res.setHeader("Set-Cookie", [
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
      ]);

      return res.status(200).json({ success: "Logged in successfully!" }); // `access_token` отдаем клиенту
    } else {
      return res
        .status(response.status)
        .json({ ...data, message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " + error });
  }
}
