"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import lookup from "@/data/lookup";
import axios from "axios";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProp,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import prompt from "@/data/prompt";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkspace, updateFiles } from "@/db/workspace";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { updateTokenCount } from "@/db/profiles";

function CodeView() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);
  const { messages } = useContext(MessagesContext)!;
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)!;
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch workspace files only once
  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true;
      fetchFiles();
    }
  }, [id]);

  useEffect(() => {
    const upadateCodeFiles = async () => {
      await updateFiles({ workSpaceId: id, files: files });
    };
    upadateCodeFiles();
  }, [files]);

  // Generate AI code when user sends a message
  useEffect(() => {
    if (
      messages?.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      !loading &&
      !isGenerating
    ) {
      generateAiCode();
    }
  }, [messages]);

  const fetchFiles = async () => {
    const workspace = await getWorkspace({ workSpaceId: id });
    if (workspace?.fileData) {
      setFiles((prevFiles) => ({ ...prevFiles, ...workspace.fileData }));
    }
  };

  const generateAiCode = async () => {
    setLoading(true);
    setIsGenerating(true);
    const PROMPT = JSON.stringify(messages) + " " + prompt.CODE_GEN_PROMPT;
    const { data } = await axios.post<{ response: any }>("/api/code-gen", {
      prompt: PROMPT,
    });
    if (data.response?.files) {
      setFiles((prevFiles) => ({ ...prevFiles, ...data.response.files }));
    }

    setLoading(false);
    setActiveTab("code");

    const usedToken =
      Number(userDetails?.tokens) -
      Number(countToken(JSON.stringify(data.response)));
      
    if (userDetails) {
      setUserDetails({
        ...userDetails,
        tokens: usedToken,
      });
    }

    await updateTokenCount({ userId: userDetails!.id, tokenCount: usedToken });

    setIsGenerating(false);
  };

  return (
    <div className="w-full h-full relative">
      <div className="bg-gray-400 w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-blue-200 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-200 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        template="react"
        theme={theme as SandpackThemeProp}
        files={files}
        customSetup={{
          dependencies: { ...lookup.DEPENDANCY },
        }}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      >
        <SandpackLayout style={{ height: "88vh" }}>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "88vh" }} />
              <SandpackCodeEditor style={{ height: "88vh" }} />
            </>
          ) : (
            <SandpackPreview
              showOpenInCodeSandbox={false}
              style={{ height: "88vh" }}
              showNavigator
            />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="w-full h-full  bg-gray-800 opacity-80 absolute top-0 flex justify-center items-center p-2">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Crafting your code...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
