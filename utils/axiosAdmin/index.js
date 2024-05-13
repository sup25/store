import axios from "axios";

const axiosAdmin = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAdmin.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("adminAccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAdmin;
