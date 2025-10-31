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
  category: string; // Assuming Article has a category field
}

type Props = {
  params: {
    slug: string;
  };
};

const categoryNames: { [key: string]: string } = {
  camping: "캠핑",
  swimming: "수영",
  golf: "골프",
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
        const response = await fetch(`/api/articles`);
        if (response.ok) {
          const data: Article[] = await response.json();
          // Filter articles by category on the frontend
          const filteredArticles = data.filter(article => article.category === categoryName);
          setArticles(filteredArticles);
        } else {
          setError('Failed to fetch articles');
        }
      } catch (err) {
        setError('An error occurred while fetching articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug, categoryName]);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{categoryName} 장비</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          {categoryName}에 필요한 모든 장비를 확인하세요.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="space-y-12">
          {articles.map((article, index) => (
            <article key={index} className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-video md:aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">{article.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{article.author} · {new Date(article.createdAt).toLocaleDateString()}</p>
                <p className="mt-4 text-gray-700 leading-relaxed hidden sm:block">{article.description}</p>
                <Link href={`/article/${article.slug}`} className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">이 카테고리에는 아직 기사가 없습니다.</p>
        </div>
      )}
    </section>
  );
}