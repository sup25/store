import appConfig from "@/config";
import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : appConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 50000,
});

const refreshToken = async () => {
  const res = await axiosClient.post(
    `/${appConfig.basePath}/user/auth/refreshToken`,
    JSON.stringify({ refreshToken: sessionStorage.getItem("refreshToken") })
  );

  return res.data.returnedData.accessToken;
};

let isRefreshing = false;
let refreshQueue = [];

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expired" &&
      error.config
    ) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newAccessToken = await refreshToken();
          sessionStorage.setItem("accessToken", newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError.message);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
          refreshQueue.forEach((prom) => prom());
          refreshQueue = [];
        }
      } else {
        return new Promise((resolve) => {
          refreshQueue.push(() => {
            originalRequest.headers.Authorization = `Bearer ${sessionStorage.getItem(
              "accessToken"
            )}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
