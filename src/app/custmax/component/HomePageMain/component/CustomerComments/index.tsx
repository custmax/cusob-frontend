import React from 'react';
import {flexbox} from "@mui/system";

const CustomComments = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6">
                <h1 className="text-5xl tracking-wider font-bold text-white mb-2">Hear it from our customers</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-white">Trusted by businesses worldwide, delivering real results</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-12">
                Book a Demo
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-4 -mb-20">
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
