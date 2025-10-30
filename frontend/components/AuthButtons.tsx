'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function AuthButtons() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="flex items-center gap-2">
            {isAuthenticated ? (
                <>
                    <Link href="/mypage">
                        <button
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                            aria-label="마이페이지"
                        >
                            마이페이지
                        </button>
                    </Link>
                    <button
                        onClick={logout}
                        className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                        aria-label="로그아웃"
                    >
                        로그아웃
                    </button>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <button
                            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                            aria-label="로그인"
                        >
                            로그인
                        </button>
                    </Link>
                    <Link href="/signup">
                        <button
                            className="rounded-xl bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black"
                            aria-label="회원가입"
                        >
                            회원가입
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}
