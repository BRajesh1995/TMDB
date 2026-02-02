import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import PageNotFound from "./pages/PageNotFound";
import MovieContextWrapper from "./context/MovieContextWrapper";
import React, { useEffect } from "react";

import TvPage from "./pages/TvPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/home":
        document.title = "TMDB - Home";
        break;
      case "/tv":
        document.title = "TMDB - TV Shows";
        break;
      case "/watchList":
        document.title = "TMDB - WatchList";
        break;
      default:
        document.title = "TMDB";
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <MovieContextWrapper>
        <NavBar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/watchList" element={<WatchList />} />
            <Route path="/tv" element={<TvPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </MovieContextWrapper>
    </>
  );
}

export default App;
