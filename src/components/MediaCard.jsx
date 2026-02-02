import React from "react";
import { Heart, ThumbsDown } from "lucide-react";

const MediaCard = ({ data, isInWatchList, onToggleWatchList, onClick }) => {
  const { title, name, backdrop_path } = data;
  const displayTitle = title || name;
  const imagePath = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : "https://via.placeholder.com/500x281?text=No+Image";

  return (
    <div className="h-[45vh] w-[180px] bg-center bg-cover rounded-xl flex flex-col justify-between items-center relative group/card shadow-lg transition-transform hover:scale-105 duration-300"
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-xl group-hover/card:bg-black/50 transition-colors pointer-events-none" />
      
      <div className="flex w-full justify-end z-10">
        <div
          className="relative m-4 justify-center items-center bg-gray-900/50 rounded-2xl p-1 group cursor-pointer hover:bg-gray-900/80 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchList(data);
          }}
        >
          {isInWatchList ? (
            <>
              <ThumbsDown
                color="#f59105"
                className="transition-all"
                fill="none"
                style={{ transition: "fill 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.setAttribute("fill", "#f59105")}
                onMouseLeave={(e) => e.currentTarget.setAttribute("fill", "none")}
              />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                Remove from watchlist
              </span>
            </>
          ) : (
            <>
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
                Add to watchlist
              </span>
            </>
          )}
        </div>
      </div>

      <div
        className="text-white w-full bg-gray-900/80 text-center rounded-b-xl p-2 hover:cursor-pointer break-words backdrop-blur-sm z-10"
        onClick={onClick}
      >
        <div className="font-semibold text-sm line-clamp-2">{displayTitle}</div>
      </div>
    </div>
  );
};

export default MediaCard;
