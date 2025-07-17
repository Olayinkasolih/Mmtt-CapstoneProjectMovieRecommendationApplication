import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');

  const fetchMovies = async (q = '') => {
    let url = `https://api.themoviedb.org/3/${
      q ? `search/movie?query=${q}` : 'discover/movie'
    }&api_key=${API_KEY}`;
    if (year) url += `&year=${year}`;
    const res = await axios.get(url);
    setMovies(res.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Movie Explorer</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies(search);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2 flex-1"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        >
          <option value="">All Years</option>
          {[2024, 2023, 2022, 2021].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies?.map((m) => (
          <div key={m.id} className="bg-white rounded shadow p-2">
            {m.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt={m.title}
                className="w-full rounded"
              />
            )}
            <h3 className="mt-2 text-sm font-semibold">{m.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
