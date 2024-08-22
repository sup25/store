"use client";

import ReactStars from "react-stars";

const StarRating = ({ rating, setRating }) => {
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="flex gap-2 items-center">
      <ReactStars
        count={5}
        value={rating}
        onChange={ratingChanged}
        size={24}
        color2={"#ffd700"}
      />
      <div className="font-others text-xl font-bold"> {rating}</div>
    </div>
  );
};

export default StarRating;
