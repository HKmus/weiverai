"use client";

import React, { use } from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../ThemeToggle";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center">
      <Image src={"/full-logo.png"} alt="WeiverAI" height={40} width={120} />

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button>Signin</Button>
      </div>
    </nav>
  );
}

export default Navbar;
