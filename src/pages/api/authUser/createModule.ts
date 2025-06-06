import type { NextApiRequest, NextApiResponse } from "next";
import { accessTokenCookieName } from "@/shared/variables/variables";
import { createModuleApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Получаем access_token из http-only cookies
    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await fetch(createModuleApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to create module", ...data });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Could not create module: ${error}` });
  }
}
