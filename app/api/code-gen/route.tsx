import {
  models,
  startGoogleChatSession,
  startTogetherAiSession,
} from "@/config/AiModels";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();
    const foundModel = models.find((e) => e.TechnicalName === model);
    if (foundModel?.Provider === "Google") {
      const { genAiCode } = await startGoogleChatSession(model);
      const result = await genAiCode.sendMessage(prompt);
      const AIresponse = await result.response.text();

      return NextResponse.json({ response: JSON.parse(AIresponse) });
    } else if (foundModel?.Provider === "Together-ai") {
      const { codeResult } = await startTogetherAiSession(model, prompt);

      return NextResponse.json({
        response: JSON.parse(codeResult?.choices?.[0]?.message?.content!),
      });
    }
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
