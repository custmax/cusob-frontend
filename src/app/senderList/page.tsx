'use client'
import styles from './page.module.scss';
import EnteredHeader from "@/component/EnteredHeader";
import SideBar from "@/component/SideBar";
import {Button, Space, Table, TableProps, Tag} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {getDomainList} from "@/server/domain";
import {useCallback, useState} from "react";
import {SUCCESS_CODE} from "@/constant/common";

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

    // todo
    const [domainList, setDomainList] = useState([]);

    const initDomainList = async () => {
        const res = await getDomainList();
        if (res.code === SUCCESS_CODE && res.data){
            setDomainList(res.data)
        }
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
            render: (_, spf) => (
                <Space size="middle">
                    {spf &&
                        <CheckOutlined className={iconTrue}/>
                    }
                    {!spf &&
                        <CloseOutlined className={iconFalse}/>
                    }
                </Space>
            )
        },
        {
            title: 'DKIM',
            dataIndex: 'dkim',
            key: 'dkim',
            render: (_, dkim) => (
                <Space size="middle">
                    {dkim &&
                        <CheckOutlined className={iconTrue}/>
                    }
                    {!dkim &&
                        <CloseOutlined className={iconFalse}/>
                    }
                </Space>
            )
        },
        {
            title: 'SPF/DKIM',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Settings</a>
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

    const data: DataType[] = [
        {
            key: '1',
            domain: 'daybreakhust.top',
            spf: false,
            dkim: true,
        },
        {
            key: '2',
            domain: 'chtrak.com',
            spf: true,
            dkim: false,
        },
    ];

    return <div className={senderListContainer}>
        <EnteredHeader />
        <SideBar />
        <div className={main}>
            <div className={addSender}>
                <Button className={buttonAdd}>Add Sender</Button>
            </div>
            <div className={verifyNotice}>

                <div className={noticeTxt}>Your domain has not been verified</div>
            </div>
            <div className={tableDomain}>
                <Table columns={columns} dataSource={data}></Table>
            </div>
        </div>

    </div>
}

export default SenderList;