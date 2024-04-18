import { getToken } from "@/util/storage";
import { useRouter } from 'next/navigation';

type RequestOptions = {
  url: string,
  method: string,
  data?: any,
  contentType?: string,
}

const request = async (options: RequestOptions) => {
  const {
    url,
    data,
    method = 'GET',
    contentType = 'application/json;charset=UTF-8'
  } = options;
  const parsedMethod = method.toLocaleUpperCase();
  let fetchUrl = url;
  let fetchOpt: RequestInit = {}
  if (parsedMethod === 'GET') {
    if (data) {
      const parsedData = new URLSearchParams(data).toString()
      fetchUrl = `${fetchUrl}?${parsedData}`
    }
    const token = getToken() || ''
    const headers = { token }
    fetchOpt = { ...fetchOpt, method: parsedMethod, headers }
  }
  if (parsedMethod === 'POST' || parsedMethod === 'PUT' || parsedMethod === 'DELETE') {
    const token = getToken() || ''
    const headers = { 'Content-Type': contentType, token }
    let body = '';
    if (contentType.includes('application/json')) {
      body = JSON.stringify(data)
    }
    if (contentType.includes('application/x-www-form-urlencoded')) {
      body = new URLSearchParams(data).toString()
    }
    fetchOpt = { ...fetchOpt, headers, body, method: parsedMethod }
  }
  const result = await fetch(fetchUrl, fetchOpt)
  const res = await result.json()
  if (res.code === 401) {
    window.location.replace("/login");
  }
  return res;
}

export default request;