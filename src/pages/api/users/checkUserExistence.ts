import type { NextApiRequest, NextApiResponse } from "next";
import { checkUserExistenceApiBaseUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { email } = req.body;

    const response = await fetch(`${checkUserExistenceApiBaseUrl}${email}/`);

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
}
