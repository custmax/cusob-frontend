'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {Input, Table, TableProps, message, PaginationProps} from 'antd';
import ImgWrapper from '@/component/ImgWrapper';
import { useCallback, useEffect, useState } from 'react';
import {getReportList, getSenderName} from '@/server/report';
import { SUCCESS_CODE } from '@/constant/common';
import emailStatistics from "@/server/mailgun/emailStatistics";

type DataType = Report.ReportItem & { key: string }

const {
  reportsContainer,
  main,
  title,
  titleLeft,
  operateBox,
  searchInputBox,
  searchInput,
  searchIconBox,
  searchIcon,
  content,
  listTable,
  campaignBox,
  campaignIcon,
  projectName,
} = styles;


const pageSize = 10;

const Reports = () => {
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [reportList, setReportList] = useState<DataType[]>([])
  const [searchVal, setSearchVal] = useState('');

  const initList = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const res = await getReportList(currentPage, pageSize)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      setReportList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
      console.log(res.data?.records)
      setTotal(res.data?.total || 0)
    }
  }, [currentPage, pageSize])

  const onPageChange: PaginationProps['onChange'] = async (pageNumber:number) => {
    setCurrentPage(pageNumber)
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const res = await getReportList(pageNumber, pageSize)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      setReportList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
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

  useEffect(() => {
    initList();
  }, [])

  const onSearch = async () => {
    if (searchVal) {
      message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
      const res = await getReportList(1, pageSize, searchVal)
      message.destroy('listLoading')
      if (res.code === SUCCESS_CODE) {
        setReportList(res.data?.records.map((item: { id: number }) => ({ ...item, key: item.id })) || [])
        setSearchVal('')
        setCurrentPage(1)
      }
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      render: (item, record) => {
        return <div className={campaignBox}>
          <ImgWrapper src='/img/list_item_icon.png' alt='list icon' className={campaignIcon} />
          <div className={projectName}>{item}</div>
        </div>
      },
      align: 'center',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      align: 'center',
      render: (_item, record) => {
        return <div >{record.groupName}</div>
      }
      
    },
    {
      title: 'Last Modified',
      dataIndex: 'sendTime',
      key: 'sendTime',
      align: 'center',
    },
    {
      title: 'Status Analysis',
      dataIndex: 'statusAnalysis',
      key: 'statusAnalysis',
      align: 'center',
      render: (_item, record) => <div>
        <span>delivered: {record.delivered}</span>
        <span style={{ padding: '0 1em' }}>opened: {record.opened}</span>
        <span >clicked: {record.clicked}</span>
        <span style={{ padding: '0 1em' }}>bounce: {record.clicked}</span>
        <span >unsubscribe: {record.clicked}</span>
      </div>
    },
  ];

  return <div className={reportsContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <span>Reports</span>
        </div>
        <div className={operateBox}>
          <div className={searchInputBox}>
            <Input className={searchInput} value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder='Search' />
            <div className={searchIconBox} onClick={onSearch}>
              <ImgWrapper className={searchIcon} src='/img/search_icon.png' alt='search icon'  />
            </div>
          </div>
        </div>
      </div>
      <div className={content}>
        <Table<DataType>
          className={listTable}
          columns={columns}
          dataSource={reportList}
          pagination={pagination}
        />
      </div>
    </div>
  </div>
};



export default Reports;
