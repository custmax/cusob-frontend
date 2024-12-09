'use client';
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {
    Button,
    Divider,
    Input,
    Modal,
    Popconfirm,
    Space,
    Table,
    TableProps,
    message,
    PaginationProps,
    PopconfirmProps
} from 'antd';
import ImgWrapper from '@/component/ImgWrapper';
import React, {useCallback, useEffect, useState} from 'react';
import {TableRowSelection} from 'antd/es/table/interface';
import Link from 'next/link';
import {getList, removeContact} from '@/server/contact';
import {
    addGroup,
    getGroupList,
    getGroupsAndContactCount,
    getSubscriptionCount,
    removeGroup,
    updateGroup
} from '@/server/group';
import {SUCCESS_CODE} from '@/constant/common';
import classNames from 'classnames';

import Tracking from "@/server/tracking";

import {set} from "immutable";


type DataType = {
    key: string,
    email: string,
    firstName: string,
    lastName: string,
    company: string,
    phone: string,
    group: string,
    subscriptionType: string,
}

type groupNumRes = {
    code: number
    data: {
        [key: string]: number
    }
}

const {
    contactListContainer,
    main,
    title,
    content,
    filterBox,
    filterLeft,
    searchInputBox,
    searchInput,
    searchIconBox,
    searchIcon,
    tag,
    categoryBox,
    editButton,
    groupTitle,
    groupItem,
    active,
    groupModal,
    groupContent,
    inputItem,
    label,
    value,
    addgroupItem,
} = styles;

const pageSize = 10;

