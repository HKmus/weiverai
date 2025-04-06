import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatView from "@/components/workspace/ChatView";
import CodeView from "@/components/workspace/CodeView";

function Workspace() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex items-center justify-center"
    >
      <ResizablePanel defaultSize={75} className="p-2">
        <CodeView />
      </ResizablePanel>
      <ResizableHandle className="h-[100vh]" />
      <ResizablePanel defaultSize={25} className="p-2">
        <ChatView />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Workspace;
