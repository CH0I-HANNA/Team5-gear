"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBox from "./SearchBox";
import AuthButtons from "./AuthButtons";
import { routes } from "@/lib/routes";

export default function Header() {
  const router = useRouter();
  const [isCategoryOpen, setCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href={routes.home} className="shrink-0 text-xl font-bold tracking-tight">
          gear
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button className="hover:underline flex items-center gap-1">
              <span>카테고리</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-40">
                <div className="rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link href={routes.categoryCamping} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      캠핑
                    </Link>
                    <Link href={routes.categorySwimming} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      수영
                    </Link>
                    <Link href={routes.categoryGolf} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      골프
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

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