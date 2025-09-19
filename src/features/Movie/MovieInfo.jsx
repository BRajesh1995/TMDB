import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

const MovieInfo = ({ movie, handleCloseModel }) => {
  const { id, title, poster_path, overview, release_date, vote_average } = movie;
  const [loader, setLoader] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const trailerObj = response?.data?.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerObj) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchTrailer();
  }, []);

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-[35vw] max-h-[90vh] overflow-auto">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row md:flex-row gap-6">
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt={`${title} poster`}
                className="w-1/3 min-w-[100px] max-h-[250px] rounded-lg object-cover"
              />
            ) : (
              <div>No Image Not Available</div>
            )}

            <div className="flex flex-col gap-2 overflow-auto">
              <h2 className="text-2xl font-bold text-blue-500">{title}</h2>
              <p className="text-gray-500 font-bold">Release Date: {release_date}</p>
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
                title="Movie Trailer"
              ></iframe>
            ) : (
              <p>No Trailer Available</p>
            )}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white rounded-lg font-bold px-5 py-2 cursor-pointer"
            onClick={handleCloseModel}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default MovieInfo;
