import { AtomIcon, CheckCircle, Code, Cpu, SparklesIcon, Zap } from 'lucide-react';
import React from 'react'

function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Accelerate App Creation with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform harnesses the power of artificial intelligence with
            intuitive design, enabling you to create professional applications
            effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="h-10 w-10 text-main" />,
              title: "AI-Powered Design",
              description:
                "Describe your app in natural language and watch as our AI generates the perfect design.",
            },
            {
              icon: <Zap className="h-10 w-10 text-main" />,
              title: "Instant Prototyping",
              description:
                "Create functional prototypes in minutes instead of weeks. Test your ideas faster than ever.",
            },
            {
              icon: <AtomIcon className="h-10 w-10 text-main" />,
              title: "Build React Apps Effortlessly",
              description:
                "Create and customize high-performance React applications with our AI-assisted, drag-and-drop interface.",
            },
            {
              icon: <SparklesIcon className="h-10 w-10 text-main" />,
              title: "Smart Code Generation",
              description:
                "Leverage AI to instantly generate optimized, production-ready code for your apps. Save time and focus on creativity.",
            },
            {
              icon: <Code className="h-10 w-10 text-main" />,
              title: "Export Clean Code",
              description:
                "Need to extend your app? Export clean, well-structured code that developers can easily work with.",
            },
            {
              icon: <CheckCircle className="h-10 w-10 text-main" />,
              title: "One-Click Share",
              description:
                "Share your app to the web with just one click. No complex setup required.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-card rounded-lg border shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection