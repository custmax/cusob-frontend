'use client';
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import ImgWrapper from '@/component/ImgWrapper';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import {Checkbox, Input, Select, message, Table, PaginationProps} from 'antd';
import Link from 'next/link';
import { getCampaignPage } from '@/server/campaign';
import { SUCCESS_CODE } from '@/constant/common';
import EmailStatistics from "@/server/emailStatistics";
import {getOrderHistory} from "@/server/orderHistory";
import SenderStatistics from "@/server/emailStatistics";

const {
  campaignContainer,
  main,
  title,
  titleLeft,
  newBtn,
  content,
  viewWrapper,
  viewTitle,
  statusTitle,
  statusItem,
  active,
  listWrapper,
  listTitle,
  filterWrapper,
  searchInput,
  sortWrapper,
  selector,
  listBox,
  listItem,
  listLeft,
  listIcon,
  itemDescBox,
  itemTitle,
  itemDescText,
  listCenter,
  draftStatus,
  listRight,
  editBtn,
} = styles;

const pageSize = 10;

const Campaign = () => {
  const [status, setStatus] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignList, setCampaignList] = useState<(Campaign.CampaignNew & { status: number, updateTime: string })[]>([])
  const [total, setTotal] = useState(0)
  const [order, setOrder] = useState<string>('0');

  const initList = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const query = { status, name: searchVal, order: order }
    const res = await getCampaignPage(currentPage, pageSize, query)
    message.destroy('listLoading')
    const messages = await SenderStatistics('941563132@qq.com');
    console.log(messages)
    if (res.code === SUCCESS_CODE && res.data) {
      setCampaignList(res.data?.records || [])
      setTotal(res.data?.total || 0)
    }
  }, [currentPage])
  
  useEffect(() => {
    initList();
  }, [])

  const onStatusClick = async (val: string) => {
    setStatus(val)
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const query = { status: val, name: searchVal }
    const res = await getCampaignPage(currentPage, pageSize, query)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      setCampaignList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setTotal(res.data?.total || 0)
    }
  };

  const onPageChange: PaginationProps['onChange'] = async (pageNumber:number) => {
    setCurrentPage(pageNumber)
    message.loading({ content: 'loading', duration: 10, key: ',listLoading' })
    const query = { status, name: searchVal }
    const res = await getCampaignPage(pageNumber, pageSize,query)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      console.log(res.data)
      setCampaignList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setTotal(res.data?.total)
    }
  }

  const onSearch = async (val: string) => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const query = { status, name: val }
    const res = await getCampaignPage(pageSize, currentPage, query)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      setCampaignList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      setTotal(res.data?.total || 0)
    }
  };


  const onSortChange = (value: string) => {
    // todo 有bug
    if (value === 'createdTime'){
      setOrder('0')
      initList()
    }
    if (value === 'updatedTime'){
      setOrder('1')
      initList()
    }
  };

  const pagination = {
    currentPage: currentPage,
    pageSize: pageSize,
    defaultCurrent: 1,
    total: total,
    onChange: onPageChange,
  }

  return <div className={campaignContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <span>Campaigns</span>
        </div>
        <Link href='/campaignEditor' className={newBtn}>New</Link>
      </div>
      <div className={content}>
        <div className={viewWrapper}>
          <div className={viewTitle}>List View</div>
          <div className={statusTitle}>View by Status</div>
          <div onClick={() => onStatusClick('')} className={classNames(statusItem, { [active]: status === '' })}>All</div>
          <div onClick={() => onStatusClick('1')} className={classNames(statusItem, { [active]: status === '1' })}>Ongoing</div>
          <div onClick={() => onStatusClick('0')} className={classNames(statusItem, { [active]: status === '0' })}>Draft</div>
          <div onClick={() => onStatusClick('2')} className={classNames(statusItem, { [active]: status === '2' })}>Completed</div>
        </div>
        <div className={listWrapper}>
          {/*<div className={listTitle}>Your audience has 2 contacts.2 of these are subscribers.</div>*/}
          <div className={filterWrapper}>
            <Input.Search
              placeholder="Find By Name"
              onSearch={onSearch}
              className={searchInput}
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <div className={sortWrapper}>
              <span>Sort by</span>
              <Select
                className={selector}
                defaultValue="Created Time"
                style={{ width: 140 }}
                onChange={onSortChange}
                options={[
                  { value: 'createdTime', label: 'Created Time' },
                  { value: 'updatedTime', label: 'Updated Time' },
                ]}
              />
            </div>
          </div>
          <div className={listBox}>
            <Table
                dataSource={campaignList}
                pagination={pagination}
                rowKey="id"
                showHeader={false} // 隐藏表头
                columns={[ // 定义表格列
                  {
                    dataIndex: 'campaignName',
                    key: 'campaignName',
                    render: (text, record) => (
                        <div className={listItem}>
                          <div className={listLeft}>
                            <ImgWrapper src='/img/list_item_icon.png' alt='list item' className={listIcon} />
                            <div className={itemDescBox}>
                              <div className={itemTitle}>{record.campaignName}</div>
                              <div className={itemDescText}>{record.updateTime} by you</div>
                            </div>
                          </div>
                          <div className={listCenter}>
                            <div className={draftStatus}>
                              {record.status === 0 ? 'Draft' : (record.status === 1 ? 'Ongoing' : 'Completed')}
                            </div>
                          </div>
                          <div className={listRight}>
                            <Link href={`/campaignEditor?id=${record.id}`} className={editBtn}>Edit</Link>
                          </div>
                        </div>
                    ),
                  },
                ]}
            />

          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Campaign;
