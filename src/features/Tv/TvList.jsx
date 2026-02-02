import { Heart, ThumbsDown } from "lucide-react";
import { useContext, useState } from "react";
import TvInfo from "./TvInfo";
import { MovieContext } from "../../context/MovieContextWrapper";

const TvList = ({ shows }) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const { watchList, addToWatchList, removeFromWatchList } = useContext(MovieContext);

  const checkShowInWatchList = (show) => {
    return watchList.find((item) => item.id === show.id) ? true : false;
  };

  // Open TV show details
  const handleOpenShowDetails = (show) => {
    setOpenModel(true);
    setSelectedShow(show);
  };

  // Close TV show details
  const handleCloseModel = () => {
    setOpenModel(false);
    setSelectedShow(null);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap gap-8">
        {shows?.length > 0 &&
          shows.map((show, index) => {
            return (
              <div key={index}>
                <div
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${show?.backdrop_path})` }}
                  className="h-[45vh] w-[180px] bg-center bg-cover rounded-xl flex flex-col justify-between items-center relative group/card"
                >
                    {/* Overlay for better readability if needed, currently reusing MovieList style */}
                  <div className="flex w-full justify-end">
                    {checkShowInWatchList(show) ? (
                      <div
                        className="relative m-4 justify-center items-center bg-gray-900/50 rounded-2xl p-1 group cursor-pointer"
                        onClick={() => removeFromWatchList(show)}
                      >
                        <ThumbsDown
                          color="#f59105"
                          className="transition-all"
                          fill="none"
                          style={{ transition: "fill 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.setAttribute("fill", "#f59105")}
                          onMouseLeave={(e) => e.currentTarget.setAttribute("fill", "none")}
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Remove from watch list
                        </span>
                      </div>
                    ) : (
                      <div
                        className="relative m-4 justify-center items-center bg-gray-900/50 rounded-2xl p-1 group cursor-pointer"
                        onClick={() => addToWatchList(show)}
                      >
                        <Heart
                          size={24}
                          color="#ec0909"
                          strokeWidth={2.3}
                          className="transition-all"
                          fill="none"
                          style={{ transition: "fill 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.setAttribute("fill", "#ec0909")}
                          onMouseLeave={(e) => e.currentTarget.setAttribute("fill", "none")}
                        />
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          Add to watch list
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className="text-white w-full bg-gray-900/70 text-center rounded-xl p-1 hover:cursor-pointer break-words"
                    onClick={() => handleOpenShowDetails(show)}
                  >
                    {show?.name}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {openModel && (
        <div className="fixed inset-1 z-50 backdrop-blur-sm bg-black/30 h-screen overflow-y-auto flex justify-center items-center">
          <TvInfo show={selectedShow} handleCloseModel={handleCloseModel} />
        </div>
      )}
    </>
  );
};

export default TvList;
