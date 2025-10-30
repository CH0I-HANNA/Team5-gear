
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Review } from "@/types/review";

const MyPageReviews = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      if (!token) return;

      try {
        const response = await fetch("/api/reviews/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        setError("An error occurred while fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token]);

  const handleDelete = async (reviewId: number) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } else {
        setError("Failed to delete review");
      }
    } catch (err) {
      setError("An error occurred while deleting the review");
    }
  };

  const handleUpdate = async (reviewId: number) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      if (response.ok) {
        const updatedReview = await response.json();
        setReviews(
          reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          )
        );
        setEditingReviewId(null);
        setEditingContent("");
      } else {
        setError("Failed to update review");
      }
    } catch (err) {
      setError("An error occurred while updating the review");
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReviewId(review.id);
    setEditingContent(review.content);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditingContent("");
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">작성한 리뷰</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <Link href={`/article/${review.journal.id}`}>
                <p className="font-semibold hover:underline">{review.journal.title} - 평점: {review.journal.rating}점</p>
              </Link>
              {editingReviewId === review.id ? (
                <div>
                  <textarea
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleUpdate(review.id)} className="text-sm text-blue-500 hover:text-blue-700">저장</button>
                    <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-gray-700">취소</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mt-1">{review.content}</p>
                  <p className="text-gray-500 text-sm mt-2">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={() => handleEdit(review)} className="text-sm text-gray-500 hover:text-gray-700">수정</button>
                    <button onClick={() => handleDelete(review.id)} className="text-sm text-red-500 hover:text-red-700">삭제</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyPageReviews;
