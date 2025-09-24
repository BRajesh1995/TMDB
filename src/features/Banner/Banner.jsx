import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snackbar, setSnackbar] = useState(false);

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
            title: movie?.title,
            bannerImage: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
          }))
        );
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load movies. Please try again." });
      } finally {
        setLoader(false);
      }
    };
    fetchMovies();
  }, []);

  // Automatically close snackbar after 3 seconds when open
  useEffect(() => {
    let timer;
    if (snackbar.open) {
      timer = setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [snackbar.open]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
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
          {movies?.length > 0 && (
            <div className="relative h-[50vh] ">
              <div
                className="h-full bg-cover bg-center flex items-end transition duration-500"
                style={{ backgroundImage: `url(${movies[currentIndex]?.bannerImage})` }}
              >
                <div className="text-white w-full text-center text-2xl p-4 bg-black/50 ">
                  {movies[currentIndex].title}
                </div>
              </div>
              <button
                className="absolute left-2 top-1/2 text-white bg-black/50 p-2 cursor-pointer"
                onClick={handlePrev}
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute right-2 top-1/2 text-white bg-black/50 p-2 cursor-pointer"
                onClick={handleNext}
              >
                <ChevronRight />
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

export default Banner;