const ContactList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [showGroup, setShowGroup] = useState<boolean>(false);
    const [showEditGroup, setShowEditGroup] = useState<boolean>(false);
    const [editGroupName, setEditGroupName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [activeGroupId, setActiveGroupId] = useState<number>(0)
    const [groupList, setGroupList] = useState<{ groupName: string, id: number }[]>([]);
    const [subObj, setSubObj] = useState<Record<string, number> | null>(null);
    const [groupNumObj, setGroupNumObj] = useState<Record<string, number> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactList, setContactList] = useState([])
    const [searchVal, setSearchVal] = useState('');
    const [total, setTotal] = useState(0)
    const [subscription, setSubscription] = useState<string>('')
    const [totalCount, setTotalCount] = useState(0);
    const [isEditGroupProcess, setIsEditGroupProcess] = useState<boolean>(false)
    const [isAddGroupProcess, setIsAddGroupProcess] = useState<boolean>(false)


    const initGroupList = async () => {
        const res = await getGroupList()
        if (res.code === SUCCESS_CODE) {
            setGroupList(res.data)
        }
    }

    const initGroupNum = async () => {
        const res: groupNumRes = await getGroupsAndContactCount()
        if (res.code === SUCCESS_CODE) {
            const sum = Object.values(res.data).reduce((acc, value) => acc + value, 0)
            setTotalCount(sum)
            setGroupNumObj(res.data)
        }
    }
    const initSubNum = async () => {
        const res = await getSubscriptionCount()
        if (res.code === SUCCESS_CODE) {
            setSubObj(res.data)
        }
    }

    // 显示加载消息。
    // 通过 getList 函数获取第一页的联系人数据。
    // 加载完成后销毁加载消息。
    // 如果请求成功，更新联系人列表和当前页码。
    const initList = async () => {
        message.loading({content: 'loading', duration: 10, key: 'listLoading'})

        const d = await Tracking();
        const res = await getList(currentPage, pageSize, searchVal || undefined, activeGroupId || undefined, subscription || undefined)

        message.destroy('listLoading')
        if (res.code === SUCCESS_CODE && res.data) {
            setContactList(res.data?.records.map((item: { id: number }) => ({...item, key: item.id})) || [])
            setTotal(res.data?.total)
            pagination.current = currentPage
            pagination.total = res.data?.total
        }
    }

    useEffect(() => {
        initList()
        initGroupList()
        initGroupNum()
        initSubNum()
    }, [])

    const getPage = async (cur: number, size: number, searchVal: string, groupId: number, subscription: string) => {
        message.loading({content: 'loading', duration: 10, key: 'listLoading'})
        const res = await getList(cur, size, searchVal || '', groupId || 0, subscription || '')
        message.destroy('listLoading')
        if (res.code === SUCCESS_CODE) {
            setContactList(res.data?.records.map((item: { id: number }) => ({...item, key: item.id})) || [])
            setTotal(res.data?.total)
            pagination.current = cur
            pagination.total = res.data?.total
        }
    }

    // 添加组
    const onGroupOk = async () => {
        if (isAddGroupProcess) {
            return
        }
        setIsAddGroupProcess(true)

        if (groupName) {
            const res = await addGroup(groupName)
            if (res.code === SUCCESS_CODE) {
                await getPage(pagination.current, pageSize, searchVal, activeGroupId, subscription)
                await initGroupList()
                message.success(res.message)
                setShowGroup(false)
                setGroupName('')
            } else {
                message.error(res.message)
            }
        }

        setIsAddGroupProcess(false)
    }

    const onGroupCancel = () => {
        setShowGroup(false)
        setGroupName('')
    }

    const onEditGroupOk = async () => {
        if (isEditGroupProcess) {
            return
        }
        setIsEditGroupProcess(true)

        if (editGroupName && activeGroupId !== -1) {
            const res = await updateGroup(editGroupName, activeGroupId)
            if (res.code === SUCCESS_CODE) {
                message.success(res.message)
                setShowEditGroup(false)
                setGroupName(res.data)
                await getPage(currentPage, pageSize, searchVal, activeGroupId, subscription)
                await initGroupNum()
                await initGroupList()
                setSearchVal('')
            } else {
                message.error(res.message)
            }
        }

        setIsEditGroupProcess(false)
    }

    const onEditGroupDelete = async () => {
        if (activeGroupId !== -1) {
            const res = await removeGroup(activeGroupId)
            if (res.code === SUCCESS_CODE) {
                setActiveGroupId(0)
                // 删除当前后，跳转至首页
                message.success(res.message)
                setShowEditGroup(false)

                // 重置信息
                await getPage(1, pageSize, '', 0, '')
                await initGroupList()
                setSearchVal('')
            } else {
                message.error(res.message)
            }
        }
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onPageChange: PaginationProps['onChange'] = async (pageNumber: number) => {
        setCurrentPage(pageNumber)

        await getPage(pageNumber, pageSize, searchVal, activeGroupId, subscription)
    }

    let pagination = {
        current: currentPage,
        pageSize: pageSize,
        defaultCurrent: 1,
        total: total,
        onChange: onPageChange,
    }

    const columns: TableProps<DataType>['columns'] = [//选择要展示的信息
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (item, record) => (
                <Space size="middle">
                    <span style={{display: 'inline-block', width: '10vw'}}>{item}</span>
                    <Link href={`/contactEditor?id=${record.key}`}>
                        <div className={editButton}>edit</div>
                        {/*<ImgWrapper className={editIcon} src='/img/edit_icon.png' alt='edit icon' />*/}
                    </Link>
                </Space>
            ),
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Subscription type',
            dataIndex: 'subscriptionType',
            key: 'subscriptionType',
        },
        {
            title: 'Group',
            key: 'groupName',
            dataIndex: 'groupName',
            render: (item) => (
                <Space size="middle">
                    <div className={tag}>{item}</div>
                </Space>
            ),
        },
    ];

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    const onDelete = async () => {
        if (selectedRowKeys.length) {
            // 删除联系人，删除后不跳转
            const res = await removeContact(selectedRowKeys.map(item => Number(item)))
            if (res.code === SUCCESS_CODE) {
                // 更新所有列表
                await initList();
                await initGroupList()
                await initGroupNum()
                await initSubNum()
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }

    }

    const onGroupItemClick = async (groupItem: { groupName: string, id: number }) => {
        // 打开修改GroupName页面
        if (activeGroupId === groupItem.id) {
            setShowEditGroup(true);
            setEditGroupName(groupItem.groupName)
            return;
        }
        // 设置active id，并将搜索框和subscription清空
        setSubscription('')
        setActiveGroupId(groupItem.id)
        setSearchVal('')


        await getPage(1, pageSize, '', groupItem.id, '')
    }

    const onSubscriptionTypeClick = async (subscriptionType: string) => {
        // 设置参数
        setSubscription(subscriptionType)
        setActiveGroupId(0)
        setSearchVal('')
        setCurrentPage(1)

        await getPage(1, pageSize, '', 0, subscriptionType)
    };

    const onAllContactClick = async () => {
        setActiveGroupId(0)
        setSubscription('')
        setSearchVal('')
        setCurrentPage(1)

        await getPage(1, pageSize, '', 0, '')
    }

    const onSearch = async () => {
        setCurrentPage(1)

        await getPage(1, pageSize, searchVal, activeGroupId, subscription)
    }

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        onDelete();
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        // console.log(e);
    };


    return <div className={contactListContainer}>
        <EnteredHeader/>
        <SideBar/>
        <div className={main}>
            <div className={title}>
                <a href="/contactList">Contacts</a>
                <span style={{margin: '0 0.5em', color: '#666'}}>/</span>
                <span style={{color: '#999999'}}> All Contacts</span>
            </div>
            <div className={content}>
                <div className={filterBox}>
                    <div className={filterLeft}>
                        <span><Link href='/contactEditor'>Add New</Link></span>
                        <span><Link href='/importWay'>Import</Link></span>
                        <Popconfirm
                            title="Delete the contact"
                            description="Are you sure to delete this contact?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span>Delete</span>
                        </Popconfirm>
                    </div>
                    <div className={searchInputBox}>
                        <Input className={searchInput} value={searchVal} onChange={e => setSearchVal(e.target.value)}
                               placeholder='Search'/>
                        <div className={searchIconBox} onClick={onSearch}>
                            <ImgWrapper className={searchIcon} src='/img/search_icon.png' alt='search icon'/>
                        </div>
                    </div>
                </div>
                <Table<DataType>
                    columns={columns}
                    dataSource={contactList}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
            </div>
        </div>
        <div className={categoryBox}>
            {/*侧边过滤器显示*/}
            <div className={title}>Filter By</div>
            <div className={groupTitle}>Group</div>
            <div
                className={classNames(groupItem, {[active]: activeGroupId === 0 && !subscription})}
                onClick={onAllContactClick}
            >
                All Contacts（{totalCount}）
            </div>
            {
                groupList.map((item, index) => <div
                    key={index}
                    className={classNames(groupItem, {[active]: item.id === activeGroupId && !subscription})}
                    onClick={() => onGroupItemClick(item)}
                >
                    {item.groupName}（{groupNumObj ? groupNumObj[item.groupName] || 0 : 0}）
                </div>)
            }
            <div className={addgroupItem} onClick={() => setShowGroup(true)}>Add New Group</div>
            {/*订阅类型*/}
            <div className={groupTitle}>Subscription type</div>
            <div>
                <div
                    className={classNames(groupItem, {[active]: subscription === 'Subscribed'})}
                    onClick={() => onSubscriptionTypeClick('Subscribed')}
                >
                    Subscribed（{subObj ? subObj['Subscribed'] || 0 : 0}）
                </div>
                <div
                    className={classNames(groupItem, {[active]: subscription === 'Non-subscribed'})}
                    onClick={() => onSubscriptionTypeClick('Non-subscribed')}
                >
                    Non-subscribed（{subObj ? subObj['Non-subscribed'] || 0 : 0}）
                </div>
                <div
                    className={classNames(groupItem, {[active]: subscription === 'Unsubscribed'})}
                    onClick={() => onSubscriptionTypeClick('Unsubscribed')}
                >
                    Unsubscribed（{subObj ? subObj['Unsubscribed'] || 0 : 0}）
                </div>
            </div>
        </div>
        {/*添加group*/}
        <Modal
            title="Add Group"
            open={showGroup}
            onOk={!isAddGroupProcess ? onGroupOk : undefined}
            onCancel={onGroupCancel}
            wrapClassName={groupModal}
        >
            <div className={groupContent}>
                <div className={inputItem}>
                    <div className={label}>Group Name</div>
                    <Input value={groupName} onChange={e => setGroupName(e.target.value)} className={value}/>
                </div>
            </div>
        </Modal>
        <Modal
            title="Edit Group"
            open={showEditGroup}
            onCancel={() => setShowEditGroup(false)}
            wrapClassName={groupModal}
            footer={() => <div>
                <Popconfirm
                    title="Delete the group"
                    description="Are you sure to delete this group?"
                    onConfirm={onEditGroupDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger style={{marginRight: '1em'}}>Delete</Button>
                </Popconfirm>
                <Button onClick={!isEditGroupProcess ? onEditGroupOk : undefined} type='primary'>Ok</Button>
            </div>}
        >
            <div className={groupContent}>
                <div className={inputItem}>
                    <div className={label}>Group Name</div>
                    <Input value={editGroupName} onChange={e => setEditGroupName(e.target.value)} className={value}/>
                </div>
            </div>
        </Modal>
    </div>
};

export default ContactList;
