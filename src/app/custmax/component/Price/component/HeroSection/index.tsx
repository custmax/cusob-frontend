import React, { useState } from 'react';

const HeroSection = () => {
    // 状态管理
    const [isSwitchedOn, setIsSwitchedOn] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);

    // 切换开关的处理函数
    const handleSwitchToggle = () => {
        setIsSwitchedOn(prevState => !prevState);
    };

    // // 滑动条的变化处理函数
    // const handleSliderChange = (event) => {
    //     setSliderValue(event.target.value);
    // };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-40">
            {/* 标题 */}
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Best Price for You</h1>

            {/* 小标题 */}
            <h2 className="text-xl text-[#5c5c5c] mt-4 mb-4">Start Free, Stay Free. Engage Forever.</h2>

            {/* Switch开关 */}
            <div className="flex items-center mt-20 mb-4">
                <span className="mr-2 text-gray-600">开关状态</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSwitchedOn}
                        onChange={handleSwitchToggle}
                        className="sr-only"
                    />
                    <span className="w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 dark:bg-gray-600">
            <span
                className={`${
                    isSwitchedOn ? 'translate-x-5' : 'translate-x-0'
                } inline-block w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300`}
            ></span>
          </span>
                </label>
            </div>

            {/* 小标题 */}
            <h3 className="text-xl text-[#000000] mb-14">How many contacts do you want to manage?</h3>

            {/* 拖动条 */}
            <div className="text-[#6450fb] text-2xl font-bold mb-2">{sliderValue}</div>
            <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                // onChange={handleSliderChange}
                className="w-full w-[600px] h-2 bg-blue-200 rounded-lg cursor-pointer"
            />

            {/* 卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
                {[1, 2, 3].map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">卡片 {card}</h4>
                        <p className="text-gray-600">这是卡片 {card} 的内容。</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
