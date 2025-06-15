import React from "react";
interface DataPoint {
  date: string;
  value: number;
}
interface ProgressChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  color?: string;
}
const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  title = "Progress",
  height = 150,
  color = "#18cef2",
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className="border border-border rounded-lg p-4 flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );
  }
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue > 0 ? maxValue - minValue : maxValue * 0.2;
  const getYPosition = (value: number): number => {
    const padding = 20;
    const chartHeight = height - padding * 2;
    const normalized = 1 - (value - minValue) / range;
    return normalized * chartHeight + padding;
  };
  return (
    <div className="border border-border rounded-lg p-4">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      {}
      <svg width="100%" height={height}>
        {}
        <polyline
          points={data
            .map((point, index) => {
              const x = (index / (data.length - 1)) * 100 + "%";
              const y = getYPosition(point.value);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        {}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100 + "%";
          const y = getYPosition(point.value);
          return <circle key={index} cx={x} cy={y} r="4" fill={color} />;
        })}
      </svg>
      {}
      <div className="flex justify-between mt-2">
        {data.length > 0 && (
          <>
            <span className="text-xs text-muted-foreground">
              {data[0].date}
            </span>
            {data.length > 1 && (
              <span className="text-xs text-muted-foreground">
                {data[data.length - 1].date}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default ProgressChart;
