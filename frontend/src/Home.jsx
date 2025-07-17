import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const fetchMovies = async (q = '') => {
    let url = `https://api.themoviedb.org/3/${
      q ? `search/movie?query=${q}` : 'discover/movie'
    }&api_key=${TMDB_KEY}&sort_by=${sortBy}`;
    if (year) url += `&year=${year}`;
    const res = await axios.get(url);
    setMovies(res.data.results);
  };

  const addToFavorites = async (movie) => {
    if (!token) {
      alert('Please login to save favorites');
      return;
    }
    await axios.post(
      `${API}/favorites/add`,
      {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert(`${movie.title} added to favorites!`);
  };

  useEffect(() => {
    fetchMovies();
  }, [sortBy]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎬 Movie Explorer</h2>

      {/* Search & Filters */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchMovies(search);
        }}
        className="flex flex-wrap gap-2 mb-4"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="border p-2 flex-1"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        >
          <option value="">All Years</option>
          {[2024, 2023, 2022, 2021].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2"
        >
          <option value="popularity.desc">Popularity ↓</option>
          <option value="popularity.asc">Popularity ↑</option>
          <option value="vote_average.desc">Rating ↓</option>
          <option value="release_date.desc">Release Date ↓</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Movie Grid */}
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
            <p className="text-xs text-gray-500">
              ⭐ {m.vote_average} | 📅 {m.release_date}
            </p>

            {/* ADD TO FAVORITES BUTTON */}
            <button
              onClick={() => addToFavorites(m)}
              className="bg-green-600 text-white px-2 py-1 mt-2 rounded w-full"
            >
              ➕ Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
