import { internalRes } from "@/app/api/utils/globalResponse";
import { deleteCartController, getCartController } from "../controller";

export async function GET(request, { params }) {
  const userId = parseInt(params.id);
  try {
    const getCart = await getCartController(userId);
    return internalRes("Cart Item loaded successfully", getCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
export async function DELETE(request, { params }) {
  const productId = parseInt(params.id);
  console.log(productId);
  try {
    const deleteCart = await deleteCartController(productId);
    console.log(deleteCart);
    return internalRes("Cart Item deleted successfully", deleteCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
