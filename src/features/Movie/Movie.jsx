import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import MovieList from "./MovieList";
import Snackbar from "../../components/Snackbar";

import { useSearchParams } from "react-router-dom";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get("page") || "1");
  const [snackbar, setSnackbar] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  const TMDB_TRENDING_MOVIES_BASE_URL = import.meta.env.VITE_TRENDING_MOVIES_BASE_URL;
  
  useEffect(() => {
    try {
      setLoader(true);
      const url = `${TMDB_TRENDING_MOVIES_BASE_URL}?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
      axios.get(url).then((response) => {
        const movieData = response?.data?.results;
        setMovies(movieData);
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: "Failed to load movies. Please try again." });
    } finally {
      setLoader(false);
    }
  }, [pageNo, TMDB_API_KEY, TMDB_TRENDING_MOVIES_BASE_URL]);

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
      if (pageNo > 1) {
          setSearchParams({ page: pageNo - 1 });
      }
  };
  const handleNext = () => {
      setSearchParams({ page: pageNo + 1 });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div className="pb-24">
          <div className="text-2xl font-bold text-center m-4">Trending Movies</div>
          <MovieList movies={movies} />
          <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
          {snackbar && (
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              onClose={handleCloseSnackbar}
              autoHideDuration={3000}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Movie;
