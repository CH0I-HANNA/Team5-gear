"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  categoryId: number;
  name: string;
  slug: string;
  description: string;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-12">로딩 중...</p>;

  return (
      <>
        {/* Hero Section */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center py-16 md:py-24">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                <span className="block">취미 장비,</span>
                <span className="block text-indigo-600 mt-2">전문가가 골라드립니다</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                취미별 장비를 한눈에 비교하고 빠르게 시작하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-gray-50 border-y">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-8 md:grid-cols-3">
              {categories.map((cat) => (
                  <Link
                      key={cat.categoryId}
                      href={`/category/${cat.slug}`}
                      className="group block rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all"
                  >
                    <h2 className="mt-4 text-lg font-bold text-gray-900">{cat.name}</h2>
                    <p className="mt-1 text-sm text-gray-600">{cat.description}</p>
                  </Link>
              ))}
            </div>
          </div>
        </section>
      </>
  );
}
