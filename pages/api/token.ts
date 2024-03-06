import APS from "forge-apis";
import { NextApiRequest, NextApiResponse } from "next";

export const CLIENT_ID = "jTrywvL2rTwPtAOgTGafvHrhGcXOCcY0NyhLVn7dUYIQ1kHj";
export const CLIENT_SECRET =
  "g37jTm0rSnbAwZRAuHQJuqjTdXR6rN0ik78THusLAFC24RjC7pYEVSo2nQ5AxUSp";
export const BIM_ACCOUNT_ID = "b.192e6153-6585-42a2-b2eb-f3e8d583808e";

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
