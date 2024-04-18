
type RequestOptions = {
  url: string,
  method: string,
  data?: any,
  contentType?: string,
  token?: string,
}

const serverFetch = async (options: RequestOptions) => {
  const { url, method, data, contentType, token } = options;
  let fetchUrl = `${process.env.NEXT_PUBLIC_HOST}${url}`;
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

export default serverFetch;