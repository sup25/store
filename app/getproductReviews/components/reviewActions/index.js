import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { handleDeleteReview } from "../../handlers";

const ReviewActions = ({
  review,
  setEditingReviewId,
  setEditedMessage,
  currentUserId,
  setReviews,
  setLoading,
}) => {
  return (
    <div className="flex gap-2">
      <AiOutlineEdit
        size={20}
        className="cursor-pointer hover:text-green-500 transition duration-300 ease-in-out"
        onClick={() => {
          setEditingReviewId(review.id);
          setEditedMessage(review.message);
        }}
      />
      <AiOutlineDelete
        size={20}
        className="cursor-pointer hover:text-red-500 transition duration-300 ease-in-out"
        onClick={() =>
          handleDeleteReview(review.id, setReviews, currentUserId, setLoading)
        }
      />
    </div>
  );
};

export default ReviewActions;
