import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1/user/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

/* axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired, redirect to login page or handle as appropriate
      console.log("Token expired");
      router.push("/login"); // Redirect to login page
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
); */
