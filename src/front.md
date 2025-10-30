# GEMINI.md
gear 메인페이지 사양

# 1) 목적과 범위
- 범위: 메인페이지 한 화면
- 영역: Header, Contents Area, Footer
- 기능: 홈 링크, 검색창, 로그인, 회원가입

# 2) 폴더 구조
app/
- layout.tsx
- page.tsx
- globals.css

components/
- Header.tsx
- SearchBox.tsx
- AuthButtons.tsx
- Footer.tsx

lib/
- routes.ts

# 3) 라우팅 가정
- 홈: /
- 로그인: /login
- 회원가입: /signup
- 검색 결과: /search?q=키워드

# 4) 구현 순서 요약
- 공용 레이아웃(app/layout.tsx)에서 Header와 Footer를 감싸고, 가운데에 children으로 콘텐츠 영역을 둡니다.
- Header에 로고(홈 이동), 홈 메뉴, 검색창, 로그인/회원가입 버튼을 배치합니다.
- Contents Area에는 간단한 안내 블록만 둡니다.
- Footer에는 간단한 저작권 문구만 둡니다.

# 5) 코드 스켈레톤

파일: app/layout.tsx
```tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "gear | 취미 장비 저널",
  description: "취미 장비를 쉽게 고르는 방법",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


# 파일: app/page.tsx

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold">취미 장비, 전문가가 골라드립니다</h1>
      <p className="mt-3 text-sm text-gray-600">
        캠핑, 수영, 골프, 테니스 등 취미 장비를 한눈에 비교하고 빠르게 시작하세요.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">캠핑</h2>
          <p className="mt-2 text-gray-600">의자, 테이블, 버너 시작 가이드</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">수영</h2>
          <p className="mt-2 text-gray-600">수모, 수경, 수영복 기본 추천</p>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">골프</h2>
          <p className="mt-2 text-gray-600">입문 아이언세트 고르는 법</p>
        </div>
      </div>
    </section>
  );
}


# 파일: components/Header.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBox from "./SearchBox";
import AuthButtons from "./AuthButtons";
import { routes } from "@/lib/routes";

export default function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href={routes.home} className="shrink-0 text-xl font-bold tracking-tight">
          gear
        </Link>

        <nav className="hidden md:flex items-center gap-3 text-sm">
          <Link href={routes.home} className="hover:underline">
            홈
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none md:w-[360px]">
            <SearchBox
              placeholder="장비, 카테고리, 기사 검색"
              onSubmit={(q) => router.push(`${routes.search}?q=${encodeURIComponent(q)}`)}
            />
          </div>

          <AuthButtons
            onLogin={() => router.push(routes.login)}
            onSignup={() => router.push(routes.signup)}
          />
        </div>
      </div>
    </header>
  );
}


# 파일: components/SearchBox.tsx

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


# 파일: components/AuthButtons.tsx

type Props = {
  onLogin: () => void;
  onSignup: () => void;
  isLoggedIn?: boolean;
};

export default function AuthButtons({ onLogin, onSignup, isLoggedIn = false }: Props) {
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onLogin}
        className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        aria-label="로그인"
      >
        로그인
      </button>
      <button
        onClick={onSignup}
        className="rounded-xl bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black"
        aria-label="회원가입"
      >
        회원가입
      </button>
    </div>
  );
}


# 파일: components/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} gear. 모든 권리 보유.</p>
      </div>
    </footer>
  );
}


# 파일: lib/routes.ts

export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  search: "/search",
} as const;


# 파일: app/globals.css

@tailwind base;
@tailwind components;
@tailwind utilities;

/* 필요 시 기본 여백 조정 등 최소 설정 */
html, body { height: 100%; }

# 6) 검증 체크리스트

- 헤더
로고 클릭 시 / 이동
홈 링크 동작
검색창 입력 후 엔터 또는 버튼 클릭 시 /search?q=키워드로 이동
로그인/회원가입 버튼 라우팅 동작

- 반응형
모바일에서 헤더 한 줄, 검색창 폭 100% 유지

- 접근성
검색 입력 aria-label 지정
버튼에 의미 있는 라벨 지정