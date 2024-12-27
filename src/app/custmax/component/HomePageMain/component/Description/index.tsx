const Description = () => {
    return (
        <div className="flex bg-[#0b0121] h-[850px]">
            <div
                className="mt-20 relative w-[1080px] h-[720px] mx-auto" // 设置背景色
            >
                {/* 文字内容部分 */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-10">
                    <h1 className="text-5xl font-bold mb-8">
                        Email marketing :<br/>
                        Cost-effective customer<br/>
                        engagement<br/>
                    </h1>
                    <p className="text-lg">
                        For every $1 spent, email marketing generates<br/>
                        an average return of $42. With personalized<br/>
                        content and targeted delivery, it boosts<br/>
                        customer conversion rates by 40%.<br/>
                    </p>
                    {/* 按钮部分 */}
                    <button
                        className="mt-20 px-6 py-2 text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all">
                        Book a Demo
                    </button>
                </div>

                {/* 背景图片部分 */}
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
                     style={{backgroundImage: "url(/temp_imgs/description.png)"}}>
                    {/* 添加灰紫色滤镜 */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

export default Description;
