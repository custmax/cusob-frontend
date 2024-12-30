import HeroSection from "@/app/custmax/component/Price/component/HeroSection";
import Tail from "@/app/custmax/component/Price/component/Tail";
import CustomerComments from "@/app/custmax/component/Price/component/CustomerComments";
import FAQ from "@/app/custmax/component/Price/component/FAQ";
import PriceAdvantage from "@/app/custmax/component/Price/PriceAdvantage";

const Price = () => {
    return (
        <div>
            <HeroSection />
            <PriceAdvantage />
            <CustomerComments />
            <FAQ />
            <Tail />
        </div>
    )
}

export default Price;