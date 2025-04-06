import { ChevronRight } from "lucide-react";
import React from "react";

function HowitworkSection() {
  return (
    <section id="how-it-works" className="py-20 bg-accent/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How WeiverAI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building your app is as simple as describing what you want. Our AI
            handles the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-5">
          {[
            {
              step: "01",
              title: "Describe Your App",
              description:
                "Tell our AI what you want to build using simple language. No technical jargon needed.",
            },
            {
              step: "02",
              title: "Review & Customize",
              description:
                "Our AI generates your app design. tell the AI what to Customize.",
            },
            {
              step: "03",
              title: "Publish & Share",
              description:
                "Deploy your app to web with one click and share it with the world.",
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col p-8 bg-background rounded-lg border shadow-sm h-full">
                <div className="text-5xl font-bold text-main/40 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="h-8 w-8 text-primary mr-5">
                    <ChevronRight />{" "}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowitworkSection;
