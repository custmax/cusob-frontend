import React, { useState } from 'react';

interface props {
    // 问题列表
    questionList: String[]
    // 回答列表
    answerList: String[]
}

const FAQ:React.FC<props> = ({questionList, answerList}: props) => {
    const [activeIndex, setActiveIndex] = useState<Number | null>(0);

    const togglePanel = (index: Number) => {
        // 如果选中的 QA 已经是打开状态，则关闭它，否则切换到新的 QA
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="bg-[#0b0121] h-auto max-h-[1020px] py-24 flex justify-center items-center">
            <div className="w-[1080px] h-[720px] mx-auto p-6 bg-[#e9e8eb] rounded-3xl shadow-lg">
                <h1 className="py-10 text-4xl font-bold text-center mb-2">Frequently Asked Questions</h1>

                {questionList.map((question, index) => (
                    <div key={index} className={`border-[#b1aeb9] ${index !== questionList.length - 1 && 'border-b'}`}>
                        <div
                            className="flex justify-between items-center p-3 cursor-pointer"
                            onClick={() => togglePanel(index)}
                        >
                            <span
                                className={`text-xl py-2 ml-8 font-medium ${activeIndex === index ? 'text-[#6747f8]' : 'text-[#0b0121]'}`}
                            >
                                {question}
                            </span>
                            {/* 使用SVG图标代替箭头 */}
                            {activeIndex === index ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-8 ${activeIndex === index? 'text-[#6747f8]' : 'text-[#0b0121]'}`}
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M5.293 12.707a1 1 0 011.414 0L10 9.414l3.293 3.293a1 1 0 111.414-1.414l-4-4a1 1 0 01-1.414 0l-4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 mr-8 w-6 text-gray-600"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"/>
                                </svg>
                            )}
                        </div>
                        {activeIndex === index && (
                            <div className="ml-10 mb-4 w-[850px] bg-[#e9e8eb] rounded-b-lg">
                                <p className="text-[#0b0121]">
                                    {answerList.at(index)}
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
