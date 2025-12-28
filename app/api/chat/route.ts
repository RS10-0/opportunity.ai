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
          content: `You are a professional Business Lead Scout. 
          The user needs REAL ways to make money, not generic advice.
          
          For every suggestion:
          1. Identify a specific platform (like 'Contra', 'Wellfound', or 'Gigster') instead of just 'freelance sites'.
          2. Provide a specific 'Arbitrage' idea (e.g., 'Using AI to automate lead gen for local Realtors').
          3. Give a direct link to the high-paying portal or the specific strategy page.
          
          Format as JSON: {"opportunities": [{"title": "", "desc": "", "link": ""}]}`
        },
        {
          role: "user",
          content: `My skills: ${skills}. I have ${time} hours/week and a budget of $${money}. Find me 3 high-intent money-making leads.`
        }
      ],
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(response.choices[0].message.content!));
  } catch (error) {
    return NextResponse.json({ error: "AI scout is offline" }, { status: 500 });
  }
}
