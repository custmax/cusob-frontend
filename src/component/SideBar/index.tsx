"use client";
import styles from './index.module.scss';
import ImgWrapper from '../ImgWrapper';
import Link from 'next/link';
import {useEffect, useState} from "react";
import classNames from "classnames";
import {message} from "antd";
import {getCampaignPage} from "@/server/campaign";
import {SUCCESS_CODE} from "@/constant/common";

const {
  sideBarContainer,
  scrollWrapper,
  barItem,
  barIcon,
  senderIcon,
  barText,
  generateButton,
  active,

} = styles;

const SideBar = () => {
  const [responseText, setResponseText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const savedStatus = localStorage.getItem('sidebarStatus');
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, []);

  const handleGenerateClick = async () => {
    const payload = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "写一封生日邮件", // 替换为你想要传递的内容
        },
      ],
    });

    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer sk-s4m3t5mPXE6FRbvr487f6dC27e5343029120819e52C500E9',
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('https://api.lmtchina.com/v1/chat/completions', {
        method: 'POST',
        headers,
        body: payload,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseText(data.choices[0].message.content); // 假设API返回数据格式为{ choices: [{ message: { content: '...' }}]}
        setShowModal(true);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const onStatusClick = async (val: string) => {
    setStatus(val)
    localStorage.setItem('sidebarStatus', val);
    console.log("11111:",status)
  };
  return <div className={sideBarContainer}>
    <div className={scrollWrapper}>
      <Link href='/dashboard' onClick={() => onStatusClick('0')} className={classNames(barItem, { [active]: status === '0' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon0.png' alt='bar icon'/>
        <div className={barText}>Dashboard</div>
      </Link>
      <Link href='/contactList' onClick={() => onStatusClick('1')} className={classNames(barItem, { [active]: status === '1' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon1.png' alt='bar icon'/>
        <div className={barText}>Contacts</div>
      </Link>
      <Link href='/emailTemplates' onClick={() => onStatusClick('2')} className={classNames(barItem, { [active]: status === '2' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon2.png' alt='bar icon'/>
        <div className={barText}>Templates</div>
      </Link>
      {/*<Link href='/media' className={barItem}>*/}
      {/*  <ImgWrapper className={barIcon} src='/img/bar_icon3.png' alt='bar icon'/>*/}
      {/*  <div className={barText}>Media</div>*/}
      {/*</Link>*/}
      <Link href='/campaign' onClick={() => onStatusClick('3')} className={classNames(barItem, { [active]: status === '3' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon4.png' alt='bar icon'/>
        <div className={barText}>Campaign</div>
      </Link>
      <Link href='/reports' onClick={() => onStatusClick('4')} className={classNames(barItem, { [active]: status === '4' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon5.png' alt='bar icon'/>
        <div className={barText}>Reports</div>
      </Link>
      <Link href='/account' onClick={() => onStatusClick('5')} className={classNames(barItem, { [active]: status === '5' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon6.png' alt='bar icon'/>
        <div className={barText}>Account</div>
      </Link>
      <Link href='/addSender' onClick={() => onStatusClick('6')} className={classNames(barItem, { [active]: status === '6' })}>
        <ImgWrapper className={barIcon} src='/img/bar_icon7.png' alt='bar icon'/>
        <div className={barText}>Sender</div>
      </Link>
      {/*<button className={barItem} onClick={handleGenerateClick}>Generate</button>*/}
      {/*<Link href='/emailList' className={barItem}>*/}
      {/*  <ImgWrapper className={senderIcon} src='/img/sender.png' alt='bar icon' />*/}
      {/*  <div className={barText}>Sender</div>*/}
      {/*</Link>*/}
    </div>
    {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{responseText}</p>
          </div>
        </div>
    )}
  </div>
};

export default SideBar;