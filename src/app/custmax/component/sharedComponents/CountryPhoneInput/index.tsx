import React, { useState, ChangeEvent } from "react";

interface Country {
    code: string;
    prefix: string;
    name: string;
    flag: string;
}

interface CountryPhoneInputProps {
    value?: string;
    onChange: (value: string) => void;
}

const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({ value, onChange }) => {
    // 国家代码和电话前缀数据
    const countries: Country[] = [
        { code: "US", prefix: "+1", name: "United States", flag: "https://flagcdn.com/us.svg" },
        { code: "CN", prefix: "+86", name: "China", flag: "https://flagcdn.com/cn.svg" },
        { code: "JP", prefix: "+81", name: "Japan", flag: "https://flagcdn.com/jp.svg" },
        { code: "GB", prefix: "+44", name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
        { code: "DE", prefix: "+49", name: "Germany", flag: "https://flagcdn.com/de.svg" },
        { code: "FR", prefix: "+33", name: "France", flag: "https://flagcdn.com/fr.svg" },
        { code: "IN", prefix: "+91", name: "India", flag: "https://flagcdn.com/in.svg" },
        { code: "AU", prefix: "+61", name: "Australia", flag: "https://flagcdn.com/au.svg" },
        { code: "CA", prefix: "+1", name: "Canada", flag: "https://flagcdn.com/ca.svg" },
        { code: "KR", prefix: "+82", name: "South Korea", flag: "https://flagcdn.com/kr.svg" },
    ];

    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const country = countries.find(c => c.prefix === e.target.value);
        if (country) {
            setSelectedCountry(country);
            if (onChange) {
                onChange(phoneNumber ? `${country.prefix}${phoneNumber}` : "");
            }
        }
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value.replace(/\D/g, '');
        setPhoneNumber(newNumber);
        if (onChange && selectedCountry) {
            onChange(newNumber ? `${selectedCountry.prefix}${newNumber}` : "");
        }
    };

    return (
        <div className="relative border-2 h-[45px] border-[#cccccc] rounded-2xl flex items-center">
            <div className="flex items-center pl-3">
                <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} Flag`}
                    className="w-8 h-6 mr-2 rounded-[4px] object-cover"
                />
                <select
                    className="appearance-none bg-transparent text-gray-700 focus:outline-none pr-6"
                    value={selectedCountry.prefix}
                    onChange={handleCountryChange}
                >
                    {countries.map((country) => (
                        <option key={`${country.code}-${country.prefix}`} value={country.prefix}>
                            {country.prefix}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-[88px] flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1 h-full rounded-r-2xl border-none pl-2 focus:outline-none text-sm"
                placeholder="Enter phone number"
            />
        </div>
    );
};

export default CountryPhoneInput;