import React, { useEffect, useState } from "react";
import {
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "../../api/kategoriApi";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import KategoriItem from "../../component/KategoriComponent/KategoriItem";
import TableLoader from "../../component/Loader/TableLoader";
// import { button } from "@/components/ui/button";

const KategoriAdmin = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nama_kategori: "" });
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredKategori = kategoriList.filter((kategori) => {
    console.log(kategori);
    const term = searchTerm.toLowerCase();
    return kategori.nama_kategori?.toLowerCase().includes(term);
  });

  // ambil semua kategori
  const fetchKategori = async () => {
    try {
      setLoading(true);
      const res = await getKategori();
      //   console.log("Response getKategori:", res);

      if (res && res.success) {
        const formatted = (res.data || []).map((item) => ({
          id: item.id,
          ...item.data, // 🔥 ini akan menaruh nama_kategori di level atas
        }));
        setKategoriList(formatted);
      } else {
        setKategoriList([]);
      }
    } catch (err) {
      console.error("Error fetchKategori:", err);
      setKategoriList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // handle input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle tambah/update kategori
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (editMode) {
      res = await updateKategori(selectedId, formData);
    } else {
      res = await createKategori(formData);
    }

    if (res.success) {
      alert(
        editMode
          ? "Kategori berhasil diperbarui!"
          : "Kategori berhasil ditambahkan!"
      );
      setShowModal(false);
      setFormData({ nama_kategori: "" });
      setEditMode(false);
      fetchKategori();
    } else {
      alert(res.message || "Terjadi kesalahan");
    }
  };

  // handle hapus kategori
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus kategori ini?")) {
      const res = await deleteKategori(id);
      if (res.success) {
        alert("Kategori berhasil dihapus!");
        fetchKategori();
      } else {
        alert(res.message || "Gagal menghapus kategori");
      }
    }
  };

  // buka modal untuk edit
  const openEditModal = (kategori) => {
    setFormData({ nama_kategori: kategori.nama_kategori });
    setSelectedId(kategori.id);
    setEditMode(true);
    setShowModal(true);
  };

  // buka modal untuk tambah
  const openTambahModal = () => {
    setFormData({ nama_kategori: "" });
    setEditMode(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manajemen Kategori
            </h2>
            <p className="text-gray-500 text-sm">Kelola Kategori Barang Anda</p>
          </div>
          <button
            onClick={openTambahModal}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
          >
            + Tambah Kategori
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Search Bar */}
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Cari Kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-8 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition">
            <Search className="w-5 h-5" />
          </button>
          <div className="text-sm text-gray-500 mt-2">
          Menampilkan {filteredKategori.length} dari {kategoriList.length} kategori
        </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Nama Kategori</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">
                  <TableLoader />
                </td>
              </tr>
            ) : (
              filteredKategori.map((kategori, index) => (
                <KategoriItem
                  key={index}
                  kategori={kategori}
                  index={index}
                  openEditModal={openEditModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? "Edit Kategori" : "Tambah Kategori"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nama Kategori</label>
                <input
                  type="text"
                  name="nama_kategori"
                  value={formData.nama_kategori}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button type="submit">
                  {editMode ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KategoriAdmin;
