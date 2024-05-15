import React, {useState} from 'react';
import { Form, Select, Input, Space } from 'antd';
import { countryOptions } from '@/constant/phone';
const PrefixSelector = () => {
    const selectOptions = countryOptions;
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(selectOptions);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        const filtered = selectOptions.filter((option) =>
            option.value.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    };
    return (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{ width: 110 }}
                dropdownStyle={{ minWidth: 250, minHeight: 250 }}
                dropdownRender={(menu) => (
                    <div>
                        <Input
                            style={{ margin: '8px', width: 'calc(100% - 16px)' }}
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {menu}
                    </div>
                )}
                filterOption={false}
                placeholder="US +1"
                options={filteredOptions}
                optionRender={(option) => (
                    <Space>
                        {option.data.customLabel}
                    </Space>
                )}
            >
            </Select>
        </Form.Item>
    );
};

export default PrefixSelector;