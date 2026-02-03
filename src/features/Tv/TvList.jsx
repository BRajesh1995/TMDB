import { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import MediaCard from "../../components/MediaCard";
import MediaDetailsModal from "../../components/MediaDetailsModal";

const TvList = ({ shows }) => {
  const [selectedShowId, setSelectedShowId] = useState(null);
  const { watchList, addToWatchList, removeFromWatchList } = useContext(MovieContext);

  const checkShowInWatchList = (show) => {
    return watchList.find((item) => item.id === show.id) ? true : false;
  };

  const handleToggleWatchList = (show) => {
     if (checkShowInWatchList(show)) {
         removeFromWatchList(show);
     } else {
         addToWatchList(show);
     }
  };

  const handleOpenDetails = (show) => {
    setSelectedShowId(show.id);
  };

  const handleCloseModal = () => {
    setSelectedShowId(null);
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap gap-8">
        {shows?.length > 0 &&
          shows.map((show, index) => {
            return (
              <div key={index}>
                <MediaCard 
                    data={show} 
                    isInWatchList={checkShowInWatchList(show)}
                    onToggleWatchList={handleToggleWatchList}
                    onClick={() => handleOpenDetails(show)}
                />
              </div>
            );
          })}
      </div>
      
      {selectedShowId && (
          <MediaDetailsModal 
            type="tv" 
            id={selectedShowId} 
            onClose={handleCloseModal} 
          />
      )}
    </>
  );
};

export default TvList;
