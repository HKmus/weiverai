import AppSidebar from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <Tooltip>
        <TooltipTrigger asChild>
          <>
            <SidebarTrigger className="cursor-pointer"/>
          </>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="group-data-[state=expanded]:hidden"
        >
          Toggle sidebar
        </TooltipContent>
      </Tooltip>
      <main className="w-[calc(100vw-28px)]">{children}</main>
    </SidebarProvider>
  );
}
