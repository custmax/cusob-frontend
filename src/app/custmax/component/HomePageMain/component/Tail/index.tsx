import React from "react";

const Tail = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6 pt-40">
                <h1 className="text-5xl tracking-wider font-bold text-white mb-2">Emails that engage </h1>
                <h1 className="text-5xl tracking-wider font-semibold text-white">Results that endure</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-[#AAA]">Turn clicks into connections. Build results that last.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-32">
                Book a Demo
            </button>

        </div>
    );
}

export default Tail;