import { NextApiRequest, NextApiResponse } from "next";
import { deleteLessonFileApiBaseUrl } from "@/shared/variables/backendApiUrls";
import { accessTokenCookieName } from "@/shared/utils/variables";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { lessonFileId } = req.query;

    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await fetch(
      `${deleteLessonFileApiBaseUrl}${lessonFileId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? data
          : { message: "Failed to delete lesson file", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
