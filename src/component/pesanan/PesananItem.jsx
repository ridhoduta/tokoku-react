import React, { useState } from "react";
import { Eye, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { updatePengiriman } from "../../api/pesananApi"; // pastikan path benar

const PesananItem = ({ pesanan, onEdit, onDelete, onUpdateStatus, onUpdatePengiriman }) => {
  const [showDetails, setShowDetails] = useState(false);



  const handleStatusChange = (newStatus) => {
    // console.log(newStatus)
    // console.log(pesanan.id)
    onUpdateStatus(pesanan.id, newStatus);
  };

  const handleUpdatePengiriman = async (id, newPengiriman) => {
    onUpdatePengiriman(id, newPengiriman)
  };

  // Tentukan opsi sesuai aturan yang kamu minta
  const getPengirimanOptions = () => {
    const p = (pesanan.pengiriman || "").toLowerCase();

    if (p === "diambil") {
      return [
        { value: "diambil", label: "Diambil" }, // default pertama = current value
        { value: "selesai diambil", label: "Selesai Diambil" },
      ];
    }

    if (p === "diantar") {
      return [
        { value: "diantar", label: "Diantar" }, // default pertama = current value
        { value: "selesai diantar", label: "Selesai Diantar" },
      ];
    }

    // fallback: kalau pengiriman belum ditetapkan, beri pilihan untuk memilih awalnya
    return [
      { value: "diambil", label: "Diambil" },
      { value: "diantar", label: "Diantar" },
    ];
  };

  // warna berdasarkan value saat ini (untuk tampilan select)
  const pengirimanValue = pesanan.pengiriman || "";
  const selectClass = () => {
    const v = (pengirimanValue || "").toLowerCase();
    if (v === "diambil") return "bg-orange-100 text-orange-800";
    if (v === "diantar") return "bg-blue-100 text-blue-800";
    if (v.startsWith("selesai")) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
        <td className="text-center py-4 px-4 text-gray-700 font-medium">
          {pesanan.id}
        </td>

        <td className="py-4 px-4 text-gray-700">{pesanan.nama_pemesan}</td>

        <td className="text-center py-4 px-4 text-gray-700">{pesanan.tanggal}</td>

        {/* STATUS PESANAN */}
        <td className="text-center py-4 px-4">
          <select
            value={pesanan.status || "menunggu"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-600 ${
              (pesanan.status || "menunggu") === "selesai"
                ? "bg-green-100 text-green-800"
                : (pesanan.status || "menunggu") === "proses"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Proses</option>
            <option value="selesai">Selesai</option>
            <option value="dibatalkan">Batal</option>
          </select>
        </td>

        {/* PENGIRIMAN - opsi sesuai aturan */}
        <td className="text-center py-4 px-4">
          <select
            // default pertama adalah value dari pengiriman itu sendiri jika ada,
            // otherwise fallback ke first option dari getPengirimanOptions()
            value={
              // jika pengiriman sudah "selesai ..." maka biarkan nilai itu (agar select menampilkan selesai)
              pesanan.pengiriman
                ? pesanan.pengiriman
                : getPengirimanOptions()[0].value
            }
            onChange={(e) => handleUpdatePengiriman(pesanan.id, e.target.value)}
            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-orange-600 ${selectClass()}`}
          >
            {getPengirimanOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </td>

        {/* TOMBOL DETAIL */}
        <td className="text-center py-4 px-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-600 hover:text-purple-600 transition flex items-center justify-center mx-auto"
            title="Lihat Detail Barang"
          >
            <Eye className="w-4 h-4" />
            <span className="ml-1 text-xs">({pesanan.barang_dipesan?.length || 0})</span>
            {showDetails ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
          </button>
        </td>

        {/* AKSI */}
        {/* <td className="py-4 px-4">
          <div className="flex gap-3 justify-center items-center">
            <button
              className="text-red-600 hover:text-red-800 transition"
              onClick={handleDelete}
              title="Hapus Pesanan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td> */}
      </tr>

      {/* DETAIL BARANG */}
      {showDetails && (
        <tr className="bg-gray-50">
          <td colSpan="7" className="px-4 py-3">
            <div className="bg-white rounded-lg p-4 shadow-inner">
              <h4 className="font-semibold text-gray-700 mb-3">Detail Barang:</h4>
              <div className="grid gap-2">
                {pesanan.barang_dipesan?.map((barang, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="font-medium">{barang.nama_barang}</span>
                      <span className="text-gray-500 text-sm ml-2">(ID: {barang.barang_id})</span>
                    </div>
                    <div className="text-right">
                      <div>Qty: {barang.qty}</div>
                      <div className="text-sm text-gray-600">
                        Rp {barang.harga_barang?.toLocaleString() || 0} x {barang.qty}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-2 font-semibold">
                  <span>Total Harga:</span>
                  <span>Rp {pesanan.total_harga?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default PesananItem;