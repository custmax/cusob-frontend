import HeroSection from "@/app/custmax/component/HomePageMain/component/HeroSection";
import FAQ from "@/app/custmax/component/HomePageMain/component/FAQ";
import Description from "@/app/custmax/component/HomePageMain/component/Description";
import Functions from "@/app/custmax/component/HomePageMain/component/Functions";
import Template from "@/app/custmax/component/HomePageMain/component/Template";
import CustomerComments from "@/app/custmax/component/HomePageMain/component/CustomerComments";
import PriceAdvantage from "@/app/custmax/component/HomePageMain/component/PriceAdvantage";
import Privacy from "@/app/custmax/component/HomePageMain/component/Privacy";
import Tail from "@/app/custmax/component/HomePageMain/component/Tail";

const HomePageMain = () => {
    return (
        <div>
            <HeroSection />
            <Description />
            <Functions />
            <Template />
            <CustomerComments />
            <PriceAdvantage />
            <Privacy />
            <FAQ />
            <Tail />
        </div>
    )
}

export default HomePageMain;