import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

export const BIM_ACCOUNT_ID = "b.54f7121e-7acd-4ff7-8232-368e9769e1f1";

export const CLIENT_ID = "0wvaP6ZNVOjIdysgA9Ch8A0klnAnyPYlDNsYGCGee12ydMOG";
export const CLIENT_SECRET =
  "jq81BMSxEClsEDrdJezNO82lry3DqvRzIiSoHS6SqwbUrbQCBOLH2ob71R5U5aQo";
export const AUTH_URL =
  "https://developer.api.autodesk.com/authentication/v2/token";

const base64Encode = (clientId: string, clientSecret: string) => {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};

const getAccessToken = async () => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Encode(CLIENT_ID, CLIENT_SECRET)}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "data:read bucket:read bucket:create data:write data:create",
    }).toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed to fetch access token", errorData);
    throw new Error("Failed to fetch access token");
  }

  const data: any = await response.json();
  return data.access_token;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const token = await getAccessToken();
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.error("Error fetching token:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
