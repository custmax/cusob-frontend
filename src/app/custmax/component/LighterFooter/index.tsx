import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-white py-8">
            {/* 最上面是 Logo */}
            <div className="flex justify-center mb-8">
                <img src="/img/logo.png" alt="Logo" className="h-12"/>
            </div>

            {/* 中间一排小图片 */}
            <div className="flex justify-center space-x-4 mb-8">
                <img src="/temp_imgs/img.png" alt="Image 1" className="h-8"/>
                <img src="/temp_imgs/img_1.png" alt="Image 2" className="h-8"/>
                <img src="/temp_imgs/img_2.png" alt="Image 3" className="h-8"/>
                <img src="/temp_imgs/img_3.png" alt="Image 4" className="h-8"/>
                <img src="/temp_imgs/img_4.png" alt="Image 5" className="h-8"/>
            </div>

            {/* 下方文字链接 */}
            <div className="flex justify-center space-x-2 mb-1 text-sm text-gray-400">
                <a href="/link1" className="underline hover:text-gray-400">Privacy</a>
                <span className="text-gray-400">|</span>
                <a href="/link2" className="underline hover:text-gray-400">Terms</a>
                <span className="text-gray-400">|</span>
                <a href="/link3" className="underline hover:text-gray-400">Legal</a>
                <span className="text-gray-400">|</span>
                <a href="/link3" className="underline hover:text-gray-400">Cookie Preferences</a>
                <span className="text-gray-400">|</span>
                <a href="/link3" className="underline hover:text-gray-400">About us</a>
            </div>

            {/* 最下面是备案号 */}
            <div className="text-center text-sm text-gray-400">
                <p>备案号：XYZ12345678</p>
            </div>

        </footer>
    );
}

export default Footer;
