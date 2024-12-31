import React from "react";

interface props {
    theme: 'dark' | 'light';
}

const Tail: React.FC<props> = ({theme}: props) => {
    return (
        <div className={`flex flex-col  items-center p-8 ${theme === 'dark' ? 'bg-[#0b0121]' : 'bg-[#ffffff]'}`}>
            {/* 两行标题 */}
            <div className={`text-center mb-6 pt-12 ${theme === 'dark' ? 'text-[#ececec]' : 'text-[#0b0121]'}`}>
                <h1 className="text-5xl tracking-wider font-bold mb-2">Emails that engage </h1>
                <h1 className="text-5xl tracking-wider font-semibold">Results that endure</h1>
            </div>

            {/* 两排小字 */}
            <div className={`text-center mb-10 mt-4 ${theme === 'dark' ? 'text-[#ececec]' : 'text-[#0b0121]'}`}>
                <p className="text-xl">{theme === 'dark' ? 'Turn clicks into connections. Build results that last.' :'Start Free, Stay Free. Engage Forever.'}</p>
            </div>

            {/* 圆角透明按钮 */}
            <button className={`px-8 py-3 border-2 rounded-full mb-10 ${theme === 'dark' ? 'text-[#ececec] border-[#ececec]' : 'text-[#0b0121] border-[#0b0121]'}`}>
                Book a Demo
            </button>

        </div>
    );
}

export default Tail;