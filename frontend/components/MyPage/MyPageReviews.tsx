
"use client";

const MyPageReviews = () => {
  // This component would fetch and display the user's reviews.
  // For now, it's a placeholder.
  const userReviews = [
    {
      id: 1,
      product: "캠핑 텐트",
      rating: 5,
      content: "아주 만족스러운 텐트입니다. 설치도 쉽고 공간도 넓어요!",
      date: "2023-10-26",
    },
    {
      id: 2,
      product: "등산 배낭",
      rating: 4,
      content: "편안하고 수납 공간도 충분합니다. 다만 색상이 조금 아쉽네요.",
      date: "2023-09-15",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">작성한 리뷰</h2>
      {userReviews.length > 0 ? (
        <div className="space-y-4">
          {userReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <p className="font-semibold">{review.product} - 평점: {review.rating}점</p>
              <p className="text-gray-700 mt-1">{review.content}</p>
              <p className="text-gray-500 text-sm mt-2">작성일: {review.date}</p>
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
