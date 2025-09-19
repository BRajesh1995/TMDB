import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Pagination = ({ pageNo, handleNext, handlePrev }) => {
  return (
    <div className="flex justify-center items-center bg-gray-700 text-white gap-4 pt-2 mt-4">
      <button className="text-white bg-black/50 p-2 rounded-full" onClick={handlePrev}>
        <ChevronLeft />
      </button>
      <div className="text-lg font-semibold px-2 mx-4">{pageNo}</div>
      <button className="text-white bg-black/50 p-2 rounded-full" onClick={handleNext}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
