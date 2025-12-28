import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// This is the "Brain" logic
export async function POST(req: Request) {
  try {
    const { skills, time, money } = await req.json();

    // In a real app, this talks to OpenAI. 
    // For now, we'll keep it simple to make sure it connects!
    const results = [
      {
        title: `AI-Powered ${skills} Specialist`,
        desc: `Based on your ${time} hours, you can use AI tools to automate your workflow.`,
        cat: "AI Strategy",
        link: "https://openai.com"
      }
    ];

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}
