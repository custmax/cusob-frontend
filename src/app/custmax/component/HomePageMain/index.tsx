import HeroSection from "@/app/custmax/component/HomePageMain/component/HeroSection";
import FAQ from "@/app/custmax/component/HomePageMain/component/FAQ";
import Description from "@/app/custmax/component/HomePageMain/component/Description";
import Functions from "@/app/custmax/component/HomePageMain/component/Functions";

const HomePageMain = () => {
    return (
        <div>
            <HeroSection />
            <Description />
            <Functions />
            <FAQ />
        </div>
    )
}

export default HomePageMain;