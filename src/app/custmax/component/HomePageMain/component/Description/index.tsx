const Description = () => {
    return (
        <div className="flex bg-[#0b0121] h-[850px]">
            <div
                className="mt-10 relative w-[1080px] h-[720px] mx-auto" // 设置背景色
            >
                {/* 文字内容部分 */}
                <div className="absolute left-8 -mt-20 top-1/2 transform -translate-y-1/2 text-white z-10">
                    <h1 className="text-5xl leading-[60px] font-bold mb-8">
                        Email marketing :<br/>
                        Cost-effective customer<br/>
                        engagement<br/>
                    </h1>
                    <p className="text-lg leading-[30px]">
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
                <div className="absolute top-0 left-0 w-[1200px] h-[600px] rounded-[20px] bg-cover bg-center z-0"
                     style={{backgroundImage: "url(/temp_imgs/description.png)"}}>
                </div>
            </div>
        </div>
    );
};

export default Description;
