import React, { useState } from 'react';

const BookDemoPage: React.FC = () => {
    return (
        <div className="h-[820px] flex flex-col items-center bg-[#0b0121] p-6">
            {/* 标题 */}
            <h1 className="text-5xl mt-20 py-8 font-bold text-[#ececec] mb-4">Case studies</h1>

            {/* 小字 */}
            <h2 className="text-lg text-[#ececec] mb-12">Real stories, real results: discover how businesses like yours achieved success with CustMax</h2>

            {/* 照片墙 */}
            <div className="relative w-full max-w-4xl">
                {/* 图片展示 */}
                <img
                    src='/temp_imgs/book_demo/book_demo_cases/book_demo_case_1.png'
                    alt="Image 1"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default BookDemoPage;
