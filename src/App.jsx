import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import PageNotFound from "./pages/PageNotFound";
import MovieContextWrapper from "./context/MovieContextWrapper";

import TvPage from "./pages/TvPage";

function App() {
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
