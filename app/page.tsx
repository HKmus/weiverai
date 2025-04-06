import Image from "next/image";
import { Button } from "@/components/ui/button";

import { signinWithGoogle } from "./(auth)/actions";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";
import HowitworkSection from "@/components/layout/HowitworkSection";
import PricingSection from "@/components/layout/PricingSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-2">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowitworkSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* CTA Section */}
        <section className="py-20 bg-tab-bar/90  text-primary-foreground">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Bring Your Vision to Life?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Join the next generation of app builders and experience a
                seamless, innovative approach to app creation.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                onClick={signinWithGoogle}
              >
                Start Building For Free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t w-full py-12 mx-auto px-2 bg-background">
        <div className="text-center">
          <div className="flex flex-col items-center mb-3">
            <Image
              src={"/full-logo.png"}
              alt="WeiverAI"
              height={40}
              width={130}
            />
            {/* <div className="flex space-x-4 mt-4">
              {["twitter", "facebook", "instagram", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5 rounded-full bg-muted"></div>
                  </a>
                )
              )}
            </div> */}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} WeiverAI. All rights reserved.</p>
            <p className="mt-2">Made with pride in Algeria 🇩🇿</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
