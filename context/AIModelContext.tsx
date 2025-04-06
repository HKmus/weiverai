"use client"
import React, { createContext, useState, ReactNode } from "react";

// Define the context type
interface AIModelContextType {
  modelName: string;
  setModelName: (name: string) => void;
}

// Create the context with a default value
export const AIModelContext = createContext<AIModelContextType | undefined>(undefined);

// Provider component
export const AIModelProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modelName, setModelName] = useState<string>("gemini-2.0-flash-lite");

  return (
    <AIModelContext.Provider value={{ modelName, setModelName }}>
      {children}
    </AIModelContext.Provider>
  );
};
