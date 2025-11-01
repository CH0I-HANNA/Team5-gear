"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  content: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
}

type Props = {
  params: {
    slug: string;
  };
};

const categoryNames: Record<string, string> = {
  camping: "캠핑",
  hiking: "등산",
  fishing: "낚시",
  climbing: "클라이밍",
};

export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  const categoryName = categoryNames[slug] || "알 수 없는 카테고리";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/articles/category/${slug}`, {
          cache: "no-store",
        });

        if (response.ok) {
          const data: Article[] = await response.json();
          setArticles(data);
        } else if (response.status === 404) {
          setArticles([]); // 카테고리에 기사가 없는 경우
        } else {
          setError("서버에서 데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("데이터를 불러오는 중 네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  // 로딩 중일 때
  if (loading) {
    return (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg animate-pulse">로딩 중입니다...</p>
        </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
    );
  }

  // 본문 렌더링
  return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        {/* 헤더 영역 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {categoryName} 장비
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {categoryName}에 필요한 모든 장비와 관련 기사를 확인하세요.
          </p>
        </div>

        {/* 기사 리스트 */}
        {articles.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2">
              {articles.map((article) => (
                  <article
                      key={article.id}
                      className="flex flex-col border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white p-6"
                  >
                    {/* 이미지 영역 (없을 경우 아이콘) */}
                    <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <svg
                          className="w-10 h-10 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>

                    {/* 텍스트 내용 */}
                    <div className="flex flex-col flex-1">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">
                        {article.author} ·{" "}
                        {new Date(article.createdAt).toLocaleDateString("ko-KR")}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm line-clamp-3 mb-4">
                        {article.description}
                      </p>

                      <Link
                          href={`/article/${article.slug}`}
                          className="mt-auto text-indigo-600 font-medium hover:underline"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </article>
              ))}
            </div>
        ) : (
            // 데이터가 없을 때
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">
                {categoryName} 관련 기사가 아직 등록되지 않았습니다.
              </p>
            </div>
        )}
      </section>
  );
}
