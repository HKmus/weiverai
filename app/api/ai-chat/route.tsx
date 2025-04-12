import { chatSession } from "@/config/AiModels";
import { NextResponse } from "next/server";
import prompts from "@/data/prompts";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const PROMPT = messages + prompts.CHAT_PROMPT;
    const result = await chatSession.sendMessage(PROMPT);
    const AIresponse = await result.response.text();
    return NextResponse.json({ response: AIresponse });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
