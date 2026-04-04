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
    <div className="w-full space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 ml-1">Nomor Ponsel</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-brand-600 transition-colors">+62</span>
            <input
              type="number"
              value={nomor_hp}
              onChange={(e) => setNomorHp(e.target.value)}
              placeholder="812xxxxx"
              className="input-field pl-14"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <a href="#" className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">Lupa Password?</a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-field"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-4 text-base shadow-xl shadow-brand-500/20"
        >
          Masuk Sekarang
        </button>
      </form>
      
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-400 font-bold">Atau Masuk Dengan</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm text-gray-700">
          Google
        </button>
        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm text-gray-700">
          Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
