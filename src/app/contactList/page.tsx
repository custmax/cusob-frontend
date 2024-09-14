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
import { useCallback, useEffect, useState } from 'react';
import { TableRowSelection } from 'antd/es/table/interface';
import Link from 'next/link';
import { getList, removeContact } from '@/server/contact';
import {
  addGroup,
  getGroupList,
  getGroupsAndContactCount,
  getSubscriptionCount,
  removeGroup,
  updateGroup
} from '@/server/group';
import { SUCCESS_CODE } from '@/constant/common';
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
  subscriptionType:string,
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
  editIcon,
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
  const [activeGroupId, setActiveGroupId] = useState(-1)
  const [groupList, setGroupList] = useState<{ groupName: string, id: number }[]>([]);
  const [subObj, setSubObj] = useState<Record<string, number> | null>(null);
  const [groupNumObj, setGroupNumObj] = useState<Record<string, number> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactList, setContactList] = useState([])
  const [searchVal, setSearchVal] = useState('');
  const [total, setTotal] = useState(0)
  const [totalCount, setTotalCount] = useState(0);

  const initGroupList = async () => {
    const res = await getGroupList()
    if (res.code === SUCCESS_CODE) {
      setGroupList(res.data)
    }
  }

  const initGroupNum = async () => {
    const res = await getGroupsAndContactCount()
    if (res.code === SUCCESS_CODE) {
      setGroupNumObj(res.data)
    }
  }
  const initSubNum = async () => {
    const res = await getSubscriptionCount()
    //console.log("HHH");
    console.log(res.data);
    if (res.code === SUCCESS_CODE) {
      setSubObj(res.data)

    }
  }

