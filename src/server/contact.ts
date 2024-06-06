import clientFetch from '@/helper/clientFetch';
import { getToken } from '@/util/storage';

export const getList = async (page: number, limit: number, keyword?: string, groupId?: number) => {
  const res = await clientFetch({
    url: `/api/contact/getList/${page}/${limit}`,
    method: 'GET',
    data: { keyword: keyword || '', groupId: groupId || '' }
  })
  return res;
}

export const getHistoryList = async (page: number, limit: number) => {
  const res = await clientFetch({
    url: `/api/contact/getList/${page}/${limit}`,
    method: 'GET',
  })
  return res;
}

export const addContact = async (data: Contact.NewContact) => {
  const res = await clientFetch({
    url: `/api/contact/add`,
    method: 'POST',
    data: {
      id: 0,
      ...data,
    }
  })
  return res;
}

export const updateContact = async (data: Contact.NewContact) => {
console.log(data)
  const res = await clientFetch({
    url: `/api/contact/update`,
    method: 'POST',
    data,
  })
  return res;
}



export const uploadAvatar = async (data: FormData) => {
  const token = getToken() || ''
  const result = await fetch('/api/contact/uploadAvatar', {
    method: "POST",
    body: data,
    headers: {
      token,
    }
  })
  const res = await result.json()
  return res;
}

export const removeContact = async (data: number[]) => {
  const res = await clientFetch({
    url: `/api/contact/batchRemove`,
    method: 'DELETE',
    data,
  })
  return res;
}

export const getContact = async (contactId: number) => {
  const res = await clientFetch({
    url: `/api/contact/getById/${contactId}`,
    method: 'GET',
  })
  return res;
}

export const batchImport = async (data: FormData) => {
  const token = getToken() || ''
  const result = await fetch('/api/contact/batchImport', {
    method: "POST",
    body: data,
    headers: {
      token,
    }
  })
  const res = await result.json()
  return res;
}

export const getEmailsByGroupId = async (groupId: number) => {
  const res = await clientFetch({
    url: `/api/contact/getAll/${groupId}`,
    method: 'GET'
  })
  return res;
}


