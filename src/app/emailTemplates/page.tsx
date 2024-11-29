'use client';
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import { Input, Select, message } from 'antd';
import ImgWrapper from '@/component/ImgWrapper';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFolderList, getTemplateList } from '@/server/template';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';

const {
  emailTemplatesContainer,
  main,
  title,
  titleLeft,
  operateBox,
  searchInputBox,
  searchInput,
  searchIconBox,
  searchIcon,
  newBtn,
  content,
  filterBox,
  templateWrapper,
  templateTitle,
  itemWrapper,
  itemBox,
  cover,
  text,
} = styles;

const EmailTemplates = () => {
  const router = useRouter()
  const [templateList, setTemplateList] = useState<{ folder: string, list: Template.TemplateNew[] }[]>([])
  const [searchVal, setSearchVal] = useState('');
  const [selectOptions, setSelectOptions] = useState([{ value: 'all', label: 'All' }])

  useEffect(() => {
    initList();
    initFolderList()
  }, [])

  const initList = async () => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    const query = { folder: "all" }
    const res = await getTemplateList(query)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      const data = res.data

      const newTemplateList = []
      if (data) {
        for (const key in data) {
          newTemplateList.push({
            folder: key,
            list: data[key]
          })
        }
        setTemplateList(newTemplateList)
      }
    }
  }

  const initFolderList = async () => {
    // const res = await getFolderList()
    // if (res.code === SUCCESS_CODE) {
    //   const newSelectOptions = res.data.map((item: string) => ({ value: item, label: item }))
    //   newSelectOptions.unshift({ value: 'all', label: 'All' })
    //   setSelectOptions(newSelectOptions)
    // }
    //   todo 此处由于只有那些folder，硬编码
    const tempSelectOptions = [];
    tempSelectOptions.unshift({value: 'all', label: 'All'})
    tempSelectOptions.push({value: 'personal', label: 'Personal'})
    tempSelectOptions.push({value: 'welcome', label: 'Welcome'})
    tempSelectOptions.push({value: 'seasons', label: 'Seasons'})
    tempSelectOptions.push({value: 'dealsAndOffers', label: 'Deals & Offers'})
    setSelectOptions(tempSelectOptions)
  }

  const onSelectChange = async (value: string) => {
    message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
    // folder 如果为all，则传入一个空值，进行全查询
    const query = { folder: value === 'all' ? '' : value, keyword: searchVal || ''  }
    const res = await getTemplateList(query)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE) {
      const data = res.data
      const newTemplateList = []
      if (data) {
        for (const key in data) {
          newTemplateList.push({
            folder: key,
            list: data[key]
          })
        }
        setTemplateList(newTemplateList)
      }
    }
  };

  const onSearch = async () => {
    if (searchVal) {
      message.loading({ content: 'loading', duration: 10, key: 'listLoading' })
      const query = { keyword: searchVal }
      const res = await getTemplateList(query)
      message.destroy('listLoading')
      if (res.code === SUCCESS_CODE) {
        const data = res.data
        const newTemplateList = []
        if (data) {
          for (const key in data) {
            newTemplateList.push({
              folder: key,
              list: data[key]
            })
          }
          setTemplateList(newTemplateList)
        }
        setSearchVal('')
      }
    }
  }

  return <div className={emailTemplatesContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <span>Email template</span>
        </div>
        <div className={operateBox}>
          <div className={searchInputBox}>
            <Input className={searchInput} value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder='Search' />
            <div className={searchIconBox} onClick={onSearch}>
              <ImgWrapper className={searchIcon} src='/img/search_icon.png' alt='search icon'  />
            </div>
          </div>
          <Link href='/editTemplate' className={newBtn}>New template</Link>
        </div>
      </div>
      <div className={content}>
        <div className={filterBox}>
          <Select
              defaultValue="all"
              style={{ width: "226px" }}
              onChange={onSelectChange}
              options={selectOptions}
          />
        </div>
        {
          templateList.map((item, index) => <div key={index} className={templateWrapper}>
            <div className={templateTitle}>{item.folder}</div>
            <div className={itemWrapper}>
              {item.list.map((i, idx) => <div key={idx} onClick={() => router.push(`/editTemplate?id=${i.id}`)} className={itemBox}>
                <div className={cover}>这是封面</div>
                <div className={text}>{i.name}</div>
              </div>)}
            </div>
          </div>)
        }
      </div>
    </div>
  </div>
};

export default EmailTemplates;
