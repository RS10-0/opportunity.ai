import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { skills, time, money } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a business scout. Return ONLY a JSON object with a key named 'opportunities'. Each opportunity must have 'title', 'desc', and 'link'."
        },
        {
          role: "user",
          content: `Skills: ${skills}, Time: ${time}hrs/week, Budget: $${money}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content!));
  } catch (error) {
    // This helps us see the error in Vercel Logs
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
