import React, { useState } from "react";
import PesananItem from "./PesananItem";
import { Search } from "lucide-react";
import TableLoader from "../Loader/TableLoader";

const PesananList = ({ pesanans, onEdit, onDelete, onUpdateStatus, loading, onUpdatePengiriman }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data berdasarkan pencarian
  const filteredPesanans = pesanans.filter((pesanan) => {
    const term = searchTerm.toLowerCase();
    return (
      pesanan.nama_pemesan?.toLowerCase().includes(term) ||
      pesanan.id?.toLowerCase().includes(term) ||
      pesanan.barang_dipesan?.some((barang) =>
        barang.nama_barang?.toLowerCase().includes(term)
      )
    );
  });

  return (
    <div className="space-y-4">
      {/* 🔍 Pencarian */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Cari berdasarkan nama, ID pesanan, atau produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-700 placeholder-gray-400"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Menampilkan {filteredPesanans.length} dari {pesanans.length} pesanan
        </div>
      </div>

      {/* 📋 Tabel Pesanan */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  ID Pesanan
                </th>
                <th className="font-semibold text-gray-600 text-left">Nama Pelanggan</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Tanggal
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Status Pesanan
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Status Pengambilan
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Barang
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">
                  Aksi
                </th>
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

                filteredPesanans.map((pesanan) => (
                  <PesananItem
                    key={pesanan.id}
                    pesanan={pesanan}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onUpdateStatus={onUpdateStatus}
                    onUpdatePengiriman={onUpdatePengiriman}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesananList;
