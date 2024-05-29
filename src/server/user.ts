import clientFetch from '@/helper/clientFetch';
import { getToken } from '@/util/storage';
import {SetStateAction} from "react";


export const sendVerifyCode = async (email: string) => {
  const res = await clientFetch({
    url: '/api/user/sendVerifyCode',
    method: 'POST',
    data: { email },
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const sendPhoneCode = async (prefix: string)=>{
  const res = await clientFetch({
    url: '/api/user/sendPhoneCode',
    method: 'POST',
    data: { prefix },
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const register = async (info: User.UserSign,turnstileToken:string) => {
  console.log({...info,turnstileToken})
  const res = await clientFetch({
    url: '/api/user/register',
    method: 'POST',
    data: {...info,turnstileToken}
  })

  return res;
}

export const registerForInvited = async (info: User.UserSign, encode: string) => {
  const res = await clientFetch({
    url: `/api/user/registerForInvited?encode=${encode}`,
    method: 'POST',
    data: info
  })
  return res;
}


export const login = async (data: Pick<User.UserSign, 'email' | 'password'>) => {
  const res = await clientFetch({
    url: '/api/user/login',
    method: 'POST',
    data
  })
  return res;
}

export const uploadAvatar = async (data: FormData) => {
  const token = getToken() || ''
  const result = await fetch('/api/user/uploadAvatar', {
    method: "POST",
    body: data,
    headers: {
      token,
    }
  })
  const res = await result.json()
  return res;
}

export const getUserInfo = async () => {
  const res = await clientFetch({
    url: '/api/user/getUserInfo',
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const updateUser = async (data: User.UserShown) => {
  const res = await clientFetch({
    url: '/api/user/update',
    method: 'PUT',
    data
  })
  return res;
}

export const updatePassword = async (data: { newPassword: string, oldPassword: string }) => {
  const res = await clientFetch({
    url: '/api/user/updatePassword',
    method: 'POST',
    data
  })
  return res;
}

export const sendCodeForPassword = async (data: { email: string }) => {
  const res = await clientFetch({
    url: '/api/user/sendCodeForPassword',
    method: 'POST',
    data,
    contentType: 'application/x-www-form-urlencoded'
  })
  return res;
}

export const forgetPassword = async (data: { email: string, password: string, verifyCode: string }) => {
  const res = await clientFetch({
    url: '/api/user/forgetPassword',
    method: 'POST',
    data
  })
  return res;
}

export const getUserList = async (page: number, limit: number) => {
  const res = await clientFetch({
    url: `/api/user/getUserList/${page}/${limit}`,
    method: 'GET',
  })
  return res;
}

export const invite = async (email: string) => {
  const res = await clientFetch({
    url: `/api/user/invite`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: { email }
  })
  return res;
}

export const addAdmin = async (userId: number) => {
  const res = await clientFetch({
    url: `/api/user/addAdmin?userId=${userId}`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const removeAdmin = async (userId: number) => {
  const res = await clientFetch({
    url: `/api/user/removeAdmin?userId=${userId}`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const removeUser = async (userId: number) => {
  const res = await clientFetch({
    url: `/api/user/removeUser?userId=${userId}`,
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}
