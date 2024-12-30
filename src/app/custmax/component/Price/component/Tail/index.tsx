import React from "react";

const Tail = () => {
    return (
        <div className="bg-[#ffffff] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6 pt-40">
                <h1 className="text-5xl tracking-wider font-bold text-[#0b0121] mb-2">Emails that engage </h1>
                <h1 className="text-5xl tracking-wider font-semibold text-[#0b0121]">Results that endure</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-10 mt-4">
                <p className="text-xl text-[#0b0121]">Start Free, Stay Free. Engage Forever.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#0b0121] border-2 border-[#0b0121] rounded-full mb-32">
                Book a Demo
            </button>

        </div>
    );
}

export default Tail;