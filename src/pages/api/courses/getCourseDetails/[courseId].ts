import { NextApiRequest, NextApiResponse } from "next";
import { getCourseDetailsApiBaseUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { courseId } = req.query;

    const response = await fetch(`${getCourseDetailsApiBaseUrl}${courseId}/`);

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? { courseDetails: data }
          : { message: "Failed to get course details", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
