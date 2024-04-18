'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {Input, message, Select} from 'antd';
import {useCallback, useEffect, useRef, useState} from "react";
import {getSenderList} from "@/server/sender";
import {SUCCESS_CODE} from "@/constant/common";
import copy from 'copy-to-clipboard';
import {getPublicKey} from "@/server/dkim";
import {domainVerify} from "@/server/domain";
import {SPF_VALUE} from "@/constant/cusob"

const {
  domainCertifyContainer,
  main,
  title,
  addressWrapper,
  addressBox,
  addressItem,
  label,
  addressInput,
  addressTip,
  addressBtn,
  spfBox,
  spfTitle,
  hostName,
  txtRecord,
  txtInput,
  copyBtn,
  spfTip,
  DKIMBox,
  DKIMTitle,
  operateBox,
  share,
  verify,
  later,
  domainBind
} = styles;

const DomainCertify = () => {
  const senderListRef = useRef<{ value: number, label: string }[]>([])
  const [senderEmail, setSenderEmail] = useState('')
  const [domain, setDomain] = useState('daybreakhust.top')
  const [dkimValue, setDkimValue] = useState<string>('')

  const initSender = useCallback(async () => {
    const res = await getSenderList()
    if (res.code === SUCCESS_CODE && res.data) {
      const newSenderList = res.data.map((item: {email: string }) => ({
        value: item.email,
        label: item.email
      }))
      senderListRef.current = newSenderList
    }
  }, [])

  const initPublicKey = useCallback(async () =>{
    const res = await getPublicKey(domain)
    if (res.code === SUCCESS_CODE && res.data) {
      setDkimValue(res.data)
    }
  }, [])

  const handleCopy = (value:string) => {
    copy(value)
    message.success("Copy Success")
  }

  const handleChange = (value:string) => {
    setSenderEmail(value)
    setDomain(value.substring(value.lastIndexOf("@")+1, value.length))
  }

  const handleDomainVerify = async (value: string) => {
    // TODO 前后端传值有bug
    const emailToVerify = "ming@daybreakhust.top"
    const res= await domainVerify(emailToVerify)
    console.log(res.code)
    if (res.code === SUCCESS_CODE && res.data) {
      console.log(res.data)
    }
  }

  useEffect(() => {
    initSender()
    initPublicKey()
  }, []);

  return <div className={domainCertifyContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>Domain Auth.</div>
      <div className={addressWrapper}>
        <div className={addressBox}>
          <div className={addressItem}>
            <div className={label}>Add Sender Address</div>
            {/*<Input className={addressInput} placeholder='Enter email address'/>*/}
            <Select
                className={addressInput}
                onChange={handleChange}
                // options={senderListRef.current}
                options={[
                  {
                    value: 'daybreak@chtrak.com',
                    label: 'daybreak@chtrak.com',
                  },
                ]}
            />
          </div>
          {/*<div className={addressTip}>Enter a maximum of 5 sender email addresses and Press ENTER after each address.</div>*/}
          {/*<div className={addressBtn}>Auto. Domain Verifcation</div>*/}
        </div>
      </div>
      <div className={addressWrapper}>
        <div className={spfBox}>
          <div className={spfTitle}>Copy the SPF record shown below and publish it in your domain DNS</div>
          <div className={hostName}>
            <span className={label}>Host Name to add</span>
            {/*<span>{domain}</span>*/}
            <span className={domainBind}>chtrak.com</span>
          </div>
          <div className={txtRecord}>
            <div className={label}>TXT Record to add</div>
            <Input className={txtInput} value={SPF_VALUE} />
            <div className={copyBtn} onClick={() => {handleCopy(SPF_VALUE)}}>Copy</div>
          </div>
          <div className={spfTip}>If you have an existing SPF record for your domain, add include:zcsend.net after v=spF1. Example: v=spf1include:zcsend.net.</div>
        </div>
      </div>
      <div className={addressWrapper}>
        <div className={DKIMBox}>
          <div className={DKIMTitle}>Copy the DKlM record shown below and pubish it in your domain DNS</div>
          <div className={hostName}>
            <span className={label}>Host Name to add</span>
            <span className={domainBind}>16141._domainkey.daybreakhust.top</span>
          </div>
          <div className={txtRecord}>
            <div className={label}>TXT Record to add</div>
            <Input className={txtInput} value={dkimValue} />
            <div className={copyBtn} onClick={() => {handleCopy(dkimValue)}}>Copy</div>
          </div>
          <div className={operateBox}>
            <div className={share}>Share with your IT admin</div>
            <div onClick={() => {handleDomainVerify(senderEmail)}} className={verify}>Verify</div>
            <div className={later}>I&#39;ll verify later</div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default DomainCertify;
