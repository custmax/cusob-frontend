// pages/Ebooks/Login.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 使用 next/navigation 而不是 next/router

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // 在这里可以添加实际的登录逻辑
        // 模拟登录成功后，返回电子书页面
        router.push('/Ebooks'); // 登录成功后返回电子书页面
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">登录</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">用户名</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">密码</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        登录
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;