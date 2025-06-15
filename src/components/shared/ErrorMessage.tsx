import React from "react";
interface ErrorMessageProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong",
  details,
  onRetry,
}) => {
  return (
    <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-destructive"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-destructive">{message}</h3>
          {details && (
            <div className="mt-1 text-xs text-muted-foreground">{details}</div>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-xs font-medium text-destructive hover:text-destructive/80 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ErrorMessage;
