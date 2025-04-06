"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { deleteWorkspace, getAllWorkspaces } from "@/db/workspace";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

function WorkspaceHistory() {
  const { userDetails } = useContext(UserDetailsContext)!;
  const [workspaceList, setWorkspaceList] = useState<
    { id: string; messages: any; modified_at: string }[] | null
  >(null);
  const { toggleSidebar } = useSidebar();
  const [loading, setLoading] = useState<string | null>(null); // Track loading state for deletion

  useEffect(() => {
    if (userDetails && userDetails.id) {
      getChatHistory();
    }
  }, [userDetails]);

  const getChatHistory = async () => {
    if (userDetails?.id) {
      const workspaces = await getAllWorkspaces({ userId: userDetails.id });
      if (workspaces) {
        // Sort workspaces by `modified_at` (latest first)
        const sorted = workspaces.sort(
          (a, b) =>
            new Date(b.modified_at).getTime() -
            new Date(a.modified_at).getTime()
        );
        setWorkspaceList(sorted);
      } else {
        setWorkspaceList(null);
      }
    }
  };

  const truncateMessage = (message: string) => {
    const words = message.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + " ..." : message;
  };

  // Handle workspace deletion
  const handleDelete = async (id: string) => {
    setLoading(id); // Set loading state for the specific item
    const response = await deleteWorkspace({ workSpaceId: id });

    if (response.success) {
      setWorkspaceList((prev) =>
        prev ? prev.filter((workspace) => workspace.id !== id) : null
      );
    } else {
      toast.error("Failed to delete workspace");
    }

    setLoading(null); // Reset loading state
  };

  return (
    <div className="flex-1 overflow-y-scroll px-5">
      {workspaceList &&
        workspaceList.map((workspace) => (
          <div
            key={workspace.id}
            className="flex justify-between items-center my-3"
          >
            <Link href={`/workspace/${workspace.id}`} className="flex-1">
              <h2
                onClick={toggleSidebar}
                className="text-sm text-primary hover:text-muted-foreground font-light cursor-pointer"
              >
                {truncateMessage(
                  workspace.messages[0]?.content || "No Content"
                )}
              </h2>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(workspace.id);
              }}
              className="text-red-500 hover:text-red-700 text-xs ml-4 disabled:opacity-50"
              disabled={loading === workspace.id}
            >
              {loading === workspace.id ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
            </button>
          </div>
        ))}
    </div>
  );
}

export default WorkspaceHistory;
