'use client'

import { saveBook } from '@/server/book';
import styles from './index.module.scss';
import {Form, type FormProps, Input, Button, message, Space} from 'antd';
import { SUCCESS_CODE } from '@/constant/common';
import { useCallback, useEffect, useState} from 'react';
import {getCaptcha} from '@/server/captcha';
import Captcha from "@/component/Captcha";
import Turnstile from "@/component/Turnstile";

const {
  formContainer,
  formBox,
  formWrapper,
  submitBtn,
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
  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldReload = searchParams.get('reload') === 'true';
    if (shouldReload) {
      window.location.replace('/bookDemo');
    }
  }, []);

  const onTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };
  const setCode = (code:string) => {
    setCaptchaCode(code)
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (value: Record<string, string> ) => {
    if (!turnstileToken) {
      message.warning("Please complete the Turnstile verification!")
    }else {
      message.loading({ content: 'loading', duration: 10, key: 'loading' })
      console.log(value)
      const res = await saveBook({...value,turnstileToken})
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
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name"/>
        </Form.Item>
        <Form.Item<FieldType>
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input placeholder="Phone"/>
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: 'Please input your email address!' }]}
        >
          <Input placeholder="Email"/>
        </Form.Item>
        <Form.Item<FieldType>
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <Input.TextArea placeholder="Message"/>
        </Form.Item>
        <Form.Item<FieldType>
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}
        >
          <Turnstile onVerify={onTurnstileVerify}/>
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