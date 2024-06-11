import axios from "axios";

import { generateSignature } from "@/utils/generateSignature";
import UploadImage from "../uploadImage";

export const handleFileInputChange = async (
  event,
  selectedFiles,
  setSelectedFiles,
  setFormData
) => {
  const files = Array.from(event.target.files);
  const newSelectedFiles = [];

  for (let file of files.slice(0, 6 - selectedFiles.length)) {
    const uploadFormData = new FormData();
    try {
      const uploadResult = await UploadImage(file, uploadFormData);
      console.log(uploadResult);
      if (uploadResult) {
        newSelectedFiles.push({
          file,
          id: Date.now() + Math.random(),
          original_url: uploadResult.secure_url,
          thumbnail: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const updatedSelectedFiles = [...selectedFiles, ...newSelectedFiles];
  setSelectedFiles(updatedSelectedFiles);
  setFormData((prevFormData) => ({
    ...prevFormData,
    images: updatedSelectedFiles,
  }));
};

export const handleRemoveImage = async (
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
