import React from "react";

const Header = () => {
    return (
        <header className="shadow-md" style={{backgroundColor: '#1b0742'}}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* 左侧 Logo 和链接 */}
                <div className="flex items-center space-x-8">
                    {/* Logo */}
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className="h-8 w-auto cursor-pointer"
                    />
                    <a
                        href="#"
                        className="text-white hover:text-blue-600 font-medium"
                    >
                        Pricing
                    </a>

                    {/* Resources 下拉菜单 */}
                    <div className="relative group">
                        <button className="flex items-center text-white hover:text-blue-600 font-medium">
                            Resources
                            {/* 下拉箭头 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1 transition-transform group-hover:rotate-180"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.356a.75.75 0 111.02 1.1l-4 3.75a.75.75 0 01-1.02 0l-4-3.75a.75.75 0 01-.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {/* 下拉菜单 */}
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-200 ease-in-out">
                            <a
                                href="#docs"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Documentation
                            </a>
                            <a
                                href="#guides"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Guides
                            </a>
                            <a
                                href="#blog"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                                Blog
                            </a>
                        </div>
                    </div>

                </div>

                {/* 右侧按钮 */}
                <div className="flex items-center space-x-4">
                    {/* Contact Sales 按钮 */}
                    <button
                        className="bg-transparent text-white px-6 py-2 rounded-full border-2 border-white hover:bg-violet-600">
                        Contact Sales
                    </button>
                    {/* Log In 按钮 */}
                    <button
                        className="bg-white text-black px-6 py-2 rounded-full">
                        Log In
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
