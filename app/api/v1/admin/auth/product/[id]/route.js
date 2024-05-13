import { internalRes } from "@/app/api/utils/globalResponse";
import { getProductsController, updateProductController } from "../controller";

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
  try {
    const productList = await updateProductController(productId);
    return internalRes("Product updated successfully", productList, 200);
  } catch (err) {
    console.error(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
