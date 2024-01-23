import type { NextApiRequest, NextApiResponse } from "next";
import db from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const result = await db.createChannel(req.body);
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "Ok" });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
