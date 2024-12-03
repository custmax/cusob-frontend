import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Email Marketing Platform | Cusob",
    description: "CusOb",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // 动态加载组件，无需在服务端渲染
    const CrispWithNoSSR = dynamic(
        () => import('../component/Crisp/index'),
        { ssr: false }
    );
    // const scriptContent = `
    //     (function(d,t) {
    //         var BASE_URL="http://69.164.202.126:3000";
    //         var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    //         g.src=BASE_URL+"/packs/js/sdk.js";
    //         g.defer = true;
    //         g.async = true;
    //         s.parentNode.insertBefore(g,s);
    //         g.onload=function(){
    //             window.chatwootSDK.run({
    //                 websiteToken: 'kKiTMXr7vwNA3E4hYf9EQcGU',
    //                 baseUrl: BASE_URL
    //             })
    //         }
    //     })(document,"script");
    // `;

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <html lang="en">
            {/*<head>*/}
            {/*    <script dangerouslySetInnerHTML={{__html: scriptContent}}/>*/}
            {/*</head>*/}
            <body className={inter.className}>
            <AntdRegistry>{children}</AntdRegistry>
            <CrispWithNoSSR />
            {/*<script dangerouslySetInnerHTML={{__html: scriptContent}}/>*/}

            <GoogleTagManager gtmId="G-9B4TXJVBQZ"/>
            <GoogleAnalytics gaId="G-W0GVCMQBR8"/>
            </body>
            </html>
        </>
    );
}
