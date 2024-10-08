// @ts-ignore
"use client";
import React, { useState } from 'react'; // 不推荐使用 @ts-ignore
import Link from 'next/link';

const EbookPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [cart, setCart] = useState<number[]>([]);

    // 电子书示例数据
    const ebooks = [
        { id: 1, title: 'React for Beginners', author: 'John Doe', price: 10 },
        { id: 2, title: 'Advanced Tailwind CSS', author: 'Jane Smith', price: 15 },
        { id: 3, title: 'Understanding Shadcn', author: 'Alice Johnson', price: 12 },
    ];
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogin = () => {
        // 模拟登录操作
        setIsLoggedIn(true);
        setShowDropdown(false); // 登录后关闭下拉框
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const addToCart = (id: number) => {
        setCart([...cart, id]);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
            <header className="w-full mb-8">
                <h1 className="text-3xl font-bold text-left">电子书商店</h1>
            </header>
            <div className="w-full mb-8 flex">
                <p className="text-xl font-bold text-left">首页</p>
                <div className="flex-grow"></div>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={isLoggedIn ? toggleDropdown : handleLogin} // 根据登录状态切换行为
                >
                    {isLoggedIn ? '我的账户' : '登录'}
                </button>
                {showDropdown && isLoggedIn && ( // 只有在登录后才显示下拉框
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                        <ul className="py-2">
                            <li>
                                <Link href="/Ebooks/userInfo" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    我的信息
                                </Link>
                            </li>
                            <li>
                                <Link href="/Ebooks/MyAccount" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    我的账户
                                </Link>
                            </li>
                            <li>
                                <Link href="/Ebooks/MyBooks" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    我的图书
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                    onClick={handleLogout} // 登出功能
                                >
                                    登出
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {/*/!* 登录模块 *!/*/}
            {/*<div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-md">*/}
            {/*    {!isLoggedIn ? (*/}
            {/*        <div>*/}
            {/*            <h2 className="text-xl font-semibold mb-4">登录</h2>*/}
            {/*            <button*/}
            {/*                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"*/}
            {/*                onClick={handleLogin}*/}
            {/*            >*/}
            {/*                登录*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p className="text-green-600">欢迎回来！</p>*/}
            {/*    )}*/}
            {/*</div>*/}
            {/* 购物车模块 */}
            {/*<div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-md">*/}
            {/*    <h2 className="text-xl font-semibold mb-4">购物车 ({cart.length} 件商品)</h2>*/}
            {/*    {cart.length === 0 ? (*/}
            {/*        <p>购物车为空</p>*/}
            {/*    ) : (*/}
            {/*        <ul>*/}
            {/*            {cart.map((id) => {*/}
            {/*                const ebook = ebooks.find((ebook) => ebook.id === id);*/}
            {/*                return (*/}
            {/*                    <li key={id} className="flex justify-between mb-2">*/}
            {/*                        <span>{ebook?.title}</span>*/}
            {/*                        <span>${ebook?.price}</span>*/}
            {/*                    </li>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </ul>*/}
            {/*    )}*/}
            {/*</div>*/}
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