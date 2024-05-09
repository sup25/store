export const ProductValidation = (body) => {
  const errors = [];
  const {
    title,
    handle,
    desc,
    short_desc,
    price,
    quantity,
    sku,
    tags,
    type,
    images,
    sales,
  } = body;
  console.log(body);
  if (!title) {
    errors.push({
      field: "title",
      message: "Title is required",
    });
  }

  if (!handle) {
    errors.push({
      field: "handle",
      message: "Handle is required",
    });
  }

  if (!desc) {
    errors.push({
      field: "desc",
      message: "Description is required",
    });
  }

  if (!short_desc) {
    errors.push({
      field: "short_desc",
      message: "Short description is required",
    });
  }

  if (!price || isNaN(price)) {
    errors.push({
      field: "price",
      message: "Price must be a valid number",
    });
  }

  if (!quantity || isNaN(quantity)) {
    errors.push({
      field: "quantity",
      message: "Quantity must be a valid number",
    });
  }

  if (!sku) {
    errors.push({
      field: "sku",
      message: "SKU is required",
    });
  }

  if (tags && !Array.isArray(tags)) {
    errors.push({
      field: "tags",
      message: "Tags must be provided as an array",
    });
  }

  if (!type) {
    errors.push({
      field: "type",
      message: "Type is required",
    });
  }

  if (!images || !images.length) {
    errors.push({
      field: "images",
      message: "Images  are required",
    });
  }

  if (
    Object.values(body).every((value) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    })
  ) {
    errors.push({
      field: "all",
      message: "All fields are required",
    });
  }

  return errors;
};
