import React, { useState } from 'react';

const BookDemoForm: React.FC = () => {
    // 表单数据管理
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        company: '',
        requirementDescription: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row p-6 bg-gray-100">
            {/* 左侧长形卡片 */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg mb-6 md:mb-0">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">卡片标题</h2>
                    <p className="text-gray-600">卡片的描述或内容，展示一些信息。</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">卡片分区一</h3>
                    <p className="text-gray-600 mb-4">这是卡片的第一部分。</p>
                    <h3 className="text-xl font-semibold text-gray-800">卡片分区二</h3>
                    <p className="text-gray-600">这是卡片的第二部分。</p>
                </div>
            </div>

            {/* 右侧表单 */}
            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">联系我们</h2>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">
                            Mobile
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Company */}
                    <div className="mb-4">
                        <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Requirement Description */}
                    <div className="mb-4">
                        <label htmlFor="requirementDescription" className="block text-gray-700 font-semibold mb-2">
                            Requirement Description
                        </label>
                        <textarea
                            id="requirementDescription"
                            name="requirementDescription"
                            value={formData.requirementDescription}
                            // onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        ></textarea>
                    </div>

                    {/* 说明性小字 */}
                    <p className="text-sm text-gray-500 mb-4">请填写上述信息，以便我们更好地为您服务。</p>

                    {/* 提交按钮 */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        提交
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookDemoForm;
