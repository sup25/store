import { internalRes } from "@/app/api/utils/globalResponse";
import { getPurchasedProductsController } from "../../controller";

export async function GET(request, { params }) {
  const userId = params.id;
  try {
    const getPurchasedOrder = await getPurchasedProductsController(userId);
    return internalRes(
      "Products retrieved successfully",
      getPurchasedOrder,
      200
    );
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
