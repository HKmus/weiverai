import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { signOut } from "@/app/(auth)/actions";

const SideBarFooter = () => {
  const { setUserDetails } = useContext(UserDetailsContext)!;
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const options = [
    // {
    //   name: "Settings",
    //   icon: Settings,
    // },
    // {
    //   name: "Help Center",
    //   icon: HelpCircle,
    // },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign out",
      icon: LogOut,
    },
  ];
  const onOptionClick = (option: any) => {
    if (option.name === "Sign out") {
      localStorage.removeItem("user");
      setUserDetails(null);
      signOut();
      //toast.success("Signed out successfully");
    } else if (option.path) {
      router.push(option.path);
    }
    toggleSidebar();
  };

  return (
    <div className=" mb-5">
      {options.map((option, index) => (
        <Button
          onClick={() => {
            onOptionClick(option);
          }}
          className="w-full flex justify-start my-3"
          variant="ghost"
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
