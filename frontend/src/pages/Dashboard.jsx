import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL;
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  const fetchFav = async () => {
    const res = await axios.get(`${API}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites(res.data);
  };

  const removeFav = async (id) => {
    const res = await axios.delete(`${API}/favorites/remove/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites(res.data);
  };

  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((f) => (
          <div key={f.id} className="bg-white rounded shadow p-2">
            {f.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${f.poster_path}`}
                alt={f.title}
                className="w-full rounded"
              />
            )}
            <h3 className="mt-2 text-sm font-semibold">{f.title}</h3>
            <button
              onClick={() => removeFav(f.id)}
              className="bg-red-600 text-white px-2 py-1 mt-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
