import { NextApiRequest, NextApiResponse } from "next";
import { allCoursesApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const response = await fetch(allCoursesApiUrl);

    const data = await response.json();

    return res
      .status(response.status)
      .json(
        response.ok
          ? { courses: data }
          : { message: "Failed to get all courses", ...data }
      );
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
}
