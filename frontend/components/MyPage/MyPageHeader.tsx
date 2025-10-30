
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyPageHeader = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-500 hover:text-gray-700";
  };

  return (
    <div className="border-b">
      <nav className="flex justify-center space-x-8">
        <Link href="/mypage" className={`py-4 px-1 ${getLinkClass("/mypage")}`}>
          프로필
        </Link>
        <Link href="/mypage/favorites" className={`py-4 px-1 ${getLinkClass("/mypage/favorites")}`}>
          찜한 장비
        </Link>
        <Link href="/mypage/reviews" className={`py-4 px-1 ${getLinkClass("/mypage/reviews")}`}>
          작성한 리뷰
        </Link>
        <Link href="/mypage/settings" className={`py-4 px-1 ${getLinkClass("/mypage/settings")}`}>
          설정
        </Link>
      </nav>
    </div>
  );
};

export default MyPageHeader;
