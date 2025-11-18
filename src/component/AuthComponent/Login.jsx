import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import DootsLoader from "../../component/Loader/DootsLoader";

const LoginPage = () => {
  const [nomor_hp, setNomorHp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ nomor_hp, password });

      if (res.success) {
        const role = res.data.role_id;

        if (role === "R001") {
          navigate("/admin/dashboard");
        } else if (role === "R002") {
          navigate("/pelanggan/home");
        }
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fullscreen loader
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <DootsLoader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold">Selamat Datang</h1>
      <p className="text-gray-600">Masuk ke akun Anda</p>

      {error && <p className="text-red-500">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2">Nomor Ponsel</label>
          <input
            type="number"
            value={nomor_hp}
            onChange={(e) => setNomorHp(e.target.value)}
            placeholder="+62"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
