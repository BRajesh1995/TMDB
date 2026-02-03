import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";
import MediaDetailsModal from "../../components/MediaDetailsModal";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_TRENDING_MOVIES_BASE_URL = import.meta.env.VITE_TRENDING_MOVIES_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoader(true);
      try {
        const url = `${TMDB_TRENDING_MOVIES_BASE_URL}?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);
        const movieData = response?.data?.results?.slice(0, 5);
        setMovies(
          movieData.map((movie) => ({
            ...movie, // Keep all data for passing to modal if needed
            title: movie?.title,
            bannerImage: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
          }))
        );
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: "Failed to load movies. Please try again." });
      } finally {
        setLoader(false);
      }
    };
    fetchMovies();
  }, [TMDB_API_KEY, TMDB_TRENDING_MOVIES_BASE_URL]);

  // Automatically close snackbar after 5 seconds when open
  useEffect(() => {
    let timer;
    if (snackbar.open) {
      timer = setTimeout(() => {
        setSnackbar(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [snackbar.open]);

  // Auto-scroll effect
  useEffect(() => {
    if (movies.length === 0 || selectedMovieId) return; // Pause auto-scroll when modal is open

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movies.length, selectedMovieId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const handleOpenInfo = (id) => {
    setSelectedMovieId(id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="relative group">
      {loader ? (
        <div className="h-[50vh] flex items-center justify-center bg-gray-900">
           <Spinner />
        </div>
      ) : (
        <>
          {movies?.length > 0 && (
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
              {/* Carousel Track */}
              <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {movies.map((movie, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full bg-cover bg-center flex items-end relative"
                    style={{ backgroundImage: `url(${movie?.bannerImage})` }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white pb-20 md:pb-24">
                       <div className="max-w-2xl space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
                          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{movie.title}</h1>
                          
                          <div className="flex items-center gap-3 text-sm md:text-base font-medium">
                              <span className="text-green-400">{Math.round(movie.vote_average * 10)}% Match</span>
                              <span>{movie.release_date?.split('-')[0]}</span>
                              <span className="border border-gray-500 px-1 rounded text-xs">HD</span>
                          </div>

                          <p className="text-gray-300 text-sm md:text-lg line-clamp-3 md:line-clamp-2 max-w-xl drop-shadow-md">
                            {movie.overview}
                          </p>

                          <div className="pt-4 flex gap-4">
                             <button 
                                onClick={() => handleOpenInfo(movie.id)}
                                className="flex items-center gap-2 bg-gray-500/80 hover:bg-gray-600 text-white px-6 py-2.5 rounded text-sm md:text-base font-semibold transition-colors backdrop-blur-sm"
                             >
                                <Info size={20} />
                                More Info
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full cursor-pointer transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300 hover:scale-110"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full cursor-pointer transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300 hover:scale-110"
                onClick={handleNext}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {movies.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-gray-500/50'}`}
                    />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {selectedMovieId && (
        <MediaDetailsModal 
          type="movie" 
          id={selectedMovieId} 
          onClose={handleCloseModal} 
        />
      )}
      
      {snackbar && (
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        />
      )}
    </div>
  );
};

export default Banner;
