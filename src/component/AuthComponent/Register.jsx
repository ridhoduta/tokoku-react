import React, { useState } from "react"; // pastikan path benar
import { register } from "../../api/authApi";

const Register = () => {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    nomor_hp: "",
    password: "",
    role_id:"R002",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await register(form);
      setMessage(res.message || "Registrasi berhasil");
    } catch (err) {
      setMessage("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
      return (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <DootsLoader />
        </div>
      );
    }

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daftar Akun</h1>
        <p className="text-gray-600 mt-2">Buat akun baru Anda</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alamat
          </label>
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="JL.Kihajar Dewantoro"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Ponsel
          </label>
          <input
            type="number"
            name="nomor_hp"
            value={form.nomor_hp}
            onChange={handleChange}
            placeholder="+62"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Daftar
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}

        <div className="text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <span className="text-cyan-500 hover:text-cyan-600 font-medium cursor-pointer">
            Masuk sekarang
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
