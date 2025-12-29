import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json();

    // Define the different "Spells" based on what the user picks
    const prompts: Record<string, string> = {
      summary: "Summarize this into 3 clear bullet points.",
      fiveyearold: "Explain this like I am 5 years old.",
      flashcards: "Turn this text into a list of Front/Back flashcards.",
      professional: "Rewrite this to sound highly professional and corporate.",
      todo: "Extract all actionable tasks from this text and turn them into a checkbox to-do list.",
      smart: "Analyze this text. If it is long, summarize it. If it is messy, clean it. If it is a task, organize it."
    };

    const selectedPrompt = prompts[mode] || prompts['smart'];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are the Universal Converter. ${selectedPrompt}` },
        { role: "user", content: text }
      ],
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}
