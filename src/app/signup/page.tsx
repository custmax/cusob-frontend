'use client'
import {Button, Checkbox, Form, Input, Select, message, Space} from 'antd';
import styles from './page.module.scss';
import { countryOptions } from '@/constant/phone';
import Link from 'next/link';
import {sendVerifyCode, register, sendPhoneCode} from '@/server/user';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';

import {useEffect, useState} from "react";
import classNames from "classnames";
import Image from "next/image";
import PrefixSelector from "@/component/PrefixSelector";
import Turnstile from "@/component/Turnstile";
import {useLocation} from "react-router";

const {
  signupWrapper,
  header,
  logoBox,
  text,
  right,
  formWrapper,
  emailWrapper,
  verifyBtn,
  signupForm,
  captchaBox,
  details,
  sign,
  pop,
  logo,
  custom_select
} = styles;

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldReload = searchParams.get('reload') === 'true';
    if (shouldReload) {
      window.location.replace('/signup');
    }
  }, []);

  const onTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };


  const onFinish = async (value: User.UserSign & { prefix?: 'string' }) => {
    if (!turnstileToken) {
      message.warning('Please complete the Turnstile verification.');

      return;
    }
      if (value.phone && value.prefix) {
        var plus = value.prefix.indexOf("+");
        value.phone = value.prefix.substring(plus + 1) + '-' + value.phone
      }
      delete value.prefix
      // console.log('value', value)
      message.loading({content: 'loading', duration: 10, key: 'loading'})
      const res = await register(value,turnstileToken)
      message.destroy('loading')
      if (res.code === SUCCESS_CODE) {
        message.success({
          content: 'The email has been delivered to your email. Please open the email to activate your account!',
          onClose: () => {
            router.push('/login')
          }
        });
      } else {
        message.error({content: res.message})
      }

  }

  return <div>
        <div className={signupWrapper}>
          <div className={header}>
            <Link href='/'>
              <div className={classNames(logoBox)}>
                <Image
                    fill
                    className={classNames(logo)}
                    alt='logo'
                    src='/img/logo.png'
                    sizes='100%'
                    priority
                />
              </div>
            </Link>
            <div className={right}>
              <Link href='/login'>Have a CusOb Account  | Sign in</Link>
            </div>
          </div>
          <div className={formWrapper}>
            <Form
                form={form}
                name="signup"
                className={signupForm}
                wrapperCol={{ span: 19 }}
                initialValues={{ prefix: 'US +1' }}
                onFinish={onFinish}
            >
              <Form.Item
                  className={text}
                  name='email'
                  rules={[{ message: 'Please input your email!' }]}
              >
                  <Input  placeholder="Email" />

              </Form.Item>

              <Form.Item
                  className={text}
                  name='password'
                  rules={[{ message: 'Please input your password!' }]}
              >
                <Input type='password' placeholder="Password" />
              </Form.Item>
              <Form.Item
                  className={text}
                  name='phone'
                  rules={[{ message: 'Please input your phone number!' }]}
              >
                <Input
                    addonBefore={<PrefixSelector/>}
                    placeholder="Phone number"
                />
                {/*{country && <span className="hint-text">{country}</span>}*/}
              </Form.Item>
              <Form.Item
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Turnstile onVerify={onTurnstileVerify}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType='submit'>
                  SIGN UP NOW
                </Button>
              </Form.Item>
            </Form>

          </div>
          <div>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className={details}>By clicking "Sign up now" , you agree to the <Link href="/terms">Terms of Use</Link> and <a href="/policy">
              Privacy Policy </a></p>
            <br/>
            <p className={details}>*By opting in, you are consenting to receive product, service and events
              updates from Cusob. You can unsubscribe at any time.</p>
            <p className={sign}>Already have an account?<Link href="/login">Sign in</Link></p>
          </div>
        </div>
      </div>

};



export default Signup;