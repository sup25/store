import { internalRes } from "@/app/api/utils/globalResponse";

import {
  deleteProductController,
  getProductsController,
  updateProductController,
} from "../controller";
import { ProductValidation } from "../validation";

export async function GET(request, { params }) {
  const adminId = params.id;
  try {
    const productList = await getProductsController(adminId);
    return internalRes("Product list retrieved successfully", productList, 200);
  } catch (err) {
    console.error(err);
    return internalRes("Internal Server Error", null, 500);
  }
}

export async function PUT(request, { params }) {
  const productId = params.id;
  const body = await request.json();
  const validationErrors = ProductValidation(body);
  if (validationErrors.length > 0) {
    return internalRes("Validation Error", { errors: validationErrors }, 400);
  }

  ("");
  try {
    const productList = await updateProductController(productId, body);
    return internalRes("Product updated successfully", productList, 200);
  } catch (err) {
    console.error(err);
    if (err.message.includes("Price cannot exceed $100")) {
      return internalRes("Price cannot exceed $100", null, 500);
    }
    if (
      err.message.includes(
        "The product handle is already in use by another product. Please choose a different handle."
      )
    ) {
      return internalRes(
        "Product handle already exists. Please choose a different handle.",
        null,
        409
      );
    }

    return internalRes("Internal Server Error", null, 500);
  }
}

export async function DELETE(request, { params }) {
  const productId = params.id;
  try {
    const deleteProduct = await deleteProductController(productId);
    return internalRes("Product deleted successfully", deleteProduct, 200);
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
