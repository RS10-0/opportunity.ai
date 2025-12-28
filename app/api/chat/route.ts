import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { skills, time, money } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a career strategist. Provide 3 specific business opportunities based on the user's input. Return valid JSON only with 'opportunities' as the key."
        },
        {
          role: "user",
          content: `Skills: ${skills}, Time: ${time}, Budget: ${money}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content!));
  } catch (error) {
    return NextResponse.json({ error: "AI Brain failed" }, { status: 500 });
  }
}
