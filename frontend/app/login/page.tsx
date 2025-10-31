'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError("아이디를 입력해 주세요."); // Using '아이디' as per errorMessage.md for consistency
            return;
        }
        if (!password) {
            setError("비밀번호를 입력해 주세요.");
            return;
        }

        try {
            await login({ email, password });
            router.push('/');
        } catch (err: any) {
            console.error(err);
            let errorMessage = "일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 이용해 주세요.";
            if (err.message) {
                if (err.message.includes("Bad credentials") || err.message.includes("Authentication Failed")) {
                    errorMessage = "등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.";
                } else {
                    errorMessage = err.message;
                }
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            //required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            //required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
