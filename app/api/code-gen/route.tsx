import { genAiCode } from "@/config/AiModels";
import prompts from "@/data/prompts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const PROMPT = messages + " " + prompts.CODE_GEN_PROMPT;
    const result = await genAiCode.sendMessage(PROMPT);
    const AIresponse = await result.response.text();
    const parsed = JSON.parse(AIresponse);
    return NextResponse.json({ response: parsed });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
