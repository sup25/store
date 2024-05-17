import { internalRes } from "@/app/api/utils/globalResponse";
import { deleteCartController, getCartController } from "../controller";

export async function GET(request, { params }) {
  const cartId = parseInt(params.id);
  try {
    const getCart = await getCartController(cartId);
    return internalRes("Cart Item loaded successfully", getCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
export async function DELETE(request, { params }) {
  const cartId = parseInt(params.id);
  console.log(cartId);
  try {
    const deleteCart = await deleteCartController(cartId);
    console.log(deleteCart);
    return internalRes("Cart Item deleted successfully", deleteCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
