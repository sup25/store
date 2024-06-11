const fields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "Enter the product title",
  },
  {
    name: "handle",
    label: "Handle",
    type: "text",
    required: true,
    placeholder: "Enter the product handle",
  },
  {
    name: "desc",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Enter the product description",
  },
  {
    name: "short_desc",
    label: "Short Description",
    type: "text",
    required: true,
    placeholder: "Enter a short product description",
  },
  {
    name: "price",
    label: "Price",
    type: "text",
    required: true,
    placeholder: "29.99",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "text",
    required: true,
    placeholder: "Enter the product quantity",
  },
  {
    name: "sku",
    label: "SKU",
    type: "text",
    required: true,
    placeholder: "CP-001",
  },
  { name: "tags", label: "Tags", type: "text", placeholder: "Outdoor" },
  {
    name: "type",
    label: "Type",
    type: "text",
    required: true,
    placeholder: "Cargo Pants",
  },
  { name: "images", label: "Image", type: "file" },
];

export default fields;
