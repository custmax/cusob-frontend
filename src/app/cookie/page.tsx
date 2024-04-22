'use client'
import Home from "@/app/page";
import styles from './page.module.scss';
import Link from 'next/link';
import classNames from "classnames";
import Image from "next/image";
import Sign from "@/component/Header/component/Sign";

const {
    headerContainer,
    cookieContainer,
    logoBox,
    logo,
    content,
    header,
    blank,
    header2
} =styles

const Cookie = ()=>{
    return <div className={cookieContainer}>
        <div className={headerContainer}>
            <Link href='/'>
                <div className={classNames(logoBox)}>
                    <Image
                        fill
                        className={classNames(logo)}
                        alt='logo'
                        src='/img/logo.png'
                        sizes='100%'
                        priority
                    />
                </div>
            </Link>
            <Sign/>
        </div>

        <h1 className={blank}/>
        <h1 className={header}>Terms of Use</h1>

        <p className={content}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Thank you for visiting CusOb ("we," "us," or "our"). This Cookie Preferences page outlines how we use cookies and similar technologies on our Email Marketing Software SAAS Platform and website, and how you can manage your preferences.
        </p>

        <h2 className={header2}>1. What are Cookies?</h2>
        <p className={content}>
            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
        </p>

        <h2 className={header2}>2. Types of Cookies We Use</h2>
        <p className={content}>
            We use the following types of cookies on our website:
            <ul >
                <li className={content}>
                    • Essential Cookies: These cookies are necessary for the website to function properly.
                </li>
                <li className={content}>
                    • Analytics Cookies: These cookies help us analyze how users interact with our website, so we can improve our services.
                </li>
                <li className={content}>
                    • Marketing Cookies: These cookies are used to track visitors across websites, with the intention of displaying ads that are relevant and engaging for the individual user.
                </li>
            </ul>
        </p>

        <h2 className={header2}>3. Your Cookie Preferences</h2>
        <p className={content}>
            You can manage your cookie preferences by adjusting the settings in your web browser. Please note that blocking certain types of cookies may impact your experience on our website.
        </p>

        <h2 className={header2}>4. Consent</h2>
        <p className={content}>
            By using our website, you consent to the use of cookies as described in this Cookie Preferences page. If you do not consent to the use of cookies, please adjust your browser settings accordingly or refrain from using our website.
        </p>

        <h2 className={header2}>5. Changes to this Policy</h2>
        <p className={content}>
            We may update this Cookie Preferences page from time to time. We will notify you of any changes by posting the updated policy on this page.
        </p>

        <h2 className={header2}>6. Contact Us</h2>
        <p className={content}>
            If you have any questions about our use of cookies or this Cookie Preferences page, please contact us at legal@cusob.com.
            This Cookie Preferences page is effective as of [5/1/2024]
        </p>

    </div>
}

export default Cookie