"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/helpers";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const StickyButton = () => {
  const { isSignedIn } = useUser();
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    const scrollThreshold = 700;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const doc = document.documentElement;
    const documentHeight = doc?.scrollHeight || 0;
    const isAboveTopThreshold = scrollTop > scrollThreshold;
    const isBelowBottomThreshold =
      scrollTop + windowHeight < documentHeight - scrollThreshold;
    const isVisible = isAboveTopThreshold && isBelowBottomThreshold;
    setShowButton(isVisible);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (isSignedIn) {
    return null;
  }
  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-in-out px-4 fixed bottom-0 left-0 right-0 flex gap-4 items-center justify-center z-50 bg-background/80 backdrop-blur-md border-t border-border py-4",
        {
          "translate-y-full": !showButton,
          "translate-y-0": showButton,
        }
      )}
    >
      <p className="text-muted-foreground">
        Join over 500 users achieving their fitness goals with AI coaching
      </p>
      <Link href="/create-workout-plan">
        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex justify-center items-center">
          Create Your Custom Plan
          <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};
export default StickyButton;
