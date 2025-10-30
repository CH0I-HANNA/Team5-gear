"use client";

import { useState } from "react";

type Props = {
  placeholder?: string;
  onSubmit: (query: string) => void;
};

export default function SearchBox({ placeholder, onSubmit }: Props) {
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="사이트 검색"
        className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-gray-800"
      />
      <button
        type="submit"
        aria-label="검색"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-sm hover:bg-gray-100"
      >
        검색
      </button>
    </form>
  );
}
