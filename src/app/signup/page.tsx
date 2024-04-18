'use client'
import {Button, Checkbox, Form, Input, Select, message, Space} from 'antd';
import styles from './page.module.scss';
import { countryOptions } from '@/constant/phone';
import Link from 'next/link';
import { sendVerifyCode, register } from '@/server/user';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';
import {getCaptcha} from '@/server/captcha';
import Captcha from "@/component/Captcha";
import {useCallback, useEffect, useState} from "react";


const selectOptions = countryOptions;

const {
  signupWrapper,
  header,
  left,
  right,
  formWrapper,
  emailWrapper,
  verifyBtn,
  signupForm,
  captchaBox,
} = styles;

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [captchaCode, setCaptchaCode] = useState('')

  const setCode = (code:string) => {
    setCaptchaCode(code)
  }

  const onVerify = async () => {
    const email = form.getFieldValue('email')
    message.success('send successfully!');
    const res = await sendVerifyCode(email)
    if (res.code !== SUCCESS_CODE) {
      message.error(res.message);
    }
  };

  const onFinish = async (value: User.UserSign & { prefix?: 'string', agree?: string, captcha?: string; }) => {
    if (value.captcha !== captchaCode) {
      message.warning("Captcha is wrong!")
    }else{
      if (value.phone && value.prefix) {
        value.phone = value.prefix.replace('+', '') + '-' + value.phone
      }
      if (!value.agree) {
        message.error('please agree to the Terms of Service and privacy Policy first')
        return;
      }
      delete value.prefix
      delete value.agree
      // console.log('value', value)
      message.loading({ content: 'loading', duration: 10, key: 'loading' })
      const res = await register(value)
      message.destroy('loading')
      if (res.code === SUCCESS_CODE) {
        message.success({
          content: 'sign up successfully!',
          onClose: () => { router.push('/login') }
        });
      } else {
        message.error({ content: res.message })
      }
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 'auto' }}
        options={selectOptions}
      />
    </Form.Item>
  );

  return <div className={signupWrapper}>
    <div className={header}>
      <div className={left}>Sign Up</div>
      <div className={right}>
        <Link href='/login'>Have a CusOb Account  | Sign in</Link>
      </div>
    </div>
    <div className={formWrapper}>
      <Form
        form={form}
        name="signup"
        className={signupForm}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        labelAlign='left'
        initialValues={{ prefix: '+86' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email *"
          name='email'
          rules={[{ message: 'Please input your email!' }]}
        >
          <div className={emailWrapper}>
            <Input placeholder="Please input your email" />
            <div className={verifyBtn} onClick={onVerify}>Verify</div>
          </div>
        </Form.Item>
        <Form.Item
          label="Verify Code *"
          name='verifyCode'
          rules={[{ message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password *"
          name='password'
          rules={[{ message: 'Please input your password!' }]}
        >
          <Input type='password' placeholder="Please input your password" />
        </Form.Item>
        <Form.Item
          label="Phone Number *"
          name='phone'
          rules={[{ message: 'Please input your phone number!' }]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Please input your phone number"
          />
        </Form.Item>
        {/* <Form.Item
          label="First Name*"
          name='firstName'
          rules={[{ message: 'Please input your first name!' }]}
        >
          <Input placeholder="Please input your first name" />
        </Form.Item>
        <Form.Item
          label="Last Name*"
          name='lastName'
          rules={[{ message: 'Please input your last name!' }]}
        >
          <Input placeholder="Please input your last name" />
        </Form.Item> */}
        {/* <Form.Item
          label="Country*"
          name='country'
          rules={[{ message: 'Please input your country!' }]}
        >
          <Input placeholder="Please input your country" />
        </Form.Item>
        <Form.Item
          label="Company*"
          name='company'
          rules={[{ message: 'Please input your company!' }]}
        >
          <Input placeholder="Please input your company" />
        </Form.Item> */}

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

        <Form.Item label="" name="agree" valuePropName="checked">
          <Checkbox>I agree to the Terms of Service and privacy Policy.</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>
            SIGN UP NOW
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
};

export default Signup;