import React from 'react';
import {flexbox} from "@mui/system";

const Functions = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center">
            {/* 两行标题 */}
            <div className="text-center mb-6">
                <h1 className="text-5xl tracking-wider font-bold text-white mb-2">Tired of low engagement? </h1>
                <h1 className="text-5xl tracking-wider font-semibold text-white">Let’s fix that</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-[#ececec]">Struggling with unopened emails? Losing leads to poor communication?</p>
                <p className="text-lg text-[#ececec]">CustMax boosts engagement, raises open rates, and turns leads into loyal customers.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-12">
                Book a Demo
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-0 mb-10">
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/functions/function_1.png" alt="Image 1"
                        className="rounded-lg h-[430px] w-[380px]"/>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/functions/function_2.png" alt="Image 2"
                        className="rounded-lg h-[430px] w-[380px]"/>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/functions/function_3.png" alt="Image 3"
                        className="rounded-lg h-[430px] w-[380px]"/>
                </div>
            </div>

            {/*    功能大图*/}
            <div>
                <img src="/temp_imgs/home/functions/function_big.png" alt="bigImg"
                     className="rounded-3xl mt-20 w-[1080px] max-w-[1200px] max-h-[720px]"/>
            </div>
        </div>
    );
};

export default Functions;
