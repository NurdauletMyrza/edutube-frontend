import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFileApiUrl } from "@/shared/variables/backendApiUrls";
import { accessTokenCookieName } from "@/shared/utils/variables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Получаем access_token из http-only cookies
    const accessToken = req.cookies[accessTokenCookieName];
    console.log(accessToken);

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Делаем запрос на Django API `/users/authUser/details/`
    const response = await fetch(uploadFileApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
        body: req.body,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to upload file" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
