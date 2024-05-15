import React, {useEffect, useState} from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import saveDomain from "@/app/sendcloud/page";
import {getDomainList, addDomain, updateDomain, checkDomain, deleteDomain,getDomain} from "@/server/sendcloud/domain";



interface DataType {
    key: string;
    name: string;
    status: string; // 改为 string 类型以匹配状态值
    type: string;
    hostRecords: string;
    hostname: string;
    Enter_this_value: string;

}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        render: (_, { name }, index) => {
            if (index < 3) { // 只在前两行添加星号
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
        width: '10%',
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
        width: '10%',

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
        width: '20%',
        render: (value) => <div style={{ wordWrap: 'break-word' }}>{value}</div>,
    },
    {
        title: 'Enter this value',
        dataIndex: 'Enter_this_value',
        key: 'Enter_this_value',
        width: '30%',
        ellipsis: true, // 添加这行来启用省略号
    },

];


const App = () => {
    const [domainData, setDomainData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDomain('mail.email-marketing-hub.com');
            const data = res.info.dataList[0]
            // const [false]
            const dotsCount = (data['spf.domain'].match(/\./g) || []).length; // 获取`.`的数量

            let SPFdomainRecords;
            let domainName;
            if (dotsCount === 2) {
                // 获取第一个`.`之前的部分
                SPFdomainRecords = data['spf.domain'].substring(0, data['spf.domain'].indexOf('.'));
                domainName =  data['spf.domain'].substring(data['spf.domain'].indexOf('.')+1)
            } else {
                // 如果`.`的数量不是2，则为 @
                SPFdomainRecords = '@';
                domainName = data['spf.domain'];
            }
            console.log(data)
            const tableData: DataType[] = [
                {
                    key: '1',
                    name: 'SPF',
                    status: 'Unverified', // 示例状态值
                    type: 'TXT',
                    hostRecords: SPFdomainRecords,
                    hostname: domainName,
                    Enter_this_value: data['spf.value'],

                },
                {
                    key: '2',
                    name: 'DKIM',
                    status: 'Unverified', // 示例状态值
                    type: 'TXT',
                    hostRecords: data['dkim.domain'],
                    hostname: domainName,
                    Enter_this_value: data['dkim.value'],

                },
                {
                    key: '3',
                    name: 'MX',
                    status: 'Unverified', // 示例状态值
                    type: 'MX',
                    hostRecords: data['mx.domain'],
                    hostname: domainName,
                    Enter_this_value: data['mx.value'],

                },
                {
                    key: '4',
                    name: 'DMARC',
                    status: 'Unverified', // 示例状态值
                    type: 'TXT',
                    hostRecords: data['dmarc.domain'],
                    hostname: domainName,
                    Enter_this_value: data['dmarc.value'],
                },

            ];
            // 将 res 中的数据转换成表格需要的格式，并存储到 tableData 中
            setDomainData(tableData);
        };

        fetchData();

    }, []);
    return <Table columns={columns}
           dataSource={domainData}
           pagination={false}

    />
};

export default App;
