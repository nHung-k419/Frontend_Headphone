import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-10">
      <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-blue-500"></div>
    </div>
  );
};

export default Loading;
