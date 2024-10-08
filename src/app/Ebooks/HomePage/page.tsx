// @ts-ignore
"use client";
import React, { useState } from 'react'; // 不推荐使用 @ts-ignore
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const EbookPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState<number[]>([]);

    // 电子书示例数据
    const ebooks = [
        { id: 1, title: 'React for Beginners', author: 'John Doe', price: 10 },
        { id: 2, title: 'Advanced Tailwind CSS', author: 'Jane Smith', price: 15 },
        { id: 3, title: 'Understanding Shadcn', author: 'Alice Johnson', price: 12 },
    ];
    const handleLinkClick = () => {
        setOpen(false);
        // 在这里添加跳转逻辑
    };
    const addToCart = (id: number) => {
        setCart([...cart, id]);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <nav className="flex justify-center w-full items-center p-4 bg-gray-100 text-black">
                <div className="flex items-center w-3/4 justify-center"> {/* 使用 justify-center 使内容居中 */}
                    <div className="text-3xl font-bold">首页</div>
                    <div className="flex-grow"></div>
                    <div>
                        <Link href={"/Ebooks"}>我的账户</Link>
                    </div>
                    {/* 左对齐标题 */}
                    {/*<DropdownMenu.Root open={open} onOpenChange={setOpen}>*/}
                    {/*    <DropdownMenu.Trigger className="focus:outline-none ml-10"> /!* 加一些左边距以分隔 *!/*/}
                    {/*        我的账户*/}
                    {/*    </DropdownMenu.Trigger>*/}
                    {/*    <DropdownMenu.Content*/}
                    {/*        className="mt-5 w-38 text-gray-800 bg-gray-300 rounded-b-md shadow-lg"*/}
                    {/*        onCloseAutoFocus={(event) => event.preventDefault()} // 禁用自动聚焦*/}
                    {/*    >*/}
                    {/*        <DropdownMenu.Item>*/}
                    {/*            <button*/}
                    {/*                onClick={handleLinkClick}*/}
                    {/*                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"*/}
                    {/*            >*/}
                    {/*                我的图书*/}
                    {/*            </button>*/}
                    {/*        </DropdownMenu.Item>*/}
                    {/*        <DropdownMenu.Item>*/}
                    {/*            <button*/}
                    {/*                onClick={handleLinkClick}*/}
                    {/*                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"*/}
                    {/*            >*/}
                    {/*                我的信息*/}
                    {/*            </button>*/}
                    {/*        </DropdownMenu.Item>*/}
                    {/*    </DropdownMenu.Content>*/}
                    {/*</DropdownMenu.Root>*/}
                </div>
            </nav>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 pt-8">
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