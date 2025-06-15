import React from "react";
import Link from "next/link";
interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
  actions?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backLink,
  actions,
}) => {
  return (
    <div className="mb-8">
      {}
      {backLink && (
        <div className="mb-2">
          <Link
            href={backLink.href}
            className="text-sm text-muted-foreground hover:text-primary flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {backLink.label}
          </Link>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="mt-4 sm:mt-0 sm:ml-4">{actions}</div>}
      </div>
    </div>
  );
};
export default PageHeader;
