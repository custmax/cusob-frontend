import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleTagManager } from '@next/third-parties/google'
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email Marketing Platform | Cusob",
  description: "CusOb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const CrispWithNoSSR = dynamic(
        () => import('../component/Crisp/index')
    )
  return (
      <>
      <html lang="en">
      <CrispWithNoSSR />
      <body className={inter.className}>
      <AntdRegistry>{children}</AntdRegistry>
      </body>
      <GoogleTagManager gtmId="G-9B4TXJVBQZ"/>
      </html>
      </>
  );
}
