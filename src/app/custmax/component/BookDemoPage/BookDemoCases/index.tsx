import React, { useState } from 'react';

const images = [
    'temp_imgs/comment_1.png',
    'temp_imgs/comment_1.png',
    'temp_imgs/comment_1.png',
    'temp_imgs/comment_1.png',
];

const BookDemoPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 点击左侧按钮
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // 点击右侧按钮
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#0b0121] p-6">
            {/* 标题 */}
            <h1 className="text-5xl mt-20 py-8 font-bold text-[#ececec] mb-4">Case studies</h1>

            {/* 小字 */}
            <h2 className="text-lg text-[#bfbdc3] mb-6">Real stories, real results: discover how businesses like yours achieved success with CustMax</h2>

            {/* 照片墙 */}
            <div className="relative w-full max-w-4xl">
                {/* 左侧按钮 */}
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
                >
                    &lt;
                </button>

                {/* 图片展示 */}
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="w-full h-auto rounded-lg shadow-lg"
                />

                {/* 右侧按钮 */}
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default BookDemoPage;
