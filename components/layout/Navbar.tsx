"use client";

import { Button } from "../ui/button";
import ThemeToggle from "../ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { signinWithGoogle } from "@/app/(auth)/actions";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 flex h-16 items-center justify-between">
        <Link href="#">
          <Image
            src={"/full-logo.png"}
            alt="WeiverAI"
            height={40}
            width={120}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex justify-end items-center gap-4">
          <ThemeToggle />
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={() => {
              signinWithGoogle(); // close after sign in
            }}
            variant={"google"}
          >
            <Image src="/google.png" alt="google" height={15} width={15} color="white"/>
            Login with Google
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
