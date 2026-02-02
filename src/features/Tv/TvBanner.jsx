import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";

const TvBanner = () => {
  const [shows, setShows] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState(false);

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
            name: show?.name || show?.original_name, // TV shows typically use 'name'
            bannerImage: `https://image.tmdb.org/t/p/original/${show?.backdrop_path}`,
          }))
        );
      } catch (error) {
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
    if (shows.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [shows.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? shows.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <>
          {shows?.length > 0 && (
            <div className="relative h-[50vh] overflow-hidden group">
              {/* Carousel Track */}
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {shows.map((show, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full bg-cover bg-center flex items-end relative"
                    style={{ backgroundImage: `url(${show?.bannerImage})` }}
                  >
                    <div className="text-white w-full text-center text-2xl p-4 bg-gradient-to-t from-black/80 to-transparent pb-8">
                      {show.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-full cursor-pointer transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-full cursor-pointer transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </>
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
