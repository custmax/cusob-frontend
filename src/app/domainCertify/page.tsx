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
import Table from "@/component/Table";



const {
  domainCertifyContainer,
  main,
  title,

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
          <Table/>
    </div>
  </div>
};

export default DomainCertify;
