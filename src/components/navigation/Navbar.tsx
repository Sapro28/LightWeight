"use client";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Dumbbell, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
const MainNavigation = () => {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    {
      href: "/create-workout-plan",
      label: "Create Plan",
    },
    {
      href: "/profile",
      label: "My Plans",
    },
    {
      href: "/fitness-journal",
      label: "Progress Log",
    },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container px-4 mx-auto flex items-center justify-between">
        {}
        <Link href="/" className="flex items-center gap-2 z-20">
          <div className="rounded-full p-1.5 bg-primary/20">
            <Dumbbell className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold">LightWeight</span>
        </Link>
        {}
        <button
          className="lg:hidden z-20 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
        {}
        <div
          className={`
          fixed inset-0 bg-background z-10 h-dvh flex flex-col items-center justify-center space-y-8 lg:hidden
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 text-lg hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{link.label}</span>
            </Link>
          ))}
          {isSignedIn ? (
            <Button asChild className="mt-4 w-40 bg-accent hover:bg-accent/90">
              <Link
                href="/create-workout-plan"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Now
              </Link>
            </Button>
          ) : (
            <div className="flex flex-col gap-4 w-40">
              <SignInButton>
                <Button
                  variant="outline"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Join Now
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
        {}
        <nav className="hidden lg:flex items-center gap-6">
          {isSignedIn ? (
            <>
              {}
              <div className="flex items-center gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors"
                  >
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
              {}
              <Button
                asChild
                className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/create-workout-plan">Start Now</Link>
              </Button>
              {}
              <UserButton />
            </>
          ) : (
            <>
              {}
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Join Now
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default MainNavigation;
