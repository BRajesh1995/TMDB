import React, { useEffect, useState } from "react";

// 1st we need to crate the object
export const MovieContext = React.createContext();

const MovieContextWrapper = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    //Page refresh
    const storedWatchList = localStorage.getItem("ImdbWatchList");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ImdbWatchList", JSON.stringify(watchList));
  }, [watchList]);

  // Add to watchList
  const addToWatchList = (movie) => {
    setWatchList((prevMovieList) => {
      const updateList = [...prevMovieList, movie];
      return updateList;
    });
  };

  //remove form watchList
  const removeFromWatchList = (movie) => {
    setWatchList((prevMovieList) => {
      const filteredWatchList = prevMovieList.filter((m) => m.id !== movie.id);
      return filteredWatchList;
    });
  };

  // 2nd create a provider where you need to add  state and other utility functions
  return (
    <MovieContext.Provider value={{ watchList, setWatchList, addToWatchList, removeFromWatchList }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextWrapper;
