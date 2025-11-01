"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    }

    fetchCategories();
  }, []);

  const companyLinks = [
    { name: "회사 소개", path: "#" },
    { name: "문의하기", path: "#" },
  ];

  const legalLinks = [
    { name: "이용약관", path: "#" },
    { name: "개인정보처리방침", path: "#" },
  ];

  return (
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">gear</h3>
              <p className="mt-2 text-sm text-gray-600">
                취미 장비를 쉽게 고르는 가장 좋은 방법.
              </p>
            </div>

            {/* 카테고리 */}
            <div>
              <h4 className="font-semibold text-gray-900">카테고리</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category.id}>
                          <a
                              href={`/category/${category.slug}`}
                              className="text-gray-600 hover:underline"
                          >
                            {category.name}
                          </a>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400">불러오는 중...</li>
                )}
              </ul>
            </div>

            {/* 회사 */}
            <div>
              <h4 className="font-semibold text-gray-900">회사</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {companyLinks.map((link) => (
                    <li key={link.path}>
                      <a href={link.path} className="text-gray-600 hover:underline">
                        {link.name}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            {/* 법적 고지 */}
            <div>
              <h4 className="font-semibold text-gray-900">법적 고지</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {legalLinks.map((link) => (
                    <li key={link.path}>
                      <a href={link.path} className="text-gray-600 hover:underline">
                        {link.name}
                      </a>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} gear. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
  );
}
