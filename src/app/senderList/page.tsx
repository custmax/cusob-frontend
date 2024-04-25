'use client'
import styles from './page.module.scss';
import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import {Button, message, Space, Table, TableProps, Tag} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {getDomainList} from "@/server/domain";
import {useCallback, useEffect, useState} from "react";
import {SUCCESS_CODE} from "@/constant/common";
import {useRouter} from "next/navigation";
import Link from "next/link";

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
    verifyNotice,
    noticeTxt,
    buttonAdd,
    tableDomain,
    iconFalse,
    iconTrue,
} = styles;

const SenderList = () => {

    const router = useRouter()
    const [domainList, setDomainList] = useState([]);

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

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Sender Domain',
            dataIndex: 'domain',
            key: 'domain',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'SPF',
            dataIndex: 'spf',
            key: 'spf',
            render: (_, record) => (
                <Space size="middle">
                    {record.spf &&
                        <CheckOutlined className={iconTrue} onPointerEnterCapture={undefined}
                                       onPointerLeaveCapture={undefined}/>
                    }
                    {!record.spf &&
                        <CloseOutlined className={iconFalse} onPointerEnterCapture={undefined}
                                       onPointerLeaveCapture={undefined}/>
                    }
                </Space>
            )
        },
        {
            title: 'DKIM',
            dataIndex: 'dkim',
            key: 'dkim',
            render: (_, record) => (
                <Space size="middle">
                    {record.dkim &&
                        <CheckOutlined className={iconTrue} onPointerEnterCapture={undefined}
                                       onPointerLeaveCapture={undefined}/>
                    }
                    {!record.dkim &&
                        <CloseOutlined className={iconFalse} onPointerEnterCapture={undefined}
                                       onPointerLeaveCapture={undefined}/>
                    }
                </Space>
            )
        },
        {
            title: 'SPF/DKIM',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={{pathname: "/domainCertify", query: {domain: record.domain}}}>
                        Settings
                    </Link>
                </Space>
            ),
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

    return <div className={senderListContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <div className={addSender}>
                <Button onClick={pushToAddSender} className={buttonAdd}>Add Sender</Button>
            </div>
            <div className={verifyNotice}>
                <div className={noticeTxt}>Your domain has not been verified</div>
            </div>
            <div className={tableDomain}>
                <Table columns={columns} dataSource={domainList}></Table>
            </div>
        </div>

    </div>
}

export default SenderList;