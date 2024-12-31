import HeroSection from "@/app/custmax/component/PricePage/component/HeroSection";
import PriceAdvantage from "@/app/custmax/component/sharedComponents/PriceAdvantage";
import CustomerComments from "@/app/custmax/component/sharedComponents/CustomerComments";
import Tail from "@/app/custmax/component/sharedComponents/Tail";
import FAQ from "@/app/custmax/component/sharedComponents/FAQ";

const PricePage = () => {
    const questionList:String[] = [
        "Are there any hidden fees apart from the subscription cost?",
        "Can I upgrade or downgrade my plan anytime?",
        "What happens if I exceed my monthly email limit?",
        "Does the $1 Basic Plan include future updates?",
        "Can I cancel my subscription at any time?",
        "Are there discounts for annual subscriptions?"
    ]

    const answerList:String[] = [
        "No, there are no hidden fees. What you see in our pricing plans is exactly what you pay.",
        "Yes, you can easily upgrade or downgrade your plan at any time without additional charges for switching.",
        "If you exceed your email limit, you can either wait until the next billing cycle or purchase additional email credits.",
        "Yes, the $1 Basic Plan includes all future updates for the features it supports.",
        "Yes, you can cancel your subscription anytime, and your access will continue until the end of the current billing period.",
        "Yes, we offer discounts for annual subscriptions. You can save up to 16% compared to monthly payments by choosing an annual plan."
    ]


    return (
        <div>
            <HeroSection />
            <PriceAdvantage />
            <CustomerComments theme={"light"} />
            <FAQ questionList={questionList} answerList={answerList}/>
            <Tail theme={"light"} />
        </div>
    )
}

export default PricePage;