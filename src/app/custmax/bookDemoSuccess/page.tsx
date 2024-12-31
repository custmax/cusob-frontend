import React from "react";
import Footer from "@/app/custmax/component/Footer";
import Header from "@/app/custmax/component/Header";
import BookDemoSuccessPage from "@/app/custmax/component/BookDemoSuccessPage";

export default function BookDemoSuccess() {
    return (
        <div>
            <Header />
            <BookDemoSuccessPage />
            <Footer theme={"light"} />
        </div>
    )
}
