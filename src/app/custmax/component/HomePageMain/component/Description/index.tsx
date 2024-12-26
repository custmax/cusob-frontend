const Description = () => {
    return (
        <div className="flex bg-[#0b0121] h-[850px]">
            <div
                className="mt-20 relative w-[1200vpx] h-[720vpx] mx-auto" // 设置背景色
            >
                {/* 文字内容部分 */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-10">
                    <h1 className="text-4xl font-bold mb-4">Your Title Here</h1>
                    <p className="text-lg">This is a description of the section. You can add any content here to
                        describe
                        your topic.</p>
                    {/* 按钮部分 */}
                    <button
                        className="mt-4 px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all">
                        Book a Demo
                    </button>
                </div>

                {/* 背景图片部分 */}
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                     style={{backgroundImage: "url(/temp_imgs/gbimg.png)"}}></div>
            </div>
        </div>
    );
};

export default Description;
