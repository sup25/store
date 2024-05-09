// routes.js

import { internalRes } from "@/app/api/utils/globalResponse";
import { createProductController, getProductsController } from "./controller";
import { ProductValidation } from "./validation";

export async function POST(request) {
  const body = await request.json();
  const errors = ProductValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);
  try {
    const createdProduct = await createProductController(body);
    return internalRes("Product created successfully", createdProduct, 200);
  } catch (err) {
    console.error(err);
    return internalRes("Internal Server Error", null, 500);
  }
}
