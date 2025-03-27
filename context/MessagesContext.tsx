"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface MessageType {
  role: string;
  content: string;
}

interface MessagesContextType {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
}

// Create the context with an undefined default value
export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
