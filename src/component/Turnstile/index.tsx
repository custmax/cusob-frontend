import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
    onVerify: (token: string) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify }) => {

    useEffect(() => {

            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                window.turnstileCallback = handleVerification;
                // 初始化 Turnstile
                if (window.turnstile) {
                    console.log('aaaaa')
                    window.turnstile.render('#turnstile-container', { sitekey: process.env.DATA_SITE_KEY, callback: handleVerification });
                }
            };
            document.body.appendChild(script);
        }
    , []);

    const handleVerification = (token: string) => {
        onVerify(token);
    };


    return (
        <div
            id="turnstile-container"
            className="cf-turnstile"
            data-sitekey={process.env.DATA_SITE_KEY}
            data-lang="en"
            data-callback="turnstileCallback"
        ></div>
    );
};

export default Turnstile;
