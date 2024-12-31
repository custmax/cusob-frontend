import HeroSection from "@/app/custmax/component/HomePage/component/HeroSection";
import Description from "@/app/custmax/component/HomePage/component/Description";
import Functions from "@/app/custmax/component/HomePage/component/Functions";
import Template from "@/app/custmax/component/HomePage/component/Template";
import Privacy from "@/app/custmax/component/HomePage/component/Privacy";
import PriceAdvantage from "@/app/custmax/component/sharedComponents/PriceAdvantage";
import CustomerComments from "@/app/custmax/component/sharedComponents/CustomerComments";
import Tail from "@/app/custmax/component/sharedComponents/Tail";
import FAQ from "@/app/custmax/component/sharedComponents/FAQ";

const HomePage = () => {
    const questionList:String[] = [
        "What is CustMax, and how can it help my business?",
        "How do I get started with CustMax?",
        "What kind of email templates are available?",
        "Can I track the performance of my email campaigns?",
        "How much does CustMax cost?",
        "Can I cancel my subscription at any time?",
    ]
    const answerList:String[] = [
        "CustMax is an email marketing platform designed to help you engage customers effectively. With tools like customizable templates, segmentation, and detailed analytics, you can create targeted campaigns that drive higher open rates and conversion rates.",
        "Getting started is easy! Simply create an account by signing up on our homepage. Once you're registered, you can explore templates, set up your first campaign, and start engaging with your audience.",
        "CustMax offers a wide range of templates, including welcome emails, promotional offers, newsletters, and more. All templates are customizable to match your brand's unique style.",
        "Yes, CustMax provides detailed analytics for every campaign. You can track metrics like open rates, click-through rates, and conversions to optimize your marketing strategy.",
        "CustMax offers three pricing tiers:\n" +
        "  - Basic Plan: $1 one-time fee, with lifetime access to basic features.\n" +
        "  - Advanced Plan: $9.9/month for additional features.\n" +
        "  - Ultimate Plan: $29.9/month for all features.\n" +
        "    Choose the plan that best fits your needs!",
        "Yes, you can cancel your subscription at any time. There are no long-term contracts, and you can continue using the free plan if needed."
    ]


    return (
        <div>
            <HeroSection />
            <Description />
            <Functions />
            <Template />
            <CustomerComments theme={'dark'} />
            <PriceAdvantage />
            <Privacy />
            <FAQ questionList={questionList} answerList={answerList}/>
            <Tail theme={'dark'} />
        </div>
    )
}

export default HomePage;