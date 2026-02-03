import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Snackbar from "./Snackbar";
import { X } from "lucide-react";

const MediaDetailsModal = ({ type, id, onClose }) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [snackbar, setSnackbar] = useState(false);

  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        // Fetch details (already have some from props, but could fetch full details if needed)
        // For trailers, we need to hit the videos endpoint
        const endpoint = type === "movie" ? "movie" : "tv";
        
        // Parallel fetching: Details (if needed) and Videos
        // Since we pass the full object from the list, we mainly need the trailer here.
        // But to be cleaner, let's fetch the full details to ensure we have everything fresh.
        const [detailsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/${endpoint}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
        ]);

        setData(detailsRes.data);

        const trailerObj = videosRes?.data?.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerObj) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
        }
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: "Failed to load details. Please try again." });
      } finally {
        setLoader(false);
      }
    };

    if (id) fetchData();
  }, [id, type, TMDB_API_KEY]);

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  if (!id) return null;

  const title = data?.title || data?.name;
  const date = data?.release_date || data?.first_air_date;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
       {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            aria-label="Close Modal"
        >
            <X size={20} />
        </button>

        {loader || !data ? (
          <div className="h-64 flex items-center justify-center">
             <Spinner />
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto">
             {/* Header Section with Backdrop */}
             <div className="relative h-64 md:h-80 bg-gray-900 shrink-0">
                {data.backdrop_path ? (
                    <img 
                        src={`https://image.tmdb.org/t/p/w780${data.backdrop_path}`} 
                        alt={title}
                        className="w-full h-full object-cover opacity-60"
                     />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Backdrop
                    </div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/80 to-transparent pt-20">
                    <h2 className="text-4xl font-bold text-gray-900 drop-shadow-sm">{title}</h2>
                    <div className="flex gap-4 mt-2 font-medium text-gray-700">
                        {date && <span>{new Date(date).getFullYear()}</span>}
                        {data.vote_average && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm flex items-center">
                                ★ {data.vote_average.toFixed(1)}
                            </span>
                        )}
                        {data.genres && (
                            <span className="text-gray-600">
                                {data.genres.map(g => g.name).join(", ")}
                            </span>
                        )}
                    </div>
                </div>
             </div>

             {/* Content Body */}
             <div className="p-6 md:p-8 space-y-8">
                 {/* Overview */}
                 <div>
                    <h3 className="text-xl font-bold mb-2">Overview</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{data.overview || "No overview available."}</p>
                 </div>

                 {/* Trailer */}
                 {trailerUrl && (
                     <div>
                         <h3 className="text-xl font-bold mb-4">Trailer</h3>
                         <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                             <iframe
                                src={trailerUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title={`${title} Trailer`}
                                allowFullScreen
                             ></iframe>
                         </div>
                     </div>
                 )}
             </div>
          </div>
        )}
      </div>

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

export default MediaDetailsModal;
