import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TrainingPlans from "@/components/RoutineShowcase";
import StickyButton from "@/components/StickyButton";

const FitnessHomePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
        <section className="relative z-10 py-24 flex-grow animate-slideIn">
          <div className="container mx-auto px-4 lg:px-20">
            <div className="lg:col-span-7 space-y-8 relative text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <div>
                  <span className="text-primary">Transform</span>
                </div>
                <div>
                  <span className="text-foreground">Your Fitness</span>
                </div>
                <div>
                  <span className="text-primary">To The Next Level</span>
                </div>
                <div>
                  <span className="text-foreground">With Our </span>
                </div>
                <div>
                  <span className="text-primary">Smart AI Coach</span>
                </div>
              </h1>

              <p className="text-xl text-muted-foreground">
                Chat With Our Well Trained AI And Get Your Personalized Diet And
                Workout Plans Within Minutes!
              </p>

              <div className="flex gap-4 pt-6 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-primary-foreground px-8 py-6 text-lg font-medium rounded-lg"
                >
                  <Link
                    href={"/create-workout-plan"}
                    className="flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/30">
          <div className="container mx-auto max-w-6xl px-4 lg:px-20">
            <h2 className="text-5xl font-bold text-center mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Tell Us Your Goals</h3>
                <p className="text-muted-foreground">
                  Answer a few questions given by our AI
                </p>
              </Card>

              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Your Plan</h3>
                <p className="text-muted-foreground">
                  Receive a personalized diet and workout plan just for you
                </p>
              </Card>

              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Log your weight and monitor your progress over time
                </p>
              </Card>
            </div>
          </div>
        </section>

        <TrainingPlans />
      </div>
      <StickyButton />
    </>
  );
};

export default FitnessHomePage;
