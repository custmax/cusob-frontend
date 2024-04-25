'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {Input, message, Select} from 'antd';
import {useCallback, useEffect, useRef, useState} from "react";
import {SUCCESS_CODE} from "@/constant/common";
import copy from 'copy-to-clipboard';
import {getDkim} from "@/server/dkim";
import {domainVerify} from "@/server/domain";
import {SPF_VALUE} from "@/constant/cusob"
import {useRouter, useSearchParams} from "next/navigation";



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
  const [domain, setDomain] = useState('')
  const [dkimValue, setDkimValue] = useState<string>('')
  const [selector, setSelector] = useState('')
  const searchParams = useSearchParams()
  const domainValue = searchParams.get("domain")

  const router = useRouter();

  const initDomain = useCallback(() => {
    if (domainValue) {
      setDomain(domainValue)
      initDkim(domainValue)
    }
  }, [domainValue])

  const initDkim = useCallback(async (domain: string) => {
    const res = await getDkim(domain)
    if (res.code === SUCCESS_CODE && res.data) {
      setDkimValue(res.data.publicKey)
      setSelector(res.data.selector)
    }
  }, [])

  const handleCopy = (value: string) => {
    copy(value)
    message.success("Copy Success")
  }

  const handleDomainVerify = async (domain: string) => {
    message.loading({content: 'loading', duration: 10, key: 'listLoading'})
    const res = await domainVerify(domain)
    message.destroy('listLoading')
    if (res.code === SUCCESS_CODE && res.data) {
      router.push("/senderList")
    }
  }

  useEffect(() => {
    initDomain()
  }, [initDomain]);

  return <div className={domainCertifyContainer}>
    <EnteredHeader/>
    <SideBar/>
    <div className={main}>
      <div className={title}>Domain Auth For {domain}</div>
      {/*<div className={addressWrapper}>*/}
      {/*  <div className={addressBox}>*/}
      {/*    <div className={addressItem}>*/}
      {/*      <div className={label}>Add Sender Address</div>*/}
      {/*      /!*<Input className={addressInput} placeholder='Enter email address'/>*!/*/}
      {/*      <Select*/}
      {/*          className={addressInput}*/}
      {/*          onChange={handleChange}*/}
      {/*          // options={senderListRef.current}*/}
      {/*          options={[*/}
      {/*            {*/}
      {/*              value: 'daybreak@chtrak.com',*/}
      {/*              label: 'daybreak@chtrak.com',*/}
      {/*            },*/}
      {/*          ]}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className={addressTip}>Enter a maximum of 5 sender email addresses and Press ENTER after each address.</div>*/}
      {/*    <div className={addressBtn}>Auto. Domain Verifcation</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={addressWrapper}>
        <div className={spfBox}>
          <div className={spfTitle}>Copy the SPF record shown below and publish it in your domain DNS</div>
          <div className={hostName}>
            <span className={label}>Host Name to add</span>
            {/*<span>{domain}</span>*/}
            <span className={domainBind}>{domain}</span>
          </div>
          <div className={txtRecord}>
            <div className={label}>TXT Record to add</div>
            <Input className={txtInput} value={SPF_VALUE}/>
            <div className={copyBtn} onClick={() => {
              handleCopy(SPF_VALUE)
            }}>Copy
            </div>
          </div>
          <div className={spfTip}>If you have an existing SPF record for your domain, add include:zcsend.net after
            v=spF1. Example: v=spf1include:zcsend.net.
          </div>
        </div>
      </div>
      <div className={addressWrapper}>
        <div className={DKIMBox}>
          <div className={DKIMTitle}>Copy the DKlM record shown below and pubish it in your domain DNS</div>
          <div className={hostName}>
            <span className={label}>Host Name to add</span>
            <span className={domainBind}>{selector}._domainkey.{domain}</span>
          </div>
          <div className={txtRecord}>
            <div className={label}>TXT Record to add</div>
            <Input className={txtInput} value={dkimValue}/>
            <div className={copyBtn} onClick={() => {
              handleCopy(dkimValue)
            }}>Copy
            </div>
          </div>
          <div className={operateBox}>
            <div className={share}>Share with your IT admin</div>
            <div onClick={() => {
              handleDomainVerify(domain)
            }} className={verify}>Verify
            </div>
            <div className={later}>I&#39;ll verify later</div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default DomainCertify;
