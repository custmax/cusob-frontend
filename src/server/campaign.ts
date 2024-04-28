import clientFetch from '@/helper/clientFetch';

export const getCampaignPage = async ( page: number, limit: number,query: Record<string, string>) => {
  const res = await clientFetch({
    url: `/api/campaign/getPage/${limit}/${page}`,
    method: 'GET',
    data: query,
  })
  return res;
}

export const saveDraft = async (data: Partial<Campaign.CampaignNew>) => {
  const res = await clientFetch({
    url: `/api/campaign/saveDraft`,
    method: 'POST',
    data: { ...data, id: 0 }
  })
  return res;
}

export const getCampaign = async (id: string) => {
  const res = await clientFetch({
    url: `/api/campaign/get/${id}`,
    method: 'GET',
  })
  return res;
}

export const updateCampaign = async (data: Partial<Campaign.CampaignNew>) => {
  const res = await clientFetch({
    url: `/api/campaign/update`,
    method: 'POST',
    data
  })
  return res;
}

export const sendEmail = async (data: Campaign.CampaignNew) => {
  const res = await clientFetch({
    url: `/api/campaign/sendEmail`,
    method: 'POST',
    data: { ...data, id: 0 }
  })
  return res;
}
