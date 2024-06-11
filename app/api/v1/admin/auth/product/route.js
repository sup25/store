import { internalRes } from "@/app/api/utils/globalResponse";
import {
  createProductController,
  getAllProductsController,
} from "./controller";
import { ProductValidation } from "./validation";

export async function POST(request) {
  const body = await request.json();
  const errors = ProductValidation(body);
  if (errors.length > 0)
    return internalRes("Validation Error", { errors }, 422);
  try {
    const createdProduct = await createProductController(body);
    return internalRes("Product created successfully", createdProduct, 200);
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
export async function GET(request) {
  try {
    const getAllProducts = await getAllProductsController();
    return internalRes("Products retrieved successfully", getAllProducts, 200);
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
