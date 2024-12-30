'use client'
import Header from "@/app/custmax/component/Header";
import BookDemoPage from "@/app/custmax/component/BookDemoPage";
import Footer from "@/app/custmax/component/Footer";

export default function BookDemo() {
    return (
        <div>
            <Header />
            <BookDemoPage />
            <Footer theme={"light"} />
        </div>
    )
}