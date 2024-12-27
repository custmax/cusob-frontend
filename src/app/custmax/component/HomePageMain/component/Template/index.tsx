import React from 'react';

const Template = () => {
    return (
        <div className="bg-[#0b0121] flex justify-center items-center min-h-screen ">
            <div className="w-4/5 h-auto] bg-white shadow-lg rounded-3xl p-6">
                <div className="flex h-full">
                    {/* Left side: Title, Paragraph and Button */}
                    <div className="ml-14 w-1/2 pr-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-6xl font-bold text-gray-800 mb-8 py-0">
                                Creative templates<br/>
                                tailored for your<br/>
                                brand<br/>
                            </h1>
                            <p className="text-black text-2xl mb-10">
                                Create professional, branded emails in just<br/>
                                minutes. Choose from expertly designed<br/>
                                templates or create your own effortlessly with<br/>
                                our intuitive drag-and-drop editor.
                            </p>
                        </div>
                        {/* Button - Transparent circular button */}
                        <button className="w-40 h-14 border-2 border-black text-black font-semibold rounded-full">
                            Book a Demo
                        </button>
                    </div>

                    {/* Right side: Image Wall */}
                    <div className="w-1/2 grid grid-cols-3 gap-4">
                        {/* First column (tall image on top, short image below) */}
                        <div className="col-span-1 flex flex-col gap-4">
                            <img
                                src="https://via.placeholder.com/150x300"
                                alt="Image 1"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <img
                                src="https://via.placeholder.com/150x150"
                                alt="Image 2"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>

                        {/* Second column (short image on top, tall image below) */}
                        <div className="col-span-1 flex flex-col gap-4">
                            <img
                                src="https://via.placeholder.com/150x150"
                                alt="Image 3"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <img
                                src="https://via.placeholder.com/150x300"
                                alt="Image 4"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>

                        {/* Third column (tall image on top, short image below) */}
                        <div className="col-span-1 flex flex-col gap-4">
                            <img
                                src="https://via.placeholder.com/150x300"
                                alt="Image 5"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <img
                                src="https://via.placeholder.com/150x150"
                                alt="Image 6"
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template;
