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
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import prompt from "@/data/prompt";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkspace, updateFiles } from "@/db/workspace";
import { Loader2Icon, Download, Send, ClipboardIcon } from "lucide-react";
import { countToken } from "./ChatView";
import { updateTokenCount } from "@/db/profiles";
import JSZip from "jszip";
import { AIModelContext } from "@/context/AIModelContext";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
  getUrl: () => Promise<string>;
};

const ConfirmDialog = ({ getUrl }: ConfirmDialogProps) => {
  const [shareUrl, setShareUrl] = useState("");

  // When the dialog opens, fetch the URL (if not already generated)
  const handleOpenChange = async (open: boolean) => {
    if (open && !shareUrl) {
      const generatedUrl = await getUrl();
      setShareUrl(generatedUrl);
    }
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button className="flex gap-2 hover:bg-primary-foreground p-1 rounded-sm">
          <Send className="text-primary" size={20} />
          <label className="text-primary">Share</label>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Note: Open the url in a private tab{" "}
          </AlertDialogTitle>
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="mt-2 w-full p-2 border rounded"
          />
          <AlertDialogDescription className="mt-2">
            Copy the URL above to share your preview.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.success("URL copied to clipboard!");
            }}
          >
            <ClipboardIcon />
            Copy Link
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

function DownloadButton() {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const handleDownload = async () => {
    const zip = new JSZip();
    for (const [path, data] of Object.entries(files)) {
      const fileContent =
        typeof data === "object" && "code" in data ? data.code : data;
      zip.file(path, fileContent);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.zip";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button
      className="flex gap-2 hover:bg-primary-foreground p-1 rounded-sm"
      onClick={handleDownload}
    >
      <Download className="text-primary" size={20} />
      <label className="text-primary">Download Code</label>
    </button>
  );
}

function CodeView() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);
  const { messages } = useContext(MessagesContext)!;
  const { modelName } = useContext(AIModelContext)!;
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)!;
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<any>(null);
  const [shareUrl, setShareUrl] = useState("");

  // Helper that waits until the preview client is ready
  const waitForClient = (): Promise<any> =>
    new Promise((resolve) => {
      const checkClient = () => {
        const client = previewRef.current?.getClient();
        if (client) {
          resolve(client);
        } else {
          setTimeout(checkClient, 200);
        }
      };
      checkClient();
    });

  // This function generates and returns the URL for the preview (only once)
  const sharePreview = async () => {
    if (shareUrl) return shareUrl; // Already generated
    setActiveTab("preview");
    const client = await waitForClient();
    const res = await client.getCodeSandboxURL();
    const url = "https://" + res?.sandboxId + ".csb.app/";
    setShareUrl(url);
    return url;
  };

  // Prevent the backspace key from navigating back
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.key === "Backspace" &&
        !["INPUT", "TEXTAREA"].includes(event.target.tagName)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fetch workspace files only once
  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true;
      fetchFiles();
    }
  }, [id]);

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
    try {
      const workspace = await getWorkspace({ workSpaceId: id });
      if (workspace?.files_data) {
        setFiles((prevFiles) => ({ ...prevFiles, ...workspace.files_data }));
      }
    } catch (error: any) {
      toast.error("Error fetching workspace files. Please try again.");
    }
  };

  const generateAiCode = async () => {
    setLoading(true);
    setIsGenerating(true);
    const PROMPT = JSON.stringify(messages) + " " + prompt.CODE_GEN_PROMPT;
    try {
      const { data } = await axios.post<{ response: any }>("/api/code-gen", {
        prompt: PROMPT,
        model: modelName,
      });
      if (data.response?.files) {
        setFiles((prevFiles) => ({ ...prevFiles, ...data.response.files }));
      }
      setActiveTab("code");

      await updateFiles({ workSpaceId: id, files: data.response?.files });

      const usedToken =
        Number(userDetails?.tokens) -
        Number(countToken(JSON.stringify(data.response)));

      if (userDetails) {
        setUserDetails({
          ...userDetails,
          tokens: usedToken,
        });
      }

      await updateTokenCount({
        userId: userDetails!.id,
        tokenCount: usedToken,
      });
      // Once code is generated, immediately switch to preview so the URL can be generated
      setActiveTab("preview");
      toast.success("Your code has been successfully generated!");
    } catch (error: any) {
      console.error("Error generating AI code:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred while generating code.");
      }
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex items-center justify-end bg-tab-bar p-2 w-full">
        <div className="flex items-center flex-wrap shrink-0 bg-switch-back p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-primary bg-switch bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-primary bg-switch bg-opacity-25 p-1 px-2 rounded-full"
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
        <div className="flex justify-end p-1 gap-2 bg-chat">
          {userDetails?.plan === "pro" && (
            <>
              <DownloadButton />
              <ConfirmDialog getUrl={sharePreview} />
            </>
          )}
        </div>
        <SandpackLayout style={{ height: "85vh" }}>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "85vh" }} />
              <SandpackCodeEditor style={{ height: "85vh" }} readOnly={true} />
            </>
          ) : (
            <SandpackPreview
              ref={previewRef}
              showOpenInCodeSandbox={false}
              style={{ height: "85vh" }}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="w-full h-full bg-loading opacity-80 absolute top-0 flex justify-center items-center p-2">
          <Loader2Icon className="animate-spin h-10 w-10 text-primary" />
          <h2 className="text-primary">Crafting your code...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
