import {SENDCLOUD_API} from "@/constant/sendCloud";

type RequestOptions = {
  url: string,
  method: string,
  data?: any,
  contentType?: string,
  token?: string,
}

const sendCloudServerFetch = async (options: RequestOptions) => {
  const { url, method, data, contentType, token } = options;
  let fetchUrl = `${SENDCLOUD_API}${url}`;
  let fetchOpt: RequestInit = {}
  if (method === 'GET') {
    if (data) fetchUrl = `${fetchUrl}?${data}`;
    const headers = { token } as HeadersInit
    fetchOpt = { ...fetchOpt, method, headers }
  }
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    const headers = { 'Content-Type': contentType, token } as HeadersInit
    fetchOpt = { ...fetchOpt, headers, body: data, method }
  }
  return fetch(fetchUrl, fetchOpt)
}

export default sendCloudServerFetch;