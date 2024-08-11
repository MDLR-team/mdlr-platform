import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

export const BIM_ACCOUNT_ID = "b.813721df-c5c6-4154-95cf-559bf9b4952f"; // 08ce7ab3-a669-4ba7-88f9-05349e0d2011

export const CLIENT_ID = "e7MpHGpkUFGkjOcZewzvEoMF7CYtLKzwVBz3Knf9JkciJzAk";
export const CLIENT_SECRET =
  "ihnI8r3YBGnZHAaVGrPHYXUQQOl3PgEFpt1RU6hxAKcHcWlCJKNBRyD6T3O2pBNE";
export const AUTH_URL =
  "https://developer.api.autodesk.com/authentication/v2/token";

export const base64Encode = (clientId: string, clientSecret: string) => {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};

export const getAccessToken = async () => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Encode(CLIENT_ID, CLIENT_SECRET)}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope:
        "data:read data:write data:create data:search bucket:read bucket:create bucket:update bucket:delete code:all account:read account:write viewables:read",
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
