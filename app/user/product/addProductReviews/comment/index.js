import React from "react";

const Comment = ({ comment, setComment }) => {
  return (
    <div className=" w-full">
      <textarea
        className="py-2 px-2 font-others w-full  border-2 outline-none hover:border-secondary transition duration-300 ease-in-out"
        placeholder="Tell us what you think about this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default Comment;
