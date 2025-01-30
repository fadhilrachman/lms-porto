import React from "react";

const SckeletonLoading = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
      <div className="w-full h-48 bg-gray-700 animate-pulse" />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-700 rounded w-2/3 animate-pulse" />
          <div className="h-6 bg-gray-700 rounded w-16 animate-pulse" />
        </div>

        <div className="h-4 bg-gray-700 rounded w-24 mb-3 animate-pulse" />

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse" />
            <div className="w-4 h-4 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SckeletonLoading;
