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
    satuan_utama: "",
    stok_barang: "",

    // satuan PCS
    harga_barang: "",

    // satuan DUS
    isi_per_dus: "",
    harga_dus: "",
    harga_pcs: "",

    // satuan KG
    harga_per_kg: "",
    harga_per_500g: "",
    harga_per_250g: "",

    gambar_barang: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load kategori
  const loadKategori = async () => {
    const res = await getKategori();

    let data = [];
    if (Array.isArray(res)) data = res;
    else if (res.success) data = res.data;
    else console.error(res.message);

    setKategori(data);
  };

  // Isi form saat edit
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama_barang: initialData.nama_barang || "",
        kategori_id: initialData.kategori_id || "",
        satuan_utama: initialData.satuan_utama || "",
        stok_barang: initialData.stok_barang || "",

        // satuan PCS
        harga_barang: initialData.harga_pcs || "",

        // satuan DUS
        isi_per_dus: initialData.isi_per_dus || "",
        harga_dus: initialData.harga_dus || "",
        harga_pcs: initialData.harga_pcs || "",

        // satuan KG
        harga_per_kg: initialData.harga_per_kg || "",
        harga_per_500g: initialData.harga_per_500g || "",
        harga_per_250g: initialData.harga_per_250g || "",
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

  // Submit barang sesuai satuan
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    // Data umum
    payload.append("nama_barang", formData.nama_barang);
    payload.append("kategori_id", formData.kategori_id);
    payload.append("satuan_utama", formData.satuan_utama);
    payload.append("stok_barang", formData.stok_barang);

    // Data sesuai satuan utama
    if (formData.satuan_utama === "pcs") {
      payload.append("harga_barang", formData.harga_barang);
    }

    if (formData.satuan_utama === "dus") {
      payload.append("isi_per_dus", formData.isi_per_dus);
      payload.append("harga_dus", formData.harga_dus);
      payload.append("harga_pcs", formData.harga_pcs);
    }

    if (formData.satuan_utama === "kg") {
      payload.append("harga_per_kg", formData.harga_per_kg);
      payload.append("harga_per_500g", formData.harga_per_500g);
      payload.append("harga_per_250g", formData.harga_per_250g);
    }

    // Upload gambar
    if (formData.gambar_barang) {
      payload.append("gambar_barang", formData.gambar_barang);
    }

    setLoading(true);

    let res;
    if (editingId) res = await updateBarang(editingId, payload);
    else res = await createBarang(payload);

    setLoading(false);

    if (res.success) {
      alert("Barang berhasil disimpan");
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
        bg-white rounded-lg shadow-2xl w-full max-w-md z-50 p-8
        overflow-y-auto max-h-[80vh]"
      >
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingId ? "Edit Produk" : "Tambah Produk Baru"}
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

          {/* Satuan Utama */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Satuan Utama
            </label>
            <select
              name="satuan_utama"
              value={formData.satuan_utama}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            >
              <option value="">-- Pilih Satuan --</option>
              <option value="pcs">PCS</option>
              <option value="dus">DUS</option>
              <option value="kg">KG</option>
            </select>
          </div>

          {/* Dynamic field berdasarkan satuan */}
          {formData.satuan_utama === "pcs" && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Harga per PCS
              </label>
              <input
                type="number"
                name="harga_barang"
                value={formData.harga_barang}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                placeholder="Harga per pcs"
              />
            </div>
          )}

          {formData.satuan_utama === "dus" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Isi per Dus (PCS)
                </label>
                <input
                  type="number"
                  name="isi_per_dus"
                  value={formData.isi_per_dus}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Contoh: 12 pcs"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Harga per Dus
                </label>
                <input
                  type="number"
                  name="harga_dus"
                  value={formData.harga_dus}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Harga 1 dus"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Harga per PCS
                </label>
                <input
                  type="number"
                  name="harga_pcs"
                  value={formData.harga_pcs}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Harga 1 pcs"
                />
              </div>
            </>
          )}

          {formData.satuan_utama === "kg" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Harga per Kilogram
                </label>
                <input
                  type="number"
                  name="harga_per_kg"
                  value={formData.harga_per_kg}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Harga per 1 kg"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Harga per 500 Gram
                </label>
                <input
                  type="number"
                  name="harga_per_500g"
                  value={formData.harga_per_500g}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Harga per 500g"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Harga per 250 Gram
                </label>
                <input
                  type="number"
                  name="harga_per_250g"
                  value={formData.harga_per_250g}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                  placeholder="Harga per 250g"
                />
              </div>
            </>
          )}

          {/* Stok */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Stok (dalam satuan dasar)
            </label>
            <input
              type="number"
              name="stok_barang"
              value={formData.stok_barang}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder={
                formData.satuan_utama === "kg"
                  ? "Masukkan stok dalam gram"
                  : "Masukkan stok dalam pcs"
              }
            />
          </div>

          {/* Gambar */}
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

          {/* Tombol */}
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
