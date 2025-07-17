import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API = import.meta.env.VITE_API_URL;

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      window.location = '/dashboard';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="border p-2 w-full"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
