const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "handle", label: "Handle", type: "text", required: true },
  { name: "desc", label: "Description", type: "textarea", required: true },
  {
    name: "short_desc",
    label: "Short Description",
    type: "text",
    required: true,
  },
  { name: "price", label: "Price", type: "text", required: true },
  { name: "quantity", label: "Quantity", type: "text", required: true },
  { name: "sku", label: "SKU", type: "text", required: true },
  { name: "tags", label: "Tags", type: "text" },
  { name: "type", label: "Type", type: "text", required: true },
  { name: "images", label: "Image URL", type: "file" },
];

export default fields;
