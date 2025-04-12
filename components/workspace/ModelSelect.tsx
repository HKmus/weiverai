"use client";
import { useContext } from "react";
import { AIModelContext } from "@/context/AIModelContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

const models = [
  {
    Provider: "Google",
    TechnicalName: "gemini-2.0-flash-lite",
    DisplayName: "Gemini 2.0 Flash Lite",
  },
  {
    Provider: "OpenRouter",
    TechnicalName: "deepseek/deepseek-chat-v3-0324",
    DisplayName: "Deepseek v3",
  },
  {
    Provider: "OpenRouter",
    TechnicalName: "meta-llama/llama-3.3-70b-instruct",
    DisplayName: "Llama 3.3 70B",
  },
  {
    Provider: "OpenRouter",
    TechnicalName: "qwen/qwen2.5-vl-32b-instruct",
    DisplayName: "Qwen2.5 VL 32B",
  },
];

const ModelSelect = () => {
  const { modelName, setModelName } = useContext(AIModelContext)!;

  return (
    <Select value={modelName} onValueChange={setModelName}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {models.map((model, index) => (
            <SelectItem key={index} value={model.TechnicalName}>
              {model.DisplayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelect;
