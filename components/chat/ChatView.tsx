"use client";

import en from "@/locale/en";
import { ArrowRight, Loader2Icon, UserRound } from "lucide-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import prompt from "@/data/prompt";
import { MessagesContext } from "@/context/MessagesContext";
import { useParams } from "next/navigation";
import { getWorkspace, updateMessages } from "@/db/workspace";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { updateTokenCount } from "@/db/profiles";

export const countToken = (inputText: string) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams<{ id: string }>();
  const { messages, setMessages } = useContext(MessagesContext)!;
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)!;
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const fetchWorkspaceData = async () => {
    const workspace = await getWorkspace({ workSpaceId: id });
    setMessages(workspace.messages);
  };

  useEffect(() => {
    if (id && !hasFetched.current) {
      fetchWorkspaceData();
      hasFetched.current = true;
    }
  }, [id]);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      !loading
    ) {
      getAiResponse();
    }
  }, [messages]);

  const onGenerate = (input: string) => {
    if (!userDetails) {
      return;
    }
    if (userDetails.tokens < 10) {
      console.log("You dont have enough tokens!");
      return;
    }
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setUserInput("");
  };

  const getAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + prompt.CHAT_PROMPT;
    const result = await axios.post<{ response: string }>("/api/ai-chat", {
      prompt: PROMPT,
    });
    const response = result.data.response;
    console.log(response);
    const aiResponse = { role: "ai", content: response };
    setMessages((messages) => [...messages, aiResponse]);

    await updateMessages({
      workSpaceId: id,
      messages: [...messages, aiResponse],
    });

    const usedToken =
      Number(userDetails?.tokens) -
      Number(countToken(JSON.stringify(aiResponse)));

    if (userDetails) {
      setUserDetails({
        ...userDetails,
        tokens: usedToken,
      });
    }

    await updateTokenCount({ userId: userDetails!.id, tokenCount: usedToken });

    setLoading(false);
  };

  return (
    <div className="relative h-[95vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {Array.isArray(messages) &&
          messages?.map((msg, index) => (
            <div
              key={index}
              className="flex mb-2 p-4 bg-slate-500 text-white rounded-lg font-medium"
            >
              {msg.role === "user" && <UserRound className="h-6 w-8" />}
              <div className="flex flex-col">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        {loading && (
          <div className="p-3 rounded-lg mb-2 flex gap-2 items-start">
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      <div className="p-3 mt-1 border-2 border-grey-400 rounded-xl">
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={en.INPUT_PLACEHOLDER}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {userInput.length > 0 && (
            <ArrowRight
              className="bg-purple-400 p-2 h-8 w-8 rounded-md cursor-pointer"
              onClick={() => {
                onGenerate(userInput);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatView;
