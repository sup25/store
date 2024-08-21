import { deleteProductReviews, editProductReviews } from "@/app/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const handleEditReview = async (
  reviewId,
  setReviews,
  setEditingReviewId,
  editedMessage,
  userId,
  setLoading
) => {
  try {
    setLoading(true);
    const body = {
      reviewId,
      updatedFields: { message: editedMessage },
      userId,
    };

    await editProductReviews(body);
    toast.success("Review updated Successfully");
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, message: editedMessage } : review
      )
    );
    setEditingReviewId(null);
  } catch (error) {
    console.error("Error editing review:", error);
    toast.error("Error editing review");
  } finally {
    setLoading(false);
  }
};

export const handleDeleteReview = async (
  reviewId,
  setReviews,
  userId,
  setLoading
) => {
  try {
    setLoading(true);
    const body = {
      reviewId,
      userId,
    };

    await deleteProductReviews(body);
    toast.success("Review deleted successfully");
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    toast.error("Error deleting review");
  } finally {
    setLoading(false);
  }
};

export const handleCancelEdit = (setEditingReviewId, setEditedMessage) => {
  setEditingReviewId(null);
  setEditedMessage("");
};
