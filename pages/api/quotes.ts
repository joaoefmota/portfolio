import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch quotes" });
    }
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Quotes proxy error:", message);
    const isProd = process.env.NODE_ENV === "production";
    const errorResponse = isProd ? "Internal server error" : message;
    return res.status(500).json({ error: errorResponse });
  }
}
