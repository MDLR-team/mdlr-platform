import axios from "axios";
import qs from "qs";
import { NextApiRequest, NextApiResponse } from "next";

export const CLIENT_ID = "CDZCpxk2OBTmXKuhyXnUFvRyywe2C5GFrXqmG5aEts1anjkl";
export const CLIENT_SECRET =
  "XWlwODmghb2204eAjukPjNVAbvAYX5TDMzf8B7jKep1AHMKEv1fAdHAtDfGl5Zk9";
export const BIM_ACCOUNT_ID = "b.85cbcc08-494b-463b-84e5-54a5eb5840f0";

const AUTH_URL =
  "https://developer.api.autodesk.com/authentication/v1/authenticate";

const getAccessToken = async () => {
  const response = await axios.post(
    AUTH_URL,
    qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "data:read data:write bucket:read bucket:create",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const accessToken = await getAccessToken();
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error("Error fetching token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
