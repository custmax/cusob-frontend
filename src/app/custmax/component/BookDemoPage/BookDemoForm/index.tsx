import React, { useState } from "react";

const MarketingForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        company: "",
        description: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <div className="flex flex-col md:flex-row items-start justify-center bg-gray-50 min-h-screen p-6 md:p-12">
            {/* Left Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Transform your email marketing now
                </h2>
                <p className="text-gray-600 mb-4">
                    Streamline your workflow, focus on growth, and let CustMax handle the rest.
                </p>
                <div className="bg-[#faf9ff] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">With CustMax, you can:</h3>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                        <li>Create impactful email campaigns easily</li>
                        <li>Organize customer data seamlessly</li>
                        <li>Automate repetitive tasks to save time</li>
                        <li>Drive engagement & grow customer base</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Why choose us?</h3>
                    <p className="text-sm text-gray-700">
                        We craft a tailored experience to suit your unique business needs.
                    </p>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Want to know more?</h3>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                        <li>Reach out to us at <a href="mailto:hello@custmax.com" className="text-blue-600">hello@custmax.com</a></li>
                        <li>Visit our website: <a href="https://www.custmax.com" className="text-blue-600">www.custmax.com</a></li>
                    </ul>
                </div>
            </div>

            {/* Right Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-md w-full mt-6 md:mt-0 md:ml-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Mobile
                        </label>
                        <div className="relative mt-1">
                            <select
                                className="absolute inset-y-0 left-0 flex items-center pl-3 pr-8 bg-gray-50 border-gray-300 text-gray-500 sm:text-sm rounded-l-md focus:outline-none"
                            >
                                <option value="+10">+10</option>
                                <option value="+86">+86</option>
                                <option value="+91">+91</option>
                            </select>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="block w-full pl-16 rounded-r-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email*
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Requirement description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows={4}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-xs text-gray-500 text-center">
                    By submitting this form, you agree to the processing of personal data according to Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default MarketingForm;
