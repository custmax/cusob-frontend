import React from 'react';
import BookADemoButton from "@/app/custmax/component/sharedComponents/BookADemoButton";

const Template = () => {
    return (
        <div className="bg-[#0b0121] flex justify-center items-center h-[820px]">
            <div className="bg-[#f5f5f6] shadow-lg w-[1080px] h-[500px] rounded-3xl">
                <div className="flex h-full">
                    {/* Left side: Title, Paragraph and Button */}
                    <div className="px-16 w-auto pr-6 flex flex-col justify-center">
                        <div>
                            <h1 className="text-5xl leading-[50px] font-bold text-gray-800 mb-8 py-0">
                                Creative templates<br/>
                                tailored for your<br/>
                                brand<br/>
                            </h1>
                            <p className="text-black leading-[30px] text-[18px] mb-10">
                                Create professional, branded emails in just<br/>
                                minutes. Choose from expertly designed<br/>
                                templates or create your own effortlessly with<br/>
                                our intuitive drag-and-drop editor.
                            </p>
                        </div>
                        {/* Button - Transparent circular button */}
                        <BookADemoButton />
                    </div>

                    {/* Right side: Image Wall */}
                    <div className="w-[450px] mr-24">
                        <img src="/temp_imgs/home/template/templates.png" alt="templates image"
                            className="w-full h-full object-cover rounded-lg"/>                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template;
