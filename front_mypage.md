📌 1. 목적

헤더 오른쪽에 “마이페이지” 메뉴를 추가하여, 로그인한 사용자가
본인의 활동 내역(프로필, 찜한 장비, 작성한 리뷰/게시글)을 관리할 수 있도록 한다.

🧩 2. 위치 및 UI 구성

Header 우측 버튼 구성 (로그인 상태에 따라 다름)

상태	표시 버튼
비로그인	로그인 / 회원가입
로그인	마이페이지 / 로그아웃

로그인 후 우측 상단 버튼 영역:
[검색창] [로그인/회원가입] → [마이페이지] [로그아웃] 으로 변경

마이페이지 버튼 클릭 시 /mypage 라우트로 이동

🎨 3. 화면 설계

파일 경로 예시:

frontend/
┣ components/
┃ ┣ Header.tsx
┃ ┗ MyPage/
┃    ┣ MyPageHeader.tsx
┃    ┣ MyPageInfo.tsx
┃    ┣ MyPageFavorites.tsx
┃    ┗ MyPageReviews.tsx
┣ pages/
┃ ┗ mypage/
┃    ┗ index.tsx


MyPage 주요 섹션 구성:

구역	내용
 








찜 목록 (Favorites)	사용자가 ‘좋아요’한 장비 리스트
작성한 리뷰 (Reviews)	사용자가 남긴 후기 목록
설정 (Settings)	비밀번호 변경, 로그아웃, 회원 탈퇴 등
⚙️ 4. 라우팅 구조

/mypage → 메인 마이페이지
/mypage/favorites → 찜한 장비 목록
/mypage/reviews → 내가 쓴 리뷰 목록
/mypage/settings → 계정 설정

🔐 5. 접근 권한

로그인 상태에서만 접근 가능

비로그인 사용자가 접근 시 → /login 페이지로 리다이렉트

예시 코드 (Next.js, React):

// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
const token = req.cookies.get('accessToken')
if (!token && req.nextUrl.pathname.startsWith('/mypage')) {
return NextResponse.redirect(new URL('/login', req.url))
}
}

💻 6. 예시 컴포넌트 코드
// components/Header.tsx
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
const { user, logout } = useAuth()

return (
<header className="flex justify-between items-center px-6 py-4 border-b">
<h1 className="text-xl font-bold">gear</h1>
<input type="text" placeholder="장비, 카테고리, 기사 검색" className="border rounded px-3 py-1 w-1/3" />
<nav className="flex items-center space-x-4">
{user ? (
<>
<Link href="/mypage" className="hover:text-blue-600">마이페이지</Link>
<button onClick={logout} className="text-gray-600 hover:text-red-500">로그아웃</button>
</>
) : (
<>
<Link href="/login">로그인</Link>
<Link href="/signup" className="bg-black text-white px-3 py-1 rounded">회원가입</Link>
</>
)}
</nav>
</header>
)
}

📱 7. 디자인 스타일

Tailwind 기반

톤앤매너: 메인 페이지와 동일한 화이트 + 블루 포인트 컬러(#4F46E5)

프로필 카드 예시: 그림자 + 둥근 모서리 + 프로필 이미지 원형 처리

✅ 8. 추후 확장 계획
기능	설명
프로필 수정 API 연동	이름, 이메일, 프로필 이미지 변경
찜/리뷰 무한 스크롤	사용자의 활동 내역이 많을 경우 대비
회원 탈퇴	백엔드 API 연동 후 soft delete 처리