'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        if (!username) {
            setError("아이디를 입력해 주세요.");
            return;
        }
        if (!email) {
            setError("이메일을 입력해 주세요.");
            return;
        }
        if (!password) {
            setError("비밀번호를 입력해 주세요.");
            return;
        }

        // Username format validation (5-20 characters, lowercase English letters, numbers, ., -)
        const usernameRegex = /^[a-z0-9.-]{5,20}$/;
        if (!usernameRegex.test(username)) {
            setError("아이디는 5~20자로 영문 소문자, 숫자, 특수기호(.)(-)만 사용할 수 있습니다.");
            return;
        }

        // Email format validation
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError("이메일 형식에 맞지 않는 메일 주소입니다. 다시 입력해 주세요.");
            return;
        }

        // Password format validation (8-20 characters, uppercase, lowercase, number, special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
        if (!passwordRegex.test(password)) {
            setError("비밀번호는 8~20자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요.");
            return;
        }

        try {
            await signup({ username, email, password });
            router.push('/login'); // Redirect to login page after successful signup
        } catch (err: any) {
            console.error(err);
            let errorMessage = "회원가입에 실패했습니다. 다시 시도해 주세요.";
            if (err.message) {
                if (err.message === "Username already exists") {
                    errorMessage = "이미 사용 중인 아이디입니다.";
                } else if (err.message === "Email already exists") {
                    errorMessage = "이미 사용 중인 이메일입니다.";
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
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            // required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
