'use client'

import ImgWrapper from '@/component/ImgWrapper';
import styles from './index.module.scss';
import {Select, message, Button} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getContactCapacityList, getPlanByContactCapacity } from '@/server/plan';
import { SUCCESS_CODE } from '@/constant/common';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import { payCancel } from '@/server/payment';
import {getToken} from "@/util/storage";


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
  const [options, setOptions] = useState<{ value: string, label: string }[]>([])
  const [plans, setPlans] = useState<Plan.PlanItem[]>([])
  const [selecteNum, setSelectedNum] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

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

  const initContactList = useCallback(async () => {
    message.loading({ content: 'loading', duration: 10, key: 'loading' })
    const res = await getContactCapacityList()
    message.destroy('loading')
    if (res.code === SUCCESS_CODE && res.data && res.data.length) {
      const newOptions = res.data.map((item: number) => ({ value: String(item), label: String(item) }))
      setOptions(newOptions)
      setSelectedNum(newOptions[0]?.value || 0)
      initPlans(res.data[0])
    } else {
      message.error(res.message)
    }
  }, [])

  useEffect(() => {
    initContactList()
    initPayCancel()
  }, [initContactList, initPayCancel])

  const initPlans = async (num: number) => {
    const res = await getPlanByContactCapacity(num)
    if (res.code === SUCCESS_CODE) {
      setPlans(res.data)
    } else {
      message.error(res.message)
    }
  }

  const onNumSelect = (value: string) => {
    setSelectedNum(Number(value))
    initPlans(Number(value))
  };

  const onCurrencySelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onBuyClick = (value: number) => {
    const token = getToken()
    if (token.length > 0){
      router.push(`/payment?id=${value}`)
    }else {
      router.push("/login")
    }
  }

  return <div className={priceListContainer}>
    <div className={filterBox}>
      <div className={left}>
        <div className={label}>How many contacts do you have?</div>
        <div className={value}>
          <Select
            className={numSelector}
            value={String(selecteNum)}
            onChange={onNumSelect}
            options={options}
          />
        </div>
      </div>
      <div className={timeSelector}>
        <Select
            className={currencySelector}
            defaultValue="Monthly"
            onChange={onCurrencySelect}
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
            onChange={onCurrencySelect}
            options={[
              { value: '$USD', label: 'USD' },
              { value: '¥CNY', label: 'CNY' },
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
            <div className={value}>{item.price}</div>
          </div>
          <div className={tip}>{nameMapFunction[item.name]?.userNum} {item.name === 'Premium' ? 'users' : `user${nameMapFunction[item.name]?.userNum === 1 ? '' : 's'}`}</div>
          <div className={tip}>{item.name === 'Premium' ? 'Unlimited Monthly Email Sends' : `${item.emailCapacity} Monthly Email Sends`}</div>
          <div className={tip}>{nameMapFunction[item.name]?.customerSupport}</div>
          {/*<Link href={`/payment?id=${item.id}`} className={payBtn}>{item.name === 'Free' ? 'Sign Up' : 'Buy Now'}</Link>*/}
          <Button onClick={() => onBuyClick(item.id)} className={payBtn}>{item.name === 'Free' ? 'Sign Up' : 'Buy Now'}</Button>
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