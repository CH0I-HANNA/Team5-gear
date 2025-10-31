"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import AuthButtons from "./AuthButtons";
import { routes } from "@/lib/routes";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function Header() {
  const router = useRouter();
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 카테고리 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories", {
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("카테고리 응답 데이터:", data);
          setCategories(data);
        } else {
          console.error("카테고리 데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("카테고리 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          {/* 로고 */}
          <Link href={routes.home} className="shrink-0 text-xl font-bold tracking-tight text-gray-800">
            gear
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6 text-sm relative">
            <div
                className="relative"
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
            >
              <button className="hover:underline flex items-center gap-1 text-gray-800 font-medium">
                <span>카테고리</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-transform duration-200 ${
                        isCategoryOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                  <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* ✅ 드롭다운: 카테고리 목록 */}
              {isCategoryOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-44">
                    <div className="rounded-lg bg-white shadow-lg ring-1 ring-gray-200 overflow-hidden">
                      <div className="py-1">
                        {loading ? (
                            <p className="text-center text-gray-500 text-sm py-2">불러오는 중...</p>
                        ) : categories.length > 0 ? (
                            categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                  {cat.name}
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 text-sm py-2">카테고리 없음</p>
                        )}
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </nav>

          {/* 검색 + 로그인 */}
          <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-none md:w-[360px]">
              <SearchBox
                  placeholder="장비, 카테고리, 기사를 검색하세요"
                  onSubmit={(q) => router.push(`${routes.search}?q=${encodeURIComponent(q)}`)}
              />
            </div>
            <AuthButtons />
          </div>
        </div>
      </header>
  );
}
