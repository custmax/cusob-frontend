'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {Button, Input, message, Select, Table, Tag} from 'antd';

import {SUCCESS_CODE} from "@/constant/common";

import {getDkim} from "@/server/dkim";
import {domainVerify} from "@/server/domain";
import {SPF_VALUE} from "@/constant/cusob"
import {useRouter, useSearchParams} from "next/navigation";

import React, {useCallback,useEffect, useState} from 'react';

import type { TableProps } from 'antd';
import saveDomain from "@/app/sendcloud/page";
import {getDomainList, addDomain, updateDomain, checkDomain, deleteDomain,getDomain} from "@/server/sendcloud/domain";
import {CopyOutlined} from "@ant-design/icons";
import copy from "copy-to-clipboard";


interface DataType {
  key: string;
  name: string;
  status: string; // 改为 string 类型以匹配状态值
  type: string;
  hostRecords: string;
  hostname: string;
  Enter_this_value: string;

}


const {
  domainCertifyContainer,
  main,
  title,
  tab,
  check,

} = styles;

const handleCopy = (value: string) => {
  copy(value)
  message.success("Copy Success")
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
    render: (value:string) => (
        <div style={{ whiteSpace: 'normal' }}>
          <span style={{ marginRight: '5px' }}>{value}</span>
          <CopyOutlined style={{cursor: 'pointer'}} onClick={() => handleCopy(value)}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        </div>
    ),
    ellipsis: true, // 添加这行来启用省略号

  },
];

const DomainCertify = () => {
  const [domain, setDomain] = useState('')
  const [dkimValue, setDkimValue] = useState<string>('')
  const [selector, setSelector] = useState('')
  const searchParams = useSearchParams()
  const domainValue = searchParams.get("domain")

  const router = useRouter();

  const initDomain = useCallback(() => {
    if (domainValue) {
      setDomain(domainValue)
      initDkim(domainValue)
    }
  }, [domainValue])

  const initDkim = useCallback(async (domain: string) => {
    const res = await getDkim(domain)
    console.log(res)
    if (res.code === SUCCESS_CODE && res.data) {

      setDkimValue(res.data.publicKey)
      setSelector(res.data.selector)
    }
  }, [])

  const handleDomainVerify = async (domain: string) => {
    message.loading({content: 'loading', duration: 10, key: 'listLoading'})
    const res = await domainVerify(domain)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      router.push("/senderList")
    }
  }

  const fetchData = async () => {
    const res = await getDomain(domainValue);
    const data = res.info.dataList[0]
    const status = {'spf_status': false,
      'dkim_status':false,
      'mx_status':false,
      'dmarc_status':false}
    if (data.verify & 1 ) {
      status.dkim_status = true;
    }
    if (data.verify & 2 ) {
      status.spf_status = true;
    }
    if (data.verify & 4 ) {
      status.mx_status = true;
    }
    if (data.verify & 16 ) {
      status.dmarc_status = true;
    }
    console.log(data.verify & 2)
    const spf_status = status.spf_status ? 'Verified' : 'Unverified';
    const dkim_status = status.dkim_status ? 'Verified' : 'Unverified';
    const mx_status = status.mx_status ? 'Verified' : 'Unverified';
    const dmarc_status = status.dmarc_status ? 'Verified' : 'Unverified';
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
        status: spf_status , // 示例状态值
        type: 'TXT',
        hostRecords: SPFdomainRecords,
        hostname: domainName,
        Enter_this_value: data['spf.value'],

      },
      {
        key: '2',
        name: 'DKIM',
        status: dkim_status, // 示例状态值
        type: 'TXT',
        hostRecords: data['dkim.domain'],
        hostname: domainName,
        Enter_this_value: data['dkim.value'],

      },
      {
        key: '3',
        name: 'MX',
        status: mx_status, // 示例状态值
        type: 'MX',
        hostRecords: data['mx.domain'],
        hostname: domainName,
        Enter_this_value: data['mx.value'],

      },
      {
        key: '4',
        name: 'DMARC',
        status: dmarc_status, // 示例状态值
        type: 'TXT',
        hostRecords: data['dmarc.domain'],
        hostname: domainName,
        Enter_this_value: data['dmarc.value'],
      },

    ];
    // 将 res 中的数据转换成表格需要的格式，并存储到 tableData 中
    setDomainData(tableData);
  };

  const [domainData, setDomainData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData();

  }, []);

  function handleButtonClick() {
    fetchData();
    message.success('Checked!')
  }

  return <div className={domainCertifyContainer}>
    <EnteredHeader/>
    <SideBar/>
    <div className={main}>
      <div className={title}>Domain Auth For {domain}
        <div className={check}><Button type="primary" onClick={handleButtonClick} >Check Status</Button></div>
      </div>

    <div className={tab}>
      <Table columns={columns}
             dataSource={domainData}
             pagination={false}
      />
    </div>
    </div>
  </div>
};

export default DomainCertify;
