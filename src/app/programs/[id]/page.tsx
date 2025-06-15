import { Button } from '@/components/ui/button';
import { USER_PROGRAMS } from "@/constants";
import Link from "next/link";
import { JSX } from "react";

export const dynamicParams = true;

export function generateStaticParams() {
  return USER_PROGRAMS.map((program) => ({
    id: program.id.toString(),
  }));
}

const PageComponent = async ({ params }: { params: { id: string } }) => {
  const program = USER_PROGRAMS.find((p) => p.id === parseInt(params.id));
  
  if (!program) {
    return (
      <div className="text-center text-red-500 py-20">Program not found</div>
    );
  }

  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4 lg:px-20 max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-2">
        {program.first_name}
        <span className="text-cyan-400">.exe</span>
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        {program.fitness_goal} Program • {program.fitness_level} Level
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground mb-2">
          🏋️ {program.workout_plan.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {program.workout_plan.description}
        </p>
        <ul className="mt-4 space-y-1 text-sm text-foreground font-mono">
          {program.workout_plan.weekly_schedule.map((day) => (
            <li key={day.day}>
              <span className="text-cyan-400 font-semibold">{day.day}:</span>{" "}
              {day.focus} ({day.duration})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground mt-10 mb-2">
          🍎 {program.diet_plan.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {program.diet_plan.description}
        </p>
        <ul className="mt-4 space-y-1 text-sm text-foreground font-mono">
          {program.diet_plan.meal_examples.map((meal) => (
            <li key={meal.meal}>
              <span className="text-pink-400 font-semibold">{meal.meal}:</span>{" "}
              {meal.example}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-16 flex justify-center">
        <Link href="/">
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex justify-center items-center"
          >
            Back to Home Page
          </Button>
        </Link>
      </div>
    </section>
  );
};
export default PageComponent as unknown as (
  props: any
) => JSX.Element | Promise<JSX.Element>;
