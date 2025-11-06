import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // <-- pakai service
import { updateBarang } from "../../api/barangApi";

const EditModalBarang = ({ isOpen, onClose, barang, kategori, loadBarang }) => {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_barang: "",
    stok_barang: "",
    kategori_id: "",
  });

  // isi form saat modal terbuka
  useEffect(() => {
    if (barang) {
      setFormData({
        nama_barang: barang.nama_barang || "",
        harga_barang: barang.harga_barang || "",
        stok_barang: barang.stok_barang || "",
        kategori_id: barang.kategori_id || "",
      });
    }
  }, [barang]);

  if (!isOpen) return null;
//   console.log(barang)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateBarang(barang.barang_id, formData); // <-- pakai id

      if (res.success) {
        alert("berhasil diperbaharui")
        await loadBarang(); // refresh data parent
        onClose(); // tutup modal
      } else {
        alert(res.message || "Gagal update barang");
      }
    } catch (error) {
      console.error("Gagal update barang:", error);
      alert("Terjadi kesalahan saat update barang");
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Edit Produk</h2>
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

export default EditModalBarang;
