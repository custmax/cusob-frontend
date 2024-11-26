import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import {Input, Modal, message, UploadProps, Upload, Select, Form} from 'antd';
import {forgetPassword, sendEmailForResetPassword} from '@/server/user';
import {SUCCESS_CODE} from '@/constant/common';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { CloseOutlined } from '@ant-design/icons';
import {batchImport, parseFields} from "@/server/contact";
import {CONTACT_TEMPLATE} from "@/constant/cusob";
import {subscribe} from "node:diagnostics_channel";
import {getGroupList} from "@/server/group";

type Props = {
  visible: boolean,
  onOk: () => void,
  onCancel: () => void,
}
const { Option } = Select;
const {
  forgotPwModal,
  forgotPwContent,
  inputItem,
  cancelBtn,
  addressBox,
  addressValue,
  addressBtn,
  addressBt,
  value,
  importFileContainer,
  main,
  title,
  arrowWrapper,
  arrowLeft,
  content,
  uploadWrapper,
  label,
  selectWrapper,
  selectBtn,
  sample,
  groupInput,
  operateBox,
  importBtn,
} = styles;

const UploadModal: FC<Props> = (props) => {
  const {visible, onOk, onCancel} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setReTypePassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [available, setAvailable] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [groupList, setGroupList] = useState<{ groupName: string, id: number }[]>([]);
  //const router = useRouter();
  useEffect(() => {
    initGroupList()
  }, [])
  const initGroupList = async () => {
    const res = await getGroupList()
    if (res.code === SUCCESS_CODE) {
      setGroupList(res.data)
    }
  }
  function validateEmail(email:string) {
    // 正则表达式用于验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const onSend = async () => {
    if (!email) {
      message.error('please input the email!');
    } else {
      message.success('send successfully!');
      const res = await sendEmailForResetPassword({email})
      if (res.code !== SUCCESS_CODE) {
        message.error(res.message);
      }

    }

  };

  // const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newEmail = e.target.value;
  //   setEmail(newEmail);
  //   setAvailable(validateEmail(newEmail));
  // };


  const _onOk = async () => {
    if (password !== reTypePassword) {
      return message.error({ content: 'Make sure the two passwords are the same' })
    }
    const data = {
      email,
      password,
      verifyCode,
    }
    const res = await forgetPassword(data);
    if (res.code === SUCCESS_CODE) {
      message.success(res.message)
    } else {
      message.error(res.message)
    }
    onOk()
  }

  //
  const router = useRouter()
  const [subscriptionType, setSubscriptionType] = useState('')
  const [groupName, setGroupName] = useState('')

  const fileRef = useRef<Blob>()

  const beforeUpload = (file: Blob) => {
    fileRef.current = file
    return false;
  };

  // const handleChange: UploadProps['onChange'] = async (info) => {
  //   // if (info.file.status === 'uploading') {
  //   //   return;
  //   // }
  //   // if (info.file.status === 'done') {
  //   //   fileRef.current = info.file
  //   // }
  //   setAvailable(true);
  //   // if (info.file.status === 'done') {
  //   //   // 文件上传成功，更新 available 状态
  //   //   setAvailable(true);
  //   // } else if (info.file.status === 'removed') {
  //   //   // 文件被移除，重置 available 状态
  //   //   setAvailable(false);
  //   // }
  // };
  const handleChange = async (info: any) => {
    if (info.file.status === 'removed') {
      setAvailable(false); // 文件被移除，设置 available 为 false
    } else {
      setAvailable(true);  // 文件上传成功，设置 available 为 true
      const formData = new FormData();
      if (fileRef.current) formData.append('file', fileRef.current as Blob)
      // const res = await parseFields(formData)
      // console.log("res", res)
      // if (res.code === SUCCESS_CODE) {
      //   // message.success(res.message, () => {
      //   //   router.push('/contactList')
      //   // })
      //   message.success(res.message)
      // } else {
      //   message.error(res.message)
      // }
    }
  };

  const onImport = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const formData = new FormData();
    if (fileRef.current) formData.append('file', fileRef.current as Blob)//将文件添加到formData中
    formData.append('groupName', groupName)
    formData.append('subscriptionType', subscriptionType)
    console.log(formData);
    const res = await batchImport(formData)
    if (res.code === SUCCESS_CODE) {
      message.success(res.message, () => {
        router.push('/contactList')
        setIsProcessing(false);
      })
    } else {
      message.error(res.message)
      setIsProcessing(false);
    }
  }

  const onSampleClick = () => {
    const a = document.createElement('a');
    a.download = 'Sample File';
    a.href = CONTACT_TEMPLATE;
    a.click();
  }

  return <Modal
      title="Upload a File"
      open={visible}
      onCancel={onCancel}
      wrapClassName={forgotPwModal}
      footer={null}
      closable={false}
  >
    <div className={forgotPwContent}>
      <div className={uploadWrapper}>
        <div className={label}>File</div>
        <Upload
            name="select"
            className={selectWrapper}
            maxCount={1}
            action=""
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
          <div className={selectBtn}>Select</div>
        </Upload>
        <div className={sample} onClick={onSampleClick}>Sample file</div>
      </div>
      <div className={uploadWrapper}>
        <div className={label}>Group</div>
        {
          groupList.length > 0
              ? <Select
                  className={addressValue}
                  onChange={value => setGroupName(value)}  // 处理下拉框的变化
                  options={groupList.map((item, index) => ({
                    value: item.groupName,
                    label: item.groupName
                  }))}
              />
              : <Input
                  //placeholder="Use commas to separate multiple words or phrases"
                  className={addressValue}
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}  // 处理输入框的变化
              />
        }
      </div>

      {/*<Form.Item*/}
      {/*    name='groups'*/}
      {/*    rules={[{required: true, message: 'Please input your groupName!'}]}*/}
      {/*>*/}
      {/*  {*/}
      {/*    groupList.length > 0*/}
      {/*        ? <Select*/}
      {/*            placeholder="* Groups"*/}
      {/*            options={groupList.map((item, index) => ({*/}
      {/*              value: item.groupName,*/}
      {/*              label: item.groupName*/}
      {/*            }))}*/}
      {/*        />*/}
      {/*        : <Input placeholder="Use commas to separate multiple words or phrases"/>*/}
      {/*  }*/}
      {/*</Form.Item>*/}
      <div className={uploadWrapper}>
        {/*TODO:订阅类型，目前没有字段,需要修改为下拉框：三种类型*/}

        <div className={label}>Subscription type</div>
        <Select
            placeholder="* Subscription type"
            value={subscriptionType}
            onChange={value => setSubscriptionType(value)}
            className={addressValue}
        >
          <Option value="Subscribed">Subscribed contact</Option>
          <Option value="Unsubscribed">Unsubscribed contact</Option>
          <Option value="Non-subscribed">Non-subscribed contact</Option>
        </Select>
      </div>
      {
        available ?
            <div className={addressBtn} onClick={!isProcessing? onImport:undefined}>Import</div>
            :
            <div className={addressBt}>Import</div>
      }
      <div className={cancelBtn} onClick={onCancel}>Cancel</div>
      {/*<div className={inputItem}>*/}
      {/*  <div className={addressBox}>*/}
      {/*    <Input*/}
      {/*        value={email}*/}
      {/*        placeholder="Email"*/}
      {/*        onChange={e => emailChange(e)}*/}
      {/*        className={addressValue}/>*/}
      {/*  </div>*/}
      {/*</div>*/}

    </div>
  </Modal>;
};

export default UploadModal;
