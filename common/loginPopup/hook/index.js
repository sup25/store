import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axiosClient from "@/utils/axiosClient";
import appConfig from "@/config";

const useLogin = (handler) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setUserStore } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosClient.post(
        `/${appConfig.basePath}/user/auth/login`,
        formData
      );
      const { user, accessToken, refreshToken } = response.data.returnedData;
      setUserStore(user, accessToken, refreshToken);
      handler();
      toast.success("Login successful!");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data.returnedData || error.message
      );
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
