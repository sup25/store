"use client";
import { sendUserComplaint } from "@/app/utils";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ComplaintForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await sendUserComplaint({
        userEmail: email,
        complaintMessage: message,
      });
      toast.success(
        "Your complaint has been submitted. We'll get back to you soon."
      );
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Error sending complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6  ">
      <h4 className="text-primary text-xl font-heading font-semibold mb-4 text-center">
        Have a Complaint?
      </h4>
      <p className="text-center text-gray-700 mb-4 font-others">
        Let us know, and we will respond as soon as possible!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full font-others px-4 py-2 border rounded-lg text-black border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
          required
        />
        <textarea
          placeholder="Your Complaint"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full  font-others px-4 py-2 border rounded-lg text-black border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className={`w-full flex items-center justify-center bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition duration-300 ease-in-out ${
            loading ? "bg-gray-400 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <CgSpinner size={25} className="animate-spin" />
          ) : (
            "Submit Complaint"
          )}
        </button>
      </form>
    </div>
  );
};
