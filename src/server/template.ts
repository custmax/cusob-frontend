import clientFetch from '@/helper/clientFetch';

export const saveTemplate = async (data: Template.TemplateNew) => {
  const res = await clientFetch({
    url: `/api/template/save/customized`,
    method: 'POST',
    data,
  })
  return res;
}

export const updateTemplate = async (data: Template.TemplateNew) => {
  const res = await clientFetch({
    url: `/api/template/update`,
    method: 'POST',
    data,
  })
  return res;
}

export const getTemplateList = async (data: { folder?: string, keyword?: string }) => {
  const res = await clientFetch({
    url: `/api/template/getList`,
    method: 'GET',
    data,
  })
  return res;
}

export const getFolderList = async () => {
  const res = await clientFetch({
    url: `/api/template/getFolderList`,
    method: 'GET',
  })
  return res;
}

export const getTemplate = async (id: number) => {
  const res = await clientFetch({
    url: `/api/template/get/${id}`,
    method: 'GET',
    //data: { id },
    contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}

export const removeCustomizedTemplate = async (id: number) => {
  const res = await clientFetch({
    url: `/api/template/remove/${id}`,
    method: 'DELETE',
    // contentType: 'application/x-www-form-urlencoded',
  })
  return res;
}