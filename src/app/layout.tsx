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

    return (
        <>
            <html lang="en">
            <body className={inter.className}>
            <AntdRegistry>{children}</AntdRegistry>
            <CrispWithNoSSR />
            <GoogleTagManager gtmId="G-9B4TXJVBQZ" />
            <GoogleAnalytics gaId="G-W0GVCMQBR8" />
            </body>
            </html>
        </>
    );
}
