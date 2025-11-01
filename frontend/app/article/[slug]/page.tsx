"use client";

import { useEffect, useState } from "react";

interface Equipment {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  purchaseUrl: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  content: string;
  category: { id: number; name: string; slug: string };
  equipments?: Equipment[];
}

type Props = { params: { slug: string } };

export default function ArticlePage({ params }: Props) {
  const { slug } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/articles/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="text-center py-12">로딩 중...</p>;
  if (!article) return <p className="text-center py-12">기사를 찾을 수 없습니다.</p>;

  return (
      <article className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-8">
          {article.author} · {new Date(article.createdAt).toLocaleDateString("ko-KR")}
        </p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose" />

        {/* ✅ 장비 섹션 */}
        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">관련 장비</h2>
          {article.equipments && article.equipments.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {article.equipments.map((eq) => (
                    <div key={eq.id} className="border rounded-xl p-4 bg-white shadow-sm">
                      <img
                          src={eq.imageUrl}
                          alt={eq.name}
                          className="w-full h-48 object-cover rounded-md mb-3"
                      />
                      <h3 className="text-lg font-semibold">{eq.name}</h3>
                      <p className="text-gray-600 mb-2">{eq.price.toLocaleString()}원</p>
                      <a
                          href={eq.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline text-sm"
                      >
                        구매 링크 →
                      </a>
                    </div>
                ))}
              </div>
          ) : (
              <p className="text-gray-500 text-sm">관련 장비가 없습니다.</p>
          )}
        </section>
      </article>
  );
}
