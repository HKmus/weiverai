const { GoogleGenerativeAI } = require("@google/generative-ai");
import Together from "together-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const models = [
  {
    Provider: "Google",
    TechnicalName: "gemini-2.0-flash-lite",
    DisplayName: "Gemini 2.0 Flash Lite  'Fast'",
  },
  {
    Provider: "Google",
    TechnicalName: "gemini-1.5-flash",
    DisplayName: "Gemini 1.5 Flash",
  },
  {
    Provider: "Together-ai",
    TechnicalName: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    DisplayName: "Llama 3.3 70B 'Slow'",
  },
  {
    Provider: "Together-ai",
    TechnicalName: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
    DisplayName: "Deepseek R1 'Slow'",
  },
];

export const startGoogleChatSession = (modelName: string) => {
  const model = genAI.getGenerativeModel({
    model: modelName,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "text/plain",
  };

  const codeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const genAiCode = model.startChat({
    generationConfig: codeGenerationConfig,
    history: [],
  });

  return { chatSession, genAiCode };
};

export const startTogetherAiSession = async (
  modelName: string,
  prompt: string
) => {
  const together = new Together();
  const chatResult = await together.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: modelName,
  });

  const codeResult = await together.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: modelName,
    response_format: {
      type: "json_object",
    },
  });

  return { chatResult, codeResult };
};
