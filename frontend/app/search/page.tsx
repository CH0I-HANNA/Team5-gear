"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface EquipmentResponse {
  equipmentId: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState<EquipmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
        } else {
          setError("Failed to fetch search results");
        }
      } catch (err) {
        setError("An error occurred while fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults().catch(err => {
      console.error("Error in fetchSearchResults:", err);
      setError("An unexpected error occurred during search.");
      setLoading(false);
    });
  }, [query]);

  if (loading) {
    return <div className="container mx-auto p-4">검색 결과를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">오류: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">'{query}' 검색 결과</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((equipment) => (
            <div key={equipment.equipmentId} className="border rounded-lg p-4 shadow-sm">
              {equipment.imageUrl && (
                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={equipment.imageUrl}
                    alt={equipment.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold">{equipment.name}</h2>
              <p className="text-gray-600 text-sm">카테고리: {equipment.category}</p>
              <p className="text-gray-700 mt-2">{equipment.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
