import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 50000,
});

const refreshToken = async () => {
  const res = await axiosClient.post(
    "/api/v1/user/auth/refreshToken",
    JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") })
  );

  return res.data.returnedData.accessToken;
};
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Token expired" &&
      error.config
    ) {
      const { config: originalRequest } = error;
      console.log("Token expired");

      try {
        // Refresh access token
        const newAccessToken = await refreshToken();

        // Store the new access token in local storage
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError.message);

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
