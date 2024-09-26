import React from "react";

const AnalyticsCounter = ({ title, value, icon, subTitle }) => {
  return (
    <div className="bg-white text-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl min-w-[300px] min-h-[200px] flex flex-col justify-between">
      {/* First Row: Title and Subtitle */}
      <div>
        <div className="text-sm sm:text-lg font-bold md:text-3xl">{title}</div>
        <div className="text-xs sm:text-sm text-gray-500 md:text-xl">
          {subTitle}
        </div>
      </div>

      {/* Second Row: Icon and Value in Columns */}
      <div className="flex justify-between items-center">
        <div className="text-blue-400">{icon}</div>
        <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800">
          {value}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCounter;
