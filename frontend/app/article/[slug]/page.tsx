"use client";

import { notFound } from 'next/navigation';
import ReviewSection from '@/components/ReviewSection';
import { useEffect, useState } from 'react';

interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string; // Use createdAt for date
  content: string;
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
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${slug}`);
        if (response.ok) {
          const data: Article = await response.json();
          setArticle(data);
        } else if (response.status === 404) {
          notFound();
        } else {
          setError('Failed to fetch article');
        }
      } catch (err) {
        setError('An error occurred while fetching the article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    notFound(); // Should be caught by 404 check above, but good for type safety
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{article.title}</h1>
          <p className="mt-4 text-lg text-gray-500">{article.author} · {new Date(article.createdAt).toLocaleDateString()}</p>
        </header>
        
        <div className="prose lg:prose-xl mx-auto">
          <div className="aspect-video bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="lead">{article.description}</p>
          <p>{article.content}</p>
        </div>
      </article>
    </main>
  );
}