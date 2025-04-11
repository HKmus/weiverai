"use client";

import { useContext, useState } from "react";
import { ArrowLeft, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { checkPromoCode } from "@/db/promo_codes";
import { updateTokenCount, upgradeUserSubscription } from "@/db/profiles";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Pricing() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext)!;
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const router = useRouter();

  const handlePromoCode = async () => {
    setIsApplyingPromo(true);
    const isValid = await checkPromoCode({ promoCode: promoCode.trim() });

    if (isValid && userDetails) {
      await upgradeUserSubscription({ userId: userDetails.id });
      await updateTokenCount({ userId: userDetails.id, tokenCount: 50000 });
      setUserDetails({
        ...userDetails,
        plan: "pro",
        tokens: 50000,
      });
      toast.success("Success!", {
        description: "You've been upgraded to the Pro plan!",
      });
    } else {
      toast.error("Invalid promo code", {
        description: "Please try a different code.",
      });
    }
    setIsApplyingPromo(false);
  };

  if (!userDetails) return <div>loading</div>;
  return (
    <>
      <div className="mb-4">
        <Link
          href={"/dashboard"}
          className="inline-flex items-center text-primary hover:underline pt-5 pl-5"
        >
          <ArrowLeft className="mr-1 h-5 w-5" />
          Back
        </Link>
      </div>
      <div className="container max-w-5xl m-auto">
        <div className="container max-w-5xl py-10 m-auto">
          <div className="mb-10 space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-lg">
              You are currently on the{" "}
              <span className="font-bold">{userDetails?.plan}</span> plan.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          {/* Free Plan */}
          <Card
            className={`${userDetails?.plan === "free" ? "border-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>
                Get started with AI-powered app creation
              </CardDescription>
              <div className="mt-1">
                <span className="text-3xl font-bold">Free</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>5,000 tokens per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>Basic AI-generated apps</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                disabled={userDetails?.plan === "free"}
                className="w-full"
                variant={userDetails?.plan === "free" ? "outline" : "default"}
              >
                {userDetails?.plan === "free" ? "Current Plan" : "Downgrade"}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card
            className={`${userDetails?.plan === "pro" ? "border-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>Unlock full AI capabilities</CardDescription>
              <div className="mt-1">
                <span className="text-3xl font-bold">3200 DA</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>50,000 tokens per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>Download full project code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>Share AI-generated websites</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <span>Access advanced AI models</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                disabled={userDetails?.plan === "pro"}
                className="w-full"
                variant={userDetails?.plan === "pro" ? "outline" : "default"}
              >
                {userDetails?.plan === "pro" ? "Current Plan" : "Upgrade"}
              </Button>
              {userDetails?.plan === "free" && (
                <div className="w-full space-y-2">
                  <Label htmlFor="promo-code">Have a promo code?</Label>
                  <div className="flex gap-2">
                    <Input
                      id="promo-code"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      onClick={handlePromoCode}
                      disabled={!promoCode || isApplyingPromo}
                    >
                      {isApplyingPromo ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
