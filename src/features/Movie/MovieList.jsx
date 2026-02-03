import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import MediaCard from "../../components/MediaCard";
import MediaDetailsModal from "../../components/MediaDetailsModal";

const MovieList = ({ movies }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMovieId = searchParams.get("id");
  const { watchList, addToWatchList, removeFromWatchList } = useContext(MovieContext);

  const checkMovieInWatchList = (movie) => {
    return watchList.find((m) => m.id === movie.id) ? true : false;
  };

  const handleToggleWatchList = (movie) => {
     if (checkMovieInWatchList(movie)) {
         removeFromWatchList(movie);
     } else {
         addToWatchList(movie);
     }
  };

  const handleOpenDetails = (movie) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("id", movie.id);
    setSearchParams(newParams);
  };

  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("id");
    setSearchParams(newParams);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap gap-8" data-testid="movie-list">
        {movies?.length > 0 &&
          movies.map((movie, index) => {
            return (
              <div key={index}>
                <MediaCard 
                    data={movie} 
                    isInWatchList={checkMovieInWatchList(movie)}
                    onToggleWatchList={handleToggleWatchList}
                    onClick={() => handleOpenDetails(movie)}
                />
              </div>
            );
          })}
      </div>
      
      {selectedMovieId && (
          <MediaDetailsModal 
            type="movie" 
            id={selectedMovieId} 
            onClose={handleCloseModal} 
          />
      )}
    </>
  );
};

export default MovieList;
