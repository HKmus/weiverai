"use client";
import React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import WorkspaceHistory from "../workspace/WorkspaceHistory";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SideBarFooter from "./SideBarFooter";
import ThemeToggle from "../ThemeToggle";
import { useRouter } from "next/navigation";

function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="flex-row items-center justify-between mt-5">
        <Image
          src={"/full-logo.png"}
          alt="WeiverAI"
          height={25}
          width={110}
          onClick={toggleSidebar}
        />
        <ThemeToggle />
      </SidebarHeader>
      <SidebarContent>
        {/*new chat button*/}
        <SidebarGroup className="px-2">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Button
                        className="w-full justify-start cursor-pointer"
                        onClick={() => {
                          router.push("/dashboard");
                        }}
                      >
                        <MessageCircleCode className="h-4 w-4" />
                        <span>New Chat</span>
                      </Button>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="group-data-[state=expanded]:hidden"
                  >
                    New Chat
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*chat history*/}
        <SidebarGroup className="px-2 pt-4">
          <SidebarGroupContent>
            <div className="mb-2 px-4 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
              Chat History
            </div>
            <SidebarMenu>
              <WorkspaceHistory />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
