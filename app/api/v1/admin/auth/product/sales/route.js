import { internalRes } from "@/app/api/utils/globalResponse";
import { getProductSalesDataController } from "../controller";

export async function GET(request) {
  try {
    const getSalesProducts = await getProductSalesDataController();
    return internalRes(
      "Products retrieved successfully",
      getSalesProducts,
      200
    );
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
