import type { NextApiRequest, NextApiResponse } from "next";
import { userDetailsApiUrl } from "@/shared/variables/backendApiUrls";
import { accessTokenCookieName } from "@/shared/utils/variables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    // Получаем access_token из http-only cookies
    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log("Check details.ts url response:", userDetailsApiUrl);

    // Делаем запрос на Django API `/users/authUser/details/`
    const response = await fetch(userDetailsApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch authUser" });
    }

    const user = await response.json();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
