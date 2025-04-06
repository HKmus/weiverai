import React from "react";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { signinWithGoogle } from "@/app/(auth)/actions";

function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include our core AI
            app building features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mx-40">
          {[
            {
              name: "Starter",
              price: "Free",
              description: "Perfect for trying out the platform",
              features: ["5,000 tokens per month", "Basic AI-generated apps"],
              popular: false,
            },
            {
              name: "Professional",
              price: "3200 DA",
              period: "/month",
              description: "For serious entrepreneurs and small businesses",
              features: [
                "50,000 tokens per month",
                "Download full project code",
                "Share AI-generated websites",
                "Access advanced AI models",
              ],
              popular: true,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-8 rounded-lg border ${
                plan.popular
                  ? "border-main shadow-lg relative"
                  : "border-border shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-main text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-main mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={signinWithGoogle}
              >
                {plan.price === "Contact Us" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