//   设置活动组 ID 为 -1。
// 显示加载消息。
// 通过 getList 函数获取第一页的联系人数据。
// 加载完成后销毁加载消息。
// 如果请求成功，更新联系人列表和当前页码。
  const initList = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const d = await Tracking();
    console.log(d)
    const res = await getList(currentPage, pageSize)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      console.log(res.data)
      setContactList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setTotal(res.data?.total || 0)
      setTotalCount(res.data?.total || 0)
    }
  }, [currentPage, pageSize])
  
  useEffect(() => {
    initList()
    initGroupList()
    initGroupNum()
    initSubNum()
  }, [])

  const onGroupOk = async () => {
    if (groupName) {
      const res = await addGroup(groupName)
      if (res.code === SUCCESS_CODE) {
        initGroupList()
        initGroupNum()
        initSubNum()
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }
    setShowGroup(false)
  }

  const onGroupCancel = () => {
    setShowGroup(false)
  }

  const onEditGroupOk = async () => {
    if (editGroupName && activeGroupId !== -1) {
      const res = await updateGroup(editGroupName, activeGroupId)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
        setShowEditGroup(false)
        initList()
        initGroupList()
        initGroupNum()
        initSubNum()
      } else {
        message.error(res.message)
      }
    }
  }

  const onEditGroupDelete = async () => {
    if (activeGroupId !== -1) {

      const res = await removeGroup(activeGroupId)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
        setShowEditGroup(false)
        initGroupList()
      } else {
        message.error(res.message)
      }
    }
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onPageChange: PaginationProps['onChange'] = async (pageNumber:number) => {
    setCurrentPage(pageNumber)
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const res = await getList(pageNumber, pageSize)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      console.log(res.data)
      setContactList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setTotal(res.data?.total)
    }
  }

  const pagination = {
    currentPage: currentPage,
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
          <span style={{ display: 'inline-block', width: '10vw' }}>{item}</span>
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
      const res = await removeContact(selectedRowKeys.map(item => Number(item)))
      if (res.code === SUCCESS_CODE) {
        initList();
        initGroupList()
        initGroupNum()
        initSubNum()
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }

  }

  const onGroupItemClick = async (groupItem: { groupName: string, id: number }) => {
    if (activeGroupId === groupItem.id) {
      setShowEditGroup(true);
      setEditGroupName(groupItem.groupName)
      return;
    }
    setActiveGroupId(groupItem.id)
    if (groupItem.id) {
      message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
      const res = await getList(1, pageSize, searchVal || '', groupItem.id,'')
      message.destroy('listLoading')
      if (res.code === SUCCESS_CODE) {
        setContactList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
        setTotal(res.data?.total)
        setCurrentPage(1)
      }
    }
  }
  const onSubscriptionTypeClick = async (subscriptionType:string) => {
    if(subscriptionType === 'Subscribed') {
      setActiveGroupId(100);
    }
    else if(subscriptionType === 'Non-subscribed') {
      setActiveGroupId(200);
    }else if(subscriptionType === 'Unsubscribed') {
      setActiveGroupId(300);
    }

    message.loading({ content: 'loading', duration: 10, key: 'listLoading' });

    try {
      console.log("sadfhsadhfgsdjafgdsajhf");
      console.log(subscriptionType);

      const res = await getList(1, pageSize, searchVal || undefined,0  ,subscriptionType);
      console.log(res.data);

      message.destroy('listLoading');

      if (res.code === SUCCESS_CODE) {
        setContactList(res.data?.records.map((item:any) => ({ ...item, key: item.id })) || []);
        setTotal(res.data?.total);
        setCurrentPage(1);
      } else {
        message.error('Failed to load contacts');
      }
    } catch (error) {
      message.destroy('listLoading');
      message.error('An error occurred while fetching data');
    }
  };

  const onAllContactClick = async () => {
    setActiveGroupId(-1)
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const res = await getList(1, pageSize, searchVal || '')
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      setContactList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setCurrentPage(1)
    }
  }

  const onSearch = async () => {
    if (searchVal) {
      message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
      const res = await getList(1, pageSize, searchVal)
      message.destroy('listLoading')
      if (res.code === SUCCESS_CODE) {
        setContactList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
        setSearchVal('')
        setCurrentPage(1)
      }
    }
  }

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    onDelete();
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };


  return <div className={contactListContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <a href="/contactList">Contacts</a>
        <span style={{ margin: '0 0.5em', color: '#666' }}>/</span>
        <span style={{ color: '#999999' }}> All Contacts</span>
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
            <Input className={searchInput} value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder='Search' />
            <div className={searchIconBox} onClick={onSearch}>
              <ImgWrapper className={searchIcon} src='/img/search_icon.png' alt='search icon'  />
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
        className={classNames(groupItem, { [active]: activeGroupId === -1 })}
        onClick={onAllContactClick}
      >
        All Contacts（{totalCount}）
      </div>
      {
        groupList.map((item, index) => <div
          key={index}
          className={classNames(groupItem, { [active]: item.id === activeGroupId })}
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
            className={classNames(groupItem, { [active]: activeGroupId === 100 })}
            onClick={() => onSubscriptionTypeClick('Subscribed')}
        >
          Subscribed（{subObj ? subObj['Subscribed'] || 0 : 0}）
        </div>
        <div
            className={classNames(groupItem, { [active]: activeGroupId === 200 })}
            onClick={() => onSubscriptionTypeClick('Non-subscribed')}
        >
          Non-subscribed（{subObj ? subObj['Non-subscribed'] || 0 : 0}）
        </div>
        <div
            className={classNames(groupItem, { [active]: activeGroupId === 300 })}
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
      onOk={onGroupOk}
      onCancel={onGroupCancel}
      wrapClassName={groupModal}
    >
      <div className={groupContent}>
        <div className={inputItem}>
          <div className={label}>Group Name</div>
          <Input value={groupName} onChange={e => setGroupName(e.target.value)} className={value} />
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
          <Button danger style={{ marginRight: '1em' }}>Delete</Button>
        </Popconfirm>
        <Button onClick={onEditGroupOk} type='primary'>Ok</Button>
      </div>}
    >
      <div className={groupContent}>
        <div className={inputItem}>
          <div className={label}>Group Name</div>
          <Input value={editGroupName} onChange={e => setEditGroupName(e.target.value)} className={value} />
        </div>
      </div>
    </Modal>
  </div>
};

export default ContactList;
