import { NextApiRequest, NextApiResponse } from "next";
import { accessTokenCookieName } from "@/shared/variables/variables";
import { userEnrolledCoursesApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const accessToken = req.cookies[accessTokenCookieName];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await fetch(userEnrolledCoursesApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? { courses: data }
          : { message: "Failed to get your enrolled courses", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
