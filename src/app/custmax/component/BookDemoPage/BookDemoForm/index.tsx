import React, {useState} from "react";

const MarketingForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        company: "",
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Form submitted successfully!");
    };

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
                        <label htmlFor="mobile" className="block font-semibold text-xl text-[#000000] mb-2">
                            Mobile
                        </label>
                        <div className="relative border-2 h-[45px] border-[#cccccc] rounded-2xl flex items-center">
                            {/* 国旗和电话前缀 */}
                            <div className="flex items-center pl-3">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                                    alt="US Flag"
                                    className="w-10 h-8 mr-2 rounded-[12px]"
                                />
                                <select
                                    className="appearance-none bg-transparent text-gray-700 focus:outline-none"
                                    defaultValue="+10"
                                >
                                    <option value="+10">+10</option>
                                    <option value="+86">+86</option>
                                    <option value="+91">+91</option>
                                </select>
                            </div>
                            {/* 下拉箭头 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            {/* 电话输入框 */}
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                className="flex-1 h-full rounded-r-2xl border-none pl-2 focus:outline-none text-sm"
                            />
                        </div>
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
                        <label htmlFor="description" className="block font-semibold text-xl text-[#000000]">
                            Requirement description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
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
