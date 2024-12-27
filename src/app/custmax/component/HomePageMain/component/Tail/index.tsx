import React from "react";

const Tail = () => {
    return (
        <div className="bg-[#0b0121] flex flex-col items-center p-8">
            {/* 两行标题 */}
            <div className="text-center mb-6 mt-20">
                <h1 className="text-4xl tracking-wider font-bold text-white mb-2">Main Title</h1>
                <h1 className="text-4xl tracking-wider font-semibold text-white">Sub Title Here</h1>
            </div>

            {/* 两排小字 */}
            <div className="text-center mb-6">
                <p className="text-lg text-[#AAA]">This is the first line of description.</p>
                <p className="text-lg text-[#AAA]">This is the second line of description.</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className="px-8 py-3 text-[#ececec] border-2 border-[#ececec] rounded-full mb-32">
                Click Me
            </button>

        </div>
    );
}

export default Tail;