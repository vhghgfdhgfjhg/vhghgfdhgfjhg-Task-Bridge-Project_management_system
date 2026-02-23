import React from "react";

const Progress = ({
  value = 0,
  max = 100,
  height = 20,
  backgroundColor = "#e5e7eb",
  progressColor = "#3b82f6",
  showLabel = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Progress Bar Background */}
      <div
        className="flex-1"
        style={{
          backgroundColor,
          borderRadius: "10px",
          overflow: "hidden",
          height: `${height}px`,
        }}
      >
        {/* Progress Fill */}
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: progressColor,
            height: "100%",
            transition: "width 0.4s ease-in-out",
          }}
        />
      </div>

      {/* Percentage Label */}
      {showLabel && (
        <span className="text-sm font-medium">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

export default Progress;
