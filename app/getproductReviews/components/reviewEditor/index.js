import React from "react";
import { CgSpinner } from "react-icons/cg";
import { handleEditReview } from "../../handlers";

const ReviewEditor = ({
  editedMessage,
  setEditedMessage,
  loading,
  review,
  setEditingReviewId,
  setReviews,
  currentUserId,
  setLoading,
}) => {
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditedMessage("");
  };

  return (
    <div className="mt-1">
      <textarea
        rows="4"
        value={editedMessage}
        onChange={(e) => setEditedMessage(e.target.value)}
        className="border p-1 w-full"
      />
      <div className="flex gap-2 w-full mt-1">
        <button
          onClick={() =>
            handleEditReview(
              review.id,
              setReviews,
              setEditingReviewId,
              editedMessage,
              currentUserId,
              setLoading,
              loading
            )
          }
          className="bg-green-500 text-white w-full p-2 hover:bg-tertiary font-others transition duration-300 ease-in-out"
        >
          {loading ? (
            <CgSpinner className="animate-spin self-center " />
          ) : (
            "Save"
          )}
        </button>
        <button
          onClick={handleCancelEdit}
          className="bg-gray-500 text-white text-others w-full p-2 hover:bg-tertiary font-others transition duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReviewEditor;
