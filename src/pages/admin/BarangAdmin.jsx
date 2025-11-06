import React, { useState, useEffect } from "react";
import BarangList from "../../component/BarangComponent/BarangList";
import {
  deleteBarang,
  getBarang,
} from "../../api/barangApi";
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
  const [barang, setBarang] = useState([])
 

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
    setLoading(false)

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
  const handleEdit = (barang) =>{
    setBarang(barang)
    setIsModalEditOpen(true)
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manajemen Produk
            </h2>
            <p className="text-gray-500 text-sm">Kelola Produk Sembako Anda</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
          >
            + Tambah Produk
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Total Produk</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {totalProducts}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Stok Total</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">{totalStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Kategori</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {totalCategories}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Kategori</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {totalCategories}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center w-64">
          <p className="text-gray-500 text-sm mb-1">Kategori</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">
            {totalCategories}
          </p>
        </div>
      </div>

      <BarangList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <TambahModalBarang
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loadBarang={loadBarang}
      />
      <EditModalBarang
      isOpen={isModalEditOpen}
      barang = {barang}
      kategori={kategori}
      onClose={() => setIsModalEditOpen(false)}
      loadBarang={loadBarang}
      />
    </>
  );
};

export default BarangAdmin;
