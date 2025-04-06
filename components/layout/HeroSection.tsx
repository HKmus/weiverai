import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signinWithGoogle } from "@/app/(auth)/actions";

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border border-main px-3 py-1 text-sm">
              <span className="mr-1 rounded-full bg-main h-2 w-2"></span>
              <span className="text-primary">
                First Algerian AI App Builder
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              AI-Powered App Development,{" "}
              <span className="text-main">Empowering Your Vision</span>
            </h1>
            <p className="text-xl text-primary">
              Transform your ideas into impactful apps with our intelligent
              platform—experience a seamless, innovative approach to building
              robust applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="font-semibold bg-main hover:bg-primary/90 text-primary-foreground"
                onClick={signinWithGoogle}
              >
                Start Building Free
              </Button>
            </div>
          </div>

          {/* Right Side: Layered Desktop Screenshots */}
          <div className="relative h-[500px] w-full">
            {/* Top Screenshot */}
            <div className="absolute top-0 left-10 w-[90%] h-[60%] rounded-xl overflow-hidden shadow-xl shadow-switch/30 ">
              <Image
                src="/Screenshot1.png"
                alt="Screenshot 1"
                fill
                className="object-cover"
              />
            </div>

            {/* Bottom overlapping Screenshot */}
            <div className="absolute top-60 left-30 w-[82%] h-[54%] rounded-xl overflow-hidden shadow-xl shadow-switch/30 z-20">
              <Image
                src="/Screenshot2.png"
                alt="Screenshot 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
