'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import ImgWrapper from '@/component/ImgWrapper';
import Link from 'next/link';
import { Table, TableProps, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getOrderHistory } from '@/server/orderHistory';
import { SUCCESS_CODE } from '@/constant/common';

type DataType = Order.orderHistory & { key: number }

const {
  billingHistoryContainer,
  main,
  title,
  content,
  historyIcon,
  emptyText,
  emptyTip,
  link,
} = styles;

const pageSize = 10;

const BillingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyList, setHistoryList] = useState([])


  const initOrderHistory = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const res = await getOrderHistory(currentPage, pageSize)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      setHistoryList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    initOrderHistory()
  }, [initOrderHistory])
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (_item, record) => <div>
        <div>Contacts: {record.contactCapacity}</div>
        <div>Sends: {record.emailCapacity}</div>
      </div>
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (_item, record) => <div>
        <div>US${record.totalAmount}</div>
      </div>
    },
    {
      title: 'Create time',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return <div className={billingHistoryContainer}>
    <EnteredHeader />
    <div className={main}>
      <div className={title}>Billing history</div>
      {
        historyList.length
          ? <Table
            columns={columns}
            dataSource={historyList}
            pagination={{ pageSize: 8 }}
          />
          : <div className={content}>
              <ImgWrapper className={historyIcon} src='/img/history_icon.png' alt='history icon' />
              <div className={emptyText}>You don&#39;t have any billing history</div>
              <div className={emptyTip}>
                <span>If you </span>
                <Link className={link} href='/account'>upgrade to a paid account</Link>
                <span> or </span>
                <Link className={link} href='/account'>purchase monthly credits,</Link>
                <span> you&#39;ll see a history of your payments here.</span>
              </div>
          </div>
      }
    </div>
  </div>
};

export default BillingHistory;
