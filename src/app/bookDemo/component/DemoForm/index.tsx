'use client'

import { saveBook } from '@/server/book';
import styles from './index.module.scss';
import {Form, type FormProps, Input, Button, message, Space} from 'antd';
import { SUCCESS_CODE } from '@/constant/common';
import { useCallback, useEffect, useState} from 'react';
import {getCaptcha} from '@/server/captcha';
import Captcha from "@/component/Captcha";

const {
  formContainer,
  formBox,
  formWrapper,
  submitBtn,
  captchaBox,
} = styles;

type FieldType = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  captcha?: string;
};

const DemoForm = () => {
  const [form] = Form.useForm()
  const [captchaCode, setCaptchaCode] = useState('')

  const setCode = (code:string) => {
    setCaptchaCode(code)
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (value: Record<string, string>) => {
    if (value.captcha !== captchaCode) {
      message.warning("Captcha is wrong!")
    }else {
      message.loading({ content: 'loading', duration: 10, key: 'loading' })
      const res = await saveBook(value)
      message.destroy('loading')
      if (res.code === SUCCESS_CODE) {
        message.success(res.message, () => {
          form.resetFields()
        })
      } else {
        message.error({ content: res.message })
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {};

  return <div className={formContainer}>
    <div className={formBox}>
      <Form
        form={form}
        className={formWrapper}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input your email address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Captcha">
          <Space className={captchaBox}>
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: 'Please input captcha!' }]}
            >
              <Input />
            </Form.Item>
            <Captcha setCode={setCode.bind(this)}></Captcha>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
          <Button className={submitBtn} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
};

export default DemoForm;