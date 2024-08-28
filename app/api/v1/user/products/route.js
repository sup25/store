import { internalRes } from "@/app/api/utils/globalResponse";
import {
  createCartController,
  showProductAccordingToTagController,
} from "./controller";

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

export async function GET(request) {
  const url = new URL(request.url);
  const tags = url.searchParams.get("tags")?.split(",") || [];

  try {
    console.log(tags);
    let products = [];

    if (tags.length > 0) {
      products = await showProductAccordingToTagController(tags);
    }

    return internalRes("Products retrieved successfully", products, 200);
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
