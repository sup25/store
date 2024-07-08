import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const handleSubmit = async (
  formData,
  isUpdating,
  adminId,
  setIsLoading,
  setErrors,
  resetForm
) => {
  setIsLoading(true);

  try {
    let response;
    const productId = parseInt(formData.id);
    if (isUpdating) {
      response = await axios.put(
        `/api/v1/admin/auth/product/${productId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("updated data", response);
    } else {
      response = await axios.post("/api/v1/admin/auth/product", {
        ...formData,
        adminId: adminId,
      });
    }

    if (response.status === 200) {
      isUpdating
        ? toast.success("Product updated successfully")
        : toast.success("Product created successfully");

      resetForm();
    } else {
      console.error(
        isUpdating ? "Failed to update product" : "Failed to create product"
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

export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;
  if (name === "tags") {
    const tagsArray = value.split(/[\s,]+/);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: tagsArray,
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};
