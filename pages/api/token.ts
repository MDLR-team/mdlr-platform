import APS from "forge-apis";
import { NextApiRequest, NextApiResponse } from "next";

const CLIENT_ID = "GZH90VMc2qGTq8nUMzxPoTXR8WwKvGSk";
const CLIENT_SECRET = "nOSJD591GPj1GdhM";

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
