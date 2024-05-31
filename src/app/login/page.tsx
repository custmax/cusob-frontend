'use client'
import ImgWrapper from '@/component/ImgWrapper';
import styles from './page.module.scss';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Link from 'next/link';
import ForgotPwModal from '@/component/ForgotPwModal';
import { useEffect, useState } from 'react';
import { login } from '@/server/user';
import { SUCCESS_CODE } from '@/constant/common';
import { useRouter } from 'next/navigation';
import {getLocalUser, getToken, setLocalUser, setToken} from '@/util/storage';

const {
  loginWrapper,
  loginBg,
  loginBox,
  title,
  loginForm,
  forgotBox,
  forgotBtn,
  signupBtn
} = styles;


const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const [showForgotPw, setShowForgotPw] = useState<boolean>(false);

  useEffect(() => {
    if(getToken()){
      router.push("/dashboard")
    }
    initEmail()
  }, [])
  
  const initEmail = () => {
    const localUser = getLocalUser() || {}
    if (localUser.email) {
      form.setFieldValue('email', localUser.email)
    }
  }

  const onForgotPwOk = () => {
    setShowForgotPw(false)
  }

  const onForgotPwCancel = () => {
    setShowForgotPw(false)
  }

  const onFinish = async (value: Pick<User.UserSign, 'email' | 'password'> & { remember?: boolean }) => {
    if (value.remember) {
      setLocalUser({ email: value.email })
    } else {
      setLocalUser({ email: '' })
    }
    delete value.remember
    message.loading({ content: 'Loading...', duration: 10, key: 'loading' })
    const res = await login(value)
    message.destroy('loading')
    if (res.code === SUCCESS_CODE) {
      const { token = '', firstName = '', lastName = '', avatar = '', id } = res?.data || {}
      console.log("token=>",token)

      setToken(token)
      setLocalUser({ firstName, lastName, avatar, id })
      message.success({
        content: 'log in successfully!',
        onClose: () => {
          router.push('/dashboard')
        }
      })
    } else {
      message.error({ content: res.message })
    }

  }

  return <>
    <div className={loginWrapper}>
      <ImgWrapper className={loginBg} alt='login_bg' src='/img/login_bg.png'/>
      <div className={loginBox}>
        <div className={title}>Log In</div>
        <Form
            form={form}
            layout="vertical"
            className={loginForm}
            onFinish={onFinish}
        >
          <Form.Item
              name='email'
              rules={[{required: true, message: 'Please input your Email address!'}]}
          >
            <Input placeholder="Email address"/>
          </Form.Item>
          <Form.Item
              name='password'
              rules={[{required: true, message: 'Please input your Password!'}]}
          >
            <Input type='password' placeholder="Password"/>
          </Form.Item>
          <Form.Item label="" name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'>Log in</Button>
          </Form.Item>
        </Form>
        <div className={forgotBox}>
          <div className={forgotBtn} onClick={() => setShowForgotPw(true)}>Forgot password?</div>
          <div className={signupBtn}>
            <Link href='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
      <ForgotPwModal
          visible={showForgotPw}
          onOk={onForgotPwOk}
          onCancel={onForgotPwCancel}
      />
    </div>
  </>

};

export default Login;