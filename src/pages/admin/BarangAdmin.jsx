import React, { useState, useEffect } from "react";
import BarangList from "../../component/BarangComponent/BarangList";
import { deleteBarang, getBarang } from "../../api/barangApi";
import { getKategori } from "../../api/kategoriApi";
import TambahModalBarang from "../../component/BarangComponent/TambahModalBarang";
import EditModalBarang from "../../component/BarangComponent/EditModalBarang";

const BarangAdmin = () => {
  const [products, setProducts] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  // statistik
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [barang, setBarang] = useState([]);

  // load barang
  const loadBarang = async () => {
    const res = await getBarang();

    let data = [];
    if (Array.isArray(res)) {
      data = res;
    } else if (res.data) {
      data = res.data;
    } else {
      console.error(res.message);
    }

    setProducts(data);
    setLoading(false);

    // hitung statistik barang
    setTotalProducts(data.length);
    setTotalStock(
      data.reduce((acc, item) => acc + (parseInt(item.stock) || 0), 0)
    );
  };

  // load kategori
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
    setTotalCategories(data.length);
  };

  useEffect(() => {
    loadBarang();
    loadKategori();
  }, []);

  // hapus barang
  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus barang ini?")) {
      const res = await deleteBarang(id);
      if (res.success) {
        alert("Barang dihapus");
        loadBarang();
      } else {
        alert(res.message);
      }
    }
  };
  const handleEdit = (barang) => {
    setBarang(barang);
    setIsModalEditOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manajemen Produk
            </h2>
            <p className="text-gray-500 text-sm">Kelola Produk Sembako Anda</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 w-full md:w-auto"
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      {/* Statistik Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Produk</p>
          <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Stok Total</p>
          <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Kategori</p>
          <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Kategori</p>
          <p className="text-2xl font-bold text-gray-800">{totalCategories}</p>
        </div>
      </div>

      <BarangList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
      <TambahModalBarang
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loadBarang={loadBarang}
      />
      <EditModalBarang
        isOpen={isModalEditOpen}
        barang={barang}
        kategori={kategori}
        onClose={() => setIsModalEditOpen(false)}
        loadBarang={loadBarang}
      />
    </>
  );
};

export default BarangAdmin;
