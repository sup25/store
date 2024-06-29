import { generateSignature } from "@/utils/generateSignature";
import axios from "axios";

const uploadImageInCloudinary = async (file, formData) => {
  formData.append("file", file);

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = {
      timestamp: timestamp,
    };

    const response = await generateSignature(paramsToSign);
    const { signature } = response.data.returnedData;

    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Image uploaded successfully");
    return cloudinaryResponse.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageInCloudinary;
