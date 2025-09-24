import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
// import { getMovieRecommendations } from "../../helpers/Gemini";

const MovieRecommend = ({ watchList }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (watchList?.length <= 2) {
        return;
      }
      try {
        setLoader(true);
        const result = await getMovieRecommendations(watchList);
        setRecommendations(result?.recommendations);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchRecommendations();
  }, []);
  return (
    <div>
      <ArrowUpDown />
    </div>
  );
};

export default MovieRecommend;
