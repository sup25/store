export const handleImageUpload = async (
  event,
  selectedFiles,
  setSelectedFiles,
  setFormData
) => {
  const files = Array.from(event.target.files);
  const newSelectedFiles = [];

  const currentIndex = selectedFiles.length
    ? Math.max(...selectedFiles.map((img) => img.index)) + 1
    : 1;

  for (let i = 0; i < files.slice(0, 6 - selectedFiles.length).length; i++) {
    const file = files[i];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      newSelectedFiles.push({
        file,
        id: Date.now() + Math.random(),
        original_url: fileReader.result,
        thumbnail: fileReader.result,
        index: currentIndex + i,
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
