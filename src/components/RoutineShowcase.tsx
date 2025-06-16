import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, User, Dot } from "lucide-react";
import { USER_PROGRAMS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
function formatProgramCategory(program: {
  fitness_level: string;
  fitness_goal: string;
}) {
  const categoryIcons: Record<string, string> = {
    "Weight Loss": "🔻",
    "Muscle Gain": "🦾",
    "General Fitness": "🧠",
    Strength: "🏆",
  };
  const icon = categoryIcons[program.fitness_goal] || "⚡";
  return `${icon} ${program.fitness_goal}`;
}
const RoutineShowcase = () => {
  return (
    <div className="w-full pb-20 pt-14 relative">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="mb-14">
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Smart </span>
              <span className="text-secondary">Training Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Browse personalized fitness routines created by our advanced AI
              coach for users with similar goals
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 mt-10">
              <div className="flex flex-col items-center">
                <p className="text-4xl text-secondary">500+</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ACTIVE PLANS
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-4xl text-secondary">3min</p>
                <p className="text-sm text-muted-foreground mt-1">
                  GENERATION TIME
                </p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="flex flex-col items-center">
                <p className="text-4xl text-secondary">100%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  PERSONALIZED
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="py-0 bg-card/80 backdrop-blur-sm border border-border hover:border-secondary/50 transition-colors overflow-hidden flex flex-col"
            >
              {}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/60">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary">
                    {formatProgramCategory(program)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>
              <CardHeader className="px-5 gap-0">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-border">
                    <img
                      src={program.profilePic}
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">
                      {program.first_name}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-secondary cursor-help">
                              .profile
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-xs">
                              AI-generated training plan
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <User className="h-4 w-4" />
                      {program.age} years • {program.workout_days} sessions/week
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 flex-grow flex flex-col">
                <div className="py-6 border-t border-border">
                  <div className="text-sm">
                    {program.workout_plan.description.length > 256
                      ? `${program.workout_plan.description.substring(0, 256)}...`
                      : program.workout_plan.description}
                  </div>
                </div>
                <div className="space-y-4" style={{ minHeight: "180px" }}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-md text-primary">
                      <Dot className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-accent">
                          {program.workout_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-md text-primary">
                      <Dot className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-accent">
                          {program.diet_plan.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI-optimized nutrition plan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-md text-primary">
                      <Dot className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-accent">
                          Adaptability
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Easy to follow
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-0">
                <Link href={`/programs/${program.id}`} className="w-full">
                  <Button
                    size="lg"
                    className="w-full rounded-t-none bg-secondary text-secondary-foreground hover:bg-secondary/90 flex justify-center items-center"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RoutineShowcase;
