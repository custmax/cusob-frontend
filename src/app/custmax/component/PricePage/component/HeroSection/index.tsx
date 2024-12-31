import React, { useState } from 'react';

const HeroSection: React.FC = () => {
    // 状态管理
    const [isYearly, setIsYearly] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState(50000);

    // 切换开关的处理函数
    const handleToggle = () => {
        setIsYearly(!isYearly);
    };

    // 滑动条的变化处理函数
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
    };

    // 计算数字位置，百分比（根据滑动条的值来设置数字的位置）
    const getPosition = (value: number) => {
        return (value / 100000) * 100; // 计算百分比
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#ffffff] p-20">
            {/* 标题 */}
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Best Price for You</h1>

            {/* 小标题 */}
            <h2 className="text-xl text-[#5c5c5c] mt-4 mb-4">Start Free, Stay Free. Engage Forever.</h2>

            {/* Switch开关 */}
            <div className="flex flex-col items-center mt-10 mb-4">
                {/* 折扣标签 */}
                <div className="flex items-center mb-2">
          <span className=" ml-[130px] bg-red-100 text-red-500 rounded-full py-1 text-xs font-bold mr-2">
            %
          </span>
                    <span className="text-black font-semibold">Save 25%</span>
                </div>
                {/* 开关容器 */}
                <div
                    className="flex w-60 h-[45px] rounded-full border border-gray-300 relative overflow-hidden cursor-pointer"
                    onClick={handleToggle}
                >
                    {/* 滑动背景 */}
                    <div
                        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#6450fb] rounded-full transition-transform duration-300 ${
                            isYearly ? 'translate-x-full' : ''
                        }`}
                    ></div>

                    {/* Monthly */}
                    <div
                        className={`flex-1 flex items-center justify-center z-10 font-semibold transition-colors duration-300 ${
                            !isYearly ? 'text-[#ffffff]' : 'text-black'
                        }`}
                    >
                        Monthly
                    </div>

                    {/* Yearly */}
                    <div
                        className={`flex-1 flex items-center justify-center z-10 font-semibold transition-colors duration-300 ${
                            isYearly ? 'text-[#ffffff]' : 'text-black'
                        }`}
                    >
                        Yearly
                    </div>
                </div>
            </div>

            {/* 小标题 */}
            <h3 className="text-2xl font-medium mt-8 text-[#000000] mb-14">How many contacts do you want to manage?</h3>

            {/* 滑动条部分 */}
            <div className="flex flex-col items-center w-[700px] mb-8 relative">
                {/* 跟随滑动条的数字 */}
                <div
                    className="text-xl font-semibold text-[#6450fb]"
                    style={{
                        position: 'absolute',
                        top: '-30px', // 数字位于滑动条上方
                        left: `${getPosition(sliderValue)}%`,
                        transform: 'translateX(-50%)',
                    }}
                >
                    {sliderValue}
                </div>

                {/* 滑动条 */}
                <input
                    type="range"
                    min="0"
                    max="100000"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="w-[700px] h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #8373fc ${getPosition(sliderValue)}%, #ddd ${getPosition(sliderValue)}%)`,
                    }}
                />

                {/* 滑动条的最小值和最大值 */}
                <div className="flex font-bold justify-between w-full mt-2 text-xl text-gray-600">
                    <span>0</span>
                    <span>100,000</span>
                </div>
            </div>

            {/* 定价卡片部分 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Forever Free */}
                <div className="border w-[300px] h-[500px] rounded-3xl bg-white shadow-sm flex flex-col">
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <h3 className="text-xl font-bold text-center">Forever Free</h3>
                        <p className="text-sm text-gray-500 text-center">Free plan. Big results.</p>
                        <div className="text-4xl font-bold my-4 text-center">
                            <span className="text-lg font-medium ">US$</span> 0
                            <span className="text-lg font-normal text-[#999999]">/month</span>
                        </div>
                        <button className="w-[200px] bg-[#6450fb] text-white -mb-2 mt-2 py-2 rounded-full font-semibold">
                            Join for Free
                        </button>
                    </div>
                    <div className="py-8 bg-[#faf9ff] h-[260px] px-6 rounded-b-3xl">
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="font-bold">✔️ 1 User, 500 Contacts</li>
                            <li className="font-bold">✔️ Up to 1,000 emails /month</li>
                            <li>✔️ All email templates</li>
                            <li>✔️ Email reports and statistics</li>
                            <li>✔️ User Segmentation</li>
                            <li>✔️ Basic customer support</li>
                        </ul>
                    </div>
                </div>

                {/* Advanced */}
                <div className="border h-[500px] rounded-3xl bg-white shadow-sm flex flex-col">
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <h3 className="text-xl font-bold text-center">Advanced</h3>
                        <p className="text-sm text-gray-500 text-center">Unlock more powerful features</p>
                        <div className="text-4xl font-bold my-4 text-center">
                            <span className="text-lg font-medium ">US$</span> 9.9
                            <span className="text-lg text-[#999999] font-normal">/month</span>
                        </div>
                        <button className="w-[200px] bg-[#6450fb] text-white py-2 rounded-full font-semibold">
                            Get Started
                        </button>
                    </div>
                    <div className="py-8 px-6 mt-4 h-[260px] bg-[#faf9ff] rounded-b-3xl">
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="font-bold">✔️ 5 User, 2000 Contacts</li>
                            <li className="font-bold">✔️ Up to 5,000 emails /month</li>
                            <li>✔️ Everything included in Free, plus...</li>
                            <li>✔️ A/B Testing & Optimization</li>
                            <li>✔️ Remove CustMax Branding</li>
                            <li>✔️ Email Scheduling</li>
                        </ul>
                    </div>
                </div>

                {/* Ultimate */}
                <div className="border h-[500px] rounded-3xl bg-white shadow-sm flex flex-col">
                    <div className="flex flex-col items-center justify-center flex-grow">
                        <h3 className="text-xl font-bold text-center">Ultimate</h3>
                        <p className="text-sm text-gray-500 text-center">Full access to all features</p>
                        <div className="text-4xl font-bold my-4 text-center">
                            <span className="text-lg font-medium ">US$</span> 29.9
                            <span className="text-lg font-normal text-[#999999]">/month</span>
                        </div>
                        <button className="w-[200px] bg-[#6450fb] text-white py-2 rounded-full font-semibold">
                            Buy Now
                        </button>
                    </div>
                    <div className="py-8 px-6 mt-4 h-[260px] bg-[#faf9ff] rounded-b-3xl">
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="font-bold">✔️ 30 User, Unlimited Contacts</li>
                            <li className="font-bold">✔️ Unlimited emails /month</li>
                            <li>✔️ Everything included in Advanced...</li>
                            <li>✔️ Manager & 24/7 Support</li>
                            <li>✔️ Unlimited Contact Management</li>
                            <li>✔️ Autoresponders Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
