import React, {useEffect, useState} from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import saveDomain from "@/app/sendcloud/page";
import {getDomainList} from "@/server/domain";
import {checkDomain} from "@/server/sendcloud/domain";


interface DataType {
    key: string;
    name: string;
    status: string; // 改为 string 类型以匹配状态值
    type: string;
    hostRecords: string;
    hostname: string;
    Enter_this_value: string;
    currentValue: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (_, { name }, index) => {
            if (index < 2) { // 只在前两行添加星号
                return (
                    <>
                        <span style={{ color: 'red' }}>*</span>
                        {name}
                    </>
                );
            }
            return name;
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 300, // 设置列宽
        render: (_, { status }) => {
            let color = status === 'Verified' ? 'green' : 'red';
            return (
                <Tag color={color} key={status}>
                    {status}
                </Tag>
            );
        },
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: '15%',

    },
    {
        title: 'HostRecords',
        dataIndex: 'hostRecords',
        key: 'hostRecords',
        width: '15%',
        render: (value) => <div style={{ wordWrap: 'break-word' }}>{value}</div>,
    },
    {
        title: 'Hostname',
        dataIndex: 'hostname',
        key: 'hostname',
        width: '15%',
        render: (value) => <div style={{ wordWrap: 'break-word' }}>{value}</div>,
    },
    {
        title: 'Enter this value',
        dataIndex: 'Enter_this_value',
        key: 'Enter_this_value',
        width: '15%',

        ellipsis: true,
    },
    {
        title: 'Current value',
        dataIndex: 'currentValue',
        key: 'currentValue',
        width: '10%',
        render: (value) => <div style={{ wordWrap: 'break-word' }}>{value}</div>,
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'SPF',
        status: 'Unverified', // 示例状态值
        type: 'TXT',
        hostRecords: 'TXT',
        hostname: 'AAAA',
        Enter_this_value: 'BBB',
        currentValue: 'CCC',

    },
    {
        key: '2',
        name: 'DKIM',
        status: 'Unverified', // 示例状态值
        type: 'TXT',
        hostRecords: 'TXT',
        hostname: 'AAAA',
        Enter_this_value: 'BBB',
        currentValue: 'CCC',

    },
    {
        key: '3',
        name: 'DMARC',
        status: 'Unverified', // 示例状态值
        type: 'TXT',
        hostRecords: 'TXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        hostname: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        Enter_this_value: 'BBB',
        currentValue: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC'
    },
    {
        key: '4',
        name: 'CNAME',
        status: 'Unverified', // 示例状态值
        type: 'CNAME',
        hostRecords: '',
        hostname: 'AAAA',
        Enter_this_value: 'BBB',
        currentValue: 'CCC'
    },
];

const App = () => {
    const [domainData, setDomainData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await checkDomain('mail.szpost.com');
            console.log(res)
            // 根据返回的 res 数据构建表格数据
            const tableData: DataType[] = [];
            // 将 res 中的数据转换成表格需要的格式，并存储到 tableData 中
            setDomainData(tableData);
        };

        fetchData();

    }, []);
    return <Table columns={columns}
           dataSource={data}
           pagination={false}

    />
};

export default App;
