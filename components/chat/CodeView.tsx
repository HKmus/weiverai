"use client";

import lookup from "@/data/lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProp,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function CodeView() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(lookup.DEFAULT_FILE);

  return (
    <>
      <div className="bg-gray-400 w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "text-blue-200 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "text-blue-200 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
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
          dependencies: {
            ...lookup.DEPENDANCY,
          },
        }}
      >
        <SandpackLayout style={{ height: "88vh" }}>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "88vh" }} />
              <SandpackCodeEditor style={{ height: "88vh" }} />
            </>
          ) : (
            <SandpackPreview
              showOpenInCodeSandbox={false}
              style={{ height: "88vh" }}
              showNavigator={true}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}

export default CodeView;

/*

import { Fragment, useEffect } from "react";
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    useSandpack,
    SandpackConsole,
  } from "@codesandbox/sandpack-react";
  import { amethyst } from "@codesandbox/sandpack-themes";

  const Editor = () =>{
    const { sandpack } = useSandpack();
      useEffect(() => {
        // *************************************** //
        //      UPDATED CODE FROM STATE!!         //
        // *************************************** //
        console.log(sandpack.files);
      },[sandpack.files])

      return <Fragment>
            <SandpackLayout>
                <SandpackCodeEditor style={{ height: '600px' }} showLineNumbers={true} showRunButton={false} />
                <SandpackPreview showNavigator style={{ height: '600px' }} showOpenInCodeSandbox={false}>
                    <SandpackConsole  style={{ height: '300px' }}/>
                </SandpackPreview>
            </SandpackLayout>
      </Fragment>
  }
  export const SandpackWithLiveCodeState = () =>  {
    return <SandpackProvider 
    customSetup={{
        entry: "/index.html",
      }}
      template="vanilla"
     theme={amethyst}
     files={{
        "/index.html": {
            active: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <h1>Sandpack is amazing!</h1>
  </body>
</html>
<script src="/index.js"></script>
<script src="/code.js"></script>`,
          },
          "/index.js": {
            code: 'console.log("this is a test!");'
          },
          "/code.js": {
            code: 'console.log("wow!");'
          },
          "/style.css": {
            code: `body {
  background-color: yellow;
}
            `,
          },
    }}>
        <Editor />
    </SandpackProvider>
  }

*/
