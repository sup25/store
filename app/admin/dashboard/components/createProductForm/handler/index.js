import appConfig from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleSubmit = async (
  formData,
  isUpdating,
  adminId,
  setIsLoading,
  setErrors,
  resetForm,
  router
) => {
  setIsLoading(true);

  try {
    let response;
    const productId = parseInt(formData.id);
    if (isUpdating) {
      response = await axios.put(
        `/${appConfig.basePath}/admin/auth/product/${productId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updated data", response);
    } else {
      response = await axios.post(`/${appConfig.basePath}/admin/auth/product`, {
        ...formData,
        adminId: adminId,
      });
    }

    if (response.status === 200) {
      console.log("Response data:", response);
      isUpdating
        ? toast.success("Product updated successfully")
        : toast.success("Product created successfully");
      setTimeout(() => {
        router.push("/admin/dashboard/allproducts");
      }, 2000);
      resetForm();
    } else {
      console.error(
        isUpdating
          ? toast.error("Failed to update product")
          : toast.error("Failed to create product")
      );
    }
  } catch (error) {
    console.error("Error:", error);
    setErrors(error.response?.data?.returnedData?.errors || []);
    const err = error.response?.data?.returnedData?.errors;
    console.log("errrrr", err);
    console.log("Validation Error");
  } finally {
    setIsLoading(false);
  }
};
