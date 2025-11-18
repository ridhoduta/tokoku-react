// src/pages/Admin/DashboardAdmin.jsx
import React, { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getPesanan } from "../../api/pesananApi";
import { getBarang } from "../../api/barangApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DashboardAdmin() {
  const [pesanan, setPesanan] = useState([]);
  const [barang, setBarang] = useState([]);
  const [filter, setFilter] = useState("minggu");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pesananRes = await getPesanan();
        const barangRes = await getBarang();
        setPesanan(pesananRes.data || []);
        setBarang(barangRes.data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  // ======================
  // 🔹 Hitung Statistik Dasar
  // ======================
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const pesananHariIni = pesanan.filter((p) => p.tanggal === today);
  const belumDibayar = pesanan.filter(
    (p) => p.status_pembayaran?.toLowerCase() === "belum dibayar"
  );
  const siapDiantar = pesanan.filter(
    (p) =>
      p.pengiriman?.toLowerCase() === "diantar" &&
      p.status?.toLowerCase() === "selesai"
  );
  const siapDiambil = pesanan.filter(
    (p) =>
      p.pengiriman?.toLowerCase() === "diambil" &&
      p.status?.toLowerCase() === "selesai"
  );

  const totalBarang = barang.length;
  const totalPesanan = pesanan.length;
  const totalPendapatan = pesanan
    .filter((p) => p.status?.toLowerCase() === "selesai")
    .reduce((sum, p) => sum + (p.total_harga || 0), 0);

  // ======================
  // 🔹 Produk Terlaris
  // ======================
  const produkMap = {};
  pesanan.forEach((p) => {
    if (Array.isArray(p.barang_dipesan)) {
      p.barang_dipesan.forEach((b) => {
        if (!produkMap[b.nama_barang]) produkMap[b.nama_barang] = 0;
        produkMap[b.nama_barang] += b.qty || 0;
      });
    }
  });
  const produkTerlaris = Object.entries(produkMap)
    .map(([nama, qty]) => ({ nama, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // ======================
  // 🔹 Stok Hampir Habis
  // ======================
  const stokHampirHabis = barang
    .filter((b) => b.data?.stok_barang < 12)
    .map((b) => ({
      nama: b.data.nama_barang,
      stok: b.data.stok_barang,
    }));

  // ======================
  // 🔹 Data Grafik Penjualan
  // ======================
  const getFilteredSalesData = () => {
    const selesai = pesanan.filter((p) => p.status?.toLowerCase() === "selesai");
    const data = {};

    selesai.forEach((p) => {
      const tanggal = p.tanggal;
      data[tanggal] = (data[tanggal] || 0) + (p.total_harga || 0);
    });

    const sorted = Object.entries(data)
      .map(([tanggal, total]) => ({ tanggal, total }))
      .sort(
        (a, b) =>
          new Date(a.tanggal.split("-").reverse().join("-")) -
          new Date(b.tanggal.split("-").reverse().join("-"))
      );

    return sorted;
  };

  const dataPenjualan = getFilteredSalesData();

  return (
    <div className="flex-1 overflow-auto p-8 bg-gray-50">
      {/* ===================== */}
      {/* 🔸 Empat Card Utama */}
      {/* ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 rounded-lg p-6">
          <div className="text-blue-600 text-sm mb-2">Pesanan Hari Ini</div>
          <div className="text-4xl font-bold text-blue-700 mb-1">
            {pesananHariIni.length}
          </div>
          <div className="text-xs text-blue-600">Total Hari Ini<br />{today}</div>
        </div>

        <div className="bg-orange-100 rounded-lg p-6">
          <div className="text-orange-600 text-sm mb-2">Belum Dibayar</div>
          <div className="text-4xl font-bold text-orange-700 mb-1">
            {belumDibayar.length}
          </div>
          <div className="text-xs text-orange-600">Total Pesanan<br />{totalPesanan}</div>
        </div>

        <div className="bg-green-100 rounded-lg p-6">
          <div className="text-green-600 text-sm mb-2">Siap Diantar</div>
          <div className="text-4xl font-bold text-green-700 mb-1">
            {siapDiantar.length}
          </div>
          <div className="text-xs text-green-600">Status selesai</div>
        </div>

        <div className="bg-pink-100 rounded-lg p-6">
          <div className="text-pink-600 text-sm mb-2">Siap Diambil</div>
          <div className="text-4xl font-bold text-pink-700 mb-1">
            {siapDiambil.length}
          </div>
          <div className="text-xs text-pink-600">Status selesai</div>
        </div>
      </div>

      {/* ===================== */}
      {/* 🔸 Tiga Card Statistik */}
      {/* ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-semibold">Total Barang</h3>
          <div className="text-3xl font-bold mt-2">{totalBarang}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-semibold">Total Pesanan</h3>
          <div className="text-3xl font-bold mt-2">{totalPesanan}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-700 font-semibold">Total Pendapatan</h3>
          <div className="text-3xl font-bold mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 🔸 Grafik & Produk Terlaris */}
      {/* ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Grafik Penjualan</h3>
            <div className="flex gap-2">
              {["minggu", "bulan", "tahun"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === f ? "bg-gray-800 text-white" : "bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPenjualan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tanggal" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Produk Terlaris */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Produk Terlaris</h3>
          <div className="space-y-3">
            {produkTerlaris.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {index + 1}. {item.nama}
                  </div>
                  <div className="text-sm text-gray-500">{item.qty} kali dibeli</div>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* 🔸 Stok Hampir Habis */}
      {/* ===================== */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Stok Hampir Habis</h3>
        <div className="space-y-3">
          {stokHampirHabis.length > 0 ? (
            stokHampirHabis.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div>
                  <div className="font-medium text-gray-800">{item.nama}</div>
                  <div className="text-sm text-red-600">
                    Sisa stok: {item.stok}
                  </div>
                </div>
                <TrendingDown className="text-red-500" size={24} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">Tidak ada stok kritis</div>
          )}
        </div>
      </div>
    </div>
  );
}
