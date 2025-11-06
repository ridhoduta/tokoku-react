// src/api/kategoriApi.jsx
import api from "./axiosInstance";

// GET semua kategori (R001, R002)
export const getKategori = async () => {
  try {
    const res = await api.get("/kategori");
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error getKategori" };
  }
};
// console.log(getKategori())

// GET detail kategori (R001, R002)
export const getKategoriById = async (id) => {
  try {
    const res = await api.get(`/kategori/${id}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error getKategoriById" };
  }
};

// CREATE kategori (hanya R001/Admin)
export const createKategori = async (data) => {
  try {
    const res = await api.post("/kategori", data);
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error createKategori" };
  }
};

// UPDATE kategori (hanya R001/Admin)
export const updateKategori = async (id, data) => {
  try {
    const res = await api.put(`/kategori/${id}`, data);
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error updateKategori" };
  }
};

// DELETE kategori (hanya R001/Admin)
export const deleteKategori = async (id) => {
  try {
    const res = await api.delete(`/kategori/${id}`);
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Error deleteKategori" };
  }
};
