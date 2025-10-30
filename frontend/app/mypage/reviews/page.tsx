
"use client";

import MyPageReviews from "@/components/MyPage/MyPageReviews";
import MyPageHeader from "@/components/MyPage/MyPageHeader";

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyPageHeader />
      <div className="mt-8">
        <MyPageReviews />
      </div>
    </div>
  );
}
