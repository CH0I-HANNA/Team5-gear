import Link from "next/link";
import { routes } from "@/lib/routes";

export default function Page() {
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
              캠핑, 수영, 골프, 테니스 등 취미 장비를 한눈에 비교하고 빠르게 시작하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Link href={routes.categoryCamping} className="group block rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12l10 10L22 12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 12l8 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">캠핑</h2>
              <p className="mt-1 text-sm text-gray-600">의자, 테이블, 버너 시작 가이드</p>
            </Link>
            <Link href={routes.categorySwimming} className="group block rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">수영</h2>
              <p className="mt-1 text-sm text-gray-600">수모, 수경, 수영복 기본 추천</p>
            </Link>
            <Link href={routes.categoryGolf} className="group block rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex justify-center text-gray-400 group-hover:text-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 0-10 10h2a8 8 0 0 1 8-8V2z" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">골프</h2>
              <p className="mt-1 text-sm text-gray-600">입문 아이언세트 고르는 법</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">주요 추천 장비</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              가장 인기있는 추천 장비들을 확인해보세요.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">초보 캠퍼를 위한 필수 텐트 선택 가이드</h3>
              <p className="mt-2 text-sm text-gray-600">캠핑의 시작, 좋은 텐트 선택이 반입니다.</p>
              <Link href={routes.articleTentSelectionGuide} className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</Link>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">입문용 캠핑 의자 Best 5</h3>
              <p className="mt-2 text-sm text-gray-600">편안함과 실용성을 모두 잡은 최고의 선택</p>
              <a href="#" className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</a>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">가성비 수영 수경 추천</h3>
              <p className="mt-2 text-sm text-gray-600">선수처럼, 전문가처럼</p>
              <a href="#" className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</a>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">초보자용 골프 아이언 세트</h3>
              <p className="mt-2 text-sm text-gray-600">첫 라운딩을 위한 완벽한 준비</p>
              <a href="#" className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
