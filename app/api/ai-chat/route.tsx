import {
  models,
  startGoogleChatSession,
  startTogetherAiSession,
} from "@/config/AiModels";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();
    const foundModel = models.find((e) => e.TechnicalName === model);
    if (foundModel?.Provider === "Google") {
      const { chatSession } = startGoogleChatSession(model);
      const result = await chatSession.sendMessage(prompt);
      const AIresponse = await result.response.text();

      return NextResponse.json({ response: AIresponse });
    } else if (foundModel?.Provider === "Together-ai") {
      const { chatResult } = await startTogetherAiSession(model, prompt);

      return NextResponse.json({
        response: chatResult?.choices?.[0]?.message?.content,
      });
    }
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
