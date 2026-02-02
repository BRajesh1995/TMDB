import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import Snackbar from "../../components/Snackbar";

const TvInfo = ({ show, handleCloseModel }) => {
  const { id, name, poster_path, overview, first_air_date, vote_average } = show;
  const [loader, setLoader] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [snackbar, setSnackbar] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const trailerObj = response?.data?.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerObj) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
        }
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to load trailer. Please try again." });
      } finally {
        setLoader(false);
      }
    };
    fetchTrailer();
  }, [id, TMDB_API_KEY]);

  useEffect(() => {
    let timer;
    if (snackbar.open) {
      timer = setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [snackbar.open]);

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-[35vw] max-h-[90vh] overflow-auto">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row md:flex-row gap-6">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={`${name} poster`}
                className="w-1/3 min-w-[100px] max-h-[250px] rounded-lg object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-1/3 min-w-[100px] bg-gray-200 rounded-lg">
                No Image Available
              </div>
            )}

            <div className="flex flex-col gap-2 overflow-auto">
              <h2 className="text-2xl font-bold text-blue-500">{name}</h2>
              <p className="text-gray-500 font-bold">First Air Date: {first_air_date}</p>
              <p className="font-bold">Average Rating: {vote_average ? vote_average.toFixed(1) : "N/A"}</p>
              <p className="break-words">{overview ? overview : "No overview Available"}</p>
            </div>
          </div>
          <div className="mt-4 w-full">
            <h3 className="font-bold mb-3">Trailer</h3>
            {trailerUrl ? (
              <iframe
                src={trailerUrl}
                className="w-full h-50 rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="TV Show Trailer"
              ></iframe>
            ) : (
              <p>No Trailer Available</p>
            )}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white rounded-lg font-bold px-5 py-2 cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={handleCloseModel}
          >
            Close
          </button>
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

export default TvInfo;
