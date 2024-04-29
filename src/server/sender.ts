import clientFetch from '@/helper/clientFetch';

export const sendCodeForSender = async (email: string) => {
  const res = await clientFetch({
    url: `/api/sender/sendCodeForSender`,
    method: 'POST',
    data: { email },
    contentType: 'application/x-www-form-urlencoded'
  })
  return res;
}

export const saveSender = async (data: Omit<Sender.SaveSender, 'id'>) => {
  console.log(data)
  const res = await clientFetch({
    url: `/api/sender/save`,
    method: 'POST',
    data,
  })
  return res;
}

export const getSenderList = async () => {
  const res = await clientFetch({
    url: `/api/sender/getList`,
    method: 'GET',
  })
  return res;
}

