import { NextApiRequest, NextApiResponse } from "next";
import { getLessonFilesApiBaseUrl } from "@/shared/variables/backendApiUrls";
import { accessTokenCookieName } from "@/shared/variables/variables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { lessonId } = req.query;

    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await fetch(`${getLessonFilesApiBaseUrl}${lessonId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? { lessonFiles: data }
          : { message: "Failed to get lesson files", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
