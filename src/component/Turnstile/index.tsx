import React, { useEffect } from 'react';

// @ts-ignore
const Turnstile = ({ onVerify }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    const handleVerification = (token: string) => {
        onVerify(token);
    };

    useEffect(() => {
        window.turnstileCallback = handleVerification;
    }, []);

    return (
        <div
            className="cf-turnstile"
            data-sitekey={process.env.DATA_SITE_KEY}
            data-lang="en"
            data-callback="turnstileCallback"
        ></div>
    );
};

export default Turnstile;