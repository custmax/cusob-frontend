import HeroSection from "@/app/custmax/component/Price/component/HeroSection";
import FAQ from "@/app/custmax/component/Price/component/FAQ";
import PriceAdvantage from "@/app/custmax/component/sharedComponents/PriceAdvantage";
import CustomerComments from "@/app/custmax/component/sharedComponents/CustomerComments";
import Tail from "@/app/custmax/component/sharedComponents/Tail";

const PricePage = () => {
    return (
        <div>
            <HeroSection />
            <PriceAdvantage />
            <CustomerComments theme={"light"} />
            <FAQ />
            <Tail theme={"light"} />
        </div>
    )
}

export default PricePage;