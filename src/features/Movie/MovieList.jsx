import { Heart, ThumbsDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import MovieInfo from "./MovieInfo";

const MovieList = ({ movies }) => {
  const [watchList, setWatchList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    //Page refresh
    const storedWatchList = localStorage.getItem("WatchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("WatchList", JSON.stringify(watchList));
  }, [watchList]);

  const checkMovieInwatchList = (movie) => {
    return watchList.find((m) => m.id === movie.id) ? true : false;
  };

  const addToWatchList = (movie) => {
    setWatchList((prevMovieList) => {
      const updateList = [...prevMovieList, movie];
      return updateList;
    });
  };

  const removeFromWatchList = (movie) => {
    setWatchList((prevMovieList) => {
      const filteredWatchList = prevMovieList.filter((m) => m.id !== movie.id);
      return filteredWatchList;
    });
  };

  //for open movie details page
  const handleOpenMoviedetails = (movie) => {
    setOpenModel(true);
    setSelectedMovie(movie);
  };

  //for close movie details page
  const handleCloseModel = () => {
    setOpenModel(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap gap-8">
        {movies?.length > 0 &&
          movies.map((movie, index) => {
            return (
              <div key={index}>
                <div
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}
                  className="h-[45vh] w-[180px] bg-center bg-cover rounded-xl flex flex-col justify-between items-center"
                >
                  <div className="flex w-full justify-end">
                    {checkMovieInwatchList(movie) ? (
                      <div
                        className="m-4 justify-center items-center bg-gray-900/50 rounded-2xl p-1 group cursor-pointer"
                        onClick={() => removeFromWatchList(movie)}
                      >
                        <ThumbsDown
                          color="#f59105"
                          className="transition-all"
                          fill="none"
                          style={{ transition: "fill 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.setAttribute("fill", "#f59105")}
                          onMouseLeave={(e) => e.currentTarget.setAttribute("fill", "none")}
                        />
                      </div>
                    ) : (
                      <div
                        className="m-4 justify-center items-center bg-gray-900/50 rounded-2xl p-1 group cursor-pointer"
                        onClick={() => addToWatchList(movie)}
                      >
                        <Heart
                          size={24}
                          color="#ec0909"
                          strokeWidth={2.3}
                          className="transition-all"
                          fill="none"
                          style={{ transition: "fill 0.2s" }}
                          // Tailwind can't handle hover:fill for SVG, so use group-hover with inline style
                          onMouseEnter={(e) => e.currentTarget.setAttribute("fill", "#ec0909")}
                          onMouseLeave={(e) => e.currentTarget.setAttribute("fill", "none")}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="text-white w-full bg-gray-900/70 text-center rounded-xl p-1 hover:cursor-pointer"
                    onClick={() => handleOpenMoviedetails(movie)}
                  >
                    {movie?.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {openModel && (
        <div className="fixed inset-1 z-50 backdrop-blur-sm bg-black/30 h-screen overflow-y-auto flex justify-center items-center">
          <MovieInfo movie={selectedMovie} handleCloseModel={handleCloseModel} />
        </div>
      )}
    </>
  );
};

export default MovieList;
