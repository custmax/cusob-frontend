'use client';
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import classNames from 'classnames';
import {Checkbox, Form, Input, Modal, Radio, message, Select} from 'antd';
import ImgWrapper from '@/component/ImgWrapper';
import { useState } from 'react';
import { saveSender, sendCodeForSender } from '@/server/sender';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';

const {
  addSenderContainer,
  vertifyModal,
  addressTitle,
  emailWrapper,
  emailInput,
  codeInput,
  sendBtn,
  binderModal,
  formWrapper,
  binderForm,
  checkboxWrapper,
  checkBox,
  main,
  title,
  titleLeft,
  exitBtn,
  content,
  card,
  active,
  radio,
  vertifyIcon,
} = styles;

const AddSender = () => {
  const [form] = Form.useForm()
  const [showVertify, setShowVertify] = useState<boolean>(false);
  const [showBinder, setShowBinder] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  
  const onVertifyOk = () => {
    setShowVertify(false);
  };

  const onVertifyCancel = () => {
    setShowVertify(false);
  };
  

  const onBinderOk = async () => {
    const {
      serverType,
      email,
      password,
      popServer,
      imapPort,
      imapServer,
      smtpServer,
      popPort,
      smtpPort,
    } = form.getFieldsValue();

    const data = {
      email,
      imapPort,
      imapServer,
      popPort,
      smtpPort,
      password,
      popServer,
      serverType,
      smtpServer,
    }
    const res = await saveSender(data)
    if (res.code === SUCCESS_CODE) {
      message.success(res.message)
    } else {
      message.error(res.message)
    }
    setShowBinder(false);
  };

  const onBinderCancel = () => {
    setShowBinder(false);
  };

  const onUseChange = () => {
    setChecked(prev => !prev)
  };

  const onSendCode = async () => {
    if (verifyEmail) {
      const res = await sendCodeForSender(verifyEmail)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }
  };

  const jumpToDomainCertify = () => {
    router.push("/domainCertify");
  }

  return <div className={addSenderContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <span>Contacts</span>
          <span style={{ margin: '0 0.5em', color: '#666' }}>/</span>
          <span style={{ color: '#999999' }}>Add a sender</span>
        </div>
        <div className={exitBtn} onClick={() => {router.back() }}>Exit</div>
      </div>
      <div className={content}>
        <div className={classNames(card, { [active]: showVertify })} onClick={() => setShowVertify(true)}>
          <ImgWrapper src='/img/vertification_icon.png' alt='vertification icon' className={vertifyIcon} />
          <Radio checked={showVertify} className={radio} />
          <span>Verification code</span>
        </div>
        <div className={classNames(card, { [active]: showBinder })} onClick={() => setShowBinder(true)}>
          <Radio checked={showBinder} className={radio} />
          <span>Bind your Email Account</span>
        </div>
        <div className={card} onClick={jumpToDomainCertify}>
          <Radio className={radio} />
          <span>Domain Authentication</span>
        </div>
      </div>
    </div>
    <Modal
      title="Verification code"
      open={showVertify}
      onOk={onVertifyOk}
      onCancel={onVertifyCancel}
      okText='Done'
      wrapClassName={vertifyModal}
    >
      <div className={addressTitle}>Add Sender Address</div>
      <div className={emailWrapper}>
        <Input value={verifyEmail} onChange={e => setVerifyEmail(e.target.value)} className={emailInput} />
        <div onClick={onSendCode} className={sendBtn}>Send Verifcation Email</div>
      </div>
      <div className={addressTitle}>Enter verification code</div>
        <Input className={codeInput} />
    </Modal>
    <Modal
      title="Bind your Email Account"
      open={showBinder}
      onOk={onBinderOk}
      onCancel={onBinderCancel}
      okText='Done'
      wrapClassName={binderModal}
    >
      <div className={formWrapper}>
        <Form
          form={form}
          name="binder"
          className={binderForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='right'
          colon={false}
        >
          <Form.Item
            label="Server Type"
            name='serverType'
          >
            {/*<Input />*/}
            <Select
                defaultValue='IMAP'
                options={[
                  {value: 'IMAP', label: 'IMAP'}
                ]}
            />
          </Form.Item>
          <Form.Item
            label="E-mail account"
            name='email'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name='password'
          >
            <Input type='password' />
          </Form.Item>
          {/*<Form.Item*/}
          {/*  label="POP Port"*/}
          {/*  name='popPort'*/}
          {/*>*/}
          {/*  <Input />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item*/}
          {/*  label="POP Server"*/}
          {/*  name='popServer'*/}
          {/*>*/}
          {/*  <Input />*/}
          {/*</Form.Item>*/}
          <Form.Item
            label="IMAP Port"
            name='imapPort'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="IMAP Server"
            name='imapServer'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SMTP Port"
            name='smtpPort'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SMTP Server"
            name='smtpServer'
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
      <div className={checkboxWrapper}>
        <Checkbox
          checked={checked}
          className={checkBox}
          onChange={onUseChange}
        >
          Use STARTTLS if server supports
        </Checkbox>
      </div>
    </Modal>
  </div>
};

export default AddSender;
