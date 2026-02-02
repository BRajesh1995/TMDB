import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import TvList from "./TvList";
import Snackbar from "../../components/Snackbar";

import { useSearchParams } from "react-router-dom";

const TV = () => {
  const [shows, setShows] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get("page") || "1");
  const [snackbar, setSnackbar] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
  // Using the discovered URL provided by user or standard discover endpoint
  const TMDB_TV_URL = import.meta.env.VITE_TV_SHOWS_BASE_URL;

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoader(true);
        const url = `${TMDB_TV_URL}?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`;
        const response = await axios.get(url);
        const tvData = response?.data?.results;
        setShows(tvData);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load TV shows. Please try again." });
      } finally {
        setLoader(false);
      }
    };
    fetchTvShows();
  }, [pageNo, TMDB_API_KEY]);

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
          <div className="text-2xl font-bold text-center m-4">Trending TV Shows</div>
          <TvList shows={shows} />
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

export default TV;
