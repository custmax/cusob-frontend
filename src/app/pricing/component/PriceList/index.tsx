'use client'

import ImgWrapper from '@/component/ImgWrapper';
import styles from './index.module.scss';
import {Select, message, Button} from 'antd';
import { useCallback, useEffect, useState } from 'react';
// import { getContactCapacityList, getPlanByContactCapacity } from '@/server/plan';
import { SUCCESS_CODE } from '@/constant/common';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import { payCancel } from '@/server/payment';
import {getToken} from "@/util/storage";
import {getPriceList, getContactCapacityList} from "@/server/price";
import {number} from "prop-types";


const {
  priceListContainer,
  filterBox,
  left,
  timeSelector,
  right,
  label,
  value,
  numSelector,
  currencySelector,
  priceCardList,
  priceCard,
  title,
  moneyBox,
  tip,
  payBtn,
  btnDisable,
  line,
  rightList,
  rightItem,
  tickIcon,
  rightText,
} = styles;

const nameMapFunction: Record<string, { userNum: number | string, customerSupport: string }> = {
  'Free': {
    userNum: 1,
    customerSupport: 'Email support for first 30 days',
  },
  'Essentials': {
    userNum: 5,
    customerSupport: '24/7 Email & Chat Support',
  },
  'Standard': {
    userNum: 10,
    customerSupport: '24/7 Email & Chat Support',
  },
  'Premium': {
    userNum: 'Unlimited',
    customerSupport: 'Phone & Priority Support',
  }
}

