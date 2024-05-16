'use client'
import styles from './page.module.scss';
import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import {Button, Input, message, Modal, Space, Table, TableProps} from "antd";
import {getDomainList} from "@/server/domain";
import React, {useEffect, useState} from "react";
import {SUCCESS_CODE} from "@/constant/common";
import {useRouter} from "next/navigation";
import Link from "next/link";
import boolean from "async-validator/dist-types/validator/boolean";

type DataType = {
    key: string;
    domain: string;
    spf: boolean;
    dkim: boolean;
}

const {
    senderListContainer,
    main,
    addSender,
    buttonAdd,
    tableDomain,
    create,
    input,
    detail,
} = styles;

const SenderList = () => {

    const router = useRouter()
    const [domainList, setDomainList] = useState<DataType[]>([]);
    const [show,setShow] = useState(false)
    const initDomainList = async () => {
        message.loading({ content: 'loading', duration: 10, key: 'loading' })
        const res = await getDomainList();
        message.destroy('loading')
        if (res.code === SUCCESS_CODE && res.data){
            setDomainList(res.data.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
        }
    }

    useEffect(() => {
        initDomainList()
    }, []);

    const pushToAddSender = () => {
        router.push("/addSender")
    }

    const adddomain=()=>{
        setShow(true)
    }
    const onCancel = () =>{
        setShow(false)
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Status',
            dataIndex: 'domain',
            key: 'domain',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Sender Domain',
            dataIndex: 'domain',
            key: 'domain',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'IP Type',
            key: 'ipType',
            render: () => (
                <Space size="middle">
                    Shared IP
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/domainCertify?domain=${record.domain}`}>Setting</Link>
                    <a>Update</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return <div className={senderListContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <div className={addSender}>
                <Button onClick={adddomain} className={buttonAdd}>Add Domain</Button>
            </div>
            <div className={tableDomain}>
                <Table columns={columns} dataSource={domainList}></Table>
            </div>
        </div>
        <Modal
            title="Add domain"
            open={show}
            okText='Done'
            // onOk={}
            onCancel={onCancel}
            >
            <div className={create}>
                <div className={input}>
                    <span style={{ color: 'red' }}>*</span> Please enter the sending domain name：
                    <Input/>
                    <span className={detail}>Please provide your own domain name and support DNS configuration for domain name verification in the future！</span>
                </div>
            </div>
        </Modal>
    </div>
}

export default SenderList;
