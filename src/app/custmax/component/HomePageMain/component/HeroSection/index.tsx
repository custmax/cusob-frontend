import React from 'react';

const HeroSection = () => {
    return (
        <section
            className="relative bg-cover bg-center h-screen"
            style={{backgroundImage: 'url(/temp_imgs/gbimg.png)', backgroundSize: '100% 100%'}}
        >
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-4 px-6">
                {/* 宣传标语 */}
                <h3 className="text-lg tracking-wide mb-5 -mt-48 font-semibold md:text-xl border-2 border-white rounded-full px-6 py-2">
                    Start Free, Stay Free. Engage Forever.
                </h3>

                {/* 大宣传标语 */}
                <h1 className="text-4xl font-extrabold md:text-5xl tracking-wider lg:text-6xl">
                    Emails that engage
                </h1>
                <h1 className="text-4xl font-extrabold md:text-5xl tracking-wider lg:text-6xl">
                    Results that engage
                </h1>

                {/* 小小标语 */}
                <p className="text-sm py-3 md:text-base lg:text-lg max-w-xl mx-auto tracking-wide">
                    Turn clicks into connections. Build results that last.
                </p>

                {/* 搜索框 */}
                <div className="relative flex justify-center w-full md:w-1/2 lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Enter your email here"
                        className="px-4 py-3 w-full focus:outline-none focus:ring-2 bg-transparent text-white font-bold placeholder-gray-500 border-2 border-gray-300 rounded-full pr-20"
                        onFocus={(e) => e.target.placeholder = ''}  // 清空 placeholder
                        onBlur={(e) => e.target.placeholder = 'Enter your email here'} // 恢复 placeholder
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-white text-black rounded-full">
                        Get started free
                    </button>
                </div>



            </div>
        </section>
    );
};

export default HeroSection;
