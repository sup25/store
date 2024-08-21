"use client";
import React, { useState } from "react";
import StarRating from "./starRatings";
import Comment from "./comment";
import Button from "@/common/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProductReviews } from "../utils";

const AddProductReviews = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addReview = async () => {
    if (rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please provide a comment.");
      return;
    }

    const reviewData = {
      userId: user.id,
      productId: productId,
      score: rating,
      message: comment,
    };

    try {
      setLoading(true);
      const response = await addProductReviews(reviewData);
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      onReviewAdded();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Error submitting review. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user && (
        <div className="flex flex-col gap-2">
          <StarRating rating={rating} setRating={setRating} />
          <Comment comment={comment} setComment={setComment} />
          <Button
            onClick={addReview}
            isLoading={loading}
            disabled={loading}
            type="submit"
            className="hover:bg-tertiary"
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddProductReviews;
