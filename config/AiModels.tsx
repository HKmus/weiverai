const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const startChatSession = (modelName: string) => {
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
