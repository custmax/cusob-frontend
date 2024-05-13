'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import ImgWrapper from '@/component/ImgWrapper';
import { Radio } from 'antd';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {CONTACT_TEMPLATE} from '@/constant/cusob'

const {
  importWayContainer,
  main,
  title,
  titleLeft,
  exitBtn,
  content,
  contentTitle,
  titleText,
  continueBtn,
  wayWrapper,
  wayBox,
  active,
  radioBox,
  icon,
  radio,
  explain,
  sample,
} = styles;

const ImportWay = () => {
  const router = useRouter()
  const [way, setWay] = useState('')

  const onExit = () => {
    router.back()
  }

  const onWayBoxClick = (val: string) => {
    setWay(val)
  }

  const onContinue = () => {
    if (way === 'another') {
      router.push('/importAuto')
    }
    if (way === 'upload') {
      router.push('/importFile')
    }
    if (way === 'copy') {
      router.push('/contactEditor')
    }
  }

  const onSampleClick = () => {
    const a = document.createElement('a');
    a.download = 'Sample File';
    a.href = CONTACT_TEMPLATE;
    a.click();
  }

  return <div className={importWayContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <span>Contacts</span>
          <span style={{ margin: '0 0.5em', color: '#666' }}>/</span>
          <span style={{ color: '#999999' }}>Add a contact</span>
        </div>
        <div className={exitBtn} onClick={onExit}>Exit</div>
      </div>
      <div className={content}>
        <div className={contentTitle}>
          <div className={titleText}>How would you like to add contacts?</div>
          <div className={continueBtn} onClick={onContinue}>Continue</div>
        </div>
        <div className={wayWrapper}>
          {/*<div onClick={() => onWayBoxClick('another')} className={classNames(wayBox, { [active]: way === 'another' })}>*/}
          {/*  <div className={radioBox}>*/}
          {/*    <ImgWrapper className={icon} src='/img/download_icon.png' alt='download icon' />*/}
          {/*    <Radio checked={way === 'another'} className={radio} />*/}
          {/*  </div>*/}
          {/*  <div className={explain}>import from another service</div>*/}
          {/*</div>*/}
          <div onClick={() => onWayBoxClick('upload')} className={classNames(wayBox, { [active]: way === 'upload' })}>
            <div className={radioBox}>
              <ImgWrapper className={icon} src='/img/upload_icon.png' alt='upload icon' />
              <Radio checked={way === 'upload'} className={radio} />
            </div>
            <div className={explain}>Upload a file</div>
            <div onClick={onSampleClick} className={sample}>Sample file</div>
          </div>
          {/*<div onClick={() => onWayBoxClick('copy')} className={classNames(wayBox, { [active]: way === 'copy' })}>*/}
          {/*  <div className={radioBox}>*/}
          {/*    <ImgWrapper className={icon} src='/img/copy_icon.png' alt='copy icon' />*/}
          {/*    <Radio checked={way === 'copy'} className={radio} />*/}
          {/*  </div>*/}
          {/*  <div className={explain}>Copy and paste</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  </div>
};

export default ImportWay;
