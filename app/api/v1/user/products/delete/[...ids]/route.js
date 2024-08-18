import { internalRes } from "@/app/api/utils/globalResponse";
import { deleteCartController } from "../../controller";

export async function DELETE(request, { params }) {
  const idsString = params.ids.join(",");

  if (!idsString) {
    return internalRes("No IDs provided", null, 400);
  }

  const itemIds = idsString.split(",").map((id) => parseInt(id, 10));

  try {
    const deleteCart = await deleteCartController(itemIds);
    console.log(deleteCart);
    return internalRes("Cart Item deleted successfully", deleteCart, 200);
  } catch (error) {
    return internalRes("Internal Server Error", null, 500);
  }
}
