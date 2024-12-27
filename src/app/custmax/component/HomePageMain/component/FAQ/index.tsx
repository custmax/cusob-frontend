import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<Number | null>(null);

    const togglePanel = (index: Number) => {
        // 如果选中的 QA 已经是打开状态，则关闭它，否则切换到新的 QA
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="bg-[#0b0121] h-auto max-h-[1020px] flex justify-center items-center">
            <div className="max-w-[960px] w-[960px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="py-10 text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>

                {[...Array(5)].map((_, index) => (
                    <div key={index} className="mb-4 border-b border-gray-300">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => togglePanel(index)}
                        >
                            <span
                                className={`text-lg font-semibold ${activeIndex === index ? 'text-[#6747f8]' : 'text-gray-600'}`}
                            >
                                Question {index + 1}
                            </span>
                            {/* 使用SVG图标代替箭头 */}
                            {activeIndex === index ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 12.707a1 1 0 011.414 0L10 9.414l3.293 3.293a1 1 0 111.414-1.414l-4-4a1 1 0 01-1.414 0l-4 4a1 1 0 010 1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            )}
                        </div>
                        {activeIndex === index && (
                            <div className="p-4 bg-white rounded-b-lg">
                                <p className="text-gray-700">
                                    This is the answer to question {index + 1}. You can add any content here, like text
                                    or images.
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