const PriceList = () => {
  const [plans, setPlans] = useState<Price.PriceItem[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [contactCapacity, setContactCapacity] = useState(1000)
  const [months, setMonths] = useState(1)
  const [currency, setCurrency] = useState(0)
  const [capacityList, setCapacityList] = useState<{value: number, label:number}[]>([])

  const initPriceList = async () => {
    message.loading({ content: 'loading', duration: 10, key: 'loading' })
    const res = await getPriceList(contactCapacity, months, currency)
    message.destroy('loading')
    if (res.code === SUCCESS_CODE && res.data && res.data.length) {
      setPlans(res.data)

    }
  }

  const initContactCapacity = async () =>{
    const res = await getContactCapacityList()
    if (res.code === SUCCESS_CODE && res.data && res.data.length){
      const newOptions = res.data.map((item: number) => ({value: item, label: item}))
      setCapacityList(newOptions)
    }
  }

  const initPayCancel = useCallback(async () => {
    if (type === 'cancelPay') {
      const res = await payCancel()
      if (res.code === SUCCESS_CODE) {
        window.location.replace("/pricing");
      } else {
        message.error(res.message)
      }
    }
  }, [type])

  useEffect(() => {
    initContactCapacity()
    initPayCancel()
    initPriceList()
  }, [initPayCancel])

  // capacity
  const onNumSelect = async (value: number) => {
    setContactCapacity(value)
    message.loading({ content: 'loading', duration: 10, key: 'loading' })
    const res = await getPriceList(value, months, currency)
    if (res.code === SUCCESS_CODE && res.data && res.data.length) {
      setPlans(res.data)
    }
    message.destroy('loading')
  };

  const onMonthsChange = async (value: string) => {
    message.loading({ content: 'loading', duration: 10, key: 'loading' })
    if (value === 'Monthly'){
      setMonths(1)
      const res = await getPriceList(contactCapacity, 1, currency)
      if (res.code === SUCCESS_CODE && res.data && res.data.length) {
        setPlans(res.data)
      }
    }else {
      setMonths(12)
      const res = await getPriceList(contactCapacity, 12, currency)
      if (res.code === SUCCESS_CODE && res.data && res.data.length) {
        setPlans(res.data)
      }
    }
    message.destroy('loading')
  }

  const onBuyClick = (value: number) => {
    const token = getToken()
    if (token.length > 0){
      router.push(`/payment?id=${value}`)
    }else {
      router.push("/login")
    }
  }

  const contactCapacityString = contactCapacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const contactCapacityLength = contactCapacityString.length;
  const insertPosition = contactCapacityLength - 3;
  // @ts-ignore
  const formattedStringWithComma = `${contactCapacityString.slice(0, insertPosition)}${contactCapacityString.slice(insertPosition)}`;

  return <div className={priceListContainer}>
    <div className={filterBox}>
      <div className={left}>
        <div className={label}>How many contacts do you have?</div>
        <div className={value}>
          <Select
            className={numSelector}
            value={contactCapacity}
            onChange={onNumSelect}
            options={capacityList}
          />
        </div>
      </div>
      <div className={timeSelector}>
        <Select
            className={currencySelector}
            defaultValue='Monthly'
            onChange={onMonthsChange}
            options={[
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Yearly', label: 'Yearly' },
            ]}
        />
      </div>
      <div className={right}>
          <Select
            className={currencySelector}
            defaultValue="USD"
            // onChange={onCurrencySelect}
            options={[
              { value: 0, label: 'USD' },
              // { value: 1, label: 'EUR' },
              // { value: 2, label: 'HKD' },
              // { value: 3, label: 'JPY' },
            ]}
          />
      </div>
    </div>
    <div className={priceCardList}>
      {
        plans.map((item, index) => <div className={priceCard} key={index}>
          <div className={title}>{item.name}</div>
          <div className={moneyBox}>
            <div className={label}>US$</div>
            <div className={value}>{item.amountUSD}</div>
          </div>
          <div className={tip}>{nameMapFunction[item.name]?.userNum} {item.name === 'Premium' ? 'users' : `user${nameMapFunction[item.name]?.userNum === 1 ? '' : 's'}`}</div>
          <div className={tip}>{formattedStringWithComma+' contacts'}</div>
          <div className={tip}>{item.name === 'Premium' ? 'Unlimited Monthly Email Sends' : `${item.emailCapacity} Monthly Email Sends`}</div>
          <div className={tip}>{nameMapFunction[item.name]?.customerSupport}</div>
          <Button disabled={item.isAvailable === 0} onClick={() => onBuyClick(item.id)} className={item.isAvailable===1?payBtn:btnDisable}>{item.name === 'Free' ? 'Sign Up' : 'Buy Now'}</Button>
          <div className={line}></div>
          <div className={rightList}>
            <div className={rightItem}>
              {
                item.name === 'Free'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Remove Cusob Branding</span>
            </div>
            <div className={rightItem}>
              {
                item.name === 'Free'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Email Scheduling</span>
            </div>
            <div className={rightItem}>
              {
                item.name === 'Free'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Pre-built Email Templates</span>
            </div>
            <div className={rightItem}>
              {
                item.name === 'Free' || item.name === 'Essentials'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Reporting & Analytics</span>
            </div>
            <div className={rightItem}>
              {
                item.name === 'Free' || item.name === 'Essentials'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Send Time Optimization</span>
            </div>
            <div className={rightItem}>
              {
                item.name === 'Free' || item.name === 'Essentials'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Content Optimizer</span>
            </div>
            <div className={rightItem}>
              {
                item.name !== 'Premium'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Generative AI Features</span>
            </div>
            <div className={rightItem}>
              {
                item.name !== 'Premium'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Big data support</span>
            </div>
            <div className={rightItem}>
              {
                item.name !== 'Premium'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Dedicated IP</span>
            </div>
            <div className={rightItem}>
              {
                item.name !== 'Premium'
                  ? <ImgWrapper className={tickIcon} alt='world' src='/img/slash.png'/>
                  : <ImgWrapper className={tickIcon} alt='world' src='/img/tick_icon.png'/>
              }
              <span className={rightText}>Personalized Onboarding</span>
            </div>
          </div>
        </div>)
      }
    </div>
  </div>
};

export default PriceList;