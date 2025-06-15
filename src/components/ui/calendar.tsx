"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/helpers";
import { buttonVariants } from "@/components/ui/button";
import "react-day-picker/dist/style.css";
type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  classNames?: any;
  showOutsideDays?: boolean;
};
export function Calendar({
  selected,
  onSelect,
  className,
  classNames,
  showOutsideDays = true,
}: CalendarProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const handleSelect = (date: Date | undefined) => {
    if (onSelect) onSelect(date);
    if (date) {
      setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-in-out",
        isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4",
          caption: "flex justify-between items-center px-2",
          caption_label: "text-sm font-medium",
          nav: "flex items-center gap-1",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-6 w-6 p-0 opacity-50 hover:opacity-100 text-white"
          ),
          table: "w-full border-collapse",
          head_row: "",
          head_cell:
            "text-muted-foreground w-9 h-9 text-xs font-medium text-center",
          row: "",
          cell: "text-center p-0 relative",
          day: "w-9 h-9 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors",
          day_selected: "bg-primary text-primary-foreground rounded-full",
          day_today:
            "font-bold text-white bg-muted rounded-full border border-primary",
          day_outside: "text-muted-foreground opacity-50",
          ...classNames,
        }}
      />
    </div>
  );
}
