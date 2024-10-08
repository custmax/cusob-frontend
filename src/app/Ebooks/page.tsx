// @ts-ignore
"use client";
import React, { useState } from 'react'; // 不推荐使用 @ts-ignore


const EbookPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [cart, setCart] = useState<number[]>([]);

    // 电子书示例数据
    const ebooks = [
        { id: 1, title: 'React for Beginners', author: 'John Doe', price: 10 },
        { id: 2, title: 'Advanced Tailwind CSS', author: 'Jane Smith', price: 15 },
        { id: 3, title: 'Understanding Shadcn', author: 'Alice Johnson', price: 12 },
    ];

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const addToCart = (id: number) => {
        setCart([...cart, id]);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
            <header className="w-full mb-8">
                <h1 className="text-3xl font-bold text-center">电子书商店</h1>
            </header>
            {/* 登录模块 */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-md">
                {!isLoggedIn ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">登录</h2>
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                            onClick={handleLogin}
                        >
                            登录
                        </button>
                    </div>
                ) : (
                    <p className="text-green-600">欢迎回来！</p>
                )}
            </div>
            {/* 购物车模块 */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">购物车 ({cart.length} 件商品)</h2>
                {cart.length === 0 ? (
                    <p>购物车为空</p>
                ) : (
                    <ul>
                        {cart.map((id) => {
                            const ebook = ebooks.find((ebook) => ebook.id === id);
                            return (
                                <li key={id} className="flex justify-between mb-2">
                                    <span>{ebook?.title}</span>
                                    <span>${ebook?.price}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {/* 电子书展示模块 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {ebooks.map((ebook) => (
                    <div key={ebook.id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold">{ebook.title}</h3>
                        <p className="text-gray-600">作者: {ebook.author}</p>
                        <p className="text-xl font-bold">${ebook.price}</p>
                        <button
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                            onClick={() => addToCart(ebook.id)}
                        >
                            添加到购物车
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EbookPage;