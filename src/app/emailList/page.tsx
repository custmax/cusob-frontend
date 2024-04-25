'use client';
import styles from './page.module.scss';
import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import {Space, Table, TableProps} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useEffect, useState} from "react";
import {getDomainList} from "@/server/domain";
import {SUCCESS_CODE} from "@/constant/common";
import classNames from "classnames";


const {
    emailListContainer,
    main,
    title,
    content,
    domainBox,
    domainTitle,
    domainItem,
    active,

} = styles

type DataType = {
    key: string;
    email: string;
}

const EmailList = () => {

    const [domainList, setDomainList] = useState<{domain:string, id:number}[]>([]);
    const [activeDomainId, setActiveDomainId] = useState<number>(-1);

    const initDomainList = async () => {
        const res = await getDomainList();
        if (res.code === SUCCESS_CODE && res.data){
            setDomainList(res.data.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
        }
    }

    const onDomainItemClick = (domainItem: {domain:string, id:number}) => {
        setActiveDomainId(domainItem.id)
    }


    useEffect(() => {
        initDomainList()
    }, []);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Sender Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const emailList: DataType[] = [
        {
            key: '1',
            email: 'ming@daybreakhust.top',
        },
        {
            key: '2',
            email: 'daybreak@chtrak.com',
        },
    ];

    return <div className={emailListContainer}>
        <EnteredHeader/>
        <SideBar/>
        <div className={main}>
            <div className={title}>
                <span>Sender</span>
                <span style={{margin: '0 0.5em', color: '#666'}}>/</span>
                <span style={{color: '#999999'}}> All Senders</span>
            </div>
            <div className={content}>
                <Table<DataType>
                    columns={columns}
                    dataSource={emailList}
                />
            </div>
        </div>
        <div className={domainBox}>
            <div className={title}>Senders</div>
            <div className={domainTitle}>Domain</div>
            {
                domainList.map((item, index) => <div
                    className={classNames(domainItem, { [active]: item.id === activeDomainId })}
                    key={index}
                    onClick={() => onDomainItemClick(item)}
                >
                    {item.domain}
                </div>)
            }
        </div>

    </div>
}

export default EmailList;