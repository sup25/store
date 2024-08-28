export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;
  if (name === "tags") {
    const tagsArray = value.split(/[\s,]+/).map((tag) => tag.toLowerCase());
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
