'use client'
import Header from "@/app/custmax/component/Header";
import PricePage from "@/app/custmax/component/Price";
import Footer from "@/app/custmax/component/Footer";

const Price = () => {
    return (
        <div>
            <Header />
            <PricePage />
            <Footer theme={"light"} />
        </div>
    )
}

export default Price;