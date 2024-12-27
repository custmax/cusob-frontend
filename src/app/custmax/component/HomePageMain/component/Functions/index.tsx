import React from 'react';
import {flexbox} from "@mui/system";

const Functions = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6">
                <h1 className="text-5xl tracking-wider font-bold text-white mb-2">Tired of low engagement? </h1>
                <h1 className="text-5xl tracking-wider font-semibold text-white">Let’s fix that</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-white">Struggling with unopened emails? Losing leads to poor communication?</p>
                <p className="text-lg text-white">CustMax boosts engagement, raises open rates, and turns leads into loyal customers.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-12">
                Book a Demo
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-12 mb-20">
                <div className="flex flex-col items-center border border-gray-400 rounded-lg shadow-xl p-4 py-10">
                    <img src="/temp_imgs/functions_1.png" alt="Image 1" className="rounded-lg mb-2 max-w-80 h-60 w-60 max-h-60"/>
                    <h2 className="text-2xl mt-4 text-white ">User segmentation</h2>
                </div>
                <div className="flex flex-col items-center border border-gray-400 rounded-lg shadow-xl p-2 py-10">
                    <img src="/temp_imgs/functions_2.png" alt="Image 2" className="rounded-lg mb-2 max-w-80 h-60 w-65 max-h-60"/>
                    <h2 className="text-2xl mt-4 text-white ">User segmentation</h2>
                </div>
                <div className="flex flex-col items-center border border-gray-400 rounded-lg shadow-xl p-2 py-10">
                    <img src="/temp_imgs/functions_3.png" alt="Image 3" className="rounded-lg mb-2 max-w-80 h-60 w-60 max-h-60"/>
                    <h2 className="text-2xl mt-4 text-white ">User segmentation</h2>
                </div>
            </div>

            {/*    功能大图*/}
            <div>
                <img src="/temp_imgs/function.png" alt="bigImg"
                     className="rounded-3xl mt-20 w-[1080px] max-w-[1200px] max-h-[720px]"/>
            </div>
        </div>
    );
};

export default Functions;
