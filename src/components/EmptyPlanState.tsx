import Link from "next/link";
import EdgeAccents from "./EdgeAccents";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
const EmptyPlanState = () => {
  return (
    <div className="relative backdrop-blur-sm border border-border rounded-lg p-8 text-center">
      <EdgeAccents />
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-secondary">Start Your</span> Fitness Journey
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Create your customized fitness and nutrition plan designed specifically
        for your goals, preferences, and fitness level
      </p>
      <Button
        size="lg"
        asChild
        className="relative overflow-hidden bg-secondary text-secondary-foreground px-8 py-6 text-lg"
      >
        <Link href="/create-workout-plan">
          <span className="relative flex items-center">
            Design Your Plan
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        </Link>
      </Button>
    </div>
  );
};
export default EmptyPlanState;
