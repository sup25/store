import axios from "axios";

import { generateSignature } from "@/utils/generateSignature";

export const deleteImageFromCloudinary = async (
  public_id,
  selectedFiles,
  setSelectedFiles,
  setFormData
) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = {
      public_id,
      timestamp,
    };

    const response = await generateSignature(paramsToSign);
    const signature = response.data.returnedData.signature;

    const requestData = {
      params: {
        public_id,
        signature,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        timestamp,
      },
    };

    const deleteResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
      null,
      requestData
    );

    console.log("Image deleted successfully from Cloudinary", deleteResponse);
    const updatedSelectedFiles = selectedFiles.filter(
      (file) => file.public_id !== public_id
    );
    setSelectedFiles(updatedSelectedFiles);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedSelectedFiles,
    }));
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
