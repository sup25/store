import { internalRes } from "@/app/api/utils/globalResponse";
import {
  createReviewController,
  deleteReviewController,
  editReviewController,
} from "../controller";

export async function POST(request) {
  try {
    const body = await request.json();
    const createReview = await createReviewController(body);
    return internalRes("Review added successfully", createReview, 200);
  } catch (error) {
    console.error("Error creating review:", error);
    if (
      error.message.includes(
        "User must purchase the product before leaving a review"
      )
    ) {
      return internalRes(
        "User must purchase the product before leaving a review.",
        null,
        400
      );
    }
    return internalRes("Internal Server Error", null, 500);
  }
}
export async function PUT(request) {
  try {
    const body = await request.json();
    const createReview = await editReviewController(body);
    return internalRes("Review edited successfully", createReview, 200);
  } catch (error) {
    console.error("Error editing review:", error);
    return internalRes("Internal Server Error", null, 500);
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const createReview = await deleteReviewController(body);
    return internalRes("Review deleted successfully", createReview, 200);
  } catch (error) {
    console.error("Error deleting review:", error);
    return internalRes("Internal Server Error", null, 500);
  }
}
