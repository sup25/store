import { internalRes } from "@/app/api/utils/globalResponse";
import { getPublicProductsController } from "../../controller";

export async function GET(request, { params }) {
  const productHandle = params.handle;
  try {
    const productList = await getPublicProductsController(productHandle);
    return internalRes("Product list retrieved successfully", productList, 200);
  } catch (err) {
    console.error(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
