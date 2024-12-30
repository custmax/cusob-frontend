import HeroSection from "@/app/custmax/component/HomePageMain/component/HeroSection";
import FAQ from "@/app/custmax/component/HomePageMain/component/FAQ";
import Description from "@/app/custmax/component/HomePageMain/component/Description";
import Functions from "@/app/custmax/component/HomePageMain/component/Functions";
import Template from "@/app/custmax/component/HomePageMain/component/Template";
import Privacy from "@/app/custmax/component/HomePageMain/component/Privacy";
import PriceAdvantage from "@/app/custmax/component/sharedComponents/PriceAdvantage";
import CustomerComments from "@/app/custmax/component/sharedComponents/CustomerComments";
import Tail from "@/app/custmax/component/sharedComponents/Tail";

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <Description />
            <Functions />
            <Template />
            <CustomerComments theme={'dark'} />
            <PriceAdvantage />
            <Privacy />
            <FAQ />
            <Tail theme={'dark'} />
        </div>
    )
}

export default HomePage;