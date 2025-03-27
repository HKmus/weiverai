import { genAiCode } from "@/config/AiModels";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = await genAiCode.sendMessage(prompt);
    const AIresponse = await result.response.text();
    return NextResponse.json({ response: JSON.parse(AIresponse) });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
