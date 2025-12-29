import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// This initializes the OpenAI connection using your secret key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json();

    // 1. Define the "Recipes" (Prompts) for each button
    const prompts: Record<string, string> = {
      smart: "Analyze this text. If it is long, summarize it. If it is messy, organize it into a clean outline. If it is a question, answer it.",
      summary: "Provide a concise summary of the following text using 3-5 punchy bullet points.",
      study: "Transform this text into a high-level study guide. Include a 'Key Terms' section and a 'Main Concepts' section.",
      professional: "Rewrite this text to be professional, clear, and suitable for a corporate email or LinkedIn post.",
      todo: "Extract all actionable tasks from this text and format them as a clean, numbered to-do list."
    };

    // 2. Select the instruction based on what the user clicked
    const systemInstruction = prompts[mode] || prompts.smart;

    // 3. Send the request to the AI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast and cheap model
      messages: [
        { 
          role: "system", 
          content: `You are the Universal Converter. Your goal is to transform text based on user needs. ${systemInstruction} Use clean formatting and emojis where helpful.` 
        },
        { 
          role: "user", 
          content: text 
        }
      ],
      temperature: 0.7, // Adds a bit of creativity
    });

    // 4. Send the AI's answer back to your website
    return NextResponse.json({ result: response.choices[0].message.content });

  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "The AI Brain is tired. Check your API key or balance." }, 
      { status: 500 }
    );
  }
}
