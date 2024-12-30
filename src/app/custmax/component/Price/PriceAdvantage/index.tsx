import React from 'react';

const PriceAdvantage = () => {
    return (
        <div className="bg-[#0b0121] flex justify-center items-center h-[720px]">
            <div className="w-[1080px] h-[500px] bg-white shadow-lg rounded-3xl p-6">
                <div className="flex h-full">
                    {/* Left side: Title, Paragraph and Button */}
                    <div className="ml-10 w-1/2 pr-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-800 mb-8 py-0">
                                Smarter marketing,<br/>
                                forever free
                            </h1>
                            <p className="text-black text-xl mb-10">
                                CustMax brings you an unparalleled email<br/>
                                marketing solution—lifetime free access to our<br/>
                                core features. No subscriptions, no hidden<br/>
                                fees—just effortless marketing.<br/>
                            </p>
                        </div>
                        {/* Button - Transparent circular button */}
                        <button className="w-40 h-14 border-2 border-black text-black font-semibold rounded-full">
                            Book a Demo
                        </button>
                    </div>

                    {/* Right side: Large Image */}
                    <div className="w-1/2">
                        <img
                            src="/temp_imgs/Price.png"
                            alt="Large Image"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceAdvantage;
