"use client";
import { useContext } from "react";
import { AIModelContext } from "@/context/AIModelContext";
import { models } from "@/config/AiModels";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

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
