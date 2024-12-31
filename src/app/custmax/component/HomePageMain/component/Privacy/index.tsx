import React from 'react';
import {flexbox} from "@mui/system";

const Privacy = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6">
                <h1 className="text-5xl tracking-wider font-bold text-white mb-2">Your privacy, our priority</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-white">CustMax is committed to protecting your data privacy with advanced encryption </p>
                <p className="text-lg text-white">and multi-layer security, ensuring your information stays exclusively with you. </p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-20">
                Book a Demo
            </button>

            {/* 图片部分 */}
            <div className="grid grid-cols-3 gap-x-16 mb-20">
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/privacy/security_1.png" alt="Image 1"
                         className="rounded-lg mb-2 max-w-80 w-[80] h-[80] max-h-80"/>
                    <p className="text-xl text-center -mt-16 text-white">
                        Advanced<br/>
                        encryption technology
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/privacy/security_2.png" alt="Image 2"
                         className="rounded-lg mb-2 max-w-80 w-[80] h-[80] max-h-80"/>
                    <p className="text-xl text-center -mt-16 text-white">
                        Multi-layered<br/>
                        security systems
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/temp_imgs/home/privacy/security_3.png" alt="Image 3"
                         className="rounded-lg mb-2 max-w-80 w-[80] h-[80] max-h-80"/>
                    <p className="text-xl text-center -mt-10 text-white">
                        Privacy-first approach
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
