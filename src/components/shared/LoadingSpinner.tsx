import React from "react";
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-primary border-t-transparent animate-spin`}
      ></div>
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
export default LoadingSpinner;
