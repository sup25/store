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
  return res;
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
      console.log(error);
      // Token expired, redirect to login page or handle as appropriate
      console.log("Token expired");
      // Refresh access token
      const res = await refreshToken();
      console.log(res);
      // store new token to local storage

      if (res.status === 200) {
        return axiosClient.request({
          ...originalRequest,
          data: originalRequest.data ? JSON.parse(originalRequest.data) : {},
          headers: { Authorization: `Bearer ${res.data.tokens.access}` },
        });
      }
      // hanlde refresh token error

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
