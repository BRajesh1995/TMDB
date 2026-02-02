import { ChevronLeft, ChevronRight } from "lucide-react";


const Pagination = ({ pageNo, handleNext, handlePrev }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-slate-900/90 backdrop-blur-md text-white gap-4 py-4 z-40 border-t border-slate-700">
      <button 
        className="text-white bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors" 
        onClick={handlePrev}
      >
        <ChevronLeft />
      </button>
      <div className="text-lg font-semibold px-2 mx-4">{pageNo}</div>
      <button 
        className="text-white bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors" 
        onClick={handleNext}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
