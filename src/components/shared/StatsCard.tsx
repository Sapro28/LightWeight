import React from "react";
interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            {trend && (
              <span
                className={`ml-2 text-xs font-medium ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {icon && <div className="bg-primary/10 p-2 rounded-md">{icon}</div>}
      </div>
    </div>
  );
};
export default StatsCard;
