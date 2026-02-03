import { useContext, useState } from "react";
import genreids from "../../helpers/GenreIds";
import { ArrowUpDown, Trash2 } from "lucide-react";

import { MovieContext } from "../../context/MovieContext";

const WatchListTable = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  // const [showModal, setShowModal] = useState(false);

  const { watchList, setWatchList, removeFromWatchList } = useContext(MovieContext);

  // handling sorting functionality ascending and descending
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sortedWatchList = [...watchList].sort((a, b) => {
      if (newOrder === "asc") {
        return a.vote_average - b.vote_average;
      } else {
        return b.vote_average - a.vote_average;
      }
    });
    setWatchList(sortedWatchList);
  };

  return (
    <div className="p-5">
      {/* <button
        className="flex justify-center items-center bg-blue-400 hover:bg-blue-500 transition duration-300 h-[3rem] w-[14rem] text-white font-bold border border-blue-700 rounded-xl shadow-md cursor-pointer mx-[43%] my-4"
        onClick={() => setShowModal((prevState) => !prevState)}
      >
        Recommend Movies
      </button> */}

      {/* {showModal && <MovieRecommend watchList={watchList} />} */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-[3rem] w-[18rem] px-4 outline-none border border-slate-700 rounded-lg bg-gray-300"
        />
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-6 py-4 font-bold text-gray-900">Poster</th>
            <th className="px-6 py-4 font-bold text-gray-900">Name</th>
            <th className="px-6 py-4 font-bold text-gray-900">
              <div>
                <div className="flex gap-2">
                  Ratings <ArrowUpDown size={20} onClick={() => handleSort()} className="cursor-pointer" />
                </div>
              </div>
            </th>
            <th className="px-6 py-4 font-bold text-gray-900">Popularity</th>
            <th className="px-6 py-4 font-bold text-gray-900">Genre</th>
            <th className="px-6 py-4 font-bold text-gray-900">Release Date</th>
            <th className="px-6 py-4 font-bold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchList?.length > 0 &&
            watchList
              .filter((item) => {
                const title = item.title || item.name;
                return title?.toLowerCase().trim().includes(search.toLowerCase());
              })
              .map((item, idx) => {
                const title = item.title || item.name;
                const date = item.release_date || item.first_air_date;
                return (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100 ">
                    <td className="p-5">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                        alt={title}
                        className="h-20 w-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-5 flex items-center">{title}</td>
                    <td className="p-5 ">{item?.vote_average ? item.vote_average.toFixed(1) : "N/A"}</td>
                    <td className="p-5">{item?.popularity ? item.popularity.toFixed(0) : "N/A"}</td>
                    <td className="p-5">
                      {item?.genre_ids
                        ?.map((id) => genreids[id])
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td className="p-5">{date}</td>
                    <td className="p-5">
                      <button
                        className="text-red-500 cursor-pointer hover:bg-red-100 p-2 rounded-full transition-colors"
                        onClick={() => removeFromWatchList(item)}
                        title="Remove"
                      >
                        <Trash2 size={18} color="#ff0000" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchListTable;
