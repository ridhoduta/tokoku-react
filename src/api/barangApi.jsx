// src/api/barangApi.jsx
import { data } from "react-router-dom";
import api from "./axiosInstance";

// GET semua barang (R001, R002)
export const getBarang = async () => {
  try {
    const res = await api.get("/barang");
    return res; // ✅ ini penting!
  } catch (error) {
    console.error("Gagal mengambil data barang:", error);
    throw error; // lempar ke atas biar bisa ditangkap di try/catch React
  }
};

// GET detail barang (R001, R002)
export const getBarangById = async (id) => {
  try {
    const res = await api.get(`/barang/${id}`);
    return res.data;
  } catch (err) {
    return (
      err.response?.data || { success: false, message: "Error getBarangById" }
    );
  }
};
export const getBarangByKategori = async (kategori_id) => {
  try {
    const res = await api.get(`/barang/kategori/${kategori_id}`);
    return res;
  } catch (error) {
    return (
      error.response?.data || { success: false, message: "Error getBarang by kategori" }
    );
  }
};

// CREATE barang (hanya R001/Admin)
export const createBarang = async (data) => {
  try {
    const res = await api.post("/barang", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return (
      err.response?.data || { success: false, message: "Error createBarang" }
    );
  }
};

// UPDATE barang (hanya R001/Admin)
export const updateBarang = async (id, data) => {
  try {
    const res = await api.put(`/barang/${id}`, data);
    return res.data;
  } catch (err) {
    return (
      err.response?.data || { success: false, message: "Error updateBarang" }
    );
  }
};

// DELETE barang (hanya R001/Admin)
export const deleteBarang = async (id) => {
  try {
    const res = await api.delete(`/barang/${id}`);
    return res.data;
  } catch (err) {
    return (
      err.response?.data || { success: false, message: "Error deleteBarang" }
    );
  }
};
