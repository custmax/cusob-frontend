import React from 'react';
import {flexbox} from "@mui/system";

const Functions = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6">
                <h1 className="text-4xl tracking-wider font-bold text-white mb-2">Main Title</h1>
                <h1 className="text-4xl tracking-wider font-semibold text-white">Sub Title Here</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-[#AAA]">This is the first line of description.</p>
                <p className="text-lg text-[#AAA]">This is the second line of description.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-12">
                Click Me
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-14 mb-20">
                <div className="flex flex-col items-center">
                    <img src="https://via.placeholder.com/150" alt="Image 1"
                         className="rounded-lg mb-2 max-w-80 max-h-80"/>
                    <p className="text-sm text-[#555]">Image 1</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://via.placeholder.com/150" alt="Image 2"
                         className="rounded-lg mb-2 max-w-80 max-h-80"/>
                    <p className="text-sm text-[#555]">Image 2</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://via.placeholder.com/150" alt="Image 3"
                         className="rounded-lg mb-2 max-w-80 max-h-80"/>
                    <p className="text-sm text-[#555]">Image 3</p>
                </div>
            </div>

        {/*    功能大图*/}
            <div>
                <img src="https://via.placeholder.com/750" alt="bigImg"
                     className="rounded-3xl max-w-[960px] max-h-[720px]"/>
            </div>
        </div>
    );
};

export default Functions;
