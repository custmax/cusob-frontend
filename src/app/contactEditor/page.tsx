"use client"

import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import {DatePicker, Form, GetProp, Input, Select, Upload, UploadProps, message, Space} from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgWrapper from '@/component/ImgWrapper';
import { countryOptions } from '@/constant/phone';
import { getContact, updateContact, uploadAvatar } from '@/server/contact';
import { SUCCESS_CODE } from '@/constant/common';
import { addContact } from '@/server/contact';
import { useRouter, useSearchParams } from 'next/navigation';
import { getGroupList } from '@/server/group';
import dayjs from 'dayjs'
import PrefixSelector from "@/component/PrefixSelector";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const selectOptions = countryOptions;

const {
  userListContainer,
  main,
  title,
  titleLeft,
  operateBox,
  cancelBtn,
  saveBtn,
  content,
  avatarUploader,
  avatarImg,
  contactForm,
} = styles;

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ContactEditor = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string>('');
  const [avatarStr, setAvatarStr] = useState<string>('');
  const [groupList, setGroupList] = useState<{ groupName: string, id: number }[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams()
  const contactId = Number(searchParams.get('id'))
  const [originContact, setOriginContact] = useState<Contact.NewContact | null>(null)

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
        } = res.data || {}
  
        setAvatarStr(avatar);
        setOriginContact(res.data)
        
        form.setFieldsValue({
          firstName,
          lastName,
          email,
          phone: phone.split('-').length > 1 ? phone.split('-')[1] : '',
          prefix: phone.split('-').length > 1 ? '+' + phone.split('-')[0] : '+86',
          country,
          company,
          dept,
          title,
          birthdate: dayjs(birthDate),
          groups: groupName,
          note,
          mobile,
        })
      }
    }
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
      prefix = '+86',
      title,
    } = values;
    const data = {
      avatar: avatarStr,
      birthDate: birthdate ? dayjs(birthdate).format('YYYY-MM-DD') : '',
      company,
      country: '',
      dept,
      email,
      firstName,
      lastName,
      groupName: groups,
      mobile: prefix.replace('+', '') + '-' + phone,
      note,
      phone: prefix.replace('+', '') + '-' + phone,
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
      }
    } else {
      const res = await addContact(data);
      if (res.code === SUCCESS_CODE) {
        message.success(res.message, () => {
          router.back()
        })
      } else {
        message.error(res.message)
      }
    }
  }

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
        phone: phone.split('-').length > 1 ? phone.split('-')[1] : '',
        prefix: phone.split('-').length > 1 ? '+' + phone.split('-')[0] : '+86',
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
          <span>Contacts</span>
          <span style={{ margin: '0 0.5em', color: '#666' }}>/</span>
          <span style={{ color: '#999999' }}>{contactId ? 'Edit Contact' : 'Add New'}</span>
        </div>
        <div className={operateBox}>
          <div className={cancelBtn} onClick={onCancel}>Cancel</div>
          <div className={saveBtn} onClick={onSave} >Save</div>
        </div>
      </div>
      <div className={content}>
        <Upload
          name="avatar"
          listType="picture-card"
          className={avatarUploader}
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {
            avatarStr || previewAvatar
              ? <ImgWrapper className={avatarImg} src={avatarStr || previewAvatar} alt="avatar" />
              : uploadButton
          }
        </Upload>
        <Form
          form={form}
          name="addContact"
          className={contactForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          labelAlign='right'
          initialValues={{ prefix: '+86' }}
          colon={false}
        >
          <Form.Item label="Name" style={{ marginBottom: 0 }}>
            <Form.Item name='firstName' style={{ display: 'inline-block', marginRight: '16px', width: 'calc(50% - 8px)' }}>
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item name='lastName' style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Input placeholder="Lastname" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Mailbox"
            name='email'
          >
            <Input placeholder="E-Mail Address" />
          </Form.Item>
          <Form.Item
            label="Telephone"
            name='phone'
          >
            <Input addonBefore={<PrefixSelector />} />
          </Form.Item>
          <Form.Item label="Company" style={{ marginBottom: 0 }}>
            <Form.Item name='company' style={{ display: 'inline-block', marginRight: '8px', width: 'calc(50% - 8px)' }}>
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item name='dept' style={{ display: 'inline-block', marginRight: '8px', width: 'calc(30% - 8px)' }}>
              <Input placeholder="Dept" />
            </Form.Item>
            <Form.Item name='title' style={{ display: 'inline-block', width: 'calc(20%)' }}>
              <Input placeholder="Title" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Birthdate"
            name='birthdate'
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Groups"
            name='groups'
          >
            {
              groupList.length
                ? <Select
                  placeholder="Groups"
                  options={groupList.map((item, index) => ({
                    value: item.groupName,
                    label: item.groupName
                  }))}
                />
                : <Input placeholder="Use commas to separate multiple words or phrases" />
            }
          </Form.Item>
          <Form.Item
            label="Note"
            name='note'
          >
            <Input.TextArea placeholder="Use the Notes field to add any additional information not included in the Identification TAB." />
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
};

export default ContactEditor;
