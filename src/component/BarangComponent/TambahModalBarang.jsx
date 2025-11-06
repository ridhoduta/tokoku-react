import React, { useState, useEffect } from "react";
import { updateBarang, createBarang } from "../../api/barangApi";
import { getKategori } from "../../api/kategoriApi";
import { X } from "lucide-react";

const TambahModalBarang = ({
  isOpen,
  onClose,
  initialData = {},
  loadBarang,
}) => {
  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori_id: "",
    harga_barang: "",
    stok_barang: "",
    gambar_barang: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  // load kategori dari API
  const loadKategori = async () => {
    const res = await getKategori();

    let data = [];
    if (Array.isArray(res)) {
      data = res;
    } else if (res.success) {
      data = res.data;
    } else {
      console.error(res.message);
    }

    setKategori(data);
  };

  // isi form kalau edit
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama_barang: initialData.nama_barang || "",
        kategori_id: initialData.kategori_id || "",
        harga_barang: initialData.harga_barang || "",
        stok_barang: initialData.stok_barang || "",
      });
      setEditingId(initialData.id || null);
      loadKategori();
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, gambar_barang: e.target.files[0] });
  };

  // simpan barang (create / update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        payload.append(key, formData[key]);
      }
    });

    setLoading(true); // ✅ aktifkan loader di sini

    let res;
    if (editingId) {
      res = await updateBarang(editingId, payload);
    } else {
      res = await createBarang(payload);
    }

    setLoading(false); // ✅ matikan loader setelah selesai

    if (res.success) {
      alert("Barang berhasil ditambah");
      await loadBarang();
      onClose();
    } else {
      alert(res.message || "Terjadi kesalahan");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <span className="mt-3 text-gray-700 font-medium">
          Menyimpan produk...
        </span>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white rounded-lg shadow-2xl w-full max-w-md z-50 p-8"
      >
        {/* Header + Tombol Close */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Tambah Produk Baru
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Produk */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Masukkan nama produk"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Kategori
            </label>
            <select
              name="kategori_id"
              value={formData.kategori_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            >
              <option value="">-- Pilih Kategori --</option>
              {kategori.map((kat) => (
                <option key={kat.data.kategori_id} value={kat.data.kategori_id}>
                  {kat.data.nama_kategori}
                </option>
              ))}
            </select>
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Harga
              </label>
              <input
                type="number"
                name="harga_barang"
                value={formData.harga_barang}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Stok
              </label>
              <input
                type="number"
                name="stok_barang"
                value={formData.stok_barang}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="0"
              />
            </div>
          </div>
          {/* Gambar Barang */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Gambar Barang
            </label>
            <input
              type="file"
              name="gambar_barang"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 border-2 border-purple-600 text-purple-600 
                  rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg 
                  font-medium hover:bg-purple-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TambahModalBarang;
