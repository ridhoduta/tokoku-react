// src/api/axiosInstance.jsx
import axios from "axios";
import baseURL from "./url";

const api = axios.create({
  baseURL,
});

// Interceptor: otomatis sertakan Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
