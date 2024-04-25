'use client'
import {Button, Checkbox, Form, Input, Select, message, Space} from 'antd';
import styles from './page.module.scss';
import { countryOptions } from '@/constant/phone';
import Link from 'next/link';
import {sendVerifyCode, register, sendPhoneCode} from '@/server/user';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';
import {getCaptcha} from '@/server/captcha';
import Captcha from "@/component/Captcha";
import {useCallback, useEffect, useState} from "react";
import EnteredHeader from "@/component/EnteredHeader";
import ImgWrapper from "@/component/ImgWrapper";

import Head from 'next/head';
const selectOptions = countryOptions;

const {
  signupWrapper,
  header,
  logoBox,
  left,
  right,
  formWrapper,
  emailWrapper,
  verifyBtn,
  signupForm,
  captchaBox,
  details,
  sign,
    pop,
  custom_select
} = styles;

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [captchaCode, setCaptchaCode] = useState('')
  const [country, setCountry] = useState('')

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
  }
  // useEffect(() => {
  //   fetchCountry();
  // }, [/* 依赖项 */]);
  //   const fetchCountry = async () => {
  //     const prefix = form.getFieldValue('prefix');
  //     const res = await sendPhoneCode(prefix);
  //     if (res.code !== SUCCESS_CODE) {
  //       message.error(res.message);
  //     } else {
  //       setCountry(res.data);
  //     }
  //   };

  const onFinish = async (value: User.UserSign & { prefix?: 'string', agree?: string, captcha?: string; }) => {
    if (value.captcha !== captchaCode) {
      message.warning("Captcha is wrong!")
    }else{
      if (value.phone && value.prefix) {

        var plus = value.prefix.indexOf("+");
        value.phone = value.prefix.substring(plus+1)+ '-' + value.phone
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
        style={{ width: 100 }}
        dropdownStyle={{ minWidth: '100vpx' }}
        options={selectOptions}
        showSearch
        placeholder="+86"
        // onChange={async (value) => {
        //   form.setFieldsValue({prefix: value});
        //   await fetchCountry(); // 在这里直接调用 fetchCountry 函数
        // }}
      />
    </Form.Item>
  );


  return <div>
        <div className={signupWrapper}>
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
                {/*{country && <span className="hint-text">{country}</span>}*/}
              </Form.Item>

              <Form.Item label="Captcha">
                <Space className={captchaBox}>
                  <Form.Item
                      name="captcha"
                      rules={[{ required: true, message: 'Please input captcha!' }]}
                  >
                    <Input/>
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

                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={details}>By clicking "Sign up now" , you agree to the <Link href="/terms">Terms of Use</Link> and <a href="/policy">
                  Privacy Policy </a></p>
              <br/>
                <p className={details}>*By opting in, you are consenting to receive product, service and events
                  updates from Cusob. You can unsubscribe at any time.</p>
                <p className={sign}>Already have an account?<Link href="/login">Sign in</Link></p>

            </Form>
          </div>
        </div>
      </div>

};



export default Signup;