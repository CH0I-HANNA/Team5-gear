"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Review } from "@/types/review";

interface CommentSectionProps {
  journalId: number;
}

const CommentSection = ({ journalId }: CommentSectionProps) => {
  const { token, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    if (!journalId) return;
    const fetchReviews = async () => {
      const response = await fetch(`/api/journals/${journalId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    };

    fetchReviews();
  }, [journalId]);

  const handleSubmitReview = async () => {
    if (!token || !journalId) return;

    const response = await fetch(`/api/journals/${journalId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newReview }),
    });

    if (response.ok) {
      const createdReview = await response.json();
      setReviews([...reviews, createdReview]);
      setNewReview("");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">리뷰</h2>
      {isAuthenticated && (
        <div className="mb-6">
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성해주세요..."
          ></textarea>
          <button
            onClick={handleSubmitReview}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            리뷰 작성
          </button>
        </div>
      )}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <p className="font-semibold">{review.user.username}</p>
            <p className="text-gray-700 mt-1">{review.content}</p>
            <p className="text-gray-500 text-sm mt-2">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;