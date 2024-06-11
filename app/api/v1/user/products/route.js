import { internalRes } from "@/app/api/utils/globalResponse";
import { createCartController } from "./controller";

export async function POST(request) {
  try {
    const { userId, productId, quantity } = await request.json();
    const createdProductCart = await createCartController(
      userId,
      productId,
      quantity
    );
    return internalRes(
      "Product added to cart successfully",
      createdProductCart,
      200
    );
  } catch (error) {
    console.error(error);

    return internalRes("Internal Server Error", null, 500);
  }
}
