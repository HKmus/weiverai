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
          <SelectItem value="gemini-2.0-flash-lite">
            Gemini 2.0 Flash Lite
          </SelectItem>
          <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelect;
