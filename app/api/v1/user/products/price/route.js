import { internalRes } from "@/app/api/utils/globalResponse";
import { showProductAccordingToPriceController } from "../controller";

export async function GET(request) {
  const url = new URL(request.url);
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  try {
    console.log(`minPrice: ${minPrice}, maxPrice: ${maxPrice}`);

    if (!minPrice && !maxPrice) {
      throw new Error("Missing minPrice and maxPrice parameters");
    }

    const filterProduct = await showProductAccordingToPriceController(
      parseFloat(minPrice),
      parseFloat(maxPrice)
    );

    return internalRes("Products retrieved successfully", filterProduct, 200);
  } catch (error) {
    console.error(error);
    return internalRes("Internal Server Error", null, 500);
  }
}
