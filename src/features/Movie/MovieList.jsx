import { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContextWrapper";
import MediaCard from "../../components/MediaCard";
import MediaDetailsModal from "../../components/MediaDetailsModal";

const MovieList = ({ movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
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
    setSelectedMovieId(movie.id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap gap-8">
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
