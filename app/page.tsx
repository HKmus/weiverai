import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Code, Cpu, Globe, Layers, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { signinWithGoogle } from "./(auth)/actions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-2 flex h-16 items-center justify-between">
          <Image
            src={"/full-logo.png"}
            alt="WeiverAI"
            height={40}
            width={120}
          />

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
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden md:flex" onClick={signinWithGoogle}>
              Log In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto px-2">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container relative z-10">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="mr-1 rounded-full bg-primary h-2 w-2"></span>
                  <span className="text-muted-foreground">
                    First Algerian AI App Builder
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Build Apps with AI,{" "}
                  <span className="text-primary">No Code Required</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Transform your ideas into powerful applications using our
                  AI-powered platform. No coding skills needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="font-semibold">
                    Start Building Free
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32`}
                          alt="User avatar"
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                  </div>
                  <p>
                    <span className="font-medium text-foreground">500+</span>{" "}
                    entrepreneurs already building
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="AppGenius Platform"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Build Apps Faster with AI
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform combines the power of artificial intelligence with
                intuitive design to help you create professional apps without
                writing a single line of code.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Cpu className="h-10 w-10 text-primary" />,
                  title: "AI-Powered Design",
                  description:
                    "Describe your app in natural language and watch as our AI generates the perfect design.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Instant Prototyping",
                  description:
                    "Create functional prototypes in minutes instead of weeks. Test your ideas faster than ever.",
                },
                {
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  title: "Algerian Market Focus",
                  description:
                    "Built with Algerian businesses in mind, with templates and features tailored to local needs.",
                },
                {
                  icon: <Layers className="h-10 w-10 text-primary" />,
                  title: "Drag & Drop Interface",
                  description:
                    "Easily customize your app with our intuitive drag and drop interface. No technical skills required.",
                },
                {
                  icon: <Code className="h-10 w-10 text-primary" />,
                  title: "Export Clean Code",
                  description:
                    "Need to extend your app? Export clean, well-structured code that developers can easily work with.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "One-Click Deployment",
                  description:
                    "Deploy your app to the web, iOS, or Android with just one click. No complex setup required.",
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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How AppGenius Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Building your app is as simple as describing what you want. Our
                AI handles the rest.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
                    "Our AI generates your app design. Customize it with our easy-to-use editor.",
                },
                {
                  step: "03",
                  title: "Publish & Share",
                  description:
                    "Deploy your app to web or mobile with one click and share it with the world.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col p-8 bg-background rounded-lg border shadow-sm h-full">
                    <div className="text-5xl font-bold text-primary/20 mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="h-8 w-8 text-primary">→</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works for you. All plans include our core
                AI app building features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  description: "Perfect for trying out the platform",
                  features: [
                    "1 app project",
                    "Basic AI features",
                    "Web deployment",
                    "Community support",
                  ],
                },
                {
                  name: "Professional",
                  price: "4,900 DA",
                  period: "/month",
                  description: "For serious entrepreneurs and small businesses",
                  features: [
                    "5 app projects",
                    "Advanced AI features",
                    "Web & mobile deployment",
                    "Priority support",
                    "Custom domain",
                  ],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Contact Us",
                  description: "For larger organizations with custom needs",
                  features: [
                    "Unlimited app projects",
                    "Full AI capabilities",
                    "All deployment options",
                    "Dedicated support",
                    "Custom integrations",
                    "Team collaboration",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col p-8 rounded-lg border ${plan.popular ? "border-primary shadow-lg relative" : "border-border shadow-sm"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Contact Us"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of satisfied entrepreneurs and businesses across
                Algeria.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "AppGenius helped me launch my delivery app in just two weeks. What would have cost me millions of dinars in development was done at a fraction of the cost.",
                  author: "Karim Benali",
                  role: "Founder, QuickDeliv",
                  image: "/placeholder.svg?height=64&width=64",
                },
                {
                  quote:
                    "As a non-technical founder, I was struggling to bring my idea to life. With AppGenius, I built my entire e-commerce platform without writing a single line of code.",
                  author: "Amina Khelif",
                  role: "CEO, Artisanat Online",
                  image: "/placeholder.svg?height=64&width=64",
                },
                {
                  quote:
                    "The AI understood exactly what I needed for my educational app. The platform is incredibly intuitive and the support team is always ready to help.",
                  author: "Mohammed Larbi",
                  role: "Director, EduTech Algeria",
                  image: "/placeholder.svg?height=64&width=64",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-background rounded-lg border shadow-sm"
                >
                  <div className="mb-4 text-primary">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6 4C7.2 4 4 7.2 4 11.6C4 16 7.2 19.2 11.6 19.2C16 19.2 19.2 16 19.2 11.6C19.2 7.2 16 4 11.6 4ZM14.4 13.2L11.6 12V8H12.4V11.4L14.8 12.4L14.4 13.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="text-muted-foreground mb-6 flex-1">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your App?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/80">
                Join the no-code revolution and bring your app idea to life
                today. No technical skills required.
              </p>
              <Button size="lg" variant="secondary" className="font-semibold">
                Start Building For Free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 mx-auto px-2 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AppGenius</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Building the future of app development in Algeria.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-5 w-5 rounded-full bg-muted"></div>
                    </a>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Features",
                  "Pricing",
                  "Testimonials",
                  "Templates",
                  "Integrations",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Documentation",
                  "Tutorials",
                  "Blog",
                  "Community",
                  "Support",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "About Us",
                  "Careers",
                  "Contact",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AppGenius. All rights reserved.</p>
            <p className="mt-2">Made with pride in Algeria 🇩🇿</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
