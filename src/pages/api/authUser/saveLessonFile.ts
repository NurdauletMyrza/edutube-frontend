import { NextApiRequest, NextApiResponse } from "next";
import { accessTokenCookieName } from "@/shared/variables/variables";
import { saveLessonFileApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await fetch(saveLessonFileApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? { savedFileData: data }
          : { message: "Failed to save file", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
