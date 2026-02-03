import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";
import MediaDetailsModal from "../../components/MediaDetailsModal";

const TvBanner = () => {
  const [shows, setShows] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_TRENDING_TV_URL = "https://api.themoviedb.org/3/trending/tv/day";

  useEffect(() => {
    const fetchTrendingShows = async () => {
      setLoader(true);
      try {
        const url = `${TMDB_TRENDING_TV_URL}?api_key=${TMDB_API_KEY}`;
        const response = await axios.get(url);
        const tvData = response?.data?.results?.slice(0, 5);
        setShows(
          tvData.map((show) => ({
             ...show,
            name: show?.name || show?.original_name, // TV shows typically use 'name'
            bannerImage: `https://image.tmdb.org/t/p/original/${show?.backdrop_path}`,
          }))
        );
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: "Failed to load trending TV shows. Please try again." });
      } finally {
        setLoader(false);
      }
    };
    fetchTrendingShows();
  }, [TMDB_API_KEY]);

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
    if (shows.length === 0 || selectedShowId) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [shows.length, selectedShowId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? shows.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const handleOpenInfo = (id) => {
    setSelectedShowId(id);
  };

  const handleCloseModal = () => {
    setSelectedShowId(null);
  };

  return (
    <div className="relative group">
      {loader ? (
        <div className="h-[50vh] flex items-center justify-center bg-gray-900">
           <Spinner />
        </div>
      ) : (
        <>
          {shows?.length > 0 && (
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
              {/* Carousel Track */}
              <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {shows.map((show, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full bg-cover bg-center flex items-end relative"
                    style={{ backgroundImage: `url(${show?.bannerImage})` }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white pb-20 md:pb-24">
                       <div className="max-w-2xl space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
                          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{show.name}</h1>
                          
                          <div className="flex items-center gap-3 text-sm md:text-base font-medium">
                              <span className="text-green-400">{Math.round(show.vote_average * 10)}% Match</span>
                              <span>{show.first_air_date?.split('-')[0]}</span>
                              <span className="border border-gray-500 px-1 rounded text-xs">HD</span>
                          </div>

                          <p className="text-gray-300 text-sm md:text-lg line-clamp-3 md:line-clamp-2 max-w-xl drop-shadow-md">
                            {show.overview}
                          </p>

                          <div className="pt-4 flex gap-4">
                             <button 
                                onClick={() => handleOpenInfo(show.id)}
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
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full cursor-pointer transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300 hover:scale-110"
                onClick={handleNext}
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {shows.map((_, idx) => (
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

      {selectedShowId && (
        <MediaDetailsModal 
          type="tv" 
          id={selectedShowId} 
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

export default TvBanner;
