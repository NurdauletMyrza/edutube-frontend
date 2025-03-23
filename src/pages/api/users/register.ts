import { NextApiRequest, NextApiResponse } from "next";
import { registerUserApiUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} now allowed` });
  }

  try {
    const response = await fetch(registerUserApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
}
