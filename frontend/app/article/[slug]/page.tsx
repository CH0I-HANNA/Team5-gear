"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  content: string;
  category: Category;
}

type Props = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: Props) {
  const { slug } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/articles/${slug}`, {
          cache: "no-store", // 캐시 방지 → 최신 데이터 반영
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("기사를 찾을 수 없습니다.");
          }
          throw new Error("서버 오류가 발생했습니다.");
        }

        const data: Article = await response.json();
        setArticle(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-12 text-gray-500">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center py-12 text-red-500">{error}</p>;
  }

  if (!article) {
    return <p className="text-center py-12 text-gray-500">기사를 찾을 수 없습니다.</p>;
  }

  return (
      <article className="mx-auto max-w-4xl px-4 py-12">
        {/* 헤더 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {article.title}
          </h1>
          <p className="mt-3 text-gray-500 text-sm">
            {article.author} ·{" "}
            {new Date(article.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="mt-2 text-indigo-600 text-sm">
            #{article.category?.name || "카테고리 미지정"}
          </p>
        </header>

        {/* 본문 */}
        <section className="prose max-w-none prose-lg prose-indigo">
          {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
              <p className="text-gray-500">본문 내용이 없습니다.</p>
          )}
        </section>
      </article>
  );
}
