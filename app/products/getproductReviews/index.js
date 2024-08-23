"use client";
import React, { useEffect, useState } from "react";

import { EmptyReviews } from "./components";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "@/context/AuthContext";
import { calculateAverageScore } from "./utils";
import ReviewActions from "./components/reviewActions";
import ReviewEditor from "./components/reviewEditor";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getAllReviews } from "@/app/utils";

const GetProductReviews = ({ productId, refreshReview }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  const { user } = useAuth();

  const currentUserId = user?.id;

  const productReviews = async () => {
    try {
      setLoading(true);
      const allProductReviews = await getAllReviews({ productId });
      setReviews(allProductReviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productReviews();
  }, [productId, refreshReview]);

  const initialVisibleCount = 2;
  const averageScore = calculateAverageScore(reviews);

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-others  ">
        {reviews.length === 1 ? "Review" : "Reviews"} {averageScore}
      </p>
      {loading ? (
        <CgSpinner className="animate-spin self-center mt-4" />
      ) : reviews.length === 0 ? (
        <EmptyReviews />
      ) : (
        <div className="flex flex-col gap-3 py-1">
          {reviews
            .slice(0, showAll ? reviews.length : initialVisibleCount)
            .map((review) => (
              <div key={review.id} className="shadow py-1 px-2">
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2">
                    <p className="font-others font-semibold capitalize">
                      {review.user.first_name} {review.user.last_name}
                    </p>
                    <p className="font-others font-bold">({review.score})</p>
                  </div>
                  {currentUserId === review.user.id && (
                    <ReviewActions
                      review={review}
                      setEditingReviewId={setEditingReviewId}
                      setEditedMessage={setEditedMessage}
                      currentUserId={currentUserId}
                      setReviews={setReviews}
                      setLoading={setLoading}
                    />
                  )}
                </div>
                {editingReviewId === review.id ? (
                  <ReviewEditor
                    editedMessage={editedMessage}
                    setEditedMessage={setEditedMessage}
                    loading={loading}
                    setLoading={setLoading}
                    review={review}
                    setEditingReviewId={setEditingReviewId}
                    setReviews={setReviews}
                    currentUserId={currentUserId}
                  />
                ) : (
                  <p className="font-others">{review.message}</p>
                )}
              </div>
            ))}
          {!showAll && reviews.length > initialVisibleCount && (
            <div
              onClick={() => setShowAll(true)}
              className="hover:text-secondary cursor-pointer mt-4 text-center font-others transition duration-300 ease-in-out flex justify-center items-center"
            >
              <span>Show more comments</span>
              <FiChevronDown className="ml-2" />
            </div>
          )}
          {showAll && reviews.length > initialVisibleCount && (
            <div
              onClick={() => setShowAll(false)}
              className="hover:text-secondary cursor-pointer mt-4 text-center font-others transition duration-300 ease-in-out flex justify-center items-center"
            >
              <span>Show less comments</span>
              <FiChevronUp className="ml-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetProductReviews;
