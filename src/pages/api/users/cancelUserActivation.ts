import type { NextApiRequest, NextApiResponse } from "next";
import { cancelUserActivationApiBaseUrl } from "@/shared/variables/backendApiUrls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { email, code } = req.body;

    const response = await fetch(
      `${cancelUserActivationApiBaseUrl}${code}/${email}/`,
      { method: "DELETE" }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error " + error });
  }
}
