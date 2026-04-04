import React, { useState } from "react";
import { register } from "../../api/authApi";
import DootsLoader from "../Loader/DootsLoader";

const Register = () => {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    nomor_hp: "",
    password: "",
    role_id: "R002",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: "" });

    try {
      const res = await register(form);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Registrasi berhasil! Silakan masuk." });
      } else {
        setMessage({ type: "error", text: res.message || "Registrasi gagal." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan saat pendaftaran." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <DootsLoader />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {message.text && (
        <div className={`p-4 rounded-xl border-l-4 flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
          message.type === "success" 
            ? "bg-green-50 border-green-500 text-green-700" 
            : "bg-red-50 border-red-500 text-red-700"
        }`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Contoh: Budi Santoso"
            className="input-field py-2.5"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Nomor Ponsel</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-brand-600 transition-colors">+62</span>
            <input
              type="number"
              name="nomor_hp"
              value={form.nomor_hp}
              onChange={handleChange}
              placeholder="812xxxxx"
              className="input-field py-2.5 pl-14"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Masukkan alamat lengkap"
            className="input-field py-2.5 min-h-[80px] resize-none"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            className="input-field py-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-4 text-base shadow-xl shadow-brand-500/20 mt-4"
        >
          Daftar Sekarang
        </button>

        <p className="text-center text-sm text-gray-500 font-medium pt-2">
          Sudah punya akun?{" "}
          <button type="button" className="text-brand-600 hover:text-brand-700 font-bold">
            Masuk sekarang
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
