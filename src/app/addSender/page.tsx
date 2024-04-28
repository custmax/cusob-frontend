'use client';
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import classNames from 'classnames';
import {Checkbox, Form, Input, Modal, Radio, message, Button, Dropdown, Space, MenuProps, Select} from 'antd';
import ImgWrapper from '@/component/ImgWrapper';
import React, { useState } from 'react';
import { saveSender, sendCodeForSender} from '@/server/sender';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';
import {emailsettings} from "@/constant/email";

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
    err,
  formControls
} = styles;

const AddSender = () => {
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [showVertify, setShowVertify] = useState<boolean>(false);
  const [showBinder, setShowBinder] = useState<boolean>(false);
  const [showManual, setShowManual] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [sslsmtpchecked, setSslsmtpChecked] = useState(false)
  const [sslimapchecked, setSslimapChecked] = useState(false)
  const [sslpopchecked, setSslpopChecked] = useState(false)
  const [error, setError] = useState('');
  const [select, setSelect] = useState('POP3');
  const onVertifyOk = () => {
    setShowVertify(false);
  };

  function validateEmail(email:string) {
    // 正则表达式用于验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const onVertifyCancel = () => {

    setShowVertify(false);
  };

  const onManualOk = async () => {
    const {
      serverType,
      email,
      password,
      imapPort,
      imapServer ,
      smtpPort ,
      smtpServer,
    } = form2.getFieldsValue();

    const data = {
      serverType,
      email,
      password,
      checked,
      imapPort,
      imapServer ,
      smtpPort ,
      smtpServer,
    }

    if(validateEmail(email)){
      const res = await saveSender(data)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }else {
      setError('请输入有效的邮箱地址');
      return;
    }
    setShowBinder(false);
    setShowManual(false);
  }

  const onBinderOk = async () => {
    const {
      email,
      password,
    } = form1.getFieldsValue();
    const data = {
      email,
      password,
    }
    if(validateEmail(email)){
      const res = await saveSender(data)
      if (res.code === SUCCESS_CODE) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }else {
      setError('请输入有效的邮箱地址');
      return;
    }
    setShowBinder(false);
  };

  const onBinderCancel = () => {
    form1.resetFields(); // 重置表单数据
    form2.resetFields(); // 重置表单数据
    setError('')
    setShowBinder(false);
  };

  const onManualCancel=()=>{
    setShowManual(false);
  }

  const onUseChange = () => {
    setChecked(prev => !prev)
  };

  const onSSLsmtpUseChange = () => {
    if(!sslsmtpchecked){
      form2.setFieldValue("smtpPort",emailsettings.SMTP_PORT_SSL)
    }else {
      form2.setFieldValue("smtpPort",emailsettings.SMTP_PORT)
    }
    setSslsmtpChecked(prev => !prev)
  };

  const onSSLimapUseChange = () => {
    if(!sslimapchecked){
      form2.setFieldValue("imapPort",emailsettings.IMAP_PORT_SSL)
    }else {
      form2.setFieldValue("imapPort",emailsettings.IMAP_PORT)
    }
    setSslimapChecked(prev => !prev)
  };

    const onSSLpopUseChange = () => {
    if(!sslpopchecked){
      form2.setFieldValue("popPort",emailsettings.POP_PORT_SSL)
    }else {
      form2.setFieldValue("popPort",emailsettings.POP_PORT)
    }
    setSslpopChecked(prev => !prev)
  };
  const handleClick = () =>{
    setShowManual(true)
  }

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
  const handleSubmit = () => {
    form1
        .validateFields()
        .then(values => {
          // 在这里处理表单验证成功后的逻辑，例如提交表单数据等操作
          onBinderOk()
        })
        .catch(errorInfo => {
          // 在这里处理表单验证失败后的逻辑，例如提示用户错误信息等操作
          console.error('Validation failed:', errorInfo);
        });
  };

  const selectOptions = [{"type":"POP3"},{"type":"IMAP"}].map(item => ({
    value: item.type,
    label: item.type,
  }))

  const handleSelectChange = (selectedValue: string) => {
    setSelect(selectedValue)
    // 在这里执行其他操作，如更新状态或调用其他函数
  };


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
        {/*<div className={classNames(card, { [active]: showVertify })} onClick={() => setShowVertify(true)}>*/}
        {/*  <ImgWrapper src='/img/vertification_icon.png' alt='vertification icon' className={vertifyIcon} />*/}
        {/*  <Radio checked={showVertify} className={radio} />*/}
        {/*  <span>Verification code</span>*/}
        {/*</div>*/}
        <div className={classNames(card, { [active]: showBinder })} onClick={() => setShowBinder(true)}>
          <Radio checked={showBinder} className={radio} />
          <span>Bind your Email Account</span>
        </div>
        {/*<div className={card} onClick={jumpToDomainCertify}>*/}
        {/*  <Radio className={radio} />*/}
        {/*  <span>Domain Authentication</span>*/}
        {/*</div>*/}
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
      onOk={handleSubmit}
      onCancel={onBinderCancel}
      okText='Done'
      wrapClassName={binderModal}
    >
      <div className={formWrapper}>
        <Form
            form={form1}
            name="binder"
            className={binderForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign='right'
            colon={false}
            onFinish={onBinderOk}
        >

          {error && <div className={err}>{error}</div>}
          <Form.Item
              label="E-mail"
              name='email'
              rules={[{required:true,message: "Please input your email!"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="Password"
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type='password' />
          </Form.Item>
        </Form>

          <Button className={formControls} type="primary" onClick={handleClick}>MANUAL</Button>


      </div>

    </Modal>
    <Modal
        title="Manual Settings"
        open={showManual}
        onOk={onManualOk}
        onCancel={onManualCancel}
        okText='Done'
        wrapClassName={binderModal}
    >
      <div className={formWrapper}>
        <Form
            form={form2}
            name="manual"
            className={binderForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign='right'
            colon={false}
            initialValues={{
              smtpPort: emailsettings.SMTP_PORT,
              imapPort: emailsettings.IMAP_PORT,
              popPort: emailsettings.POP_PORT
            }}

        >
          <Form.Item name="serverType"
                     label="Server Type"
          >
            <Select
                options={selectOptions}
                defaultValue="POP3"
                placeholder="POP3"
                onChange={handleSelectChange}
            />
          </Form.Item>
          <Form.Item
              label="E-mail account"
              name='email1'
              rules={[{required:true,message: "Please input your email!"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="Password"
              name='password1'
              rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type='password' />
          </Form.Item>
          {select!=='POP3' ? <Form.Item
              label="IMAP Server"
              name='imapServer'
          >
            <div style={{ display: 'flex' }}>
              <Input style={{ marginRight: '10px' }} />
              <div style={{ marginTop: '5px' }}>
                <Checkbox
                    checked={sslimapchecked}
                    onChange={onSSLimapUseChange}
                >
                  SSL
                </Checkbox>
              </div>
              <Form.Item
                  label="Port"
                  name='imapPort'
                  style={{ marginBottom: 0 }}
              >
                <Input/>
              </Form.Item>
            </div>
          </Form.Item> : <Form.Item
              label="POP Server"
              name='popServer'
          >
            <div style={{ display: 'flex' }}>
              <Input style={{ marginRight: '10px' }} />
              <div style={{ marginTop: '5px' }}>
                <Checkbox
                    checked={sslpopchecked}
                    onChange={onSSLpopUseChange}
                >
                  SSL
                </Checkbox>
              </div>
              <Form.Item
                  label="Port"
                  name='popPort'
                  style={{ marginBottom: 0 }}
              >
                <Input/>
              </Form.Item>
            </div>
          </Form.Item>
          }

          <Form.Item label="SMTP Server" name='smtpServer' >
            <div style={{ display: 'flex' }}>
              <Input style={{ marginRight: '10px' }} />
              <div style={{ marginTop: '5px' }}>
                <Checkbox
                    checked={sslsmtpchecked}
                    onChange={onSSLsmtpUseChange}
                >
                  SSL
                </Checkbox>
              </div>
              <Form.Item
                  label="Port"
                  name='smtpPort'
                  style={{ marginBottom: 0 }}
              >
                <Input />
              </Form.Item>
            </div>
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
