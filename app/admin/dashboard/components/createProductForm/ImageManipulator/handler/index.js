export const handleImageUpload = async (
  event,
  selectedFiles,
  setSelectedFiles,
  setFormData
) => {
  const files = Array.from(event.target.files);
  const newSelectedFiles = [];

  for (let file of files.slice(0, 6 - selectedFiles.length)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      newSelectedFiles.push({
        file,
        id: Date.now() + Math.random(),
        original_url: fileReader.result,
        thumbnail: fileReader.result,
      });

      const updatedSelectedFiles = [...selectedFiles, ...newSelectedFiles];
      setSelectedFiles(updatedSelectedFiles);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: updatedSelectedFiles,
      }));
    };
    fileReader.readAsDataURL(file);
  }
};

export const handleDeleteImage = (
  file,
  selectedFiles,
  setSelectedFiles,
  setFormData,
  setRemoving
) => {
  setRemoving(true);
  const updatedSelectedFiles = selectedFiles.filter(
    (selectedFile) => selectedFile.id !== file.id
  );
  setSelectedFiles(updatedSelectedFiles);
  setFormData((prevFormData) => ({
    ...prevFormData,
    images: updatedSelectedFiles,
  }));
  setRemoving(false);
};
