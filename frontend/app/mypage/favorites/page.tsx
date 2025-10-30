
"use client";

import MyPageFavorites from "@/components/MyPage/MyPageFavorites";
import MyPageHeader from "@/components/MyPage/MyPageHeader";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyPageHeader />
      <div className="mt-8">
        <MyPageFavorites />
      </div>
    </div>
  );
}
