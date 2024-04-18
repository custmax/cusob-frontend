import clientFetch from '@/helper/clientFetch';

export const getReportList = async (page: number, limit: number, keyword?: string) => {
  const res = await clientFetch({
    url: `/api/report/getPage/${page}/${limit}`,
    method: 'GET',
    data: { keyword: keyword || '' }
  })
  return res;
}
