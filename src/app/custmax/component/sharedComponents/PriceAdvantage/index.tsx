import React from 'react';

const PriceAdvantage:React.FC = () => {
    return (
        <div className="bg-[#0b0121] flex justify-center items-center h-[720px]">
            <div className="w-[1080px] h-[500px] bg-[#fcfcfc] shadow-lg rounded-3xl p-6">
                <div className="flex h-full">
                    {/* Left side: Title, Paragraph and Button */}
                    <div className="ml-10 w-1/2 pr-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-5xl font-bold text-[#0b0121] mb-2 py-0">
                                Smarter marketing,
                            </h1>
                            <h1 className="text-5xl font-bold text-[#0b0121] mb-6 py-0">
                                forever free
                            </h1>
                            <p className="text-[#0b0121] text-xl mb-10">
                                CustMax brings you an unparalleled email<br/>
                                marketing solution—lifetime free access to our<br/>
                                core features. No subscriptions, no hidden<br/>
                                fees—just effortless marketing.<br/>
                            </p>
                        </div>
                        {/* Button - Transparent circular button */}
                        <button className="w-40 h-[54px] border-[1.5px] border-black text-black font-semibold rounded-full">
                            Book a Demo
                        </button>
                    </div>

                    {/* Right side: Large Image */}
                    <div className="-mr-6 mb-6 -mt-6">
                        <img
                            src="/temp_imgs/price.png"
                            alt="Large Image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceAdvantage;
