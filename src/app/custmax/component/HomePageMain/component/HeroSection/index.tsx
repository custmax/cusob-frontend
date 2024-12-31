import React from 'react';

const HeroSection = () => {
    return (
        <section
            className="relative bg-cover bg-center h-screen"
            style={{backgroundImage: 'url(/temp_imgs/gbimg.png)', backgroundSize: '100% 100%'}}
        >
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                {/* 宣传标语 */}
                <h3 className="text-lg tracking-wide mb-9 mt-30 font-semibold md:text-xl border-2 border-[#7158aa] rounded-full px-6 py-2">
                    Start Free, Stay Free. Engage Forever.
                </h3>

                {/* 大宣传标语 */}
                <h1 className="text-4xl mb-4 font-extrabold md:text-5xl tracking-wider lg:text-6xl">
                    Emails that engage
                </h1>
                <h1 className="text-4xl mb-4 font-extrabold md:text-5xl tracking-wider lg:text-6xl">
                    Results that engage
                </h1>

                {/* 小小标语 */}
                <p className="text-sm py-7 text-[#a79eb9] md:text-base lg:text-lg max-w-xl mx-auto tracking-wide">
                    Turn clicks into connections. Build results that last.
                </p>

                {/* 搜索框 */}
                <div className="relative mb-4 flex justify-center w-full md:w-1/2 lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Enter your email here"
                        className="px-4 py-3 w-full focus:outline-none h-14 focus:ring-2 bg-transparent text-[#999999] placeholder-gray-500 border-2 border-gray-300 rounded-full pr-20"
                        onFocus={(e) => e.target.placeholder = ''}  // 清空 placeholder
                        onBlur={(e) => e.target.placeholder = 'Enter your email here'} // 恢复 placeholder
                    />
                    <button className="font-bold absolute right-4 top-1/2 h-8 transform -translate-y-1/2 px-5 py-1 bg-[#ececec] text-black rounded-full">
                        Get started free
                    </button>
                </div>

                {/* 小字说明 */}
                <p className="text-xl text-[#d1cdd8] mt-32 mb-10">
                    Trusted by industry leaders worldwide
                </p>

                {/* 小图片部分 */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <img src="/temp_imgs/logo_1.png" alt="Image 1" className="w-40 h-12 rounded-full"/>
                    <img src="/temp_imgs/logo_2.png" alt="Image 2" className="w-18 h-12 rounded-full"/>
                    <img src="/temp_imgs/logo_3.png" alt="Image 3" className="w-20 h-18 rounded-full"/>
                    <img src="/temp_imgs/logo_4.png" alt="Image 4" className="w-40 h-12 rounded-full"/>
                    <img src="/temp_imgs/logo_5.png" alt="Image 5" className="w-22 h-10 mt-2 rounded-full"/>
                    <img src="/temp_imgs/logo_6.png" alt="Image 6" className="w-22 h-12 rounded-full"/>
                    <img src="/temp_imgs/logo_7.png" alt="Image 7" className="w-32 h-12 rounded-full"/>
                    <img src="/temp_imgs/logo_8.png" alt="Image 8" className="w-14 h-14 -mt-2 rounded-full"/>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
