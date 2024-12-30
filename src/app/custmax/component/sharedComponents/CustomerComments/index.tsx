import React from 'react';

interface props {
    theme: 'dark' | 'light';
}

const CustomComments: React.FC<props> = ({theme}: props) => {
    return (
        <div className={`flex flex-col items-center ${theme === 'dark' ? 'bg-[#0b0121]' : 'bg-[#ffffff]'}`}>
            <div className="text-center mt-24 mb-6">
                <h1 className={`text-5xl tracking-wider font-bold mb-4 ${theme === 'dark' ? 'text-[#ececec]' : 'text-[#000000]'}`}>Hear
                    it from our customers</h1>
            </div>

            <div className="text-center mb-8">
                <p className={`text-lg ${theme === 'dark' ? 'text-[#d0cfd3]' : 'text-[#141414]'}`}>Trusted by businesses
                    worldwide, delivering real results</p>
            </div>

            {/* 圆角透明按钮 */}
            <button
                className={`px-8 py-3 border-[1.5px] rounded-full ${theme === 'dark' ? 'text-[#ececec] border-[#ececec]' : 'text-[#000000] border-[#000000]'}`}>
                Book a Demo
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-2 mt-10 mb-20">
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/comment_3.png" alt="Image 1"
                        className="rounded-lg mb-2 w-[350px] h-[400px]"/>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/comment_2.png" alt="Image 2"
                        className="rounded-lg mb-2 w-[350px] h-[400px]"/>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/comment_1.png" alt="Image 3"
                        className="rounded-lg mb-2 w-[350px] h-[400px]"/>
                </div>
            </div>
        </div>
    );
};

export default CustomComments;
