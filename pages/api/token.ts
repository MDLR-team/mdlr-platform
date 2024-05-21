import APS from "forge-apis";
import { NextApiRequest, NextApiResponse } from "next";

export const CLIENT_ID = "iEGXFE8yl3oxY360cnhEwrR8HdfO6GznXkuJr9yjXMzlxxh9";
export const CLIENT_SECRET =
  "WSGxOGbbFJVWn9HHXBMcNKkueZfaiOXYO5nrtvMbrvADYnPCr8GM07SFmlftEn4b";
export const BIM_ACCOUNT_ID = "b.61c36ada-bf54-4d40-9824-483ef73a845c";

const publicAuthClient = new APS.AuthClientTwoLegged(
  CLIENT_ID,
  CLIENT_SECRET,
  ["viewables:read"],
  true
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      if (!publicAuthClient.isAuthorized()) {
        await publicAuthClient.authenticate();
      }

      res.status(200).json(publicAuthClient.getCredentials());
    } catch (error) {
      console.error("Error fetching token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
