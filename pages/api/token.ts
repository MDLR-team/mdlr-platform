import APS from "forge-apis";
import { NextApiRequest, NextApiResponse } from "next";

export const CLIENT_ID = "GZH90VMc2qGTq8nUMzxPoTXR8WwKvGSk";
export const CLIENT_SECRET = "nOSJD591GPj1GdhM";
export const BIM_ACCOUNT_ID = "b.cff46514-a249-4b23-8b05-f293c9a65d58";

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
