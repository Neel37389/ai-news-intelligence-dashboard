import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Summarise this in 3 concise bullet points.",
        },
        {
          role: "user",
          content: body.text,
        },
      ],
    });
    const summary = completion.choices[0].message.content;
    return NextResponse.json({ summary });
  } catch (err) {
    console.log("AI Error:", err);
    return NextResponse.json({ err: "Failed to summarize" }, { status: 500 });
  }
}
