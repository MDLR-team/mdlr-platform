import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: messages,
    });

    res.status(200).json({ data: response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
