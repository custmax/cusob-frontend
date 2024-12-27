import React from 'react';

const PriceAdvantage = () => {
    return (
        <div className="bg-[#0b0121] flex justify-center items-center min-h-screen">
            <div className="w-4/5 h-[600px] bg-white shadow-lg rounded-3xl p-6">
                <div className="flex h-full">
                    {/* Left side: Title, Paragraph and Button */}
                    <div className="ml-14 w-1/2 pr-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-6xl font-bold text-gray-800 mb-8 py-0">
                                Creative templates<br />
                                tailored for your<br />
                                brand<br />
                            </h1>
                            <p className="text-black text-2xl mb-10">
                                Create professional, branded emails in just<br />
                                minutes. Choose from expertly designed<br />
                                templates or create your own effortlessly with<br />
                                our intuitive drag-and-drop editor.
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
                            src="https://via.placeholder.com/600x400"
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
