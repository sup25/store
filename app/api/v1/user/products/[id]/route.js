import { internalRes } from "@/app/api/utils/globalResponse";
import { getCartController } from "../controller";

export async function GET(request, { params }) {
  const userId = parseInt(params.id);
  try {
    const getCart = await getCartController(userId);
    return internalRes("Cart Item loaded successfully", getCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
