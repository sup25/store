import { deleteImageFromCloudinary } from "../../../deleteImageFromCloudinary";
import UploadImage from "../../../uploadImage";

export const handleImageUpload = async (
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

export const handleDeleteImage = (
  file,
  selectedFiles,
  setSelectedFiles,
  setFormData,
  setRemoving
) => {
  setRemoving(true);
  deleteImageFromCloudinary(
    file.public_id,
    selectedFiles,
    setSelectedFiles,
    setFormData
  ).finally(() => setRemoving(false));
};
