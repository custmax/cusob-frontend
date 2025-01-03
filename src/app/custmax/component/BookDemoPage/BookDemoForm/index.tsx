import React, {ChangeEvent, useEffect, useState} from "react";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {onChange} from "input-format";
import CountryPhoneInput from "@/app/custmax/component/sharedComponents/CountryPhoneInput";
import {saveBook} from "@/server/book";
import {message} from "antd";
import {SUCCESS_CODE} from "@/constant/common";
import {router} from "next/client";
import {useRouter} from "next/navigation";
const MarketingForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        message: "",
    });
    const [isClient, setIsClient] = useState(false);  // 用于检查是否在客户端
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        setIsClient(true);  // 客户端渲染后设置为 true
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        //setIsRedirecting(true);
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        const res = await saveBook({...formData})
        message.destroy('loading')
        if (res.code === SUCCESS_CODE) {
            //跳转到bookDemoSuccess页面
            router.push('/bookDemoSuccess');
        } else {
            message.error({content: res.message})
        }
    };
    useEffect(() => {
        if (isRedirecting) {
            router.push('/bookDemoSuccess');
        }
    }, [isRedirecting, router]);  // 在状态变化后执行跳转
    return (
        <div className="flex flex-col md:flex-row items-start justify-center bg-[#ffffff] min-h-screen p-6 md:p-12">
            {/* Left Section */}
            <div className="border-2 border-[#e6e6e6] rounded-3xl mt-16 w-[400px] h-[720px]">
                <h2 className="text-3xl mt-10 ml-2 font-bold p-6 text-[#000000]">
                    Transform your <br/>
                    email marketing now
                </h2>
                <p className="text-[#666666] text-[17px] ml-2 px-6 mb-10">
                    Streamline your workflow, focus on growth, and let CustMax handle the rest.
                </p>
                <div className="bg-[#faf9ff] h-[465px] px-8 p-6 rounded-3xl">
                    <h3 className="text-lg text-[#000000] font-bold mb-2">With CustMax, you can:</h3>
                    <ul className="text-[16px] text-[#666666] pl-5 space-y-1">
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Create impactful email campaigns easily
                        </li>
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Organize customer data seamlessly
                        </li>
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Automate repetitive tasks to save time
                        </li>
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Drive engagement & grow customer base
                        </li>
                    </ul>
                    <h3 className="text-lg font-bold mt-10 mb-2">Why choose us?</h3>
                    <p className="text-[16px] text-[#666666]">
                        We craft a tailored experience to suit your unique business needs.
                    </p>
                    <h3 className="text-lg font-bold mt-10 mb-2">Want to know more?</h3>
                    <ul className="text-[16px] text-[#666666] pl-5 space-y-1">
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Reach out to us at <a href="mailto:hello@custmax.com"
                                                className="ml-1"> hello@custmax.com</a>
                        </li>
                        <li className="flex -ml-8 items-center before:content-[''] before:w-1 before:h-1 before:mr-2 before:bg-[#666666] before:rounded-full">
                            Visit our website: <a href="https://www.custmax.com" className='ml-1'> www.custmax.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Section */}
            <div className="mt-8 ml-20 h-[750px] w-[500px] rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block font-semibold text-xl text-[#000000]">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-2 px-4 block w-full h-[45px] border-2 border-[#cccccc] rounded-2xl"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-semibold text-xl text-[#000000] mb-2">
                            Mobile
                        </label>
                        <CountryPhoneInput
                            value={formData.phone}
                            onChange={(value: string) => setFormData({ ...formData, phone: value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-semibold text-xl text-[#000000]">
                            Email*
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-2 px-4 block w-full h-[45px] border-2 border-[#cccccc] rounded-2xl"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block font-semibold text-xl text-[#000000]">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="mt-2 px-4 block w-full h-[45px] border-2 border-[#cccccc] rounded-2xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block font-semibold text-xl text-[#000000]">
                            Requirement description
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="mt-2 px-4 py-2  w-full resize-none h-[140px] border-2 border-[#cccccc] rounded-2xl block"
                            rows={4}
                        />
                        <p className="mt-4 text-sm text-[#666666]">
                            By submitting this form, you agree to the processing of personal data according to Privacy
                            Policy.
                        </p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mt-4 font-bold ml-[160px] w-[120px] h-[40px] bg-[#6450fb] text-[#ffffff] py-2 px-4 rounded-full block"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketingForm;
