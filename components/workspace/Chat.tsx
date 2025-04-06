"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { createWorkspace } from "@/db/workspace";
import en from "@/locale/en";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ModelSelect from "./ModelSelect";

function Chat() {
  const [userInput, setUserInput] = useState("");
  const { setMessages } = useContext(MessagesContext)!;
  const { userDetails } = useContext(UserDetailsContext)!;

  const router = useRouter();

  const onGenerate = async (input: string) => {
    if (!userDetails) {
      return;
    }
    if (userDetails.tokens < 10) {
      alert("You don't have enough tokens to generate this message");
      return;
    }
    const msg = [
      {
        role: "user",
        content: input,
      },
    ];
    setMessages(msg);
    const workSpaceId = await createWorkspace({
      userId: userDetails.id,
      messages: msg,
    });
    setUserInput("");
    router.push("workspace/" + workSpaceId);
  };

  // const forwardMessage = () => {
  //   if (setMessages) {
  //     setMessages({ role: "user", content: userInput });
  //   }
  //   router.push(`/workspace?message=${encodeURIComponent(userInput)}`);
  // };

  return (
    <div className="flex flex-col items-center mt-32 gap-5">
      <h2 className="font-black text-main text-5xl">
        {en.HERO_HEADING}
      </h2>
      <p className="font-medium text-2xl text-accent-foreground">
        {en.HERO_DESCRIPTION}
      </p>

      <div className="p-3 border-2 border-main/20 rounded-xl max-w-xl w-full">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <textarea
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
              placeholder={en.INPUT_PLACEHOLDER}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            {userInput.length > 0 && (
              <ArrowRight
                className="bg-main text-accent p-2 h-8 w-8 rounded-md cursor-pointer"
                onClick={() => onGenerate(userInput)}
              />
            )}
          </div>
          <ModelSelect />
        </div>
      </div>
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
        {en.SUGGSTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-accent-foreground cursor-pointer"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Chat;
