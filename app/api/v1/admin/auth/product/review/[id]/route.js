import { internalRes } from "@/app/api/utils/globalResponse";
import { getReviewsByProductIdController } from "../../controller";

export async function GET(request, { params }) {
  try {
    const productId = params.id;
    console.log(productId);

    const getReview = await getReviewsByProductIdController(productId);
    return internalRes("Review fetched successfully", getReview, 200);
  } catch (error) {
    console.error("Error fetching review:", error);
    return internalRes("Internal Server Error", null, 500);
  }
}
