'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import ImgWrapper from '@/component/ImgWrapper';
import { Checkbox, DatePicker, DatePickerProps, Input, Modal, Radio, RadioChangeEvent, Select, TimePicker, TimePickerProps, message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import ContentModal from './component/ContentModal';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { getGroupList } from '@/server/group';
import { SUCCESS_CODE } from '@/constant/common';
import {getCampaign, getEmailList, saveDraft, sendEmail, updateCampaign} from '@/server/campaign';
import { getSenderList } from '@/server/sender';
import {send} from "@/server/mailgunsend";

const {
  campaignEditorContainer,
  main,
  title,
  titleLeft,
  arrowLeft,
  back,
  draftBtn,
  exitBtn,
  content,
  contentTitle,
  subTitle,
  mainProcess,
  processItem,
  processLeft,
  radio,
  processDesc,
  desc,
  processRight,
  trackWrapper,
  trackTitle,
  trackList,
  trackItem,
  trackText,
  sendWrapper,
  sendBtn,
  toModal,
  toContent,
  label,
  value,
  campaignNameModal,
  subjectModal,
  subjectContent,
  inputItem,
  fromModal,
  fromContent,
  addSender,
  sendModal,
  sendContent,
  header,
  headerLeft,
  headerRight,
  headerTitle,
  headerContent,
  radioWrapper,
  radioLabel,
  timeWrapper,
  timeLabel,
  timeInput,
} = styles;

const CampaignEditor = () => {
  const senderListRef = useRef<{ value: number, label: string }[]>([])
  const [showTo, setShowTo] = useState<boolean>(false)
  const [showCampaignName, setShowCampaignName] = useState<boolean>(false)
  const [campaignName, setCampaignName] = useState<string>('')
  const [showSubject, setShowSubject] = useState<boolean>(false)
  const [showSend, setShowSend] = useState<boolean>(false)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [showFrom, setShowFrom] = useState<boolean>(false)
  const router = useRouter()
  const [groupList, setGroupList] = useState<{ value: number, label: string }[]>([]);
  const [toGroup, setToGroup] = useState<number | undefined>()
  const [senderEmail, setSenderEmail] = useState('')
  // const [senderName, setSenderName] = useState('')
  const [subject, setSubject] = useState('')
  const [preText, setPreText] = useState('')
  const [richContent, setRichContent] = useState('')
  const [sendDate, setSendDate] = useState('')
  const [sendMinute, setSendMinute] = useState('')
  const [zone, setZone] = useState('beiJing')
  const [timeType, setTimeType] = useState()
  const [senderId, setSenderId] = useState<number>()

  const [trackClicks, setTrackClicks] = useState<boolean>(false)
  const [trackLink, setTrackLink] = useState<boolean>(false)
  const [trackOpens, setTrackOpens] = useState<boolean>(false)
  const [trackTextClicks, setTrackTextClicks] = useState<boolean>(false)
  
  const searchParams = useSearchParams()
  const campaignId = searchParams.get('id')

  const [process, setProcess] = useState([
    { title: 'To', subTitle: '', checked: false },
    { title: 'From', subTitle: '', checked: false },
    { title: 'Subject', subTitle: '', checked: false },
    { title: 'Content', checked: false },
    { title: 'Send time', subTitle: '', checked: false },
  ])

  const initCampaign = useCallback(async (groupList: { value: number, label: string }[]) => {
    if (campaignId) {
      message.loading({ content: 'loading', duration: 10, key: 'loading' })
      const res = await getCampaign(campaignId)
      message.destroy('loading')
      if (res.code === SUCCESS_CODE && res.data) {
        setCampaignName(res.data.campaignName)
        setRichContent(res.data.content)
        setPreText(res.data.preText)
        setSendDate(dayjs(res.data.sendTime).format('YYYY-MM-DD'))
        setSendMinute(dayjs(res.data.sendTime).format('HH:mm:ss'))
        setSenderId(res.data.senderId)
        // setSenderEmail(res.data.senderEmail)
        // setSenderName(res.data.senderName)
        setSubject(res.data.subject)
        if (res.data.toGroup && res.data.toGroup > -1) setToGroup(res.data.toGroup);
        setTrackClicks(res.data.trackClicks)
        setTrackLink(res.data.trackLink)
        setTrackOpens(res.data.trackOpens)
        setTrackTextClicks(res.data.trackTextClicks)

        const newProcess = process.map((item) => {
          if (item.title === 'To') return ({
            ...item,
            subTitle: groupList.find(item => item.value === res.data.toGroup)?.label,
            checked: Boolean(res.data.toGroup && res.data.toGroup > -1),
          })
          if (item.title === 'From') return ({
            ...item,
            subTitle: senderListRef.current.find(item => item.value === res.data.senderId)?.label,
            checked: Boolean(res.data.senderId),
          })
          if (item.title === 'Subject') return ({
            ...item,
            subTitle: res.data.subject,
            checked: Boolean(res.data.subject),
          })
          if (item.title === 'Content') return ({
            ...item,
            checked: Boolean(res.data.content),
          })
          if (item.title === 'Send time') return ({
            ...item,
            checked: Boolean(res.data.sendTime),
          })
          return item
        })
        setProcess(newProcess)
      }
    }
  }, [campaignId])

  const initSender = useCallback(async () => {
    const res = await getSenderList()
    if (res.code === SUCCESS_CODE && res.data) {
      const newSenderList = res.data.map((item: { id: number, email: string }) => ({
        value: item.id,
        label: item.email
      }))
      senderListRef.current = newSenderList
    }
  }, [])

  const initGroupList = useCallback(async () => {
    const res = await getGroupList()
    if (res.code === SUCCESS_CODE) {
      await initSender()
      const newGroupList = res.data.map((item: { groupName: string, id: number }) => ({ value: item.id, label: item.groupName }))
      setGroupList(newGroupList)
      initCampaign(newGroupList)
    }
  }, [])

  useEffect(() => {
    initGroupList()
  }, [])

  const onCampaignNameOk = () => {
    setShowCampaignName(false)
  }

  const onCampaignNameCancel = () => {
    setShowCampaignName(false)
  }
  
  const onToOk = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'To') {
        return {
          ...item,
          subTitle: groupList.find(i => i.value === toGroup)?.label || '',
          checked: true
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowTo(false)
  }

  const onToCancel = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'To') {
        return {
          ...item,
          subTitle: '',
          checked: false
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowTo(false)
  }

  const onFromOk = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'From') {
        return {
          ...item,
          subTitle: senderListRef.current.find(item => item.value === senderId)?.label,
          checked: true
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowFrom(false)
  }

  const onFromCancel = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'From') {
        return {
          ...item,
          subTitle: '',
          checked: false,
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowFrom(false)
  }

  const onSubjectOk = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Subject') {
        return {
          ...item,
          subTitle: subject,
          checked: true
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowSubject(false)
  }

  const onSubjectCancel = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Subject') {
        return {
          ...item,
          subTitle: '',
          checked: false
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowSubject(false)
  }

  const onContentOk = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Content') {
        return {
          ...item,
          checked: true
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowContent(false)
  }

  const onContentCancel = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Content') {
        return {
          ...item,
          checked: false
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowContent(false)
  }

  const onSendTimeOk = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Send time') {
        return {
          ...item,
          subTitle: '',
          checked: true,
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowSend(false)
  }

  const onSendTimeCancel = () => {
    const newProcess = process.map((item, index) => {
      if (item.title === 'Send time') {
        return {
          ...item,
          subTitle: '',
          checked: false,
        }
      }
      return item
    })
    setProcess(newProcess)
    setShowSend(false)
  }

  const onDateChange: DatePickerProps['onChange'] = (val) => {
    setSendDate(dayjs(val).format('YYYY-MM-DD'))
  };

  const onTimeChange: TimePickerProps['onChange'] = (val) => {
    setSendMinute(dayjs(val).format('HH:mm:ss'))
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    if (e.target.value === 1) {
      const dateStr = Date.now()
      setSendDate(dayjs(dateStr).format('YYYY-MM-DD'))
      setSendMinute(dayjs(dateStr).format('HH:mm:ss'))
    }
    setTimeType(e.target.value)
  };


  const handleShow = (title: string) => {
    if (title === 'To') {
      setShowTo(true)
    }
    if (title === 'From') {
      setShowFrom(true)
    }
    if (title === 'Subject') {
      setShowSubject(true)
    }
    if (title === 'Content') {
      setShowContent(true)
    }
    if (title === 'Send time') {
      setShowSend(true)
    }
  };

  const onSend = async () => {
    const senderName = senderListRef.current.find(item => item.value === senderId)?.label
    const chosenTo = process.find(item => item.title === 'To')?.checked
    const chosenFrom = process.find(item => item.title === 'From')?.checked
    const chosenSubject = process.find(item => item.title === 'Subject')?.checked
    const chosenContent = process.find(item => item.title === 'Content')?.checked
    const chosenSendTime = process.find(item => item.title === 'Send time')?.checked
    if (!campaignName) return message.error('please set campaignName');
    if (!content || !chosenContent) return message.error('please set content');
    if (!preText || !chosenSubject) return message.error('please set preText');
    if (!sendDate || !chosenSendTime) return message.error('please set sendDate');
    if (!sendMinute || !chosenSendTime) return message.error('please set sendMinute');
    // if (!senderEmail || !chosenFrom) return message.error('please set senderEmail');
    if (!senderId || !chosenFrom) return message.error('please set senderEmail');
    if (!senderName || !chosenFrom) return message.error('please set senderName');
    if (!subject || !chosenSubject) return message.error('please set subject');
    if (!toGroup || !chosenTo) return message.error('please set toGroup');


    const emailList = await getEmailList(toGroup);
    const emails = emailList.data.map((item: { email: string; }) => item.email);
    const ids = emailList.data.map((item: { id: number; }) => item.id)
    const data = {
      campaignName,
      content: richContent,
      preText,
      sendTime:  `${sendDate} ${sendMinute}`,
      senderName,
      senderId,
      subject,
      toGroup,
      trackClicks,
      trackLink,
      trackOpens,
      trackTextClicks
    }
    const res = await send(senderName,emails,subject,data.content,data.sendTime,ids)
    console.log(res)
    if(res.message.includes('Queued')){
        message.success('Send successfully!', () => {
          router.back()
    })
      } else {
        message.error('Failed to send!')
      }
  }

  const onDraft = async () => {
    const senderName = senderListRef.current.find(item => item.value === senderId)?.label
    const chosenTo = process.find(item => item.title === 'To')?.checked
    const chosenFrom = process.find(item => item.title === 'From')?.checked
    const chosenSubject = process.find(item => item.title === 'Subject')?.checked
    const chosenContent = process.find(item => item.title === 'Content')?.checked
    const chosenSendTime = process.find(item => item.title === 'Send time')?.checked
    const data = {
      campaignName,
      content: chosenContent ? richContent : '',
      preText: chosenSubject ? preText : '',
      sendTime: chosenSendTime ? `${sendDate} ${sendMinute}` : '',
      // senderEmail: chosenFrom ? senderEmail : '',
      senderId,
      senderName: chosenFrom ? senderName : '',
      subject: chosenSubject ? subject : '',
      toGroup: chosenTo ? toGroup : -1,
      trackClicks,
      trackLink,
      trackOpens,
      trackTextClicks
    }
    if (campaignId) {
      const res = await updateCampaign({ ...data, id: +campaignId })
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    } else {
      const res = await saveDraft(data)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }
  }

  return <div className={campaignEditorContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <div className={back} onClick={() => router.back()}>
            <ImgWrapper className={arrowLeft} src='/img/arrow_left.png' alt='arrow left' />
            <span>Continue like this</span>
          </div>
          <div onClick={onDraft} className={draftBtn}>Draft</div>
        </div>
        <div onClick={onSend} className={exitBtn}>Send</div>
      </div>
      <div className={content}>
        <div className={contentTitle}>
          <span>{campaignName || 'Untitled'}</span>
          <span onClick={() => setShowCampaignName(true)} className={subTitle}>Edit name</span>
        </div>
        <div className={mainProcess}>
          {
            process.map((item, index) => <div key={index} className={processItem}>
              <div className={processLeft}>
                <Radio className={radio} checked={item.checked} />
                <div className={processDesc}>
                  <span>{item.title}</span>
                  {item.subTitle && <span className={desc}>{item.subTitle}</span>}
                </div>
              </div>
              <div className={processRight} onClick={() => handleShow(item.title)}>Edit</div>
            </div>)
          }
        </div>
        <div className={trackWrapper}>
          <div className={trackTitle}>Settings & Tracking</div>
          <div className={trackList}>
            <div className={trackItem}>
              <Checkbox checked={trackOpens} onChange={e => setTrackOpens(e.target.checked)} />
              <div className={trackText}>Track opens</div>
            </div>
            <div className={trackItem}>
              <Checkbox checked={trackClicks} onChange={e => setTrackClicks(e.target.checked)} />
              <div className={trackText}>Track clicks</div>
            </div>
            <div className={trackItem}>
              <Checkbox checked={trackTextClicks} onChange={e => setTrackTextClicks(e.target.checked)} />
              <div className={trackText}>Track plain-text clicks</div>
            </div>
            <div className={trackItem}>
              <Checkbox checked={trackLink} onChange={e => setTrackLink(e.target.checked)} />
              <div className={trackText}>Google Analytics link tracking</div>
            </div>
          </div>
        </div>
        <div className={sendWrapper}>
          <div onClick={onSend} className={sendBtn}>Send</div>
        </div>
      </div>
    </div>
    <Modal
      title="Campaign Name"
      open={showCampaignName}
      onOk={onCampaignNameOk}
      onCancel={onCampaignNameCancel}
      wrapClassName={subjectModal}
    >
      <div className={subjectContent}>
        <div className={inputItem}>
          <div className={label}>name</div>
          <Input value={campaignName} onChange={e => setCampaignName(e.target.value)} className={value} />
        </div>
      </div>
    </Modal>
    <Modal
      title="TO"
      open={showTo}
      onOk={onToOk}
      onCancel={onToCancel}
      wrapClassName={toModal}
    >
      <div className={toContent}>
        <div className={label}>Send to</div>
        <div className={value}>
          <Select
            value={toGroup}
            onChange={val => setToGroup(val)}
            options={groupList}
          />
          <span>All subscribers in audience</span>
        </div>
      </div>
    </Modal>
    <Modal
      title="From"
      open={showFrom}
      onOk={onFromOk}
      onCancel={onFromCancel}
      wrapClassName={fromModal}
    >
      <div className={fromContent}>
        {/* <div className={inputItem}>
          <div className={label}>Name</div>
          <Input value={senderName} onChange={e => setSenderName(e.target.value)} className={value} />
        </div> */}
        <div className={inputItem}>
          <div className={label}>Email Address</div>
          <Select
            className={value}
            value={senderId}
            onChange={(val) => setSenderId(val)}
            options={senderListRef.current}
          />
          {/* <Input value={senderEmail} onChange={e => setSenderEmail(e.target.value)} className={value} /> */}
        </div>
        <Link href='/addSender' className={addSender}>Add Sender</Link>
      </div>
    </Modal>
    <Modal
      title="Subject"
      open={showSubject}
      onOk={onSubjectOk}
      onCancel={onSubjectCancel}
      wrapClassName={subjectModal}
    >
      <div className={subjectContent}>
        <div className={inputItem}>
          <div className={label}>Subject</div>
          <Input value={subject} onChange={e => setSubject(e.target.value)} className={value} />
        </div>
        <div className={inputItem}>
          <div className={label}>Preview Text</div>
          <Input value={preText} onChange={e => setPreText(e.target.value)} className={value} />
        </div>
      </div>
    </Modal>
    <Modal
      title=""
      open={showSend}
      onOk={onSendTimeOk}
      onCancel={onSendTimeCancel}
      wrapClassName={sendModal}
    >
      <div className={sendContent}>
        <div className={header}>
          <ImgWrapper className={headerLeft} src='/img/list_item_icon.png' alt='item icon' />
          <div className={headerRight}>
            <div className={headerTitle}>Send mail</div>
            <div className={headerContent}>After email marketing review, send according to the selection below</div>
          </div>
        </div>
        <div className={radioWrapper}>
          <div className={radioLabel}>Send setting</div>
          <Radio.Group onChange={onRadioChange} value={timeType}>
            <Radio value={1}>Send Now</Radio>
            <Radio value={2}>Schedule a time</Radio>
          </Radio.Group>
        </div>
        <div className={timeWrapper}>
          <div className={timeLabel}>Sending time</div>
          <DatePicker value={sendDate ? dayjs(sendDate) : undefined} className={timeInput} onChange={onDateChange} />
          <TimePicker value={sendMinute ? dayjs(sendMinute, 'HH:mm:ss') : undefined} className={timeInput} onChange={onTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
          <Select
            className={timeInput}
            placeholder='Time Zone'
            value={zone}
            onChange={(val) => setZone(val)}
            options={[
              { value: 'beiJing', label: 'BeiJing' },
            ]}
          />
        </div>
      </div>
    </Modal>
    <ContentModal
      visible={showContent}
      onOk={onContentOk}
      onCancel={onContentCancel}
      value={richContent}
      onChange={val => setRichContent(val)}
    />
  </div>
};

export default CampaignEditor;
