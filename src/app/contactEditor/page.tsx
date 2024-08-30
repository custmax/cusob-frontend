"use client"

import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {DatePicker, Form, GetProp, Input, Select, Upload, UploadProps, message, Space, Checkbox, Modal} from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgWrapper from '@/component/ImgWrapper';
import { countryOptions } from '@/constant/phone';
import { getContact, updateContact, uploadAvatar } from '@/server/contact';
import { SUCCESS_CODE } from '@/constant/common';
import { addContact } from '@/server/contact';
import { useRouter, useSearchParams } from 'next/navigation';
import {addGroup, getGroupList, getGroupsAndContactCount, getSubscriptionCount} from '@/server/group';
import dayjs from 'dayjs'
import PrefixSelector from "@/component/PrefixSelector";
import Link from "next/link";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const selectOptions = countryOptions;
const { Option } = Select;
const {
  userListContainer,
  main,
  title,
  titleLeft,
  operateBox,
  addgroupItem,
  cancelBtn,
  saveBtn,
  content,
  avatarUploader,
  avatarImg,
  contactForm,
  groupModal,
  value,
groupContent,
  inputItem,
    label,
} = styles;
{groupModal}
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ContactEditor = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const [avatarStr, setAvatarStr] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<number>(1);
  const [groupList, setGroupList] = useState<{ groupName: string, id: number }[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams()
  const contactId = Number(searchParams.get('id'))
  const [originContact, setOriginContact] = useState<Contact.NewContact | null>(null)
  const [showGroup, setShowGroup] = useState<boolean>(false);
  const [groupName, setGroupName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    initGroupList()
    initContact()
  }, [])

  const initGroupList = async () => {
    const res = await getGroupList()
    if (res.code === SUCCESS_CODE) {
      setGroupList(res.data)
    }
  }

  const initContact = async () => {
    if (typeof contactId === 'number' && !isNaN(contactId)) {
      message.loading({ content: 'loading', duration: 10, key: 'contactLoading' })
      const res = await getContact(contactId)
      message.destroy('contactLoading')
      if (res.code === SUCCESS_CODE) {
        const {
          avatar,
          isAvailable,
          birthDate,
          company,
          country,
          dept,
          email,
          firstName,
          lastName,
          groupName,
          phone,
          mobile,
          subscriptionType,
          note,
          title,
        } = res.data || {}
        console.log(isAvailable)
        setAvatarStr(avatar);
        setIsAvailable(1)
        setOriginContact(res.data)
        
        form.setFieldsValue({
          firstName,
          lastName,
          email,
          phone: phone===undefined ? '' : phone.split('-').length > 1 ? phone.split('-')[1] : '',
          prefix: phone===undefined ? 'US +1' : phone.split('-').length > 1 ? '+' + phone.split('-')[0] : 'US +1',
          country,
          company,
          dept,
          title,
          birthdate: dayjs(birthDate),
          groups: groupName,
          subscriptionType,
          note,
          mobile,
        })
      }
    }
  }

  const onGroupOk = async () => {
    if (groupName) {
      const res = await addGroup(groupName)
      if (res.code === SUCCESS_CODE) {
        initGroupList()
        initGroupNum()
        initSubNum()
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    }
    setShowGroup(false)
  }
  const [groupNumObj, setGroupNumObj] = useState<Record<string, number> | null>(null);
  const [subObj, setSubObj] = useState<Record<string, number> | null>(null);

  const initSubNum = async () => {
    //console.log("sadfhsadhfgsdjafgdsajhf");
    const res = await getSubscriptionCount()
    //console.log("HHH");
    console.log(res.data);
    if (res.code === SUCCESS_CODE) {
      setSubObj(res.data)

    }
  }
  const initGroupNum = async () => {
    //console.log("sadfhsadhfgsdjafgdsajhf");
    const res = await getGroupsAndContactCount()
    if (res.code === SUCCESS_CODE) {
      setGroupNumObj(res.data)
    }
  }
  const onGroupCancel = () => {
    setShowGroup(false)
  }
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setPreviewAvatar(url);
      });

      const formData = new FormData();
      formData.append('file', info.file.originFileObj as Blob)
      const res = await uploadAvatar(formData)
      if (res.code === SUCCESS_CODE) {
        setAvatarStr(res.data)
      }
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  const onSave = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    if(!submit){
      setSubmit(true)
      const values = form.getFieldsValue()
      const {
        birthdate,
        company,
        dept,
        email,
        firstName,
        groups,
        lastName,
        note,
        phone = '',
        prefix = 'US +1',
        title,
        subscriptionType,
      } = values;
      if (!email) {
        message.error('Please fill in email!');
        setSubmit(false);
        setIsProcessing(false);
        return;
      }
      if (!groups) {
        message.error('Please fill in groups!');
        setSubmit(false);
        setIsProcessing(false);
        setShowGroup(true);
        return;
      }
      if (!subscriptionType) {
        message.error('Please fill in subscriptionType!');
        setSubmit(false);
        setIsProcessing(false);
        return;
      }
      const data = {
        avatar: avatarStr,
        isAvailable,
        birthDate: birthdate ? dayjs(birthdate).format('YYYY-MM-DD') : '',
        company,
        country: '',
        dept,
        email,
        firstName,
        lastName,
        groupName: groups,
        subscriptionType,
        mobile: prefix.substring(prefix.indexOf("+") + 1) + '-' + phone,
        note,
        phone: phone==='' ? '' : prefix.substring(prefix.indexOf("+") + 1) + '-' + phone,
        title,
        id: contactId,
      }
      if (contactId) {
        const res = await updateContact(data);
        if (res.code === SUCCESS_CODE) {
          message.success(res.message, () => {
            router.back()
          })
        } else {
          message.error(res.message)
          setIsProcessing(false)
          setSubmit(false);
        }
      } else {
        message.loading({ content: 'loading', duration: 10, key: 'Loading' })
        const res = await addContact(data);

        if (res.code === SUCCESS_CODE) {
          message.success(res.message, () => {
            router.back()
          })
        } else {
          message.error(res.message)
          setIsProcessing(false)
          setSubmit(false);
        }
      }
    }
    setIsProcessing(false);
  }

  const handleCheckboxChange = (e: { target: { checked: any; }; }) => {
    setIsAvailable(e.target.checked ? 1 : 0);
  };

  const onCancel = () => {
    if (contactId && originContact) {
      const {
        avatar,
        birthDate,
        company,
        country,
        dept,
        email,
        firstName,
        lastName,
        groupName,
        phone,
        mobile,
        note,
        title,

      } = originContact || {}

      setAvatarStr(avatar);
      
      form.setFieldsValue({
        firstName,
        lastName,
        email,
        phone: phone===undefined ? '' : phone.split('-').length > 1 ? phone.split('-')[1] : '',
        prefix: phone===undefined ? '':phone.split('-').length > 1 ? '+' + phone.split('-')[0] : 'US +1',
        country,
        company,
        dept,
        title,
        birthdate: dayjs(birthDate),
        groups: groupName,
        note,
        mobile,
      })
    } else {
      router.back()
    }
  }

  return <div className={userListContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <Link href='/contactList'>Contacts</Link>
          <span style={{margin: '0 0.5em', color: '#666'}}>/</span>
          <span style={{color: '#999999'}}>{contactId ? 'Edit Contact' : 'Add New'}</span>
        </div>

      </div>
      <div className={content}>
        {/*<Upload//上传头像*/}
        {/*  name="avatar"*/}
        {/*  listType="picture-card"*/}
        {/*  className={avatarUploader}*/}
        {/*  showUploadList={false}*/}
        {/*  action=""*/}
        {/*  beforeUpload={beforeUpload}*/}
        {/*  onChange={handleChange}*/}
        {/*>*/}
        {/*  {*/}
        {/*    avatarStr || previewAvatar*/}
        {/*      ? <ImgWrapper className={avatarImg} src={avatarStr || previewAvatar} alt="avatar" />*/}
        {/*      : uploadButton*/}
        {/*  }*/}
        {/*</Upload>*/}
        <Form
            form={form}
            name="addContact"
            className={contactForm}
            labelCol={{span: 5}}
            wrapperCol={{span: 19}}
            labelAlign='right'
            initialValues={{prefix: 'US +1'}}
            colon={false}
        >
          {/*修改输入框样式*/}
          {/*style={{paddingLeft:'15px',height:'50px',fontSize:'18px',borderColor:'#7241FF',borderRadius:'14px'}}*/}
          <Form.Item style={{marginBottom: 0}}>
            <Form.Item name='firstName'
                       style={{display: 'inline-block', marginRight: '16px', width: 'calc(50% - 8px)'}}>
              <Input placeholder="First name"/>
            </Form.Item>
            <Form.Item name='lastName' style={{display: 'inline-block', width: 'calc(50% - 8px)'}}>
              <Input placeholder="Last name"/>
            </Form.Item>
          </Form.Item>
          <Form.Item

              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="* Email"/>
          </Form.Item>
          <Form.Item

              name='email2'
          >
            <Input placeholder="Email2"/>
          </Form.Item>
          <Form.Item
              name='phone'
          >
            <Input placeholder='Phone' addonBefore={<PrefixSelector/>}
                   style={{borderColor: '#7241FF', borderRadius: '14px'}}/>
          </Form.Item>
          <Form.Item style={{marginBottom: 0}}>
            <Form.Item name='company' style={{display: 'inline-block', marginRight: '8px', width: 'calc(50% - 8px)'}}>
              <Input placeholder="Company"/>
            </Form.Item>
            <Form.Item name='dept' style={{display: 'inline-block', marginRight: '8px', width: 'calc(30% - 8px)'}}>
              <Input placeholder="Dept"/>
            </Form.Item>
            <Form.Item name='title' style={{display: 'inline-block', width: 'calc(20%)'}}>
              <Input placeholder="Title"/>
            </Form.Item>
          </Form.Item>
          <Form.Item

              name='birthdate'
          >
            <DatePicker style={{width: '100%'}}/>
          </Form.Item>

          <Form.Item

              name='groups'
              rules={[{required: true, message: 'Please input your groupName!'}]}
          >

            {
              groupList.length
                  ? <Select
                      placeholder="* Groups"
                      options={groupList.map((item, index) => ({
                        value: item.groupName,
                        label: item.groupName
                      }))}
                  />
                  : <Input placeholder="Use commas to separate multiple words or phrases"/>
            }
            {/*<div  onClick={() => setShowGroup(true)}>+</div>*/}
          </Form.Item>
          {/*<Form.Item*/}
          {/*    name='subscriptionType'*/}
          {/*>*/}
          {/*  <Input placeholder="Subscription type" />*/}
          {/*</Form.Item>*/}

          <Form.Item
              name='subscriptionType'
              rules={[{ required: true, message: 'Please select a subscription type!' }]}
          >
            <Select placeholder="* Subscription type">
              <Option value="Subscribed">Subscribed contact</Option>
              <Option value="Unsubscribed">Unsubscribed contact</Option>
              <Option value="Non-subscribed">Non-subscribed contact</Option>
            </Select>
          </Form.Item>

          <Form.Item
              name='note'
          >
            <Input.TextArea placeholder="Memo"/>
          </Form.Item>
          <Form.Item name="isAvailable">
            <Checkbox checked={isAvailable === 1} onChange={handleCheckboxChange}>
              Check to confirm that you have permission to send emails to this contact person
            </Checkbox>
          </Form.Item>
        </Form>
        <div className={operateBox}>
          {/*<div className={cancelBtn} onClick={onCancel}>Cancel</div>*/}
          <div className={saveBtn} onClick={
            !isProcessing?onSave:undefined
          }>Add contact</div>
        </div>
      </div>
    </div>
    <Modal
        title="Add Group"
        open={showGroup}
        onOk={onGroupOk}
        onCancel={onGroupCancel}
        wrapClassName={groupModal}
    >
      <div className={groupContent}>
        <div className={inputItem}>
          <div className={label}>Group Name</div>
          <Input value={groupName} onChange={e => setGroupName(e.target.value)} className={value} />
        </div>
      </div>
    </Modal>
  </div>
};

export default ContactEditor;
