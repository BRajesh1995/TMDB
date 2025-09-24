import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import PageNotFound from "./pages/PageNotFound";
import MovieContextWrapper from "./context/MovieContextWrapper";

function App() {
  return (
    <>
      <MovieContextWrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/watchList" element={<WatchList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MovieContextWrapper>
    </>
  );
}

export default App;
