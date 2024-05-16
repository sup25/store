import { internalRes } from "@/app/api/utils/globalResponse";
import {
  deleteProductController,
  getProductsController,
  updateProductController,
} from "../controller";

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
  console.log("updatedFields", body);
  try {
    const productList = await updateProductController(productId, body);
    return internalRes("Product updated successfully", productList, 200);
  } catch (err) {
    console.error(err);
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
